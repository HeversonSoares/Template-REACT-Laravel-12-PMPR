import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import PageHeader from '@/components/PageHeader';
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ActionButton from '@/components/ui/action-button';
import { LayoutTemplate, ChevronDown, Users, FileText, Plus, Trash2, Settings, Download, Save, RefreshCw, Filter, Eye, Pencil } from 'lucide-react';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
} from '@/components/ui/menubar';
import { SwitchAlert } from '@/components/SwitchAlert';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

export default function TemplateDesign() {
    const [alertState, setAlertState] = useState({
        open: false,
        type: 'info',
        title: '',
        message: ''
    });

    const showAlert = (type, title, message) => {
        setAlertState({ open: true, type, title, message });
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Standard Header Documentation */}
                    <Card className="p-6 space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Cabeçalho de Página (Page Header)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Use este componente padrão reutilizável no topo de cada página para manter a consistência visual. Ele renderiza o título com um ícone opcional à esquerda, suporte a descrição/subtítulo e blocos de ações à direita.
                            </p>

                            <div className="bg-muted p-4 rounded-xl border border-border space-y-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="border border-border/60 p-4 rounded-lg bg-card">
                                    <PageHeader
                                        title="Título da Página"
                                        description="Descrição ou subtítulo de apoio da página."
                                        icon={LayoutTemplate}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Uso do Componente:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import PageHeader from '@/components/PageHeader';
import { LayoutTemplate } from 'lucide-react';

<PageHeader 
  title="Título da Página" 
  description="Subtítulo de apoio da página." 
  icon={LayoutTemplate} 
/>

// Com ações (botões) à direita:
<PageHeader title="Título" icon={LayoutTemplate}>
  <ActionButton icon={Plus} label="Nova Ação" variant="default" compact />
</PageHeader>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* PageHeader Variantes e Tabela de Props */}
                    <Card className="p-6 space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Variantes do Page Header</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">PageHeader</code> aceita as props <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">badge</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">size</code> e <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">separator</code> para cobrir todos os cenários de uso.
                            </p>

                            {/* Tabela de Props */}
                            <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-muted/60 border-b border-border">
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Prop</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Tipo</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Padrão</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        <tr><td className="px-3 py-2 font-mono text-primary">title</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Título principal (obrigatório)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">description</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Subtítulo/texto de apoio</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">icon</td><td className="px-3 py-2 text-muted-foreground">LucideIcon</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Ícone exibido à esquerda do título</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">badge</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Badge colorida ao lado do título</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">size</td><td className="px-3 py-2 text-muted-foreground">"default" | "sm"</td><td className="px-3 py-2 text-muted-foreground">"default"</td><td className="px-3 py-2 text-muted-foreground">"sm" para sub-seções internas</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">separator</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Adiciona &lt;hr&gt; abaixo do cabeçalho</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">children</td><td className="px-3 py-2 text-muted-foreground">ReactNode</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Ações/botões renderizados à direita</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">className</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Classes CSS extras no container</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Exemplos visuais das variantes */}
                            <div className="bg-muted p-4 rounded-xl border border-border space-y-4">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplos Visuais:</span>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">Com Badge:</span>
                                    <div className="border border-border/60 p-4 rounded-lg bg-card">
                                        <PageHeader
                                            title="Módulo Efetivo"
                                            description="Gerenciamento de pessoal."
                                            icon={LayoutTemplate}
                                            badge="Beta"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">Size "sm" (sub-seção):</span>
                                    <div className="border border-border/60 p-4 rounded-lg bg-card">
                                        <PageHeader
                                            title="Filtros de Pesquisa"
                                            icon={LayoutTemplate}
                                            size="sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground font-medium">Com Separator:</span>
                                    <div className="border border-border/60 p-4 rounded-lg bg-card">
                                        <PageHeader
                                            title="Relatórios"
                                            description="Exportação e análise."
                                            icon={LayoutTemplate}
                                            separator
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Exemplos de Uso:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`// Com badge e separator
<PageHeader
  title="Módulo Efetivo"
  description="Gerenciamento de pessoal."
  icon={Users}
  badge="Beta"
  separator
>
  <Button>Sincronizar</Button>
</PageHeader>

// Versão compacta para sub-seções
<PageHeader
  title="Filtros de Pesquisa"
  size="sm"
/>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ModuleHeader Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Cabeçalho de Módulo (Module Header)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Use <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">ModuleHeader</code> no arquivo <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">*Menu.jsx</code> de cada módulo.
                                Ele encapsula <strong>PageHeader + separador + ModuleNavigation</strong> em um único componente, eliminando a repetição de estrutura e garantindo consistência visual em todo o sistema.
                            </p>

                            {/* Tabela de Props */}
                            <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-muted/60 border-b border-border">
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Prop</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Tipo</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Padrão</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        <tr><td className="px-3 py-2 font-mono text-primary">title</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Título do módulo (obrigatório)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">description</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Subtítulo de apoio</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">icon</td><td className="px-3 py-2 text-muted-foreground">LucideIcon</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Ícone exibido ao lado do título</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">badge</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Badge colorida ao lado do título</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">navItems</td><td className="px-3 py-2 text-muted-foreground">Array</td><td className="px-3 py-2 text-muted-foreground">[]</td><td className="px-3 py-2 text-muted-foreground">Itens de navegação do módulo (links e dropdowns)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">children</td><td className="px-3 py-2 text-muted-foreground">ReactNode</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Ações/botões à direita do cabeçalho</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">className</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Classes CSS extras no container</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="bg-muted p-4 rounded-xl border border-border space-y-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="border border-border/60 p-4 rounded-lg bg-card">
                                    <ModuleHeader
                                        title="Módulo Exemplo"
                                        description="Descrição do módulo para contextualizar os usuários."
                                        icon={Users}
                                        badge="Novo"
                                        navItems={[
                                            { to: '/templates/design', label: 'Visão Geral', end: true },
                                            { to: '/templates/forms', label: 'Formulários' },
                                            {
                                                label: 'Relatórios',
                                                items: [
                                                    { to: '/templates/tables', label: 'Tabelas' },
                                                    { to: '/templates/dashboard', label: 'Dashboard' },
                                                ]
                                            }
                                        ]}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Exemplo de código do ModuleHeader */}
                                <div className="space-y-1.5">
                                    <span className="text-xs font-semibold text-foreground">Como criar o arquivo MeuModuloMenu.jsx:</span>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import ModuleHeader from '@/components/ModuleHeader';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MeuModuloMenu() {
  const navItems = [
    { to: '/meu-modulo', label: 'Visão Geral', end: true },
    { to: '/meu-modulo/historico', label: 'Histórico' },
    {
      label: 'Relatórios',        // Grupo dropdown
      items: [
        { to: '/meu-modulo/exportar', label: 'Exportar' },
        { to: '/meu-modulo/graficos', label: 'Gráficos' },
      ]
    }
  ];

  return (
    <ModuleHeader
      title="Meu Módulo"
      description="Descrição do módulo."
      icon={Users}
      badge="Novo"
      navItems={navItems}
    >
      {/* Botões de ação à direita (modo compacto): */}
      <ActionButton icon={Plus} label="Nova Ação" variant="default" compact />
    </ModuleHeader>
  );
}`}
                                    </pre>
                                </div>

                                {/* Como usar o MeuModuloMenu em uma página */}
                                <div className="space-y-1.5">
                                    <span className="text-xs font-semibold text-foreground">Como usar nas páginas do módulo:</span>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`// Em cada página do módulo (ex: MeuModuloIndex.jsx):
import Layout from '@/components/Layout';
import MeuModuloMenu from '../components/MeuModuloMenu';

export default function MeuModuloIndex() {
  return (
    <Layout>
      <div className="p-6 space-y-6 w-full">

        {/* 1. Cabeçalho completo do módulo */}
        <MeuModuloMenu />

        {/* 2. Conteúdo da página */}
        <div className="grid gap-4">
          ...
        </div>

      </div>
    </Layout>
  );
}`}
                                    </pre>

                                    <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
                                        <strong>Padrão do projeto:</strong> todas as páginas de um módulo compartilham o mesmo <code className="font-mono">*Menu.jsx</code> no topo. Ele concentra o cabeçalho e a navegação em um único lugar — fácil de manter.
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Standard Card Titles */}
                    <Card className="p-6 space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Títulos de Seção / Cards</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Para títulos dentro de Cards, tabelas e seções secundárias da página, use o componente CardTitle configurado para text-lg.
                            </p>

                            <div className="bg-muted p-4 rounded-xl border border-border space-y-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="border border-border/60 p-4 rounded-lg bg-card">
                                    <CardTitle className="text-lg font-semibold">Filtros de Pesquisa</CardTitle>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Estrutura JSX:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<CardHeader>
  <CardTitle className="text-lg font-semibold">
    Filtros de Pesquisa
  </CardTitle>
