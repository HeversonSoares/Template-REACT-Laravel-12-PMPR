// =============================================================================
// TEMPLATE GRID — Assimétrico (col-span)
// =============================================================================
// Demonstra o uso de col-span para criar layouts com proporções diferentes:
//   - Coluna principal: 2/3 do espaço (lg:col-span-4 em grid de 6)
//   - Coluna lateral:   1/3 do espaço (lg:col-span-2 em grid de 6)
// Útil para layouts de conteúdo + sidebar ou destaques com painel lateral.
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
import { Separator } from '@/components/ui/separator';
import { PanelLeft, Info, CheckCircle2 } from 'lucide-react';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateGridAsymmetric() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Descrição do Template ───────────────────────────────── */}
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                    <PanelLeft className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Grid Assimétrico</p>
                        <p className="text-xs text-muted-foreground">
                            Colunas com proporções diferentes usando <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">col-span</code>.
                            Ideal para layouts de conteúdo principal + painel lateral.
                        </p>
                    </div>
                </div>

                {/* ── Layout 2/3 + 1/3 ────────────────────────────────────── */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Proporção 2/3 + 1/3 — (col-span-4 + col-span-2 em grid de 6)
                        </span>
                    </div>
                    {/*
                        ESTRUTURA:
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                            <Card className="lg:col-span-4">Conteúdo principal</Card>
                            <Card className="lg:col-span-2">Painel lateral</Card>
                        </div>
                    */}
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                        {/* Coluna principal 2/3 */}
                        <Card className="lg:col-span-4 border border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold text-foreground">
                                        Conteúdo Principal
                                    </CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">
                                        Ocupa 2/3 do espaço — <code className="font-mono">lg:col-span-4</code>
                                    </CardDescription>
                                </div>
                                <Badge variant="default" className="text-xs">66%</Badge>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="rounded-md bg-primary/5 border border-primary/20 h-40 flex items-center justify-center">
                                    <span className="text-primary font-bold text-2xl font-mono">2/3</span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Esta área é ideal para tabelas, gráficos, editores de texto, ou qualquer conteúdo
                                    que precise de mais espaço horizontal. Em telas pequenas, ocupa 100% da largura.
                                </p>
                                <div className="grid grid-cols-3 gap-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="h-10 rounded-md bg-muted border border-border flex items-center justify-center">
                                            <span className="text-xs text-muted-foreground font-mono">sub-col {i}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Coluna lateral 1/3 */}
                        <Card className="lg:col-span-2 border border-border shadow-sm">
                            <CardHeader className="flex flex-row items-center justify-between pb-3">
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold text-foreground">
                                        Painel Lateral
                                    </CardTitle>
                                    <CardDescription className="text-xs text-muted-foreground">
                                        <code className="font-mono">lg:col-span-2</code> — 1/3
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-xs">33%</Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="rounded-md bg-muted/50 border border-border h-20 flex items-center justify-center">
                                    <span className="text-muted-foreground font-bold text-xl font-mono">1/3</span>
                                </div>
                                {['Status: Ativo', 'Versão: 1.2.4', 'Build: produção'].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                        <span className="text-xs text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Separator />

                {/* ── Layout 3/4 + 1/4 ────────────────────────────────────── */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Proporção 3/4 + 1/4 — (col-span-9 + col-span-3 em grid de 12)
                        </span>
                    </div>
                    {/*
                        ESTRUTURA:
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <Card className="lg:col-span-9">Conteúdo principal</Card>
                            <Card className="lg:col-span-3">Sidebar estreita</Card>
                        </div>
                    */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <Card className="lg:col-span-9 border border-border shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold text-foreground">Área Principal</CardTitle>
                                    <Badge variant="default" className="text-xs">75%</Badge>
                                </div>
                                <CardDescription className="text-xs">col-span-9 de 12</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md bg-primary/5 border border-primary/20 h-28 flex items-center justify-center">
                                    <span className="text-primary font-bold text-2xl font-mono">3/4</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="lg:col-span-3 border border-border shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base font-semibold text-foreground">Sidebar</CardTitle>
                                    <Badge variant="outline" className="text-xs">25%</Badge>
                                </div>
                                <CardDescription className="text-xs">col-span-3 de 12</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="rounded-md bg-muted/50 border border-border h-28 flex items-center justify-center">
                                    <span className="text-muted-foreground font-bold text-xl font-mono">1/4</span>
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
                    <CardContent className="space-y-3">
                        <pre className="text-xs font-mono text-foreground bg-muted rounded-md p-4 overflow-x-auto">
{`{/* 2/3 + 1/3 */}
<div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
  <Card className="lg:col-span-4">Principal (66%)</Card>
  <Card className="lg:col-span-2">Lateral (33%)</Card>
</div>

{/* 3/4 + 1/4 */}
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <Card className="lg:col-span-9">Principal (75%)</Card>
  <Card className="lg:col-span-3">Sidebar (25%)</Card>
</div>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
