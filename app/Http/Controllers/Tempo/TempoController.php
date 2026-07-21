<?php

namespace App\Http\Controllers\Tempo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

/**
 * TempoController — BFF proxy para a API pública Open-Meteo.
 *
 * Responsabilidade:
 *   - Receber a requisição do React SPA (via /api/tempo).
 *   - Validar os parâmetros de entrada.
 *   - Chamar a API externa Open-Meteo usando a Facade Http do Laravel.
 *   - Retornar o JSON estruturado para o frontend.
 *
 * Por que o BFF faz a chamada e não o React diretamente?
 *   - Centraliza o endpoint externo no backend (mais fácil de trocar, versionar ou autenticar).
 *   - Permite adicionar cache, rate-limiting ou autenticação futuros sem alterar o frontend.
 *   - Evita expor a URL da API externa diretamente ao navegador.
 *   - Garante que CORS seja controlado pelo nosso servidor, não pelo third-party.
 */
class TempoController extends Controller
{
    // ── URLs base das APIs externas (ficam no backend, invisíveis ao browser) ───
    private const GEO_URL  = 'https://geocoding-api.open-meteo.com/v1/search';
    private const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

    /**
     * GET /api/tempo
     *
     * Retorna a previsão do tempo completa para uma cidade informada.
     * Realiza duas chamadas à Open-Meteo:
     *   1. Geocoding: resolve nome da cidade → coordenadas.
     *   2. Forecast:  coordenadas → dados meteorológicos.
     *
     * @param  Request  $request
     * @return JsonResponse
     *
     * Query params:
     *   - cidade (string, required): Nome da cidade a consultar.
     *
     * @example GET /api/tempo?cidade=Curitiba
     */
    public function previsao(Request $request): JsonResponse
    {
        // ── 1. Validação dos parâmetros de entrada ────────────────────────────
        $validated = $request->validate([
            'cidade' => ['required', 'string', 'min:2', 'max:100'],
        ]);

        $cidade = $validated['cidade'];

        // ── 2. Geocoding: resolve a cidade em coordenadas ─────────────────────
        $geoResposta = Http::timeout(10)->get(self::GEO_URL, [
            'name'     => $cidade,
            'count'    => 1,
            'language' => 'pt',
            'format'   => 'json',
        ]);

        if ($geoResposta->failed()) {
            return response()->json(
                ['message' => 'Erro ao buscar localização na API externa.'],
                502
            );
        }

        $geoData = $geoResposta->json();

        if (empty($geoData['results'])) {
            return response()->json(
                ['message' => "Cidade \"{$cidade}\" não encontrada. Verifique o nome e tente novamente."],
                404
            );
        }

        $local = $geoData['results'][0];

        // ── 3. Forecast: busca a previsão do tempo pelas coordenadas ──────────
        $forecastResposta = Http::timeout(10)->get(self::BASE_URL, [
            'latitude'        => $local['latitude'],
            'longitude'       => $local['longitude'],
            'current'         => implode(',', [
                'temperature_2m',
                'relative_humidity_2m',
                'apparent_temperature',
                'weather_code',
                'wind_speed_10m',
                'precipitation',
                'cloud_cover',
                'uv_index',
            ]),
            'hourly'          => implode(',', [
                'temperature_2m',
                'weather_code',
                'precipitation_probability',
            ]),
            'daily'           => implode(',', [
                'weather_code',
                'temperature_2m_max',
                'temperature_2m_min',
                'precipitation_sum',
                'precipitation_probability_max',
                'uv_index_max',
                'wind_speed_10m_max',
            ]),
            'timezone'        => 'America/Sao_Paulo',
            'forecast_days'   => 7,
            'wind_speed_unit' => 'kmh',
        ]);

        if ($forecastResposta->failed()) {
            return response()->json(
                ['message' => 'Erro ao buscar previsão do tempo na API externa.'],
                502
            );
        }

        // ── 4. Monta e retorna o JSON estruturado para o React ────────────────
        return response()->json([
            'local' => [
                'nome'   => $local['name'],
                'estado' => $local['admin1'] ?? '',
                'pais'   => $local['country_code'] ?? '',
            ],
            'previsao' => $forecastResposta->json(),
        ]);
    }
}