</CardHeader>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navigation Submenu / Tabs Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Submenus / Abas de Navegação do Módulo</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Para navegar entre views ou seções de um mesmo módulo de forma extremamente simples e limpa, utilize o componente reutilizável <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">ModuleNavigation</code>. Toda a lógica de classes ativas e estrutura do Shadcn/UI já vem embutida de forma nativa.
                            </p>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Estrutura JSX Recomendada:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import ModuleNavigation from '@/components/ModuleNavigation';

// 1. Defina as abas de navegação do seu módulo (suporta links diretos e submenus dropdown):
const menuItems = [
    { to: '/meu-modulo', label: 'Visão Geral', end: true },
    { to: '/meu-modulo/historico', label: 'Histórico' },
    {
        label: 'Mais Opções',
        items: [
            { to: '/meu-modulo/relatorios', label: 'Relatórios' },
            { to: '/meu-modulo/exportar', label: 'Exportar Dados' }
        ]
    }
];

// 2. No JSX do componente de Menu:
<ModuleNavigation items={menuItems} />`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Menubar Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Menu dos Módulos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Para criar menus horizontais completos com suporte a submenus complexos, divisores e atalhos de teclado (estilo barra de tarefas de aplicativos desktop), utilize o componente de referência <a href="https://ui.shadcn.com/docs/components/menubar" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary/80">Menubar</a> do Shadcn UI.
                            </p>

                            <div className="bg-muted p-4 rounded-xl border border-border space-y-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="border border-border/60 p-4 rounded-lg bg-card flex items-center">
                                    <Menubar className="border-none bg-transparent shadow-none">
                                        <MenubarMenu>
                                            <MenubarTrigger className="cursor-pointer flex items-center gap-1">
                                                Arquivo <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem className="cursor-pointer">
                                                    Novo Arquivo <MenubarShortcut>⌘N</MenubarShortcut>
                                                </MenubarItem>
                                                <MenubarItem className="cursor-pointer">
                                                    Abrir... <MenubarShortcut>⌘O</MenubarShortcut>
                                                </MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem className="cursor-pointer">
                                                    Fechar
                                                </MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                        <MenubarMenu>
                                            <MenubarTrigger className="cursor-pointer flex items-center gap-1">
                                                Editar <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem className="cursor-pointer">
                                                    Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
                                                </MenubarItem>
                                                <MenubarItem className="cursor-pointer">
                                                    Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                                                </MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarSub>
                                                    <MenubarSubTrigger className="cursor-pointer flex items-center gap-1">
                                                        Buscar
                                                    </MenubarSubTrigger>
                                                    <MenubarSubContent>
                                                        <MenubarItem className="cursor-pointer bg-primary/10 text-primary font-bold">Buscar na Web (Ativo)</MenubarItem>
                                                        <MenubarSeparator />
                                                        <MenubarItem className="cursor-pointer">Buscar...</MenubarItem>
                                                        <MenubarItem className="cursor-pointer">Buscar Próximo</MenubarItem>
                                                        <MenubarItem className="cursor-pointer">Buscar Anterior</MenubarItem>
                                                    </MenubarSubContent>
                                                </MenubarSub>
                                                <MenubarSeparator />
                                                <MenubarItem className="cursor-pointer">Recortar</MenubarItem>
                                                <MenubarItem className="cursor-pointer">Copiar</MenubarItem>
                                                <MenubarItem className="cursor-pointer">Colar</MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                        <MenubarMenu>
                                            <MenubarTrigger className="cursor-pointer flex items-center gap-1">
                                                Links Úteis <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                            </MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem className="cursor-pointer" onClick={() => window.open('https://ui.shadcn.com/', '_blank')}>
                                                    1. Documentação Shadcn UI
                                                </MenubarItem>
                                                <MenubarItem className="cursor-pointer" onClick={() => window.open('https://tailwindcss.com/', '_blank')}>
                                                    2. Tailwind CSS
                                                </MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem className="text-xs text-muted-foreground font-mono">
                                                    Variáveis: resources/css/app.css
                                                </MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Estrutura JSX:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@/components/ui/menubar';
import { ChevronDown } from 'lucide-react';

// Nota: As variáveis globais de cores e tema do Tailwind/Shadcn estão em resources/css/app.css

// No JSX:
<Menubar className="border-none bg-transparent shadow-none">
  <MenubarMenu>
    <MenubarTrigger className="flex items-center gap-1">
      Arquivo <ChevronDown className="h-3 w-3 text-muted-foreground" />
    </MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        Novo Arquivo <MenubarShortcut>⌘N</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>
        Abrir... <MenubarShortcut>⌘O</MenubarShortcut>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Fechar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>

  <MenubarMenu>
    <MenubarTrigger className="flex items-center gap-1">
      Editar <ChevronDown className="h-3 w-3 text-muted-foreground" />
    </MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Desfazer <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
      <MenubarItem>Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarSub>
        <MenubarSubTrigger>Buscar</MenubarSubTrigger>
        <MenubarSubContent>
          <MenubarItem className="bg-primary/10 text-primary font-bold">
            Buscar na Web (Ativo)
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Buscar...</MenubarItem>
          <MenubarItem>Buscar Próximo</MenubarItem>
          <MenubarItem>Buscar Anterior</MenubarItem>
        </MenubarSubContent>
      </MenubarSub>
      <MenubarSeparator />
      <MenubarItem>Recortar</MenubarItem>
      <MenubarItem>Copiar</MenubarItem>
      <MenubarItem>Colar</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subtitles & Alerts */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Outros Elementos Tipográficos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-foreground">Subtítulo de Seção Menor (h3)</h3>
                                    <div className="border border-border/60 p-4 rounded-lg bg-card">
                                        <h3 className="text-base font-semibold text-foreground">Título da Seção</h3>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<h3 className="text-base font-semibold text-foreground">
  Título da Seção
</h3>`}
                                    </pre>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-foreground">Texto Mutado / Legendas (p)</h3>
                                    <div className="border border-border/60 p-4 rounded-lg bg-card">
                                        <p className="text-[11px] text-muted-foreground">Mensagem informativa menor.</p>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<p className="text-[11px] text-muted-foreground">
  Mensagem informativa menor.
