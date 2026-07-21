"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

/**
 * Switch — Botão de alternância (liga/desliga ou ativado/desativado).
 *
 * Baseado no Radix UI `@radix-ui/react-switch`. Funciona como um checkbox com estética de chave seletora.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {boolean} [props.checked] - Estado de seleção controlado.
 * @param {boolean} [props.defaultChecked] - Estado de seleção inicial não controlado.
 * @param {(checked: boolean) => void} [props.onCheckedChange] - Callback disparado quando o estado altera.
 * @param {boolean} [props.disabled] - Se `true`, desativa a interação.
 * @param {string} [props.className] - Classes CSS adicionais.
 *
 * @example
 * // Com Label acessível:
 * <div className="flex items-center space-x-2">
 *   <Switch id="airplane-mode" checked={enabled} onCheckedChange={setEnabled} />
 *   <Label htmlFor="airplane-mode">Modo Avião</Label>
 * </div>
 */
const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
