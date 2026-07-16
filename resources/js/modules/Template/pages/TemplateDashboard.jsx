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
                            <Skeleton className="h-8 w-64 bg-slate-200" />
                            <Skeleton className="h-4 w-96 bg-slate-200" />
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
                                <CardTitle className="text-xs font-semibold uppercase text-slate-500">Receita Total</CardTitle>
                                <DollarSign className="h-4 w-4 text-emerald-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">R$ 45.231,89</div>
                                <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> +20.1% em relação ao mês passado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-slate-500">Novas Assinaturas</CardTitle>
                                <Users className="h-4 w-4 text-blue-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+2.350</div>
                                <p className="text-xs text-blue-600 mt-1 font-medium flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" /> +180.1% em relação ao mês passado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-slate-500">Vendas</CardTitle>
                                <TrendingUp className="h-4 w-4 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+12.234</div>
                                <p className="text-xs text-slate-500 mt-1">
                                    +19% em relação ao mês passado
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-slate-500">Usuários Ativos</CardTitle>
                                <Activity className="h-4 w-4 text-indigo-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+573</div>
                                <p className="text-xs text-emerald-600 mt-1 font-medium">
                                    +201 ativos na última hora
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Middle Content */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="lg:col-span-4">
                            <CardHeader>
                                <CardTitle className="text-lg">Desempenho Semanal</CardTitle>
                                <CardDescription>Visualização analítica baseada no tráfego da rede atual.</CardDescription>
                            </CardHeader>
                            <CardContent className="h-64 flex items-end justify-between gap-2 pt-4 px-6">
                                {/* Mocking a simple SVG/CSS bar chart */}
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '65%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Seg</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '45%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Ter</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '85%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Qua</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '30%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Qui</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-amber-600 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '95%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Sex</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-400 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-slate-400 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '20%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Sáb</span>
                                </div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                        <div className="w-full bg-slate-400 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '15%' }}></div>
                                    </div>
                                    <span className="text-xs font-medium text-slate-500">Dom</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-3">
                            <CardHeader>
                                <CardTitle className="text-lg">Atividade Recente</CardTitle>
                                <CardDescription>Acompanhamento de processos executados no sistema.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-bold">P</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-slate-800">Pagamento Processado</p>
                                        <p className="text-[11px] text-slate-500">Fatura #1024 no valor de R$ 349,00</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400">Há 5m</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-bold">U</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-slate-800">Novo Usuário Registrado</p>
                                        <p className="text-[11px] text-slate-500">lucas.silva@exemplo.com</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400">Há 12m</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">A</div>
                                    <div className="flex-1">
                                        <p className="text-xs font-semibold text-slate-800">Alerta de Segurança</p>
                                        <p className="text-[11px] text-slate-500">Tentativa de login malsucedida de IP externo</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400">Há 45m</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
