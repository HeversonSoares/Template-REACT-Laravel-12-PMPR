import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

/**
 * Separator — Divisor visual horizontal ou vertical para separar blocos de conteúdo.
 *
 * Baseado no Radix UI `@radix-ui/react-separator`.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {"horizontal" | "vertical"} [props.orientation="horizontal"] - Orientação da linha divisória.
 * @param {boolean} [props.decorative=true] - Se `true`, indica que o elemento é meramente decorativo e será ignorado por leitores de tela.
 * @param {string} [props.className] - Classes CSS adicionais para customização.
 *
 * @example
 * // Divisor horizontal simples:
 * <Separator />
 *
 * @example
 * // Divisor vertical em um flex container:
 * <div className="flex h-5 items-center space-x-4">
 *   <span>Blog</span>
 *   <Separator orientation="vertical" />
 *   <span>Docs</span>
 * </div>
 */
const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
