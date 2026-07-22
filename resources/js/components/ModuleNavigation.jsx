import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ChevronDown, ChevronRight } from 'lucide-react';

// =============================================================================
// ModuleNavigation — Barra de navegação horizontal de módulo
// =============================================================================
// Suporta:
//   • Links simples:    { to, label, end?, icon? }
//   • Dropdown:         { label, icon?, items: [...] }
//   • Submenu flyout:   item dentro de items com { label, icon?, items: [...] }
//   • Separador:        { separator: true }  dentro de items
// =============================================================================

// ─── DropdownMenu individual (estado isolado por instância) ───────────────────
function DropdownItem({ item, onCloseAll }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // Detecta se algum filho (recursivo) está ativo
    const isDeepActive = useCallback((subItems) => {
        return subItems.some((sub) => {
            if (sub.to) return location.pathname === sub.to;
            if (sub.items) return isDeepActive(sub.items);
            return false;
        });
    }, [location.pathname]);

    const active = isDeepActive(item.items);

    // Fecha ao clicar fora
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleClose = () => setIsOpen(false);

    return (
        <NavigationMenuItem className="relative" ref={ref}>
            {/* Gatilho do dropdown */}
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={cn(
                    navigationMenuTriggerStyle(),
                    'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm flex items-center gap-2',
                    (active || isOpen) && 'bg-slate-100 dark:bg-slate-800 text-foreground font-semibold'
                )}
            >
                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                {item.label}
                <ChevronDown className={cn('h-3 w-3 transition duration-200', isOpen && 'rotate-180')} />
            </button>

            {/* Painel do dropdown */}
            {isOpen && (
                <div className="absolute left-0 mt-1 min-w-[220px] p-2 bg-popover border border-border rounded-xl shadow-lg flex flex-col gap-0.5 z-50">
                    {item.items.map((subItem, idx) => {
                        // ── Separador ────────────────────────────────────────
                        if (subItem.separator) {
                            return <div key={`sep-${idx}`} className="my-1 h-px bg-border mx-1" />;
                        }

                        // ── Submenu flyout (item com items filhos) ────────────
                        if (subItem.items) {
                            return (
                                <SubMenuItem
                                    key={subItem.label}
                                    item={subItem}
                                    onClose={handleClose}
                                />
                            );
                        }

                        // ── Link simples ──────────────────────────────────────
                        return (
                            <NavLink
                                key={subItem.to}
                                to={subItem.to}
                                end={subItem.end}
                                onClick={handleClose}
                                className={({ isActive }) =>
                                    cn(
                                        'w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors font-medium text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2',
                                        isActive && 'bg-primary/10 text-primary font-bold hover:bg-primary/15'
                                    )
                                }
                            >
                                {subItem.icon && <subItem.icon className="h-4 w-4 shrink-0" />}
                                {subItem.label}
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </NavigationMenuItem>
    );
}

// ─── Submenu flyout (item dentro de um dropdown com sub-itens) ────────────────
function SubMenuItem({ item, onClose }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const isActive = item.items?.some((sub) => location.pathname === sub.to);

    // Fecha ao sair com o mouse de toda a área (trigger + conteúdo)
    const handleMouseLeave = (e) => {
        if (ref.current && !ref.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    };

    return (
        <div
            ref={ref}
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={handleMouseLeave}
        >
            {/* Gatilho do submenu */}
            <button
                className={cn(
                    'w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-2',
                    'text-muted-foreground hover:bg-muted hover:text-foreground',
                    (isActive || isOpen) && 'bg-primary/10 text-primary hover:bg-primary/15'
                )}
            >
                {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
            </button>

            {/* Painel flyout do submenu — abre à direita */}
            {isOpen && (
                <div className="absolute left-full top-0 ml-1 min-w-[200px] p-2 bg-popover border border-border rounded-xl shadow-lg flex flex-col gap-0.5 z-50">
                    {/* Rótulo do grupo */}
                    <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 select-none">
                        {item.label}
                    </p>
                    <div className="h-px bg-border mx-1 mb-1" />

                    {item.items.map((subItem, idx) => {
                        if (subItem.separator) {
                            return <div key={`sep-${idx}`} className="my-1 h-px bg-border mx-1" />;
                        }
                        return (
                            <NavLink
                                key={subItem.to}
                                to={subItem.to}
                                end={subItem.end}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    cn(
                                        'w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors font-medium text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2',
                                        isActive && 'bg-primary/10 text-primary font-bold hover:bg-primary/15'
                                    )
                                }
                            >
                                {subItem.icon && <subItem.icon className="h-4 w-4 shrink-0" />}
                                {subItem.label}
                            </NavLink>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ─── Componente principal exportado ──────────────────────────────────────────
export default function ModuleNavigation({ items, className }) {
    return (
        <div className={cn('flex items-center justify-between pb-2 w-full relative z-20', className)}>
            <NavigationMenu className="relative z-30">
                <NavigationMenuList className="flex gap-1 flex-wrap items-center">
                    {items.map((item, idx) => {
                        // Link simples
                        if (item.to) {
                            return (
                                <NavigationMenuItem key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.end}
                                        className={({ isActive }) =>
                                            cn(
                                                navigationMenuTriggerStyle(),
                                                'bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm flex items-center gap-2',
                                                isActive && 'bg-slate-100 dark:bg-slate-800 text-foreground font-semibold'
                                            )
                                        }
                                    >
                                        {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                        {item.label}
                                    </NavLink>
                                </NavigationMenuItem>
                            );
                        }

                        // Dropdown com itens (e possíveis submenus flyout)
                        if (item.items) {
                            return <DropdownItem key={item.label + idx} item={item} />;
                        }

                        return null;
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
