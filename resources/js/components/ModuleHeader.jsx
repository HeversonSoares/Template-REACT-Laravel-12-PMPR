import React from 'react';
import PageHeader from '@/components/PageHeader';
import ModuleNavigation from '@/components/ModuleNavigation';
import { cn } from '@/lib/utils';

/**
 * ModuleHeader — Cabeçalho completo e padronizado de módulo.
 *
 * Combina em um único componente: PageHeader + separador visual + ModuleNavigation.
 * Use este componente no arquivo *Menu.jsx de cada módulo para garantir a consistência
 * visual e eliminar a repetição de estrutura entre todos os módulos do sistema.
 *
 * @param {string}          title         - Título do módulo (obrigatório).
 * @param {string}          [description] - Subtítulo ou texto de apoio do módulo.
 * @param {React.Component} [icon]        - Ícone lucide-react exibido ao lado do título.
 * @param {string}          [badge]       - Badge colorida ao lado do título (ex: "Beta", "Novo").
 * @param {Array}           navItems      - Array de itens de navegação. Aceita links simples
 *                                         e grupos com dropdown. (obrigatório)
 * @param {string}          [className]   - Classes CSS extras para o container externo.
 * @param {React.ReactNode} [children]    - Ações/botões exibidos à direita do cabeçalho.
 *
 * @example
 * // Estrutura do array navItems:
 * const navItems = [
 *   { to: '/modulo', label: 'Visão Geral', end: true },  // end: true = match exato da rota
 *   { to: '/modulo/historico', label: 'Histórico' },
 *   {
 *     label: 'Mais Opções',          // Grupo dropdown (sem 'to')
 *     items: [
 *       { to: '/modulo/relatorios', label: 'Relatórios' },
 *       { to: '/modulo/exportar', label: 'Exportar' },
 *     ]
 *   }
 * ];
 *
 * @example
 * // Uso mínimo
 * <ModuleHeader title="Módulo Efetivo" icon={Users} navItems={navItems} />
 *
 * @example
 * // Com ações à direita
 * <ModuleHeader title="Módulo Efetivo" icon={Users} badge="Beta" navItems={navItems}>
 *   <Button onClick={handleSync}>Sincronizar</Button>
 * </ModuleHeader>
 */
export default function ModuleHeader({
    title,
    description,
    icon,
    badge,
    navItems = [],
    className,
    children,
}) {
    return (
        <div className={cn('space-y-4 relative z-20', className)}>
            <PageHeader
                title={title}
                description={description}
                icon={icon}
                badge={badge}
                separator
            >
                {children}
            </PageHeader>

            <ModuleNavigation items={navItems} />
        </div>
    );
}