</p>`}
                                    </pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Botões ──────────────────────────────────── */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Botões (Button)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            <p className="text-muted-foreground text-sm">
                                O componente <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">Button</code> é o padrão de ação em todas as views.
                                Ele suporta múltiplas <strong>variantes</strong> de estilo e <strong>tamanhos</strong>, além de aceitar ícones do Lucide React.
                                Importe sempre de <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">@/components/ui/button</code>.
                            </p>

                            {/* Tabela de Props */}
                            <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-muted/60 border-b border-border">
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Prop</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Tipo</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Padrão</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        <tr><td className="px-3 py-2 font-mono text-primary">variant</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">"default"</td><td className="px-3 py-2 text-muted-foreground">Estilo visual: default · destructive · outline · secondary · ghost · link</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">size</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">"default"</td><td className="px-3 py-2 text-muted-foreground">Tamanho: default · sm · lg · icon</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">asChild</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Renderiza como filho (ex: Link do React Router)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">disabled</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Desabilita o botão (opacidade + sem clique)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">onClick</td><td className="px-3 py-2 text-muted-foreground">function</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Handler de clique</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">className</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Classes CSS extras</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">children</td><td className="px-3 py-2 text-muted-foreground">ReactNode</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Conteúdo do botão (texto, ícone, ou ambos)</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Variantes Visuais */}
                                <div className="space-y-3">
                                    <span className="text-xs font-semibold text-foreground">Variantes de Estilo:</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border space-y-3">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            <Button variant="default">Default</Button>
                                            <Button variant="secondary">Secondary</Button>
                                            <Button variant="outline">Outline</Button>
                                            <Button variant="destructive">Destructive</Button>
                                            <Button variant="ghost">Ghost</Button>
                                            <Button variant="link">Link</Button>
                                        </div>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { Button } from '@/components/ui/button';

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}
                                    </pre>
                                </div>

                                {/* Tamanhos */}
                                <div className="space-y-3">
                                    <span className="text-xs font-semibold text-foreground">Tamanhos:</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border space-y-3">
                                        <div className="flex flex-wrap gap-2 items-center">
                                            <Button size="lg">Large</Button>
                                            <Button size="default">Default</Button>
                                            <Button size="sm">Small</Button>
                                            <Button size="icon"><Settings /></Button>
                                        </div>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<Button size="lg">Large</Button>
<Button size="default">Default</Button>
<Button size="sm">Small</Button>

{/* Botão somente ícone: */}
<Button size="icon">
  <Settings />
</Button>`}
                                    </pre>
                                </div>
                            </div>

                            {/* Botões com Ícones */}
                            <div className="space-y-3">
                                <span className="text-xs font-semibold text-foreground">Botões com Ícones (padrão recomendado para ações):</span>
                                <div className="bg-muted p-4 rounded-xl border border-border">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        <Button><Plus /> Nova Ação</Button>
                                        <Button variant="outline"><Download /> Exportar</Button>
                                        <Button variant="secondary"><Settings /> Configurações</Button>
                                        <Button variant="destructive"><Trash2 /> Excluir</Button>
                                        <Button variant="ghost" size="icon"><Settings /></Button>
                                        <Button disabled><Plus /> Desabilitado</Button>
                                    </div>
                                </div>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { Button } from '@/components/ui/button';
