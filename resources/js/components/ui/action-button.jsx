import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

/**
 * ActionButton — Botão de ação padronizado com suporte a modo responsivo/compacto.
 *
 * Em modo normal: exibe ícone à esquerda + label horizontal (padrão do projeto).
 * Em modo compacto (`compact`): exibe apenas o ícone com o label em texto pequeno abaixo.
 * Em telas pequenas (< md), automaticamente colapsa para compacto se `responsive` for true.
 *
 * @param {React.Component} icon        - Ícone do lucide-react (renderizado sempre à esquerda).
 * @param {string}          label       - Texto do botão.
 * @param {string}          [variant]   - Variante: "default" | "success" | "destructive" | "outline" | "secondary" | "ghost".
 * @param {string}          [size]      - Tamanho: "default" | "sm" | "lg".
 * @param {boolean}         [compact]   - Força modo compacto (ícone + label abaixo).
 * @param {boolean}         [responsive]- Se true, colapsa automaticamente em telas pequenas (< md).
 * @param {string}          [className] - Classes CSS extras.
 * @param {boolean}         [disabled]  - Desabilita o botão.
 * @param {function}        [onClick]   - Handler de clique.
 *
 * @example
 * // Ação principal (salvar) — verde
 * <ActionButton icon={Save} label="Salvar" variant="success" />
 *
 * @example
 * // Ação destrutiva — vermelho
 * <ActionButton icon={Trash2} label="Excluir" variant="destructive" />
 *
 * @example
 * // Ação secundária — outline
 * <ActionButton icon={Download} label="Exportar" variant="outline" />
 *
 * @example
 * // Responsivo — colapsa para ícone + label abaixo em telas < md
 * <ActionButton icon={Plus} label="Novo" variant="default" responsive />
 */
const ActionButton = React.forwardRef(({
    icon: Icon,
    label,
    variant = 'default',
    size = 'sm',
    compact = false,
    responsive = false,
    className,
    disabled,
    onClick,
    ...props
}, ref) => {
    // Modo compacto: ícone centrado + label pequeno abaixo
    if (compact) {
        return (
            <div
                ref={ref}
                onClick={disabled ? undefined : onClick}
                className={cn('inline-flex flex-col items-center gap-0.5 group cursor-pointer select-none', disabled && 'opacity-50 pointer-events-none', className)}
                {...props}
            >
                <Button
                    variant={variant}
                    size="icon"
                    disabled={disabled}
                    tabIndex={-1}
                    className="h-8 w-8 pointer-events-none"
                >
                    {Icon && <Icon className="h-4 w-4" />}
                </Button>
                {label && (
                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-medium leading-none transition-colors">
                        {label}
                    </span>
                )}
            </div>
        );
    }

    // Modo responsivo: normal em md+, compacto abaixo de md
    if (responsive) {
        return (
            <span className="inline-flex items-center" ref={ref} {...props}>
                {/* Versão normal — visível em md+ */}
                <Button
                    variant={variant}
                    size={size}
                    disabled={disabled}
                    onClick={onClick}
                    className={cn('hidden md:inline-flex', className)}
                >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                </Button>

                {/* Versão compacta — visível abaixo de md */}
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex flex-col items-center gap-0.5 md:hidden">
                                <Button
                                    variant={variant}
                                    size="icon"
                                    disabled={disabled}
                                    onClick={onClick}
                                    className={cn('h-8 w-8', className)}
                                >
                                    {Icon && <Icon className="h-4 w-4" />}
                                </Button>
                                <span className="text-[10px] text-muted-foreground font-medium leading-none">
                                    {label}
                                </span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>{label}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </span>
        );
    }

    // Modo padrão: ícone à esquerda + label
    return (
        <Button
            ref={ref}
            variant={variant}
            size={size}
            disabled={disabled}
            onClick={onClick}
            className={cn(className)}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
        </Button>
    );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
