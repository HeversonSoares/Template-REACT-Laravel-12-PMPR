import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';
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

export default function TemplateDesignNavigation() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid gap-6 md:grid-cols-2">
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
                </div>
            </div>
        </Layout>
    );
}
