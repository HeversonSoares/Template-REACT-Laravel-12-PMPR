// Core do React para definição de componentes e gerenciamento de estado local (ex: controle de abertura de diálogos)
import React, { useState } from 'react';

// Componente de cabeçalho completo de módulo (PageHeader + hr + ModuleNavigation em um só)
import ModuleHeader from '@/components/ModuleHeader';

// ActionButton — botão de ação padronizado do projeto (ícone à esquerda, com modo compacto/responsivo)
import ActionButton from '@/components/ui/action-button';

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
    CodeXml,
    Radar,
} from 'lucide-react';

export default function TemplateMenu() {
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const navItems = [
        { to: '/templates', label: 'Visão Geral', end: true },
        { to: '/templates/design', label: 'Design UI UX' },
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
                { to: '/templates/forms', label: 'Formulários', icon: ClipboardList },
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
    ];

    return (
        <ModuleHeader
            title="Desenvolvimento"
            description="Diretrizes, componentes padronizados e exemplos práticos de interface usando a biblioteca shadcn/ui."
            icon={CodeXml}
            navItems={navItems}
        >
            <ActionButton
                icon={ExternalLink}
                label="Shadcn Docs"
                variant="outline"
                onClick={() => window.open('https://ui.shadcn.com/', '_blank')}
                compact
            />
            <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                <DialogTrigger asChild>
                    <ActionButton
                        icon={Plus}
                        label="Novo Template"
                        variant="default"
                        compact
                    />
                </DialogTrigger>
                <DialogContent className="bg-background border border-border text-foreground sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground">Adicionar Componente</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Preencha as informações básicas para adicionar um novo componente à lista.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="name" className="text-right text-sm font-medium">Nome</label>
                            <Input id="name" defaultValue="Minha Tabela Personalizada" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="category" className="text-right text-sm font-medium">Categoria</label>
                            <div className="col-span-3">
                                <Select defaultValue="tables">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dashboards">Dashboards</SelectItem>
                                        <SelectItem value="tables">Tabelas</SelectItem>
                                        <SelectItem value="forms">Formulários</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpenDialog(false)}>Cancelar</Button>
                        <Button variant="success" onClick={() => setIsOpenDialog(false)}>Salvar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ModuleHeader>
    );
}
