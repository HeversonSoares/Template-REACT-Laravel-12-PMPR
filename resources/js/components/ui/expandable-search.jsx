import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';
import ActionButton from './action-button';
import { cn } from '@/lib/utils';

/**
 * ExpandableSearch - Campo de pesquisa que se expande a partir de um ActionButton.
 * 
 * Exibe um ActionButton "Pesquisar" compacto por padrão. Ao clicar, ele se expande
 * para um campo de input. Suporta a injeção de uma função de renderização de resultados
 * (dropdown) logo abaixo do input.
 */
export default function ExpandableSearch({
    value,
    onChange,
    onClear,
    onKeyDown,
    onSearch,
    placeholder = "Pesquisar...",
    renderResults,
    className,
    defaultExpanded = false
}) {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isExpanded && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isExpanded]);

    const handleClear = () => {
        setIsExpanded(false);
        if (onClear) onClear();
    };

    if (!isExpanded) {
        return (
            <ActionButton
                icon={Search}
                label="Pesquisar"
                variant="outline"
                onClick={() => setIsExpanded(true)}
                compact
            />
        );
    }

    return (
        <div className="relative z-50">
            <div className={cn("flex items-center bg-background border rounded-md px-2 shadow-sm w-64 md:w-80 transition-all", className)}>
                <button 
                    onClick={onSearch}
                    className="flex items-center justify-center h-6 w-6 shrink-0 rounded-sm hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors cursor-pointer"
                    aria-label="Pesquisar"
                >
                    <Search className="w-4 h-4" />
                </button>
                <Input 
                    ref={inputRef}
                    placeholder={placeholder} 
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                />
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6 shrink-0" 
                    onClick={handleClear}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
            
            {/* Dropdown de resultados injetado pelo componente pai */}
            {value && renderResults && (
                <div className="absolute top-[calc(100%+0.5rem)] right-0 w-[400px] max-h-[60vh] overflow-y-auto bg-popover border text-popover-foreground rounded-md shadow-md z-50 p-2">
                    {renderResults(() => setIsExpanded(false))}
                </div>
            )}
        </div>
    );
}
