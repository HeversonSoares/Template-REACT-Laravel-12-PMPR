import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ActionButton from '@/components/ui/action-button';
import PrintButton from '@/components/ui/print-button';
import { Plus, Trash2, Settings, Download, Save, RefreshCw, Filter, Eye, Pencil } from 'lucide-react';

export default function TemplateDesignButtons() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid gap-6 md:grid-cols-2">
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
                        </CardContent>
                    </Card>

                    {/* ── ActionButton ─────────────────────────────── */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">ActionButton — Botão Responsivo Padronizado</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">ActionButton</code> é o componente padrão para botões de ação nos <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">*Menu.jsx</code> e ao lado dos títulos.
                                Por padrão, ele opera em <strong>modo responsivo</strong> (exibindo ícone + label horizontal em telas md+ e colapsando para ícone + label abaixo em telas menores).
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
                                        <tr><td className="px-3 py-2 font-mono text-primary">responsive</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">true</td><td className="px-3 py-2 text-muted-foreground">Colapsa automaticamente para ícone + label abaixo em telas {'<'} md (padrão)</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">compact</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Força modo compacto (ícone + label abaixo) independente do tamanho da tela</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">rounded</td><td className="px-3 py-2 text-muted-foreground">string | boolean</td><td className="px-3 py-2 text-muted-foreground">"md"</td><td className="px-3 py-2 text-muted-foreground">Curvatura das bordas: "none" · "sm" · "md" · "lg" · "xl" · "2xl" · "full"</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">disabled</td><td className="px-3 py-2 text-muted-foreground">boolean</td><td className="px-3 py-2 text-muted-foreground">false</td><td className="px-3 py-2 text-muted-foreground">Desabilita o botão</td></tr>
                                        <tr><td className="px-3 py-2 font-mono text-primary">onClick</td><td className="px-3 py-2 text-muted-foreground">function</td><td className="px-3 py-2 text-muted-foreground">—</td><td className="px-3 py-2 text-muted-foreground">Handler de clique</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                {/* Modo Responsivo */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Responsivo (padrão):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border">
                                        <p className="text-xs text-muted-foreground mb-2">Em telas {'≥'} md: ícone + label. Em telas {'<'} md: ícone + label abaixo.</p>
                                        <div className="flex flex-wrap gap-2">
                                            <ActionButton icon={RefreshCw} label="Sincronizar" variant="success" responsive />
                                            <ActionButton icon={Filter} label="Filtrar" variant="outline" responsive />
                                        </div>
                                    </div>
                                </div>

                                {/* Modo Normal */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Fixo Horizontal (<code className="font-mono">responsive={'{false}'}</code>):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-2">
                                        <ActionButton icon={Plus} label="Novo" variant="default" responsive={false} />
                                        <ActionButton icon={Save} label="Salvar" variant="success" responsive={false} />
                                        <ActionButton icon={Download} label="Exportar" variant="outline" responsive={false} />
                                    </div>
                                </div>

                                {/* Compacto */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Fixo Compacto (<code className="font-mono">compact</code>):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-4 items-end">
                                        <ActionButton icon={Plus} label="Novo" variant="default" compact />
                                        <ActionButton icon={Save} label="Salvar" variant="success" compact />
                                        <ActionButton icon={Trash2} label="Excluir" variant="destructive" compact />
                                        <ActionButton icon={Download} label="Exportar" variant="outline" compact />
                                    </div>
                                </div>

                                {/* Curvatura de Bordas */}
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Bordas Personalizadas (<code className="font-mono">rounded</code>):</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-4 items-end">
                                        <ActionButton icon={Plus} label="md (padrão)" variant="default" compact rounded="md" />
                                        <ActionButton icon={Save} label="lg" variant="success" compact rounded="lg" />
                                        <ActionButton icon={Filter} label="Pílula (full)" variant="outline" compact rounded="full" />
                                    </div>
                                </div>
                            </div>

                            <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import ActionButton from '@/components/ui/action-button';
import { Plus, Save, Trash2, RefreshCw, Filter } from 'lucide-react';

{/* Modo responsivo (padrão) — normal em md+, compacto abaixo de md */}
<ActionButton icon={RefreshCw} label="Sincronizar" variant="success" responsive />

{/* Modo compacto fixo — ícone + label abaixo sempre */}
<ActionButton icon={Save} label="Salvar" variant="success" compact />

{/* Modo horizontal fixo — sempre horizontal em qualquer tela */}
<ActionButton icon={Plus} label="Novo Registro" variant="default" responsive={false} />

{/* Variações de curvatura (rounded="md" | "lg" | "xl" | "2xl" | "full") */}
<ActionButton icon={Filter} label="Filtrar" variant="outline" rounded="full" />

{/* No *Menu.jsx e ao lado dos títulos — use o modo responsivo (padrão do projeto) */}
<ModuleHeader title="Meu Módulo" icon={Users} navItems={navItems}>
  <ActionButton icon={Plus} label="Novo" variant="default" responsive />
  <ActionButton icon={Download} label="Exportar" variant="outline" responsive />
</ModuleHeader>`}
                            </pre>

                            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs text-primary">
                                <strong>Padrão do projeto:</strong> use <code className="font-mono">ActionButton</code> com o modo <code className="font-mono">responsive</code> e bordas suaves (<code className="font-mono">rounded="md"</code>) ao lado dos títulos e nos <code className="font-mono">*Menu.jsx</code>.
                                Esse formato responsivo adapta-se automaticamente à tela (exibindo ícone + texto lado a lado em desktops e colapsando para ícone e texto menor abaixo em dispositivos móveis).
                                O ícone deve ser sempre a prop (<code className="font-mono">icon</code>) — nunca adicione o ícone dentro de <code className="font-mono">children</code> manualmente.
                            </div>
                        </CardContent>
                    </Card>

                    {/* ── PrintButton ─────────────────────────────── */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">PrintButton — Botão de Impressão</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">PrintButton</code> é um wrapper padronizado em cima do <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">ActionButton</code> que já traz o ícone <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">Printer</code>, label padrão e a funcionalidade <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">window.print()</code> pré-configurada.
                            </p>

                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Uso Básico:</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-2">
                                        <PrintButton />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Modo Compacto:</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-4 items-end">
                                        <PrintButton compact />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Label Customizada:</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex flex-wrap gap-2">
                                        <PrintButton label="Imprimir Relatório" variant="default" />
                                    </div>
                                </div>
                            </div>

                            <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import PrintButton from '@/components/ui/print-button';

{/* Padrão (variant="outline", label="Imprimir") */}
<PrintButton />

{/* Modo Compacto (ideal para headers) */}
<PrintButton compact />

{/* Totalmente personalizável (repassa props pro ActionButton) */}
<PrintButton label="Imprimir Tabela" variant="secondary" />
`}
                            </pre>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
