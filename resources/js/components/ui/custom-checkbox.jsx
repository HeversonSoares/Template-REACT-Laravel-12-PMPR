import React from 'react';

/**
 * CustomCheckbox — Checkbox customizado com suporte a label e descrição.
 *
 * @param {string} id - ID único do checkbox para acessibilidade e vínculo com o label.
 * @param {string|React.ReactNode} label - Texto principal do checkbox.
 * @param {string|React.ReactNode} [description] - Texto descritivo opcional abaixo do label.
 * @param {boolean} checked - Estado atual do checkbox.
 * @param {function(boolean): void} onChange - Callback disparado ao alterar o valor.
 */
export function CustomCheckbox({ id, label, description, checked, onChange }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-350 text-amber-650 focus:ring-amber-500 focus:outline-none cursor-pointer accent-amber-600"
                />
            </div>
            <div className="grid gap-0.5 leading-none">
                <label htmlFor={id} className="text-sm font-semibold text-foreground cursor-pointer">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
