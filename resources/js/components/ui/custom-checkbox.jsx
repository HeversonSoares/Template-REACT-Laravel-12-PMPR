import React from 'react';

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
                <label htmlFor={id} className="text-sm font-semibold text-slate-700 cursor-pointer">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-slate-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
