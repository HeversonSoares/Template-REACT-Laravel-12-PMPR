<?php

namespace App\Http\Controllers;

// ══════════════════════════════════════════════════════════════════════════════
// IMPORTS — Carregamos somente o que vamos usar.
// ══════════════════════════════════════════════════════════════════════════════

use App\Http\Controllers\Controller;   // Classe base do Laravel (obrigatório herdar)
use Illuminate\Http\Request;           // Representa a requisição HTTP que chegou do React
use Illuminate\Http\JsonResponse;      // Tipo de retorno: garante que sempre devolvemos JSON
use Illuminate\Support\Facades\Http;   // Fachada para fazer requisições HTTP para APIs externas
use Illuminate\Support\Facades\Cache;  // Cache (Redis ou arquivo) para guardar respostas temporariamente
use Illuminate\Support\Facades\Log;    // Registra erros e eventos no arquivo de log do Laravel

/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║                       TEMPLATE DE CONTROLLER BFF                       ║
 * ║                                                                        ║
 * ║  O que é um Controller BFF (Backend For Frontend)?                     ║
 * ║  ─────────────────────────────────────────────────                     ║
 * ║  É o "intermediário" entre o React e APIs/sistemas externos.            ║
 * ║  O React NUNCA chama sistemas externos diretamente.                    ║
 * ║  Ele chama ESTE controller, que por sua vez chama os sistemas.         ║
 * ║                                                                        ║
 * ║  Fluxo:                                                                ║
 * ║  [React] → GET /api/exemplo → [Este Controller] → [APIs Externas]     ║
 * ║                              ← JSON estruturado ←                     ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 *
 * ROTAS que este controller atende (registrar em routes/web.php):
 *
 *   Route::prefix('api')->group(function () {
 *       Route::get('/exemplo/sincrono',    [ExemploController::class, 'sincrono']);
 *       Route::get('/exemplo/assincrono',  [ExemploController::class, 'assincrono']);
 *       Route::delete('/exemplo/cache',    [ExemploController::class, 'limparCache']);
 *   });
 */
class ExemploController extends Controller
{
    // ══════════════════════════════════════════════════════════════════════════
    // CONSTANTES — URLs das APIs externas ficam AQUI, nunca no frontend.
    // Se a URL mudar, você altera só neste arquivo.
    // ══════════════════════════════════════════════════════════════════════════

    private const URL_SISTEMA_A = 'https://api.sistema-a.exemplo.com/v1/dados';
    private const URL_SISTEMA_B = 'https://api.sistema-b.exemplo.com/v1/dados';
    private const URL_SISTEMA_C = 'https://api.sistema-c.exemplo.com/v1/dados';

    // ══════════════════════════════════════════════════════════════════════════
    // CONFIGURAÇÕES
    // ══════════════════════════════════════════════════════════════════════════

    private const TIMEOUT_SEGUNDOS    = 5;   // Tempo máximo de espera por sistema
    private const CACHE_TTL_SEGUNDOS  = 60;  // Tempo que a resposta fica no cache



    // ══════════════════════════════════════════════════════════════════════════
    //
    //  MÉTODO 1 — SÍNCRONO (chamadas em sequência, uma de cada vez)
    //
    //  Quando usar?
    //  → Quando a chamada 2 depende do resultado da chamada 1.
    //  → Exemplo: preciso do ID do usuário para depois buscar seus pedidos.
    //
    //  Desvantagem:
    //  → Cada chamada ESPERA a anterior terminar.
    //  → Se cada API leva 1s, 3 APIs = 3 segundos de espera total.
    //
    //  Rota: GET /api/exemplo/sincrono?id=123
    //
    // ══════════════════════════════════════════════════════════════════════════

