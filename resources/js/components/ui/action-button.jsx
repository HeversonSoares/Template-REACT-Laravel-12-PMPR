import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
};

/**
 * ActionButton — Botão de ação padronizado com suporte a modo responsivo/compacto e bordas arredondadas.
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
 * @param {string|boolean}  [rounded]   - Curvatura das bordas: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full" (padrão: "md").
 * @param {string}          [className] - Classes CSS extras.
 * @param {boolean}         [disabled]  - Desabilita o botão.
 * @param {function}        [onClick]   - Handler de clique.
 *
 * @example
 * // Ação principal (salvar) — verde com bordas suaves (rounded-md por padrão)
 * <ActionButton icon={Save} label="Salvar" variant="success" />
 *
 * @example
 * // Responsivo — colapsa para ícone + label abaixo em telas < md
 * <ActionButton icon={Plus} label="Novo" variant="default" responsive />
 *
 * @example
 * // Modo compacto arredondado
 * <ActionButton icon={Plus} label="Novo" variant="default" compact rounded="md" />
 */
const ActionButton = React.forwardRef(({
    icon: Icon,
    label,
    variant = 'default',
    size = 'sm',
    compact = false,
    responsive = true,
    rounded = 'md',
    className,
    disabled,
    onClick,
    ...props
}, ref) => {
    const getRoundedClass = () => {
        if (!rounded) return '';
        if (typeof rounded === 'string') return roundedMap[rounded] || rounded;
        if (rounded === true) return 'rounded-md';
        return '';
    };

    const roundedClass = getRoundedClass();

    // Modo compacto: ícone centrado + label pequeno abaixo
    if (compact) {
        const inner = (
            <div
                ref={!props.tooltip ? ref : undefined}
                onClick={disabled ? undefined : onClick}
                className={cn('inline-flex flex-col items-center gap-0.5 group cursor-pointer select-none', disabled && 'opacity-50 pointer-events-none')}
                {...(props.tooltip ? {} : props)}
            >
                <Button
                    variant={variant}
                    size="icon"
                    disabled={disabled}
                    tabIndex={-1}
                    className={cn('h-8 w-8 pointer-events-none', roundedClass, className)}
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

        if (props.tooltip) {
            return (
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            {inner}
                        </TooltipTrigger>
                        <TooltipContent side="bottom">
                            <p>{props.tooltip}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        return inner;
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
                    className={cn('hidden md:inline-flex gap-1.5', roundedClass, className)}
                >
                    {Icon && <Icon className="h-4 w-4" />}
                    {label}
                </Button>

                {/* Versão compacta — visível abaixo de md */}
                <TooltipProvider delayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={disabled ? undefined : onClick}
                                className={cn('flex flex-col items-center gap-0.5 md:hidden group cursor-pointer select-none', disabled && 'opacity-50 pointer-events-none')}
                            >
                                <Button
                                    variant={variant}
                                    size="icon"
                                    disabled={disabled}
                                    tabIndex={-1}
                                    className={cn('h-8 w-8 pointer-events-none', roundedClass, className)}
                                >
                                    {Icon && <Icon className="h-4 w-4" />}
                                </Button>
                                {label && (
                                    <span className="text-[10px] text-muted-foreground group-hover:text-foreground font-medium leading-none transition-colors">
                                        {label}
                                    </span>
                                )}
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
            className={cn('gap-1.5', roundedClass, className)}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4" />}
            {label}
        </Button>
    );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
