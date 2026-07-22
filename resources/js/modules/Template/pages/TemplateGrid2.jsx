// =============================================================================
// TEMPLATE GRID — 2 Colunas Iguais
// =============================================================================
// Demonstra o uso de grid-cols-2 para divisão simétrica do espaço disponível.
// Responsivo: colapsa para 1 coluna em telas menores (mobile).
// Caminho sugerido: resources/js/modules/SeuModulo/pages/SuaPagina.jsx
// =============================================================================

import React from 'react';

// ─── Layout principal da aplicação (sidebar + topbar + main) ─────────────────
import Layout from '@/components/Layout';

// ─── TemplateMenu: cabeçalho + navegação do módulo Template ──────────────────
import TemplateMenu from '../components/TemplateMenu';

// ─── Card: container em branco responsivo ────────────────────────────────────
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';
import { Columns2, Info } from 'lucide-react';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateGrid2() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Descrição do Template ───────────────────────────────── */}
                <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                    <Columns2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">Grid 2 Colunas</p>
                        <p className="text-xs text-muted-foreground">
                            Layout simétrico dividido em duas colunas iguais (<code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">grid-cols-2</code>).
                            Colapsa para 1 coluna em dispositivos móveis (<code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">grid-cols-1</code>).
                        </p>
                    </div>
                </div>

                {/* ── Grid Principal 2 Colunas ─────────────────────────────── */}
                {/* 
                    ESTRUTURA:
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>Coluna A</Card>
                        <Card>Coluna B</Card>
                    </div>
                */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coluna A */}
                    <Card className="border border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-semibold text-foreground">
                                    Coluna A
                                </CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">
                                    Primeira coluna do grid
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">col 1/2</Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Esta coluna ocupa 50% do espaço disponível em telas médias e maiores.
                                Em dispositivos móveis, ocupa 100% da largura.
                            </p>
                            {/* Placeholder visual */}
                            <div className="rounded-md bg-primary/10 border border-primary/20 h-28 flex items-center justify-center">
                                <span className="text-sm text-primary font-mono">50%</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-2 flex-1 rounded-full bg-primary/20" />
                                <div className="h-2 flex-1 rounded-full bg-primary/40" />
                                <div className="h-2 flex-1 rounded-full bg-primary/60" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Coluna B */}
                    <Card className="border border-border shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <div className="space-y-1">
                                <CardTitle className="text-base font-semibold text-foreground">
                                    Coluna B
                                </CardTitle>
                                <CardDescription className="text-xs text-muted-foreground">
                                    Segunda coluna do grid
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">col 2/2</Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <p className="text-sm text-muted-foreground">
                                Esta coluna ocupa 50% do espaço disponível em telas médias e maiores.
                                Em dispositivos móveis, ocupa 100% da largura.
                            </p>
                            {/* Placeholder visual */}
                            <div className="rounded-md bg-secondary/50 border border-border h-28 flex items-center justify-center">
                                <span className="text-sm text-muted-foreground font-mono">50%</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-2 flex-1 rounded-full bg-muted-foreground/20" />
                                <div className="h-2 flex-1 rounded-full bg-muted-foreground/40" />
                                <div className="h-2 flex-1 rounded-full bg-muted-foreground/60" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ── Exemplo com mais linhas ───────────────────────────────── */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                            Exemplo com múltiplas linhas
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="border border-border shadow-sm">
                                <CardContent className="pt-5 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-foreground">Item {i}</span>
                                        <Badge variant="secondary" className="text-xs">linha {Math.ceil(i / 2)}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Conteúdo do item {i}. Cada dois cards formam uma linha no grid de 2 colunas.
                                    </p>
                                    <div className="h-16 rounded-md bg-muted flex items-center justify-center">
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
{`<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Card>Coluna A</Card>
  <Card>Coluna B</Card>
</div>`}
                        </pre>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
