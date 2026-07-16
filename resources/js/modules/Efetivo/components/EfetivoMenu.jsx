import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, RefreshCw } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function EfetivoMenu({ onSyncAll, isSyncing }) {
    const location = useLocation();
    
    // Ajudante para verificar a rota ativa
    const isActive = (path) => location.pathname === path;

    return (
        <div className="space-y-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2.5">
                        <Users className="h-6 w-6 text-slate-700 shrink-0" />
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Módulo Efetivo</h1>
                    </div>
                    <p className="text-slate-500 text-sm mt-1">
                        Gerenciamento, pesquisa e integração de dados de efetivo.
                    </p>
                </div>
                {onSyncAll && (
                    <Button 
                        onClick={onSyncAll}
                        disabled={isSyncing}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl gap-2 shadow"
                    >
                        <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} /> 
                        {isSyncing ? 'Sincronizando...' : 'Sincronizar Tudo'}
                    </Button>
                )}
            </div>

            <hr className="border-slate-200" />

            <div className="flex items-center justify-between overflow-x-auto pb-2">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-1">
                        <NavigationMenuItem>
                            <Link
                                to="/efetivo"
                                className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/efetivo') ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                            >
                                Pesquisa Geral
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/efetivo/sincronizado"
                                className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/efetivo/sincronizado') ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                            >
                                Efetivo Sincronizado
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/efetivo/mapeamento"
                                className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/efetivo/mapeamento') ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                            >
                                Mapeamento de Campos
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/efetivo/parametros"
                                className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/efetivo/parametros') ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                            >
                                Parâmetros de Conexão
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}
