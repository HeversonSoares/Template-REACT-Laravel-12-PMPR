// =============================================================================
// useTempo — Hook customizado para o módulo Tempo
// =============================================================================
// Encapsula toda a lógica de estado e chamadas ao tempoService.
// A página (TempoPage.jsx) consome apenas este hook, mantendo-se limpa e focada
// exclusivamente na renderização da UI.
//
// Padrão de hook:
//   - Gerencia estados: dados, carregamento e erro.
//   - Expõe apenas o necessário para a UI (dados + ações).
//   - Não importa componentes JSX — apenas lógica de negócio.
//
// Fluxo: useTempo → tempoService.buscarTempo → GET /api/tempo → Laravel BFF
// =============================================================================

import { useState, useCallback } from 'react';
import { buscarTempo } from '../services/tempoService';

/**
 * Hook customizado que gerencia o estado e as chamadas ao BFF do módulo Tempo.
 *
 * @returns {{
 *   cidade:     string,
 *   setCidade:  (v: string) => void,
 *   local:      { nome: string, estado: string, pais: string } | null,
 *   previsao:   import('../services/tempoService').TempoData | null,
 *   isLoading:  boolean,
 *   erro:       string | null,
 *   buscar:     () => Promise<void>,
 * }}
 *
 * @example
 * function MinhaPage() {
 *   const { cidade, setCidade, local, previsao, isLoading, erro, buscar } = useTempo();
 *   // ...
 * }
 */
export function useTempo() {
    // ── Estado: campo de busca ────────────────────────────────────────────────
    const [cidade, setCidade] = useState(() => {
        return localStorage.getItem('tempo_cidade_padrao') || 'Curitiba';
    });

    // ── Estado: localização encontrada (retornada pelo BFF) ───────────────────
    const [local, setLocal]     = useState(null);

    // ── Estado: dados da previsão (transformados pelo service) ────────────────
    const [previsao, setPrevisao] = useState(null);

    // ── Estado: indicador de carregamento ─────────────────────────────────────
    const [isLoading, setIsLoading] = useState(false);

    // ── Estado: mensagem de erro ──────────────────────────────────────────────
    const [erro, setErro]       = useState(null);

    /**
     * Executa a busca chamando o BFF via tempoService.
     * Atualiza todos os estados do hook.
     *
     * Fluxo: buscar() → buscarTempo(cidade) → GET /api/tempo?cidade=X → Laravel
     */
    const buscar = useCallback(async () => {
        if (!cidade.trim()) return;

        setIsLoading(true);
        setErro(null);
        setPrevisao(null);
        setLocal(null);

        try {
            // Uma única chamada ao service — o BFF resolve geocoding + forecast
            const resultado = await buscarTempo(cidade.trim());

            setLocal(resultado.local);
            setPrevisao(resultado.previsao);
            
            localStorage.setItem('tempo_cidade_padrao', cidade.trim());
        } catch (e) {
            setErro(e.message ?? 'Erro inesperado ao buscar dados do tempo.');
        } finally {
            setIsLoading(false);
        }
    }, [cidade]);

    return {
        cidade,
        setCidade,
        local,
        previsao,
        isLoading,
        erro,
        buscar,
    };
}
