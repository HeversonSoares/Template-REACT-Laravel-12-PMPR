import React from 'react';
import { Printer } from 'lucide-react';
import ActionButton from './action-button';

/**
 * PrintButton - Botão padronizado para impressão de telas ou documentos.
 * 
 * Envolve o ActionButton com o ícone de impressora e a ação nativa `window.print()`.
 * Pode receber propriedades adicionais repassadas ao ActionButton (ex: compact).
 * 
 * @param {Object} props - Propriedades do botão.
 * @param {string} [props.label="Imprimir"] - Texto do botão.
 * @param {string} [props.variant="outline"] - Variante de estilo (outline, default, etc).
 * @param {boolean} [props.compact] - Se true, exibe de forma responsiva/compacta no mobile.
 */
export default function PrintButton({
    label = "Imprimir",
    variant = "outline",
    compact = false,
    ...props
}) {
    return (
        <ActionButton
            icon={Printer}
            label={label}
            variant={variant}
            onClick={() => window.print()}
            compact={compact}
            {...props}
        />
    );
}