import { Plus, Download, Settings, Trash2 } from 'lucide-react';

{/* Ação principal da view — sempre "default" */}
<Button><Plus /> Nova Ação</Button>

{/* Ações secundárias */}
<Button variant="outline"><Download /> Exportar</Button>
<Button variant="secondary"><Settings /> Configurações</Button>

{/* Ação destrutiva — exclusões e confirmações críticas */}
<Button variant="destructive"><Trash2 /> Excluir</Button>

{/* Ícone isolado — para barras de ferramentas e tabelas */}
<Button variant="ghost" size="icon"><Settings /></Button>

{/* Desabilitado — quando a ação não está disponível */}
<Button disabled><Plus /> Desabilitado</Button>`}
                                </pre>
                            </div>

                            {/* Como usar nas views */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Como usar no PageHeader (ação principal da view):</span>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { Plus, Users } from 'lucide-react';

<PageHeader
  title="Usuários"
  description="Gestão de usuários do sistema."
  icon={Users}
>
  {/* Botão principal da view — fica à direita do header */}
  <Button>
    <Plus /> Novo Usuário
  </Button>
</PageHeader>`}
                                    </pre>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Múltiplos botões no header (mais de uma ação):</span>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import { Plus, Download, Users } from 'lucide-react';

<PageHeader title="Relatórios" icon={Users}>
  {/* Agrupe em um div com gap para múltiplos botões */}
  <div className="flex gap-2">
    <Button variant="outline">
      <Download /> Exportar
    </Button>
    <Button>
      <Plus /> Novo Relatório
    </Button>
  </div>
