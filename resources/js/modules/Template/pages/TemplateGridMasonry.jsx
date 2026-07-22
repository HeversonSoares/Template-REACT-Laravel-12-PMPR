// =============================================================================
// TEMPLATE GRID — Masonry (alturas variadas)
// =============================================================================
// Demonstra um layout estilo Masonry com cards de alturas diferentes.
// Técnica: CSS columns (column-count) ou grid com row-span manual.
// Ideal para galerias, feeds de conteúdo e timelines de posts.
// Caminho sugerido: resources/js/modules/SeuModulo/pages/SuaPagina.jsx
// =============================================================================

import React from 'react';
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
import { Layers, Info, Image, FileText, BarChart2, AlertCircle, Star } from 'lucide-react';

// =============================================================================
// DADOS DE EXEMPLO — Cards com alturas variadas
// =============================================================================
const masonryCards = [
    {
        id: 1,
        icon: Image,
        title: 'Card Imagem',
        description: 'Card com preview de imagem em altura variada.',
        height: 'h-40',
        color: 'bg-blue-500/10 border-blue-500/20',
        iconColor: 'text-blue-500',
        badge: 'Mídia',
    },
    {
        id: 2,
        icon: FileText,
        title: 'Card Texto Longo',
        description: 'Este card contém um texto mais longo que resulta em maior altura natural. Ideal para posts, notas ou descrições detalhadas de conteúdo. O masonry se adapta automaticamente a essas variações de tamanho.',
        height: null,
        color: 'bg-emerald-500/10 border-emerald-500/20',
        iconColor: 'text-emerald-500',
        badge: 'Texto',
    },
    {
        id: 3,
        icon: BarChart2,
        title: 'Card Gráfico',
        description: 'Card com placeholder de gráfico.',
        height: 'h-28',
        color: 'bg-violet-500/10 border-violet-500/20',
        iconColor: 'text-violet-500',
        badge: 'Dados',
    },
    {
        id: 4,
        icon: AlertCircle,
        title: 'Card Alerta',
        description: 'Card compacto de notificação ou alerta do sistema.',
        height: null,
        color: 'bg-amber-500/10 border-amber-500/20',
        iconColor: 'text-amber-500',
        badge: 'Alerta',
    },
    {
        id: 5,
        icon: Star,
        title: 'Card Destaque',
        description: 'Card em destaque com conteúdo de avaliação. Pode conter estrelas, notas, comentários e métricas de satisfação do usuário para análise qualitativa.',
        height: 'h-20',
        color: 'bg-rose-500/10 border-rose-500/20',
        iconColor: 'text-rose-500',
        badge: 'Review',
    },
    {
        id: 6,
        icon: Image,
        title: 'Card Compacto',
        description: 'Card pequeno de referência rápida.',
        height: null,
        color: 'bg-cyan-500/10 border-cyan-500/20',
        iconColor: 'text-cyan-500',
        badge: 'Compacto',
    },
];

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateGridMasonry() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Descrição do Template ───────────────────────────────── */}
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                    <Layers className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Grid Masonry</p>
                        <p className="text-xs text-muted-foreground">
                            Cards com alturas variadas organizados em colunas usando{' '}
                            <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">columns</code> do CSS.
                            Ideal para galerias, feeds e timelines de conteúdo.
                        </p>
                    </div>
                </div>

                {/* ── Masonry com CSS columns ──────────────────────────────── */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Masonry via CSS columns — 3 colunas
                        </span>
                    </div>

                    {/*
                        ESTRUTURA MASONRY COM CSS COLUMNS:
                        <div style={{ columnCount: 3, columnGap: '1.5rem' }}>
                            <div style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}>
                                <Card>...</Card>
                            </div>
                        </div>
                    */}
                    <div
                        style={{ columnCount: 1, columnGap: '1.5rem' }}
                        className="sm:[column-count:2] lg:[column-count:3]"
                    >
                        {masonryCards.map((card) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}
                                >
                                    <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
                                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-7 w-7 rounded-md flex items-center justify-center border ${card.color}`}>
                                                    <Icon className={`h-4 w-4 ${card.iconColor}`} />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-sm font-semibold text-foreground">
                                                        {card.title}
                                                    </CardTitle>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="text-xs shrink-0">
                                                {card.badge}
                                            </Badge>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {card.description}
                                            </p>
                                            {card.height && (
                                                <div className={`rounded-md border ${card.color} ${card.height} flex items-center justify-center`}>
                                                    <span className={`text-xs font-mono ${card.iconColor}`}>conteúdo</span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Masonry com row-span manual (CSS Grid) ───────────────── */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Masonry manual com grid + row-span — 3 colunas
                        </span>
                    </div>
                    {/*
                        ESTRUTURA MASONRY COM grid + row-span:
                        <div className="grid grid-cols-3 grid-rows-[auto] gap-4">
                            <Card className="row-span-2">Alto</Card>
                            <Card>Normal</Card>
                            <Card className="row-span-3">Muito alto</Card>
                            <Card>Normal</Card>
                        </div>
                    */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(80px,auto)]">
                        <Card className="md:row-span-2 border border-border shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-semibold text-foreground">Tall Card</CardTitle>
                                    <Badge className="text-xs">row-span-2</Badge>
                                </div>
                                <CardDescription className="text-xs">Ocupa 2 linhas do grid</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md bg-primary/10 border border-primary/20 h-32 flex items-center justify-center">
                                    <span className="text-primary text-xs font-mono">2× altura</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-border shadow-sm">
                            <CardContent className="pt-4">
                                <div className="h-8 rounded-md bg-muted flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground font-mono">row 1</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="md:row-span-3 border border-border shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-semibold text-foreground">Super Tall</CardTitle>
                                    <Badge className="text-xs">row-span-3</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md bg-violet-500/10 border border-violet-500/20 h-48 flex items-center justify-center">
                                    <span className="text-violet-500 text-xs font-mono">3× altura</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-border shadow-sm">
                            <CardContent className="pt-4">
                                <div className="h-8 rounded-md bg-muted flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground font-mono">row 2</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-border shadow-sm">
                            <CardContent className="pt-4">
                                <div className="h-8 rounded-md bg-muted flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground font-mono">row 3</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border border-border shadow-sm">
                            <CardContent className="pt-4">
                                <div className="h-8 rounded-md bg-muted flex items-center justify-center">
                                    <span className="text-xs text-muted-foreground font-mono">row 4</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* ── Código de referência ─────────────────────────────────── */}
                <Card className="border border-dashed border-border bg-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-mono text-muted-foreground">Código CSS / Tailwind</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="text-xs font-mono text-foreground bg-muted rounded-md p-4 overflow-x-auto">
{`{/* Masonry via CSS columns */}
<div style={{ columnCount: 3, columnGap: '1.5rem' }}>
  {cards.map(card => (
    <div style={{ breakInside: 'avoid', marginBottom: '1.5rem' }}>
      <Card>{/* conteúdo de altura variada */}</Card>
    </div>
  ))}
</div>

{/* Masonry via grid + row-span */}
<div className="grid grid-cols-3 auto-rows-[minmax(80px,auto)] gap-4">
  <Card className="row-span-2">Alto</Card>
  <Card>Normal</Card>
  <Card className="row-span-3">Muito alto</Card>
</div>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
