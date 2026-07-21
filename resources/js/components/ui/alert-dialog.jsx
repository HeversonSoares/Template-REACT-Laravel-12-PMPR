import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * AlertDialog — Modal de confirmação/alerta para ações críticas.
 *
 * Baseado no Radix UI `@radix-ui/react-alert-dialog`. Interrompe a navegação do usuário
 * exigindo uma confirmação explícita ou cancelamento (ex: exclusão de dados, alterações irreversíveis).
 *
 * Componentes disponíveis:
 * - `AlertDialog`: Container raiz que gerencia o estado aberto/fechado.
 * - `AlertDialogTrigger`: Botão ou elemento que dispara a abertura do dialog.
 * - `AlertDialogContent`: Conteúdo do modal em overlay (renderizado via portal).
 * - `AlertDialogHeader`: Cabeçalho contendo o título e a descrição.
 * - `AlertDialogTitle`: Título do alerta.
 * - `AlertDialogDescription`: Descrição explicativa da ação/consequência.
 * - `AlertDialogFooter`: Rodapé contendo as ações (botões).
 * - `AlertDialogAction`: Botão de ação principal/confirmação.
 * - `AlertDialogCancel`: Botão de cancelamento.
 *
 * @example
 * // Exemplo de uso de AlertDialog:
 * // <AlertDialog>
 * //   <AlertDialogTrigger asChild><Button variant="destructive">Excluir</Button></AlertDialogTrigger>
 * //   <AlertDialogContent>
 * //     <AlertDialogHeader>
 * //       <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
 * //       <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
 * //     </AlertDialogHeader>
 * //     <AlertDialogFooter>
 * //       <AlertDialogCancel>Cancelar</AlertDialogCancel>
 * //       <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
 * //     </AlertDialogFooter>
 * //   </AlertDialogContent>
 * // </AlertDialog>
 */

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props} />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props} />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