</PageHeader>`}
                                    </pre>
                                </div>
                            </div>

                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
                                <strong>Padrão do projeto:</strong> use sempre <code className="font-mono">variant="default"</code> para a ação principal da view (criar, salvar),{' '}
                                <code className="font-mono">variant="outline"</code> para ações secundárias (exportar, filtrar) e{' '}
                                <code className="font-mono">variant="destructive"</code> exclusivamente para exclusões e ações irreversíveis.
                                Ícones devem ser importados do <code className="font-mono">lucide-react</code>.
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── Padrão de Cores por Intenção ───────────────── */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Padrão de Cores por Intenção</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Cada tipo de ação tem uma cor semântica definida. Seguir esse padrão garante que o usuário entenda imediatamente a natureza de cada botão.
                            </p>

                            {/* Tabela semântica */}
                            <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-muted/60 border-b border-border">
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Intenção</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Variant</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Cor</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Exemplos de Uso</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        <tr>
                                            <td className="px-3 py-2 font-medium text-foreground">Ação Principal</td>
                                            <td className="px-3 py-2 font-mono text-primary">default</td>
                                            <td className="px-3 py-2"><span className="inline-block px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-semibold">Azul/Brand</span></td>
                                            <td className="px-3 py-2 text-muted-foreground">Criar novo registro, abrir formulário</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 font-medium text-foreground">Salvar / Confirmar</td>
                                            <td className="px-3 py-2 font-mono text-primary">success</td>
                                            <td className="px-3 py-2"><span className="inline-block px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-semibold">Verde</span></td>
                                            <td className="px-3 py-2 text-muted-foreground">Salvar formulário, confirmar ação, sincronizar</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 font-medium text-foreground">Excluir / Irreversível</td>
                                            <td className="px-3 py-2 font-mono text-primary">destructive</td>
                                            <td className="px-3 py-2"><span className="inline-block px-2 py-0.5 rounded bg-destructive text-destructive-foreground text-[10px] font-semibold">Vermelho</span></td>
                                            <td className="px-3 py-2 text-muted-foreground">Excluir registro, apagar dados, ação irreversível</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 font-medium text-foreground">Ação Secundária</td>
                                            <td className="px-3 py-2 font-mono text-primary">outline</td>
                                            <td className="px-3 py-2"><span className="inline-block px-2 py-0.5 rounded border border-input bg-background text-foreground text-[10px] font-semibold">Neutro</span></td>
                                            <td className="px-3 py-2 text-muted-foreground">Exportar, filtrar, cancelar, voltar, links externos</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 font-medium text-foreground">Ação Contextual</td>
                                            <td className="px-3 py-2 font-mono text-primary">secondary</td>
                                            <td className="px-3 py-2"><span className="inline-block px-2 py-0.5 rounded bg-secondary text-secondary-foreground text-[10px] font-semibold">Cinza</span></td>
                                            <td className="px-3 py-2 text-muted-foreground">Configurações, alternativas, sem hierarquia clara</td>
                                        </tr>
                                        <tr>
                                            <td className="px-3 py-2 font-medium text-foreground">Ícone Isolado</td>
                                            <td className="px-3 py-2 font-mono text-primary">ghost size="icon"</td>
                                            <td className="px-3 py-2"><span className="inline-block px-2 py-0.5 rounded text-foreground text-[10px] font-semibold bg-accent">Transparente</span></td>
                                            <td className="px-3 py-2 text-muted-foreground">Tabelas (ver, editar), barras de ferramentas</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Exemplos visuais */}
                            <div className="bg-muted p-4 rounded-xl border border-border space-y-3">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplos Visuais:</span>
                                <div className="flex flex-wrap gap-3 items-end">
                                    <ActionButton icon={Plus} label="Novo Registro" variant="default" />
                                    <ActionButton icon={Save} label="Salvar" variant="success" />
                                    <ActionButton icon={Trash2} label="Excluir" variant="destructive" />
                                    <ActionButton icon={Download} label="Exportar" variant="outline" />
                                    <ActionButton icon={Settings} label="Configurações" variant="secondary" />
                                    <div className="flex flex-col items-center gap-0.5">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                                        <span className="text-[10px] text-muted-foreground font-medium leading-none">Ver</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                                        <span className="text-[10px] text-muted-foreground font-medium leading-none">Editar</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-0.5">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                                        <span className="text-[10px] text-muted-foreground font-medium leading-none">Excluir</span>
                                    </div>
                                </div>
                            </div>

                            <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import ActionButton from '@/components/ui/action-button';
import { Plus, Save, Trash2, Download, Settings } from 'lucide-react';

{/* ✅ Criar/Abrir — ação principal da view */}
<ActionButton icon={Plus} label="Novo Registro" variant="default" />

{/* ✅ Salvar/Confirmar/Sincronizar — sempre verde */}
<ActionButton icon={Save} label="Salvar" variant="success" />

{/* ✅ Excluir/Apagar — sempre vermelho */}
<ActionButton icon={Trash2} label="Excluir" variant="destructive" />

{/* ✅ Ações secundárias — outline */}
<ActionButton icon={Download} label="Exportar" variant="outline" />

{/* ✅ Ícone isolado em tabelas (ghost) */}
<Button variant="ghost" size="icon"><Eye /></Button>
<Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><Trash2 /></Button>`}
                            </pre>
                        </CardContent>
                    </Card>

                    {/* ── ActionButton ─────────────────────────────── */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">ActionButton — Botão Responsivo Padronizado</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">ActionButton</code> é o componente padrão para botões de ação nos <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">*Menu.jsx</code> e em telas onde o espaço pode ser limitado.
                                Garante que o ícone fique sempre à esquerda do label, e colapsa automaticamente para ícone + label abaixo quando o espaço não permite texto.
                            </p>

                            {/* Tabela de Props */}
                            <div className="overflow-x-auto rounded-lg border border-border">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-muted/60 border-b border-border">
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Prop</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Tipo</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Padrão</th>
                                            <th className="text-left px-3 py-2 font-semibold text-foreground">Descrição</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        <tr><td className="px-3 py-2 font-mono text-primary">icon</td><td className="px-3 py-2 text-muted-foreground">LucideIcon</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Ícone exibido sempre à esquerda do label</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">label</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Texto do botão (obrigatório)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">variant</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">"default"</td><td className="px-3 py-2 text-muted-foreground">Variante visual: default · success · destructive · outline · secondary · ghost</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">size</td><td className="px-3 py-2 text-muted-foreground">string</td><td className="px-3 py-2 text-muted-foreground">"sm"</td><td className="px-3 py-2 text-muted-foreground">Tamanho: default · sm · lg</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">responsive</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Colapsa automaticamente para ícone + label abaixo em telas {'<'} md</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">compact</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Força modo compacto (ícone + label abaixo) independente do tamanho da tela</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">disabled</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Desabilita o botão</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">onClick</td><td className="px-3 py-2 text-muted-foreground">function</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Handler de clique</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Normal */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Normal (padrão):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-2">
                                        <ActionButton icon={Plus} label="Novo" variant="default" />
                                        <ActionButton icon={Save} label="Salvar" variant="success" />
                                        <ActionButton icon={Download} label="Exportar" variant="outline" />
                                    </div>
                                </div>

                                {/* Compacto */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Compacto (<code className="font-mono">compact</code>):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-4 items-end">
                                        <ActionButton icon={Plus} label="Novo" variant="default" compact />
                                        <ActionButton icon={Save} label="Salvar" variant="success" compact />
                                        <ActionButton icon={Trash2} label="Excluir" variant="destructive" compact />
                                        <ActionButton icon={Download} label="Exportar" variant="outline" compact />
                                    </div>
                                </div>

                                {/* Responsivo */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Responsivo (<code className="font-mono">responsive</code>):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border">
                                        <p className="text-xs text-muted-foreground mb-2">Em telas {'≥'} md: ícone + label. Em telas {'<'} md: ícone + label abaixo.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <ActionButton icon={RefreshCw} label="Sincronizar" variant="success" responsive />
                                            <ActionButton icon={Filter} label="Filtrar" variant="outline" responsive />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import ActionButton from '@/components/ui/action-button';
import { Plus, Save, Trash2, RefreshCw } from 'lucide-react';

{/* Modo normal — ícone à esquerda, label à direita */}
<ActionButton icon={Plus} label="Novo Registro" variant="default" />

{/* Modo compacto — ícone + label abaixo (para espaços restritos) */}
<ActionButton icon={Save} label="Salvar" variant="success" compact />

{/* Modo responsivo — normal em md+, compacto em telas menores */}
<ActionButton icon={RefreshCw} label="Sincronizar" variant="success" responsive />

{/* No *Menu.jsx — use sempre compact para os botões do cabeçalho */}
<ModuleHeader title="Meu Módulo" icon={Users} navItems={navItems}>
  <ActionButton icon={Plus} label="Novo" variant="default" compact />
  <ActionButton icon={Download} label="Exportar" variant="outline" compact />
</ModuleHeader>`}
                            </pre>

                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
                                <strong>Padrão do projeto:</strong> use <code className="font-mono">ActionButton</code> com o modo <code className="font-mono">compact</code> nos <code className="font-mono">*Menu.jsx</code>.
                                Esse formato compacto (ícone + texto menor abaixo) é o padrão visual estabelecido para os cabeçalhos de módulo.
                                O ícone deve ser sempre a prop (<code className="font-mono">icon</code>) — nunca adicione o ícone dentro de <code className="font-mono">children</code> manualmente.
                            </div>
                        </CardContent>
                    </Card>

                    {/* SwitchAlert Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Alertas (SwitchAlert)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Para exibir feedback ou confirmações visuais, utilize o componente <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">SwitchAlert</code> (estilo SweetAlert).
                            </p>

                            <div className="bg-muted p-4 rounded-xl border border-border space-y-4">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Demonstração Interativa:</span>
                                <div className="flex flex-wrap gap-4">
                                    <Button 
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => showAlert('success', 'Tudo certo!', 'O registro foi salvo com sucesso.')}
                                    >
                                        Alerta de Sucesso
                                    </Button>

                                    <Button 
                                        variant="destructive"
                                        onClick={() => showAlert('error', 'Ops, ocorreu um erro', 'Não foi possível conectar ao servidor.')}
                                    >
                                        Alerta de Erro
                                    </Button>

                                    <Button 
                                        variant="outline" 
                                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                        onClick={() => showAlert('confirm', 'Tem certeza?', 'Essa ação não poderá ser desfeita.')}
                                    >
                                        Alerta de Confirmação
                                    </Button>

                                    <Button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => showAlert('info', 'Aviso', 'O sistema passará por manutenção.')}
                                    >
                                        Alerta de Informação
                                    </Button>
                                </div>
                            </div>
                            
                            <SwitchAlert
                                open={alertState.open}
                                onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}
                                type={alertState.type}
                                title={alertState.title}
                                message={alertState.message}
                                onConfirm={() => setAlertState(prev => ({ ...prev, open: false }))}
                            />

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Como usar no seu componente:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { SwitchAlert } from '@/components/SwitchAlert';
import { useState } from 'react';

export default function MeuComponente() {
  const [alertState, setAlertState] = useState({ open: false, type: 'info', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlertState({ open: true, type, title, message });
  };

  return (
    <>
      <Button onClick={() => showAlert('success', 'Sucesso!', 'Ação executada com sucesso.')}>
        Mostrar Alerta
      </Button>

      <SwitchAlert
        open={alertState.open}
        onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onConfirm={() => setAlertState(prev => ({ ...prev, open: false }))}
      />
    </>
  );
}`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tooltip Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Balão Informativo (Tooltip)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O componente <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">Tooltip</code> exibe uma mensagem informativa quando o usuário passa o mouse ou foca em um elemento. Utilize a prop <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">side</code> para definir a posição do balão (<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">top</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">right</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">bottom</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">left</code>).
                            </p>

                            <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">Posicionamento (Side)</h4>
                                    <p className="text-xs text-muted-foreground">Use a prop <code className="font-mono text-primary">side</code> para alterar a posição do tooltip.</p>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-3 py-6 bg-card rounded-lg border border-border/60">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Left</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Top</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Bottom</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Right</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Estrutura de Código:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
