import React from 'react';
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
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

// Espelha exatamente os itens do sidebar (Layout.jsx navItems)
const WORKSPACE_ITEMS = [

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {WORKSPACE_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card 
                                key={item.id}
                                onClick={() => navigate(item.path)}
                                className="bg-card border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer group"
                            >
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {item.name}
                                    </CardTitle>
                                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
