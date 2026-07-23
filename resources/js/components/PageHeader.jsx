import React from 'react';
import { cn } from '@/lib/utils';

/**
 * PageHeader — Cabeçalho padrão reutilizável de página/módulo.
 *
 * @param {string}          title         - Título principal da página (obrigatório).
 * @param {string}          [description] - Subtítulo ou texto de apoio.
 * @param {React.Component} [icon]        - Componente de ícone lucide-react renderizado à esquerda do título.
 * @param {string}          [badge]       - Texto de badge exibido ao lado do título (ex: "Beta", "Novo", "12").
 * @param {"default"|"sm"}  [size]        - Tamanho do cabeçalho. "sm" para sub-seções internas. Default: "default".
 * @param {boolean}         [separator]   - Se true, renderiza um <hr> abaixo do cabeçalho.
 * @param {string}          [className]   - Classes CSS adicionais para o container externo.
 * @param {React.ReactNode} [children]    - Ações (botões, links) renderizadas à direita do cabeçalho.
 *
 * @example
 * // Uso básico
 * <PageHeader title="Página" description="Subtítulo" icon={LayoutTemplate} />
 *
 * @example
 * // Com badge, separator e ações
 * <PageHeader title="Relatórios" icon={FileText} badge="Beta" separator>
 *   <Button>Nova Ação</Button>
 * </PageHeader>
 *
 * @example
 * // Versão compacta para sub-seções
 * <PageHeader title="Filtros Avançados" size="sm" />
 */
export default function PageHeader({
    title,
    description,
    icon: Icon,
    badge,
    size = 'default',
    separator = false,
    children,
    className,
}) {
    const isSmall = size === 'sm';

    return (
        <div className={cn('flex flex-col gap-3', className)}>
            <div className={cn(
                'flex flex-col md:flex-row justify-between items-start md:items-center gap-4',
            )}>
                {/* Lado esquerdo: ícone + título + badge + descrição */}
                <div className={cn('space-y-0.5', isSmall && 'space-y-0')}>
                    <div className="flex items-center gap-2.5 flex-wrap">
                        {Icon && (
                            <Icon className={cn(
                                'shrink-0 text-muted-foreground',
                                isSmall ? 'h-4 w-4' : 'h-6 w-6'
                            )} />
                        )}
                        <h2 className={cn(
                            'font-bold tracking-tight text-foreground',
                            isSmall ? 'text-base' : 'text-2xl'
                        )}>
                            {title}
                        </h2>
                        {badge && (
                            <span className={cn(
                                'inline-flex items-center rounded-full px-2 py-0.5 font-semibold ring-1 ring-inset',
                                'bg-primary/10 text-primary ring-primary/20',
                                isSmall ? 'text-[10px]' : 'text-xs'
                            )}>
                                {badge}
                            </span>
                        )}
                    </div>
                    {description && (
                        <p className={cn(
                            'text-muted-foreground',
                            isSmall ? 'text-xs' : 'text-sm'
                        )}>
                            {description}
                        </p>
                    )}
                </div>

                {/* Lado direito: ações/children */}
                {children && (
                    <div className="flex items-center justify-end md:justify-start gap-2 shrink-0 flex-wrap w-full md:w-auto">
                        {children}
                    </div>
                )}
            </div>

            {separator && <hr className="border-border" />}
        </div>
    );
}
