import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LayoutTemplate, ChevronDown } from 'lucide-react';
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

export default function TemplateDesign() {
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
                                Use este padrão para o título principal no topo de cada página. Ele agrupa o título da página (com um ícone opcional à esquerda) e uma descrição curta de apoio.
                            </p>
                            
                            <div className="bg-muted p-4 rounded-xl border border-border space-y-2">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="space-y-4 border border-border/60 p-4 rounded-lg bg-card">
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2.5">
                                            <LayoutTemplate className="h-6 w-6 text-muted-foreground shrink-0" />
                                            <h2 className="text-2xl font-bold tracking-tight text-foreground">Título da Página</h2>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Descrição ou subtítulo de apoio da página.</p>
                                    </div>
                                    <hr className="border-border" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Estrutura JSX:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`// Importe o ícone desejado da biblioteca lucide-react, por exemplo:
// import { LayoutTemplate } from 'lucide-react';

<div className="space-y-4">
  <div className="space-y-0.5">
    <div className="flex items-center gap-2.5">
      <LayoutTemplate className="h-6 w-6 text-muted-foreground shrink-0" />
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Título da Página
      </h2>
    </div>
    <p className="text-sm text-muted-foreground">
      Descrição ou subtítulo de apoio da página.
    </p>
  </div>
  <hr className="border-border" />
</div>`}
                                </pre>
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
                                                        <MenubarItem className="cursor-pointer">Buscar na Web</MenubarItem>
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
          <MenubarItem>Buscar na Web</MenubarItem>
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
                </div>
            </div>
        </Layout>
    );
}
