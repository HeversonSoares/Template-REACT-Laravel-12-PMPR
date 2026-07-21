import React from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import { Badge } from './badge';

/**
 * MultiSelect — Seleção múltipla com busca integrada e badges dos itens selecionados.
 *
 * Permite selecionar múltiplos itens exibindo cada item escolhido como um Badge com opção de remoção individual.
 *
 * @param {Object[]} options - Array de opções `{ value: string|number, label: string }`.
 * @param {string} [placeholder="Selecione..."] - Texto exibido quando nenhuma opção está selecionada.
 * @param {Array<string|number>} [selectedValues=[]] - Array dos valores atualmente selecionados.
 * @param {function(Array<string|number>): void} onChange - Callback disparado ao selecionar/deselecionar itens.
 *
 * @example
 * const options = [
 *   { value: 'react', label: 'React' },
 *   { value: 'vue', label: 'Vue' },
 * ];
 *
 * <MultiSelect
 *   options={options}
 *   selectedValues={selectedTags}
 *   placeholder="Selecione as tecnologias..."
 *   onChange={(values) => setSelectedTags(values)}
 * />
 */
export function MultiSelect({ options, placeholder, selectedValues = [], onChange }) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const filtered = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleOption = (val) => {
        if (selectedValues.includes(val)) {
            onChange(selectedValues.filter(v => v !== val));
        } else {
            onChange([...selectedValues, val]);
        }
    };

    return (
        <div className="relative w-full">
            <div
                onClick={() => setOpen(!open)}
                className="flex min-h-[38px] w-full items-center justify-between rounded-md border border bg-card px-3 py-1.5 text-sm shadow-sm cursor-pointer"
            >
                <div className="flex flex-wrap gap-1">
                    {selectedValues.length === 0 ? (
                        <span className="text-muted-foreground">{placeholder}</span>
                    ) : (
                        selectedValues.map(val => {
                            const opt = options.find(o => o.value === val);
                            return (
                                <Badge
                                    key={val}
                                    className="bg-amber-100 text-amber-800 hover:bg-amber-255 border-none flex items-center gap-1 py-0.5 px-2 text-xs font-semibold rounded shadow-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOption(val);
                                    }}
                                >
                                    {opt ? opt.label : val}
                                    <span className="text-[10px] ml-1 font-bold cursor-pointer">×</span>
                                </Badge>
                            );
                        })
                    )}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </div>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border bg-card p-1 text-foreground shadow-md">
                        <div className="flex items-center border-b px-2 pb-1 mb-1">
                            <Search className="h-3.5 w-3.5 mr-2 text-muted-foreground shrink-0" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex h-8 w-full rounded-sm bg-transparent py-1.5 text-xs outline-none"
                            />
                        </div>
                        {filtered.length === 0 ? (
                            <div className="py-2 px-2 text-xs text-muted-foreground">Nenhum item encontrado.</div>
                        ) : (
                            filtered.map(opt => {
                                const isSelected = selectedValues.includes(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => toggleOption(opt.value)}
                                        className="w-full text-left rounded-sm px-2 py-1.5 text-xs hover:bg-slate-100 transition-colors flex items-center justify-between"
                                    >
                                        <span className={isSelected ? "font-semibold text-amber-700" : ""}>{opt.label}</span>
                                        {isSelected && <Check className="h-3.5 w-3.5 text-amber-600" />}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