    public function sincrono(Request $request): JsonResponse
    {
        // ── PASSO 1: Validação dos parâmetros ─────────────────────────────────
        //
        // Nunca confie no que o usuário/React enviou sem validar primeiro.
        // O Laravel valida e já retorna erro 422 automaticamente se inválido.
        //
        $validated = $request->validate([
            'id' => ['required', 'integer', 'min:1'],
            // Outros exemplos de validação:
            // 'nome'   => ['required', 'string', 'max:100'],
            // 'data'   => ['nullable', 'date'],
            // 'ativo'  => ['boolean'],
        ]);

        $id = $validated['id'];


        // ── PASSO 2: Primeira chamada HTTP (síncrona) ─────────────────────────
        //
        // Http::timeout(N) → Se o sistema não responder em N segundos, lança exceção.
        // ->get(URL, params) → Faz uma requisição GET com query string (?id=123).
        // ->post(URL, body)  → Faz uma requisição POST com corpo JSON.
        //
        $respostaA = Http::timeout(self::TIMEOUT_SEGUNDOS)
            ->get(self::URL_SISTEMA_A, [
                'id' => $id,
            ]);

        // ── PASSO 2.1: Verifica se a chamada falhou ───────────────────────────
        //
        // ->failed()     → true se o status HTTP foi 4xx ou 5xx
        // ->successful() → true se o status HTTP foi 2xx
        // ->status()     → número do status HTTP (200, 404, 500...)
        //
        if ($respostaA->failed()) {
            Log::error('ExemploController: Sistema A falhou', [
                'id'     => $id,
                'status' => $respostaA->status(),
            ]);

            // 502 Bad Gateway → "nosso servidor recebeu um erro de outro servidor"
            return response()->json(
                ['message' => 'Sistema A indisponível. Tente novamente em instantes.'],
                502
            );
        }

        // ── PASSO 2.2: Extrai os dados da resposta ────────────────────────────
        //
        // ->json()         → converte o JSON da resposta em array PHP
        // ->json('chave')  → pega um campo específico do JSON retornado
        //
        $dadosA = $respostaA->json();

        // Neste exemplo, o Sistema A retornou um token que precisamos para chamar o B
        $tokenDoSistemaA = $dadosA['token'] ?? null;

        if (! $tokenDoSistemaA) {
            return response()->json(
                ['message' => 'Sistema A não retornou token esperado.'],
                502
            );
        }


        // ── PASSO 3: Segunda chamada (usa resultado da primeira) ──────────────
        //
        // Repare: só chegamos aqui DEPOIS que a chamada A terminou.
        // Isso é "síncrono" — sequencial, um após o outro.
        //
        $respostaB = Http::timeout(self::TIMEOUT_SEGUNDOS)
            ->withToken($tokenDoSistemaA)   // ← Passa o token: Authorization: Bearer ...
            ->get(self::URL_SISTEMA_B, [
                'id' => $id,
            ]);

        if ($respostaB->failed()) {
            Log::warning('ExemploController: Sistema B falhou — retornando dados parciais', [
                'id' => $id,
            ]);

            // Graceful Degradation: retorna dados parciais em vez de erro total
            return response()->json([
                'dados_a' => $dadosA,
                'dados_b' => null,               // null = este sistema falhou
                'meta'    => [
                    'sistema_a_online' => true,
                    'sistema_b_online' => false,  // frontend pode exibir aviso no card
                ],
            ]);
        }


        // ── PASSO 4: Monta o JSON final e retorna para o React ────────────────
        //
        // NUNCA retorne o JSON bruto da API externa diretamente.
        // Sempre estruture o contrato que o React espera.
        // Isso desacopla: se a API externa mudar, só o controller muda.
        //
        return response()->json([
            'dados_a' => [
                'id'   => $dadosA['id']   ?? null,
                'nome' => $dadosA['nome'] ?? 'Desconhecido',
                // ... mapeie só os campos que o React realmente precisa
            ],
            'dados_b' => [
                'total' => $respostaB->json('total') ?? 0,
                'itens' => $respostaB->json('itens') ?? [],
            ],
            'meta' => [
                'sistema_a_online' => true,
                'sistema_b_online' => true,
            ],
        ]);
    }



    // ══════════════════════════════════════════════════════════════════════════
    //
    //  MÉTODO 2 — ASSÍNCRONO / PARALELO (Http::pool — todas ao mesmo tempo)
    //
    //  Quando usar?
    //  → Quando as chamadas são INDEPENDENTES entre si.
    //  → Exemplo: buscar frotas, efetivo e cautelas ao mesmo tempo.
    //    Nenhum dado depende do outro para começar.
    //
    //  Vantagem:
    //  → Se cada API leva 1s, 5 APIs em paralelo = ainda ~1 segundo total.
    //  → Reduz latência drasticamente.
    //
    //  Rota: GET /api/exemplo/assincrono?unidade=BPM01
    //
    // ══════════════════════════════════════════════════════════════════════════

