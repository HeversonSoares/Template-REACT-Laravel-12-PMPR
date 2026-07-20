import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { ChevronDown } from 'lucide-react';

export default function ModuleNavigation({ items, className }) {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Helper to check if a dropdown group has any active child
    const isGroupActive = (subItems) => {
        return subItems.some(subItem => location.pathname === subItem.to);
    };

    // Close dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("flex items-center justify-between pb-2 w-full relative z-20", className)}>
            <NavigationMenu className="relative z-30">
                <NavigationMenuList className="flex gap-1 flex-wrap items-center">
                    {items.map((item) => {
                        // Standard Link Tab
                        if (item.to) {
                            return (
                                <NavigationMenuItem key={item.to}>
                                    <NavLink
                                        to={item.to}
                                        end={item.end}
                                        className={({ isActive }) => cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm flex items-center gap-2",
                                            isActive && "bg-slate-100 dark:bg-slate-800 text-foreground font-semibold"
                                        )}
                                    >
                                        {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                        {item.label}
                                    </NavLink>
                                </NavigationMenuItem>
                            );
                        }

                        // Dropdown Menu Tab
                        if (item.items) {
                            const active = isGroupActive(item.items);
                            return (
                                <NavigationMenuItem key={item.label} className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsOpen(!isOpen)}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm flex items-center gap-2",
                                            (active || isOpen) && "bg-slate-100 dark:bg-slate-800 text-foreground font-semibold"
                                        )}
                                    >
                                        {item.icon && <item.icon className="h-4 w-4 shrink-0" />}
                                        {item.label}
                                        <ChevronDown className={cn("h-3 w-3 transition duration-200", isOpen && "rotate-180")} />
                                    </button>
                                    
                                    {isOpen && (
                                        <div className="absolute left-0 sm:left-auto sm:right-0 mt-1 min-w-[200px] p-2 bg-popover border border-border rounded-xl shadow-lg flex flex-col gap-1 z-50">
                                            {item.items.map((subItem, sIdx) => (
                                                <NavLink
                                                    key={sIdx}
                                                    to={subItem.to}
                                                    end={subItem.end}
                                                    onClick={() => setIsOpen(false)}
                                                    className={({ isActive }) => cn(
                                                        "w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors font-medium text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-2",
                                                        isActive && "bg-primary/10 text-primary font-bold hover:bg-primary/15"
                                                    )}
                                                >
                                                    {subItem.icon && <subItem.icon className="h-4 w-4 shrink-0" />}
                                                    {subItem.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                                </NavigationMenuItem>
                            );
                        }

                        return null;
                    })}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
