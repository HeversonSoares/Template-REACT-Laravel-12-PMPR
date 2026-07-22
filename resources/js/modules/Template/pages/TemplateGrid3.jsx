// =============================================================================
// TEMPLATE GRID — 3 Colunas Iguais
// =============================================================================
// Demonstra o uso de grid-cols-3 para divisão em terços do espaço disponível.
// Responsivo: md:grid-cols-2 em tablets, grid-cols-1 em mobile.
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
import { Grid3X3, Info } from 'lucide-react';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateGrid3() {
    const cards = [
        { label: 'Primário', color: 'bg-primary/10 border-primary/20 text-primary', value: '33%' },
        { label: 'Secundário', color: 'bg-secondary border-border text-muted-foreground', value: '33%' },
        { label: 'Destaque', color: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400', value: '33%' },
    ];

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Descrição do Template ───────────────────────────────── */}
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                    <Grid3X3 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Grid 3 Colunas</p>
                        <p className="text-xs text-muted-foreground">
                            Layout dividido em três colunas iguais (<code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">grid-cols-3</code>).
                            Ideal para exibir grupos de cards de métricas ou categorias.
                        </p>
                    </div>
                </div>

                {/* ── Grid Principal 3 Colunas ─────────────────────────────── */}
                {/*
                    ESTRUTURA:
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card>A</Card>
                        <Card>B</Card>
                        <Card>C</Card>
                    </div>
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card, idx) => (
                        <Card key={idx} className="border border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold text-foreground">
                                        Coluna {String.fromCharCode(65 + idx)}
                                    </CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">
                                        {card.label}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-xs">col {idx + 1}/3</Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className={`rounded-md border h-24 flex items-center justify-center ${card.color}`}>
                                    <span className="text-lg font-bold font-mono">{card.value}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Cada coluna ocupa {card.value} do espaço em telas grandes. Flui para 2 colunas em tablets e 1 coluna em mobile.
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ── Grid com 6 cards (2 linhas × 3 colunas) ─────────────── */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            2 linhas × 3 colunas — 6 cards
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Card key={i} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="pt-5 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-foreground">Item {i}</span>
                                        <Badge variant="secondary" className="text-xs">
                                            L{Math.ceil(i / 3)}C{((i - 1) % 3) + 1}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Linha {Math.ceil(i / 3)}, Coluna {((i - 1) % 3) + 1}
                                    </p>
                                    <div className="h-12 rounded-md bg-muted flex items-center justify-center">
                                        <span className="text-xs text-muted-foreground font-mono">card {i}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* ── Código de referência ─────────────────────────────────── */}
                <Card className="border border-dashed border-border bg-muted/20">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-mono text-muted-foreground">Código CSS / Tailwind</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <pre className="text-xs font-mono text-foreground bg-muted rounded-md p-4 overflow-x-auto">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Coluna A</Card>
  <Card>Coluna B</Card>
  <Card>Coluna C</Card>
</div>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
