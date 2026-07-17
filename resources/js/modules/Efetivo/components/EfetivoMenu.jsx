import React from 'react';
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Users, RefreshCw } from 'lucide-react';

export default function EfetivoMenu({ onSyncAll, isSyncing }) {
    const navItems = [
        { to: '/efetivo', label: 'Pesquisa Geral', end: true },
        { to: '/efetivo/sincronizado', label: 'Efetivo Sincronizado' },
        { to: '/efetivo/mapeamento', label: 'Mapeamento de Campos' },
        { to: '/efetivo/parametros', label: 'Parâmetros de Conexão' }
    ];

    return (
        <ModuleHeader
            title="Módulo Efetivo"
            description="Gerenciamento, pesquisa e integração de dados de efetivo."
            icon={Users}
            navItems={navItems}
        >
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
        </ModuleHeader>
    );
}
