// =============================================================================
// TEMPLATE GRID — Split Layout (Sidebar fixa + Área de Conteúdo)
// =============================================================================
// Demonstra um layout de duas colunas onde a sidebar possui altura máxima
// e scroll independente, enquanto o conteúdo principal flui normalmente.
// Ideal para: gerenciadores de arquivos, chats, editores com painéis laterais.
// Caminho sugerido: resources/js/modules/SeuModulo/pages/SuaPagina.jsx
// =============================================================================

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
    Columns2,
    Info,
    Folder,
    FileText,
    Image,
    Video,
    Music,
    ChevronRight,
    Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// DADOS DE EXEMPLO — Lista de itens na sidebar
// =============================================================================
const sidebarItems = [
    { id: 1, icon: Folder, label: 'Documentos', count: 12, color: 'text-amber-500' },
    { id: 2, icon: Image, label: 'Imagens', count: 48, color: 'text-blue-500' },
    { id: 3, icon: Video, label: 'Vídeos', count: 7, color: 'text-violet-500' },
    { id: 4, icon: Music, label: 'Áudio', count: 23, color: 'text-rose-500' },
    { id: 5, icon: FileText, label: 'Relatórios', count: 5, color: 'text-emerald-500' },
    { id: 6, icon: Folder, label: 'Arquivados', count: 31, color: 'text-muted-foreground' },
];

const contentItems = [
    { name: 'Relatório Anual 2025.pdf', size: '2.4 MB', date: '22/07/2026', type: 'PDF' },
    { name: 'Apresentação Q2.pptx', size: '8.1 MB', date: '18/07/2026', type: 'PPT' },
    { name: 'Planilha de Dados.xlsx', size: '1.2 MB', date: '15/07/2026', type: 'XLS' },
    { name: 'Manual do Usuário.docx', size: '3.7 MB', date: '10/07/2026', type: 'DOC' },
    { name: 'Contrato Fornecedor.pdf', size: '512 KB', date: '05/07/2026', type: 'PDF' },
];

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateGridSplit() {
    const [activeItem, setActiveItem] = useState(1);

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Descrição do Template ───────────────────────────────── */}
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                    <Columns2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Split Layout</p>
                        <p className="text-xs text-muted-foreground">
                            Sidebar fixa à esquerda com scroll independente + área de conteúdo principal à direita.
                            Ideal para gerenciadores de arquivos, chats e editores com painel lateral.
                        </p>
                    </div>
                </div>

                {/* ── Split Layout Principal ───────────────────────────────── */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Sidebar (240px fixa) + Conteúdo (flex-1)
                        </span>
                    </div>

                    {/*
                        ESTRUTURA DO SPLIT LAYOUT:
                        <div className="flex gap-6 h-[500px]">
                            <aside className="w-60 shrink-0 overflow-y-auto">Sidebar</aside>
                            <main className="flex-1 overflow-y-auto">Conteúdo</main>
                        </div>
                    */}
                    <div className="flex gap-6 rounded-lg border border-border overflow-hidden" style={{ height: '520px' }}>
                        {/* ── Sidebar ─────────────────────────────────────────── */}
                        <aside className="w-60 shrink-0 border-r border-border bg-muted/20 flex flex-col overflow-y-auto">
                            <div className="p-4 border-b border-border">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                                    Categorias
                                </p>
                            </div>
                            <nav className="flex-1 p-2 space-y-0.5">
                                {sidebarItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveItem(item.id)}
                                            className={cn(
                                                'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
                                                'hover:bg-accent hover:text-accent-foreground',
                                                activeItem === item.id
                                                    ? 'bg-accent text-accent-foreground font-medium'
                                                    : 'text-muted-foreground'
                                            )}
                                        >
                                            <Icon className={cn('h-4 w-4 shrink-0', item.color)} />
                                            <span className="flex-1 text-left text-xs">{item.label}</span>
                                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                                                {item.count}
                                            </Badge>
                                        </button>
                                    );
                                })}
                            </nav>
                            <div className="p-3 border-t border-border">
                                <p className="text-[10px] text-muted-foreground text-center">
                                    {sidebarItems.reduce((a, b) => a + b.count, 0)} itens no total
                                </p>
                            </div>
                        </aside>

                        {/* ── Conteúdo Principal ──────────────────────────────── */}
                        <main className="flex-1 flex flex-col overflow-y-auto">
                            <div className="p-4 border-b border-border flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">
                                        {sidebarItems.find(i => i.id === activeItem)?.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {sidebarItems.find(i => i.id === activeItem)?.count} itens
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-xs">flex-1</Badge>
                            </div>
                            <div className="flex-1 p-4 space-y-2">
                                {contentItems.map((file, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-3 p-3 rounded-md border border-border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="h-8 w-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                            <span className="text-[9px] font-bold text-primary font-mono">{file.type}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                                            <p className="text-[10px] text-muted-foreground">{file.size} · {file.date}</p>
                                        </div>
                                        <Eye className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                                    </div>
                                ))}
                            </div>
                        </main>
                    </div>
                </div>

                <Separator />

                {/* ── Variação: Split vertical (top + bottom) ──────────────── */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Split Vertical — Topo (header fixo) + Corpo (flex-1)
                        </span>
                    </div>
                    {/*
                        ESTRUTURA:
                        <div className="flex flex-col h-[300px]">
                            <header className="shrink-0">Cabeçalho fixo</header>
                            <main className="flex-1 overflow-y-auto">Conteúdo com scroll</main>
                        </div>
                    */}
                    <div className="flex flex-col rounded-lg border border-border overflow-hidden" style={{ height: '280px' }}>
                        <header className="shrink-0 p-4 border-b border-border bg-muted/20">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-foreground">Cabeçalho Fixo</p>
                                <Badge variant="outline" className="text-xs">shrink-0</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Esta área não faz scroll — fica fixada no topo.
                            </p>
                        </header>
                        <main className="flex-1 overflow-y-auto p-4 space-y-2">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="p-2 rounded-md border border-border bg-card flex items-center justify-between">
                                    <span className="text-xs text-foreground">Linha de conteúdo {i} — faz scroll</span>
                                    <Badge variant="secondary" className="text-xs">flex-1</Badge>
                                </div>
                            ))}
                        </main>
                    </div>
                </div>

                {/* ── Código de referência ─────────────────────────────────── */}
                <Card className="border border-dashed border-border bg-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-mono text-muted-foreground">Código CSS / Tailwind</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="text-xs font-mono text-foreground bg-muted rounded-md p-4 overflow-x-auto">
{`{/* Split Horizontal: Sidebar + Conteúdo */}
<div className="flex gap-6 h-[500px] overflow-hidden">
  <aside className="w-60 shrink-0 overflow-y-auto border-r">
    {/* Navegação lateral */}
  </aside>
  <main className="flex-1 overflow-y-auto">
    {/* Conteúdo principal */}
  </main>
</div>

{/* Split Vertical: Header + Corpo */}
<div className="flex flex-col h-[300px] overflow-hidden">
  <header className="shrink-0 border-b">
    {/* Cabeçalho fixo */}
  </header>
  <main className="flex-1 overflow-y-auto">
    {/* Corpo com scroll */}
  </main>
</div>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
