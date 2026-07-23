// =============================================================================
// TempoMenu — Cabeçalho + Navegação do módulo Tempo
// =============================================================================
// Segue o mesmo padrão de todos os *Menu.jsx do projeto:
//   - Importa ModuleHeader (que unifica PageHeader + ModuleNavigation)
//   - Define navItems com as rotas do módulo
//   - Aceita props para ações contextuais (ex: botão de atualizar)
// =============================================================================

import React from 'react';

// ─── Cabeçalho padronizado do módulo (PageHeader + ModuleNavigation) ──────────
import ModuleHeader from '@/components/ModuleHeader';

// ─── ActionButton: botão com ícone padronizado ───────────────────────────────
import ActionButton from '@/components/ui/action-button';

// ─── Ícones vetoriais ─────────────────────────────────────────────────────────
import { CloudSun, RefreshCw } from 'lucide-react';

/**
 * TempoMenu — Cabeçalho e navegação do módulo Tempo.
 *
 * @param {Function} [onAtualizar]  - Callback chamado ao clicar em "Atualizar".
 * @param {boolean}  [isLoading]   - Se true, exibe o spinner no botão Atualizar.
 *
 * @example
 * <TempoMenu onAtualizar={buscar} isLoading={isLoading} />
 */
export default function TempoMenu({ onAtualizar, isLoading }) {
    const navItems = [
        { to: '/tempo', label: 'Previsão do Tempo', end: true },
    ];

    return (
        <ModuleHeader
            title="Previsão do Tempo"
            description="Consulta de previsão meteorológica via API pública Open-Meteo (sem necessidade de token)."
            icon={CloudSun}
            badge="Open-Meteo"
            navItems={navItems}
        >
            {onAtualizar && (
                <ActionButton
                    icon={RefreshCw}
                    label={isLoading ? 'Buscando...' : 'Atualizar'}
                    variant="outline"
                    disabled={isLoading}
                    onClick={onAtualizar}
                    compact
                    className={isLoading ? '[&_svg]:animate-spin' : ''}
                />
            )}
        </ModuleHeader>
    );
}
