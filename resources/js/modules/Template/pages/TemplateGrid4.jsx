// =============================================================================
// TEMPLATE GRID — 4 Colunas Iguais
// =============================================================================
// Demonstra o uso de grid-cols-4 — padrão típico para cards de KPI/métricas
// em dashboards administrativos.
// Responsivo: lg:grid-cols-4, md:grid-cols-2, grid-cols-1
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
import { LayoutGrid, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';

// =============================================================================
// DADOS DE EXEMPLO — KPI Cards
// =============================================================================
const kpiData = [
    {
        label: 'Receita Total',
        value: 'R$ 45.231',
        change: '+20.1%',
        trend: 'up',
        color: 'text-emerald-600 dark:text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
        label: 'Novos Usuários',
        value: '2.350',
        change: '+180%',
        trend: 'up',
        color: 'text-blue-600 dark:text-blue-400',
        bg: 'bg-blue-500/10 border-blue-500/20',
    },
    {
        label: 'Taxa de Churn',
        value: '3.2%',
        change: '-0.4%',
        trend: 'down',
        color: 'text-rose-600 dark:text-rose-400',
        bg: 'bg-rose-500/10 border-rose-500/20',
    },
    {
        label: 'Tickets Abertos',
        value: '128',
        change: '0%',
        trend: 'neutral',
        color: 'text-muted-foreground',
        bg: 'bg-muted border-border',
    },
];

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateGrid4() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Descrição do Template ───────────────────────────────── */}
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                    <LayoutGrid className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Grid 4 Colunas</p>
                        <p className="text-xs text-muted-foreground">
                            Layout em quatro colunas (<code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">lg:grid-cols-4</code>).
                            Padrão ideal para KPI cards em dashboards administrativos.
                        </p>
                    </div>
                </div>

                {/* ── Grid Principal 4 Colunas — KPI Cards ────────────────── */}
                {/*
                    ESTRUTURA:
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>KPI 1</Card>
                        ...
                    </div>
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpiData.map((kpi, idx) => (
                        <Card key={idx} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">
                                    {kpi.label}
                                </CardTitle>
                                <Badge variant="outline" className="text-xs">col {idx + 1}/4</Badge>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                                <div className={`flex items-center gap-1 text-xs font-medium ${kpi.color}`}>
                                    {kpi.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                                    {kpi.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                                    {kpi.trend === 'neutral' && <Minus className="h-3 w-3" />}
                                    {kpi.change} vs. mês anterior
                                </div>
                                <div className={`rounded-md border h-2 ${kpi.bg}`} />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* ── Grid 4 colunas — 8 cards (2 linhas) ─────────────────── */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            2 linhas × 4 colunas — 8 cards
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Card key={i} className="border border-border shadow-sm hover:shadow-md transition-shadow">
                                <CardContent className="pt-4 pb-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-foreground">Item {i}</span>
                                        <Badge variant="secondary" className="text-xs">
                                            L{Math.ceil(i / 4)}C{((i - 1) % 4) + 1}
                                        </Badge>
                                    </div>
                                    <div className="h-10 rounded-md bg-muted flex items-center justify-center">
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
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>KPI 1</Card>
  <Card>KPI 2</Card>
  <Card>KPI 3</Card>
  <Card>KPI 4</Card>
</div>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
