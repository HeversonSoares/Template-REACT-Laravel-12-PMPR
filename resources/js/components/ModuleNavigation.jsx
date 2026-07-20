import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function ModuleNavigation({ items, className }) {
    const location = useLocation();

    // Helper to check if a dropdown group has any active child
    const isGroupActive = (subItems) => {
        return subItems.some(subItem => location.pathname === subItem.to);
    };

    return (
        <div className={cn("flex items-center justify-between pb-2 w-full relative z-20", className)}>
            <NavigationMenu className="relative z-30">
                <NavigationMenuList className="flex gap-1 flex-wrap">
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
                                            "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm",
                                            isActive && "bg-slate-100 dark:bg-slate-800 text-foreground font-semibold"
                                        )}
                                    >
                                        {item.label}
                                    </NavLink>
                                </NavigationMenuItem>
                            );
                        }

                        // Dropdown Menu Tab
                        if (item.items) {
                            const active = isGroupActive(item.items);
                            return (
                                <NavigationMenuItem key={item.label}>
                                    <NavigationMenuTrigger className={cn(
                                        navigationMenuTriggerStyle(),
                                        "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm",
                                        active && "bg-slate-100 dark:bg-slate-800 text-foreground font-semibold"
                                    )}>
                                        {item.label}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="min-w-[200px] p-2 bg-popover border border-border rounded-xl shadow-lg flex flex-col gap-1 z-50">
                                            {item.items.map((subItem, sIdx) => (
                                                <NavLink
                                                    key={sIdx}
                                                    to={subItem.to}
                                                    end={subItem.end}
                                                    className={({ isActive }) => cn(
                                                        "w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
                                                        isActive && "bg-primary/10 text-primary font-bold hover:bg-primary/15"
                                                    )}
                                                >
                                                    {subItem.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </NavigationMenuContent>
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
