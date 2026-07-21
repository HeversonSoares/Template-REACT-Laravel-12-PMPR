import React from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';

/**
 * SearchableSelect — Componente de seleção dropdown com busca integrada.
 *
 * Permite que o usuário filtre as opções digitando um termo no campo de pesquisa.
 *
 * @param {Object[]} options - Array de opções `{ value: string|number, label: string }`.
 * @param {string} [placeholder="Selecione..."] - Texto exibido quando nenhuma opção está selecionada.
 * @param {string|number} value - Valor atualmente selecionado.
 * @param {function(string|number): void} onChange - Callback disparado ao selecionar uma opção.
 *
 * @example
 * const options = [
 *   { value: '1', label: 'Opção 1' },
 *   { value: '2', label: 'Opção 2' },
 * ];
 *
 * <SearchableSelect
 *   options={options}
 *   value={selectedVal}
 *   placeholder="Selecione um item..."
 *   onChange={(val) => setSelectedVal(val)}
 * />
 */
export function SearchableSelect({ options, placeholder, value, onChange }) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    
    const selectedOption = options.find(opt => opt.value === value);
    const filtered = options.filter(opt => 
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex h-9 w-full items-center justify-between rounded-md border border bg-card px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
                <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
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
                            filtered.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                        setSearch('');
                                    }}
                                    className="w-full text-left rounded-sm px-2 py-1.5 text-xs hover:bg-slate-100 transition-colors flex items-center justify-between"
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && <Check className="h-3.5 w-3.5 text-amber-600" />}
                                </button>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

