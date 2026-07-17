import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutTemplate, BookOpen, Layers } from 'lucide-react';

export default function Templates() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <div className="w-full p-6 space-y-6 animate-pulse">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64 bg-muted" />
                            <Skeleton className="h-4 w-96 bg-muted" />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />

                <div className="space-y-6 mt-6">
                    <Card className="border-border shadow-sm overflow-hidden bg-card">
                        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                            <div className="flex items-center gap-3">
                                <LayoutTemplate className="h-8 w-8 text-primary" />
                                <div>
                                    <h2 className="text-xl font-bold text-foreground">Bem-vindo à Biblioteca de Templates</h2>
                                    <p className="text-sm text-muted-foreground mt-0.5">Explore as views de exemplo pré-construídas e os padrões de UI/UX do projeto.</p>
                                </div>
                            </div>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Este módulo serve como um guia vivo e repositório de componentes funcionais. 
                                Ele demonstra a integração entre a biblioteca **shadcn/ui**, ícones do **Lucide React** e estilizações personalizadas sob a identidade visual do **SGA PMPR**.
                            </p>

                            <div className="grid gap-4 md:grid-cols-3">
                                <div className="p-4 border border-border rounded-xl space-y-2 bg-muted/30">
                                    <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                                        <Layers className="h-4 w-4 text-primary" />
                                        Dashboard de Exemplo
                                    </div>
                                    <p className="text-xs text-muted-foreground">Métricas, painéis informativos e layouts de gráficos integrados.</p>
                                </div>

                                <div className="p-4 border border-border rounded-xl space-y-2 bg-muted/30">
                                    <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                                        <BookOpen className="h-4 w-4 text-primary" />
                                        Tabelas e Formulários
                                    </div>
                                    <p className="text-xs text-muted-foreground">Padrões para listagem de dados, filtros de busca e inputs interativos avançados.</p>
                                </div>

                                <div className="p-4 border border-border rounded-xl space-y-2 bg-muted/30">
                                    <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
                                        <LayoutTemplate className="h-4 w-4 text-primary" />
                                        Diretrizes de Design
                                    </div>
                                    <p className="text-xs text-muted-foreground">Padronização tipográfica e guia visual para títulos, cards e elementos do sistema.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
