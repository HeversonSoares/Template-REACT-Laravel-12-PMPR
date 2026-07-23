import React from 'react';
import ModuleHeader from '@/components/ModuleHeader';
import ActionButton from '@/components/ui/action-button';
import { RefreshCw, Users } from 'lucide-react';

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
                <ActionButton
                    icon={RefreshCw}
                    label={isSyncing ? 'Sincronizando...' : 'Sincronizar Tudo'}
                    variant="success"
                    disabled={isSyncing}
                    onClick={onSyncAll}
                    compact
                    className={isSyncing ? '[&_svg]:animate-spin' : ''}
                />
            )}
        </ModuleHeader>
    );
}
