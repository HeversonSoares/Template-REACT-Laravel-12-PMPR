import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import PageHeader from '@/components/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import * as LucideIcons from 'lucide-react';

export default function TemplateDesignIcons() {
    const [searchTerm, setSearchTerm] = useState('');

    const iconNames = [
        'Shield', 'Eye', 'EyeOff', 'LayoutGrid', 'Info', 'TrendingUp', 'TrendingDown', 'Minus', 'FileText', 'ChevronDown', 'Grid3X3', 'Plus', 'Trash2', 'Settings', 'Download', 'Save', 'RefreshCw', 'Filter', 'Pencil', 'LayoutTemplate', 'Users', 'Search', 'SlidersHorizontal', 'MoreHorizontal', 'AlertCircle', 'Clock', 'CheckCircle2', 'AlertTriangle', 'Layers', 'Image', 'BarChart2', 'Star', 'Columns2', 'BookOpen', 'ShieldCheck', 'Network', 'ArrowDown', 'Code2', 'FileJson', 'Truck', 'Package', 'Bell', 'ClipboardList', 'ArrowRight', 'PanelLeft', 'Briefcase', 'CloudSun', 'X', 'ChevronUp', 'Check', 'Menu', 'Circle', 'ChevronRight', 'Printer'
    ];

    // Remove duplicados e ordena
    const uniqueIcons = [...new Set(iconNames)].sort();

    const filteredIcons = uniqueIcons.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <PageHeader
                    title="Ícones do Projeto"
                    description="Lista de ícones do lucide-react usados no projeto."
                    icon={LucideIcons.LayoutTemplate}
                />

                <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                        <CardTitle>Ícones Usados</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0 space-y-6">
                        <Input
                            placeholder="Buscar ícone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="max-w-md"
                        />
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                            {filteredIcons.map((name) => {
                                const IconComponent = LucideIcons[name];
                                if (!IconComponent) return null;
                                return (
                                    <div key={name} className="flex flex-col items-center justify-center p-4 border rounded-lg bg-card hover:bg-accent hover:text-accent-foreground transition-colors">
                                        <IconComponent className="w-8 h-8 mb-2" />
                                        <span className="text-xs font-medium text-center break-all">{name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
