import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2, XCircle, AlertTriangle, Info } from "lucide-react";

/**
 * SwitchAlert Component
 * Um componente de alerta padronizado (estilo SweetAlert) baseado no AlertDialog do shadcn/ui.
 * 
 * @param {boolean} open - Controla a visibilidade do alerta (aberto/fechado).
 * @param {function} onOpenChange - Função chamada quando o estado de visibilidade muda.
 * @param {string} type - Tipo de alerta que define o ícone e a cor do botão ('success', 'error', 'confirm', 'info', 'warning').
 * @param {string} title - O texto do título exibido no alerta.
 * @param {string|ReactNode} message - A mensagem descritiva principal.
 * @param {function} onConfirm - Callback executado ao clicar no botão de confirmação.
 * @param {function} onCancel - Callback executado ao clicar no botão de cancelar.
 * @param {string} confirmText - Texto do botão de confirmação (padrão: "Confirmar").
 * @param {string} cancelText - Texto do botão de cancelar (padrão: "Cancelar").
 * @param {boolean} showCancel - Força a exibição do botão cancelar mesmo se o tipo não for 'confirm'.
 * @param {ReactNode} children - Componentes extras renderizados dentro do alerta, antes dos botões.
 * @param {ReactNode} icon - Ícone customizado opcional para substituir o ícone padrão.
 */
export function SwitchAlert({
  open,
  onOpenChange,
  type = 'info', // Você pode passar: 'success', 'error', 'confirm', 'info', 'warning'
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar', // Para mudar o texto padrão em todo o sistema, mude aqui
  cancelText = 'Cancelar',   // Para mudar o texto padrão em todo o sistema, mude aqui
  showCancel = false,
  children,
  icon: CustomIcon // Permite que o desenvolvedor passe um <OutroIcone /> diretamente
}) {
  const isConfirm = type === 'confirm';
  const shouldShowCancel = showCancel || isConfirm;

  // Função central para definir os visuais de cada "type"
  // Desenvolvedor: Se você quiser alterar as CORES DOS BOTÕES ou OS ÍCONES, edite este bloco!
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return { 
          icon: <CheckCircle2 className="w-5 h-5 text-green-600" />, 
          buttonClass: 'bg-green-600 hover:bg-green-700 text-white' 
        };
      case 'error':
        return { 
          icon: <XCircle className="w-5 h-5 text-red-600" />, 
          buttonClass: 'bg-red-600 hover:bg-red-700 text-white' 
        };
      case 'confirm':
      case 'warning':
        return { 
          icon: <AlertTriangle className="w-5 h-5 text-yellow-600" />, 
          buttonClass: 'bg-yellow-600 hover:bg-yellow-700 text-white' 
        };
      case 'info':
      default:
        return { 
          icon: <Info className="w-5 h-5 text-blue-600" />, 
          buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white' 
        };
    }
  };

  const { icon, buttonClass } = getTypeStyles();
  const DisplayIcon = CustomIcon ? <CustomIcon className="w-5 h-5" /> : icon;

  const handleConfirm = (e) => {
    if (onConfirm) {
      onConfirm(e);
    } else if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleCancel = (e) => {
    if (onCancel) {
      onCancel(e);
    } else if (onOpenChange) {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden">
        <AlertDialogHeader className="p-6 pb-4">
          {title && (
            <AlertDialogTitle className="flex items-center gap-2">
              {DisplayIcon}
              {title}
            </AlertDialogTitle>
          )}
          {message && (
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {children && <div className="px-6 pb-6">{children}</div>}
        <AlertDialogFooter className="bg-muted/50 border-t p-4 sm:p-6">
          {shouldShowCancel && (
            <AlertDialogCancel onClick={handleCancel} className="h-9 px-4 text-sm mt-2 sm:mt-0">
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction onClick={handleConfirm} className={`h-9 px-4 text-sm ${buttonClass}`}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
