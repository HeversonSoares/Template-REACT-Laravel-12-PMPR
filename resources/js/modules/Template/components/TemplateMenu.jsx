// Core do React para definição de componentes e gerenciamento de estado local (ex: controle de abertura de diálogos)
import React, { useState } from 'react';

// Componente de cabeçalho completo de módulo (PageHeader + hr + ModuleNavigation em um só)
import ModuleHeader from '@/components/ModuleHeader';

// ActionButton — botão de ação padronizado do projeto (ícone à esquerda, com modo compacto/responsivo)
import ActionButton from '@/components/ui/action-button';
import ExpandableSearch from '@/components/ui/expandable-search';
import PrintButton from '@/components/ui/print-button';

// Componente Button customizado do Shadcn UI para botões estilizados de ações e gatilhos
import { Button } from '@/components/ui/button';

// Componente Input customizado do Shadcn UI para capturar a entrada de dados textuais de forma padronizada
import { Input } from '@/components/ui/input';

// Componentes de Seleção (Dropdown) do Shadcn UI para caixas de seleção estilizadas de opções
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Componentes do Dialog (Modal) do Shadcn UI para caixas de diálogo sobrepostas e formulários modais de cadastro
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

// Ícones vetoriais da biblioteca lucide-react para enriquecimento visual do cabeçalho e botões
import {
    LayoutTemplate,
    ExternalLink,
    Plus,
    Save,
    Trash2,
    Download,
    LayoutDashboard,
    Table,
    TableProperties,
    ClipboardList,
    FileCode,
    KanbanSquare,
    LayoutGrid,
    Grid2X2,
    Grid3X3,
    PanelLeft,
    Layers,
    Columns2,
    Radar,
    FileText,
    UserPlus,
    LogIn,
    Layers3,
    SlidersHorizontal,
    Braces,
} from 'lucide-react';

export default function TemplateMenu({ children }) {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const docsGlob = import.meta.glob('../../../../../docs/*.md', { query: '?raw' });
    const docsItems = Object.keys(docsGlob).map((path) => {
        const fileName = path.split('/').pop();
        const name = fileName.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return {
            to: `/templates/docs?file=${fileName}`,
            label: name,
            icon: FileText
        };
    });

    const navItems = [
        { to: '/templates', label: 'Visão Geral', end: true },
        {
            label: 'Design UI UX',
            items: [
                { to: '/templates/design', label: 'Ícones (Icons)', end: true },
                { to: '/templates/design/headers', label: 'Cabeçalhos (Headers)' },
                { to: '/templates/design/typography', label: 'Tipografia & Cards' },
                { to: '/templates/design/navigation', label: 'Navegação & Menus' },
                { to: '/templates/design/buttons', label: 'Botões & Ações' },
                { to: '/templates/design/interactive', label: 'Componentes Interativos' },
            ]
        },
        {
            label: 'Templates',
            items: [
                { to: '/templates/blank',     label: 'Template em Branco', icon: FileCode },
                {
                    label: 'Dashboards',
                    icon: LayoutDashboard,
                    items: [
                        { to: '/templates/dashboard', label: 'Dashboard Clássico',     icon: LayoutDashboard },
                        { to: '/templates/charts',    label: 'Gráficos & Radar Chart', icon: Radar },
                    ]
                },
                { to: '/templates/kanban',    label: 'Kanban Board',       icon: KanbanSquare },
                {
                    label: 'Tabelas',
                    icon: Table,
                    items: [
                        { to: '/templates/tables',        label: 'Tabela 1: Gestão de Frotas',   icon: Table },
                        { to: '/templates/tables-resumo', label: 'Tabela 2: Resumo de Chamados', icon: TableProperties },
                    ]
                },
                {
                    label: 'Formulários',
                    icon: ClipboardList,
                    items: [
                        { to: '/templates/forms',          label: 'Visão Geral',            icon: ClipboardList, end: true },
                        { to: '/templates/forms/cadastro', label: 'Cadastro Completo',       icon: UserPlus },
                        { to: '/templates/forms/auth',     label: 'Login & Autenticação',    icon: LogIn },
                        { to: '/templates/forms/wizard',   label: 'Wizard (Passo a Passo)', icon: Layers3 },
                        { to: '/templates/forms/filtros',  label: 'Filtros & Busca',         icon: SlidersHorizontal },
                        { to: '/templates/forms/avancado', label: 'Componentes Avançados',   icon: Braces },
                    ]
                },
                { separator: true },
                {
                    label: 'Grid',
                    icon: LayoutGrid,
                    items: [
                        { to: '/templates/grid-2',          label: 'Grid 2 Colunas',   icon: Grid2X2 },
                        { to: '/templates/grid-3',          label: 'Grid 3 Colunas',   icon: Grid3X3 },
                        { to: '/templates/grid-4',          label: 'Grid 4 Colunas',   icon: LayoutGrid },
                        { to: '/templates/grid-asymmetric', label: 'Grid Assimétrico', icon: PanelLeft },
                        { to: '/templates/grid-masonry',    label: 'Grid Masonry',     icon: Layers },
                        { to: '/templates/grid-split',      label: 'Split Layout',     icon: Columns2 },
                    ]
                },
            ]
        },
        { 
            label: 'Docs',
            items: docsItems
        },
    ];

    return (
        <ModuleHeader
            title="Template"
            description="Diretrizes, componentes padronizados e exemplos práticos de interface usando a biblioteca shadcn/ui."
            icon={LayoutTemplate}
            navItems={navItems}
        >
            {children !== undefined ? children : (
                <div className="flex items-center gap-2">
                    <ExpandableSearch />
                    <PrintButton compact />
                </div>
            )}
        </ModuleHeader>
    );
}