    public function assincrono(Request $request): JsonResponse
    {
        // ── PASSO 1: Validação dos parâmetros ─────────────────────────────────
        $validated = $request->validate([
            'unidade' => ['required', 'string', 'max:50'],
        ]);

        $unidade = $validated['unidade'];


        // ── PASSO 2: Cache ────────────────────────────────────────────────────
        //
        // Por que usar cache?
        // → Se 100 usuários acessarem ao mesmo tempo, chamamos os sistemas
        //   externos apenas 1 vez. A resposta fica guardada por 60 segundos.
        //
        // Cache::remember(chave, tempo_em_segundos, função)
        // → Se a chave JÁ existir no cache → retorna o valor guardado.
        // → Se NÃO existir → executa a função, guarda e retorna o resultado.
        //
        $chaveCache = "dashboard.{$unidade}";

        $dadosConsolidados = Cache::remember(
            $chaveCache,
            self::CACHE_TTL_SEGUNDOS,
            function () use ($unidade) {

                // ── PASSO 3: Http::pool — dispara TODAS ao mesmo tempo ────────────
                //
                // $pool->as('nome') → dá um nome para identificar a resposta depois.
                // ->timeout(N)      → tempo máximo para ESTA chamada específica.
                // ->get(url, params)→ faz a requisição GET.
                //
                // As 3 chamadas abaixo saem SIMULTANEAMENTE.
                // O Laravel só continua quando TODAS terminarem (ou derem timeout).
                //
                $responses = Http::pool(fn ($pool) => [

                    $pool->as('sistema_a')
                        ->timeout(self::TIMEOUT_SEGUNDOS)
                        ->get(self::URL_SISTEMA_A, ['unidade' => $unidade]),

                    $pool->as('sistema_b')
                        ->timeout(self::TIMEOUT_SEGUNDOS)
                        ->get(self::URL_SISTEMA_B, ['unidade' => $unidade]),

                    $pool->as('sistema_c')
                        ->timeout(self::TIMEOUT_SEGUNDOS)
                        ->get(self::URL_SISTEMA_C, ['unidade' => $unidade]),

                    // Adicione quantos sistemas precisar:
                    // $pool->as('frotas')    ->timeout(3)->get($urlFrotas, [...]),
                    // $pool->as('efetivo')   ->timeout(3)->get($urlEfetivo, [...]),
                    // $pool->as('cautelas')  ->timeout(3)->get($urlCautelas, [...]),
                ]);


                // ── PASSO 4: Lê cada resposta individualmente ─────────────────────
                //
                // $responses['nome'] → acessa pelo nome dado no ->as('nome')
                // ->successful()     → true se respondeu com HTTP 2xx
                //
                $okA = $responses['sistema_a']->successful();
                $okB = $responses['sistema_b']->successful();
                $okC = $responses['sistema_c']->successful();


                // ── PASSO 5: Monta o DTO (Data Transfer Object) ───────────────────
                //
                // Aplica fallbacks seguros: se um sistema falhou, usa valor padrão.
                // O React nunca fica sem dados — no máximo recebe zeros + aviso.
                //
                return [

                    // Sistema A — estrutura vazia mas válida se falhou
                    'sistema_a' => $okA
                        ? [
                            'total'  => $responses['sistema_a']->json('total')  ?? 0,
                            'ativos' => $responses['sistema_a']->json('ativos') ?? 0,
                          ]
                        : ['total' => 0, 'ativos' => 0],

                    // Sistema B — array vazio se falhou
                    'sistema_b' => $okB
                        ? ($responses['sistema_b']->json('itens') ?? [])
                        : [],

                    // Sistema C — null se falhou (frontend decide como exibir)
                    'sistema_c' => $okC
                        ? $responses['sistema_c']->json()
                        : null,

                    // meta.status → informa o React quais sistemas estão online.
                    // O React exibe badge "Indisponível" apenas no card afetado,
                    // enquanto o restante do dashboard funciona normalmente.
                    'meta' => [
                        'status' => [
                            'sistema_a_online' => $okA,
                            'sistema_b_online' => $okB,
                            'sistema_c_online' => $okC,
                        ],
                        'cache_gerado_em' => now()->toIso8601String(),
                    ],
                ];

            } // fim do Cache::remember
        );


        // ── PASSO 6: Retorna os dados consolidados para o React ───────────────
        //
        // HTTP 200 mesmo que algum sistema esteja offline.
        // NOSSA API respondeu com sucesso.
        // Quem está offline está sinalizado em meta.status.
        //
        return response()->json($dadosConsolidados);
    }



    // ══════════════════════════════════════════════════════════════════════════
    //
    //  MÉTODO 3 — LIMPEZA DE CACHE
    //
    //  Útil para forçar atualização dos dados sem esperar o TTL expirar.
    //  Exemplo: botão "Atualizar dados" na tela do React.
    //
    //  Rota: DELETE /api/exemplo/cache?unidade=BPM01
    //
    // ══════════════════════════════════════════════════════════════════════════

    public function limparCache(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'unidade' => ['required', 'string', 'max:50'],
        ]);

        $chaveCache = "dashboard.{$validated['unidade']}";

        Cache::forget($chaveCache); // ← Remove a chave do cache

        return response()->json([
            'message' => 'Cache limpo. Próxima requisição buscará dados atualizados.',
        ]);
    }
}
