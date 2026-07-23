import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import PageHeader from '@/components/PageHeader';
import ModuleHeader from '@/components/ModuleHeader';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ActionButton from '@/components/ui/action-button';
import { LayoutTemplate, Users, Plus } from 'lucide-react';

export default function TemplateDesignHeaders() {
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
                </div>
            </div>
        </Layout>
    );
}
