import { cn } from "@/lib/utils"

/**
 * Skeleton — Indicador visual de carregamento (placeholder com animação de pulsar).
 *
 * Utilizado para melhorar a percepção de performance enquanto dados assíncronos estão sendo buscados.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {string} [props.className] - Classes Tailwind para definir largura, altura, raio de borda (ex: `h-4 w-[250px]`, `h-12 w-12 rounded-full`).
 *
 * @example
 * // Card de carregamento:
 * <div className="flex items-center space-x-4">
 *   <Skeleton className="h-12 w-12 rounded-full" />
 *   <div className="space-y-2">
 *     <Skeleton className="h-4 w-[250px]" />
 *     <Skeleton className="h-4 w-[200px]" />
 *   </div>
 * </div>
 */
function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />);
}

export { Skeleton }
