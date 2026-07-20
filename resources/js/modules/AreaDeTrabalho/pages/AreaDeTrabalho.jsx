import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
import {
    LayoutGrid,
    Layers,
    Users,
    Truck,
    BookOpen,
    Settings,
} from 'lucide-react';

// Espelha exatamente os itens do sidebar (Layout.jsx navItems)
const WORKSPACE_ITEMS = [
    {
        id: 'area-de-trabalho',
        name: 'Área de Trabalho',
        description: 'Área de trabalho do sistema',
        path: '/area-de-trabalho',
        icon: LayoutGrid,
    },
    {
        id: 'hub',
        name: 'Hub',
        description: 'Visão geral do sistema',
        path: '/',
        icon: Layers,
    },
    {
        id: 'efetivo',
        name: 'Efetivo',
        description: 'Gestão de pessoal',
        path: '/efetivo',
        icon: Users,
    },
    {
        id: 'frotas',
        name: 'Frotas',
        description: 'Controle de veículos',
        path: '/fleets',
        icon: Truck,
    },
    {
        id: 'modelos',
        name: 'Modelos',
        description: 'Templates e formulários',
        path: '/templates',
        icon: BookOpen,
    },
    {
        id: 'configuracoes',
        name: 'Configurações',
        description: 'Preferências do sistema',
        path: '/settings',
        icon: Settings,
    },
];

function WorkspaceIcon({ item, onClick }) {
    const [hovered, setHovered] = useState(false);
    const Icon = item.icon;

    return (
        <button
            onClick={() => onClick(item.path)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex flex-col items-center gap-2 focus:outline-none select-none"
            title={item.description}
            style={{ width: '90px' }}
        >
            <Icon
                className={hovered ? 'text-foreground' : 'text-muted-foreground'}
                style={{
                    width: '52px',
                    height: '52px',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: hovered ? 'translateY(-3px) scale(1.1)' : 'translateY(0) scale(1)',
                    strokeWidth: 1.5,
                }}
            />
            <span
                className={`text-center leading-tight ${hovered ? 'text-foreground' : 'text-muted-foreground'}`}
                style={{
                    fontSize: '11.5px',
                    fontWeight: 600,
                    maxWidth: '88px',
                    wordBreak: 'break-word',
                    lineHeight: '1.35',
                    transition: 'color 0.2s ease',
                }}
            >
                {item.name}
            </span>
        </button>
    );
}

export default function AreaDeTrabalho() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="p-6 space-y-8">
                <PageHeader
                    title="Área de Trabalho"
                    description="Acesso rápido a todos os módulos do sistema."
                    icon={LayoutGrid}
                    separator
                />

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '36px 24px',
                        paddingTop: '4px',
                    }}
                >
                    {WORKSPACE_ITEMS.map((item) => (
                        <WorkspaceIcon
                            key={item.id}
                            item={item}
                            onClick={(path) => navigate(path)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
