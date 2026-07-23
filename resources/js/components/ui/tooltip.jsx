import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/lib/utils"

/**
 * Tooltip — Balão Informativo exibido ao passar o mouse ou focar em um elemento.
 *
 * Baseado no Radix UI `@radix-ui/react-tooltip`.
 *
 * Componentes disponíveis:
 * - `TooltipProvider`: Envolve a aplicação ou seção para gerenciar o delay dos tooltips.
 * - `Tooltip`: Container raiz de um tooltip individual.
 * - `TooltipTrigger`: Elemento gatilho (botão, ícone, etc.).
 * - `TooltipContent`: Caixa com a mensagem explicativa.
 *
 * @example
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button variant="outline">Hover me</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>
 *       <p>Informação complementar aqui</p>
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 */
const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef(({ className, sideOffset = 8, children, showArrow = true, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-[9999] overflow-visible rounded-lg bg-[#242e42] px-3.5 py-2 text-[14px] font-medium text-white shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && (
        <TooltipPrimitive.Arrow className="fill-[#242e42]" width={10} height={6} />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
