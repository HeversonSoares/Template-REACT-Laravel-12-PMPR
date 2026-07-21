import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button — Componente de botão base com suporte a múltiplas variantes e tamanhos.
 *
 * Utiliza o `class-variance-authority` (cva) para gerenciar as classes baseadas nas props `variant` e `size`.
 * Pode atuar como um componente polimórfico usando a prop `asChild`, renderizando o seu filho direto no lugar da tag `<button>`.
 *
 * @param {string}   [variant]   - Variante visual: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success".
 * @param {string}   [size]      - Tamanho do botão: "default" | "sm" | "lg" | "icon".
 * @param {boolean}  [asChild]   - Se true, não renderiza a tag button, mas repassa as props para o elemento filho.
 * @param {string}   [className] - Classes CSS adicionais.
 *
 * @example
 * // Botão padrão
 * <Button>Clique Aqui</Button>
 *
 * @example
 * // Botão de sucesso pequeno
 * <Button variant="success" size="sm">Salvar</Button>
 *
 * @example
 * // Botão renderizado como link (usando asChild)
 * <Button asChild variant="link">
 *   <a href="/login">Fazer Login</a>
 * </Button>
 */
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
