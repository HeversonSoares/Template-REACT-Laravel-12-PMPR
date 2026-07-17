import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
    TrendingUp, 
    Users, 
    DollarSign, 
    Activity 
} from 'lucide-react';

export default function TemplateDashboard() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <Layout>
                <div className="w-full p-6 space-y-6 animate-pulse">
                    {/* Header Skeleton */}
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

                <div className="space-y-6">
                    {/* Cards Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Receita Total</CardTitle>
                                <DollarSign className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">R$ 45.231,89</div>
                                <p className="text-xs text-primary mt-1 font-medium flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> +20.1% em relação ao mês passado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Novas Assinaturas</CardTitle>
                                <Users className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">+2.350</div>
                                <p className="text-xs text-primary mt-1 font-medium flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> +180.1% em relação ao mês passado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Vendas</CardTitle>
                                <TrendingUp className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">+12.234</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    +19% em relação ao mês passado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">Usuários Ativos</CardTitle>
                                <Activity className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">+573</div>
                                <p className="text-xs text-primary mt-1 font-medium">
                                    +201 ativos na última hora
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Content */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle className="text-lg text-foreground">Desempenho Semanal</CardTitle>
                                <CardDescription className="text-muted-foreground">Visualização analítica baseada no tráfego da rede atual.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-64 flex items-end justify-between gap-2 pt-4 px-6">
                                {/* Mocking a simple SVG/CSS bar chart */}
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-primary rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '65%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Seg</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-primary rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '45%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Ter</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-primary rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '85%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Qua</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-primary rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '30%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Qui</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-primary rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '95%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Sex</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted/50 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-muted-foreground rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '20%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Sáb</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-muted/50 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-muted-foreground rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '15%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">Dom</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="text-lg text-foreground">Atividade Recente</CardTitle>
                                <CardDescription className="text-muted-foreground">Acompanhamento de processos executados no sistema.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">P</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-foreground">Pagamento Processado</p>
                                        <p className="text-[11px] text-muted-foreground">Fatura #1024 no valor de R$ 349,00</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">Há 5m</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">U</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-foreground">Novo Usuário Registrado</p>
                                        <p className="text-[11px] text-muted-foreground">lucas.silva@exemplo.com</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">Há 12m</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-destructive/10 flex items-center justify-center text-destructive text-xs font-bold">A</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-foreground">Alerta de Segurança</p>
                                        <p className="text-[11px] text-muted-foreground">Tentativa de login malsucedida de IP externo</p>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground">Há 45m</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
