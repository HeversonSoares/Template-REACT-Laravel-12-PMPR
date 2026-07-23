import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    RadialBarChart,
    RadialBar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    Shield,
    Activity,
    Users,
    Truck,
    Download,
    Filter,
    Crosshair,
    BarChart3,
    PieChart as PieIcon,
    Radio,
    Sparkles,
} from 'lucide-react';

// ==============================================================================
// DADOS FAKE E CONFIGURAÇÕES DE CORES DOS GRÁFICOS
// ==============================================================================

// 1. Radar Chart - Prontidão Operacional
const radarDataProntidao = [
    { atributo: 'Mobilidade', valor: 92, fullMark: 100 },
    { atributo: 'Logística', valor: 85, fullMark: 100 },
    { atributo: 'Efetivo Ativo', valor: 98, fullMark: 100 },
    { atributo: 'Equipamentos', valor: 78, fullMark: 100 },
    { atributo: 'Tempo Resposta', valor: 90, fullMark: 100 },
    { atributo: 'Capacitação', valor: 84, fullMark: 100 },
];

const radarConfigProntidao = {
    valor: {
        label: 'Prontidão (%)',
        color: 'hsl(var(--primary))',
    },
};

// 2. Radar Chart - Comparativo Batalhão A vs Batalhão B
const radarDataComparativo = [
    { vetor: 'Patrulhamento', batalhaoA: 88, batalhaoB: 72 },
    { vetor: 'Comunicação', batalhaoA: 95, batalhaoB: 90 },
    { vetor: 'Tecnologia', batalhaoA: 82, batalhaoB: 68 },
    { vetor: 'Frota Reservada', batalhaoA: 75, batalhaoB: 85 },
    { vetor: 'Tática Urbana', batalhaoA: 91, batalhaoB: 80 },
    { vetor: 'Manutenção', batalhaoA: 79, batalhaoB: 89 },
];

const radarConfigComparativo = {
    batalhaoA: {
        label: '1º Batalhão (Capital)',
        color: '#2563eb', // Blue
    },
    batalhaoB: {
        label: '2º Batalhão (Interior)',
        color: '#10b981', // Emerald
    },
};

// 3. Area Chart - Tendência de Ocorrências
const areaDataAtendimentos = [
    { mes: 'Jan', urgentes: 140, rotina: 280 },
    { mes: 'Fev', urgentes: 180, rotina: 310 },
    { mes: 'Mar', urgentes: 210, rotina: 290 },
    { mes: 'Abr', urgentes: 160, rotina: 340 },
    { mes: 'Mai', urgentes: 240, rotina: 390 },
    { mes: 'Jun', urgentes: 290, rotina: 420 },
];

const areaConfigAtendimentos = {
    urgentes: {
        label: 'Ocorrências Urgentes',
        color: 'hsl(var(--destructive))',
    },
    rotina: {
        label: 'Patrulha de Rotina',
        color: 'hsl(var(--primary))',
    },
};

// 4. Bar Chart - Distribuição de Ações por Região
const barDataRegioes = [
    { regiao: 'Norte', operacoes: 320 },
    { regiao: 'Sul', operacoes: 450 },
    { regiao: 'Leste', operacoes: 280 },
    { regiao: 'Oeste', operacoes: 390 },
    { regiao: 'Centro', operacoes: 510 },
];

const barConfigRegioes = {
    operacoes: {
        label: 'Total de Operações',
        color: '#8b5cf6', // Purple
    },
};

// 5. Donut Chart - Status de Veículos da Frota
const donutDataFrota = [
    { name: 'Em Operação', value: 340, fill: '#10b981' },
    { name: 'Em Manutenção', value: 45, fill: '#f59e0b' },
    { name: 'Reservado', value: 65, fill: '#3b82f6' },
    { name: 'Inativo', value: 15, fill: '#ef4444' },
];

const donutConfigFrota = {
    value: {
        label: 'Veículos',
    },
};

// 6. Radial Bar Chart - Metas Alcançadas
const radialDataMetas = [
    { name: 'SLA Atendimento', score: 94, fill: '#10b981' },
    { name: 'Revisão da Frota', score: 82, fill: '#3b82f6' },
    { name: 'Horas Treinamento', score: 76, fill: '#f59e0b' },
];

const radialConfigMetas = {
    score: {
        label: 'Cumprimento (%)',
    },
};

export default function TemplateCharts() {
    const [isLoading, setIsLoading] = useState(true);
    const [periodo, setPeriodo] = useState('30d');

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

                {/* Cabeçalho da Página e Controles */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-5 rounded-xl border border-border shadow-sm">
                    <div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="gap-1 border-primary/30 text-primary">
                                <Sparkles className="h-3 w-3" />
                                Modelos Visualização Shadcn UI
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                            Dashboard com Gráficos Radar & Métricas Analíticas
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Modelos interativos de painéis utilizando Recharts, mapas de calor radiais e gráficos de radar responsivos.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                        <Tabs value={periodo} onValueChange={setPeriodo} className="w-auto">
                            <TabsList className="grid grid-cols-3 h-9">
                                <TabsTrigger value="7d" className="text-xs">7 dias</TabsTrigger>
                                <TabsTrigger value="30d" className="text-xs">30 dias</TabsTrigger>
                                <TabsTrigger value="90d" className="text-xs">90 dias</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs">
                            <Download className="h-3.5 w-3.5" />
                            Exportar
                        </Button>
                    </div>
                </div>

                {/* Grid de KPIs de Topo */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:shadow-md transition-all border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                Índice de Prontidão Operacional
                            </CardTitle>
                            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Shield className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">89.4%</div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] gap-1 px-1.5 py-0">
                                    <TrendingUp className="h-3 w-3" /> +4.2%
                                </Badge>
                                <span className="text-xs text-muted-foreground">meta global 85%</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                Atendimentos e Ocorrências
                            </CardTitle>
                            <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                <Activity className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">1.490</div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[11px] gap-1 px-1.5 py-0">
                                    <TrendingUp className="h-3 w-3" /> +12%
                                </Badge>
                                <span className="text-xs text-muted-foreground">neste mês</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                Efetivo Mobilizado
                            </CardTitle>
                            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Users className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">842</div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <Badge variant="outline" className="text-emerald-500 border-emerald-500/30 text-[11px] px-1.5 py-0">
                                    96% ativos
                                </Badge>
                                <span className="text-xs text-muted-foreground">34 em escala extra</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:shadow-md transition-all border-border">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                Disponibilidade da Frota
                            </CardTitle>
                            <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                                <Truck className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">465 / 510</div>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="text-xs text-muted-foreground">91.1% operacional</span>
                                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] px-1.5 py-0">
                                    45 oficina
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* ============================================================================== */}
                {/* SEÇÃO PRINCIPAL: RADAR CHARTS (DESTAQUE DA REQUISIÇÃO DO USUÁRIO) */}
                {/* ============================================================================== */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Crosshair className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                            Modelos de Gráficos de Radar (Radar Charts)
                        </h2>
                        <Badge variant="outline" className="text-[10px]">3 Exemplos</Badge>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Radar Chart 1: Prontidão Operacional Geral */}
                        <Card className="flex flex-col border-border shadow-sm">
                            <CardHeader className="items-center pb-2 text-center">
                                <CardTitle className="text-base font-bold text-foreground">
                                    Prontidão Operacional
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Análise multidimensional de capacidade das equipes
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer
                                    config={radarConfigProntidao}
                                    className="mx-auto aspect-square max-h-[280px]"
                                >
                                    <RadarChart data={radarDataProntidao} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="dot" />}
                                        />
                                        <PolarGrid className="fill-muted/20 stroke-border" />
                                        <PolarAngleAxis dataKey="atributo" tick={{ fill: 'currentColor', fontSize: 11 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="currentColor" className="opacity-40" />
                                        <Radar
                                            name="Prontidão"
                                            dataKey="valor"
                                            stroke="hsl(var(--primary))"
                                            fill="hsl(var(--primary))"
                                            fillOpacity={0.4}
                                            dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                                <div className="flex items-center gap-2 font-medium leading-none text-foreground">
                                    Desempenho Geral: 89.4% <TrendingUp className="h-4 w-4 text-emerald-500" />
                                </div>
                                <div className="flex items-center gap-2 leading-none text-muted-foreground text-center">
                                    Destaque positivo para Efetivo Ativo (98%) e Mobilidade (92%).
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Radar Chart 2: Comparativo Entre Unidades (Batalhão A vs Batalhão B) */}
                        <Card className="flex flex-col border-border shadow-sm">
                            <CardHeader className="items-center pb-2 text-center">
                                <CardTitle className="text-base font-bold text-foreground">
                                    Comparativo de Unidades
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Benchmarking entre 1º Batalhão e 2º Batalhão
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer
                                    config={radarConfigComparativo}
                                    className="mx-auto aspect-square max-h-[280px]"
                                >
                                    <RadarChart data={radarDataComparativo} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <PolarGrid className="stroke-border/70" />
                                        <PolarAngleAxis dataKey="vetor" tick={{ fill: 'currentColor', fontSize: 11 }} />
                                        <Radar
                                            name="1º Batalhão"
                                            dataKey="batalhaoA"
                                            stroke="#2563eb"
                                            fill="#2563eb"
                                            fillOpacity={0.3}
                                        />
                                        <Radar
                                            name="2º Batalhão"
                                            dataKey="batalhaoB"
                                            stroke="#10b981"
                                            fill="#10b981"
                                            fillOpacity={0.3}
                                        />
                                        <ChartLegend content={<ChartLegendContent />} />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                                <div className="flex items-center gap-2 font-medium leading-none text-foreground">
                                    Variação Média: +6.5% a favor do 1º Batalhão
                                </div>
                                <div className="text-center text-muted-foreground">
                                    2º Batalhão apresenta superioridade em Frota Reservada e Manutenção.
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Radar Chart 3: Radar Minimalista de Vetores Críticos */}
                        <Card className="flex flex-col border-border shadow-sm">
                            <CardHeader className="items-center pb-2 text-center">
                                <CardTitle className="text-base font-bold text-foreground">
                                    Matriz de Cobertura
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Radar com linhas e pontos destacados por vetor
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-0">
                                <ChartContainer
                                    config={radarConfigProntidao}
                                    className="mx-auto aspect-square max-h-[280px]"
                                >
                                    <RadarChart data={radarDataProntidao} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                                        <PolarGrid gridType="circle" className="stroke-primary/20" />
                                        <PolarAngleAxis dataKey="atributo" tick={{ fill: 'currentColor', fontSize: 11 }} />
                                        <Radar
                                            name="Cobertura"
                                            dataKey="valor"
                                            stroke="#8b5cf6"
                                            fill="#8b5cf6"
                                            fillOpacity={0.25}
                                            dot={{ r: 5, fill: '#8b5cf6', stroke: '#ffffff', strokeWidth: 2 }}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 text-xs text-muted-foreground pt-4 border-t border-border/50">
                                <div className="flex items-center gap-1.5 font-medium text-foreground">
                                    Grid Circular Polar <Badge variant="secondary" className="text-[10px]">Shadcn Style</Badge>
                                </div>
                                <div className="text-center text-muted-foreground">
                                    Ideal para apresentar auditoria e níveis de maturidade de processos.
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                {/* ============================================================================== */}
                {/* DEMAIS GRÁFICOS COMPLEMENTARES (AREA, BAR, DONUT, RADIAL) */}
                {/* ============================================================================== */}
                <div className="space-y-4 pt-4">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h2 className="text-lg font-bold text-foreground">
                            Outros Modelos de Gráficos Integrados
                        </h2>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                        {/* Area Chart: Tendência de Ocorrências */}
                        <Card className="lg:col-span-4 border-border shadow-sm flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-base font-bold text-foreground">
                                        Evolução Temporal de Atendimentos
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        Comparativo de ocorrências urgentes vs chamados de rotina
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="text-xs gap-1">
                                    <Radio className="h-3 w-3 text-emerald-500 animate-pulse" /> Ao Vivo
                                </Badge>
                            </CardHeader>
                            <CardContent className="flex-1 pt-2">
                                <ChartContainer config={areaConfigAtendimentos} className="h-[280px] w-full">
                                    <AreaChart data={areaDataAtendimentos} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="fillRotina" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
                                            </linearGradient>
                                            <linearGradient id="fillUrgentes" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />
                                        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                                        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                        <Area
                                            type="monotone"
                                            dataKey="rotina"
                                            stroke="hsl(var(--primary))"
                                            fillOpacity={1}
                                            fill="url(#fillRotina)"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="urgentes"
                                            stroke="hsl(var(--destructive))"
                                            fillOpacity={1}
                                            fill="url(#fillUrgentes)"
                                        />
                                        <ChartLegend content={<ChartLegendContent />} />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Bar Chart: Operações por Região */}
                        <Card className="lg:col-span-3 border-border shadow-sm flex flex-col">
                            <CardHeader>
                                <CardTitle className="text-base font-bold text-foreground">
                                    Ações por Região Metropolita
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Total de operações executadas por setor
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pt-2">
                                <ChartContainer config={barConfigRegioes} className="h-[280px] w-full">
                                    <BarChart data={barDataRegioes} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />
                                        <XAxis dataKey="regiao" tickLine={false} axisLine={false} />
                                        <YAxis tickLine={false} axisLine={false} />
                                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                        <Bar
                                            dataKey="operacoes"
                                            fill="#8b5cf6"
                                            radius={[6, 6, 0, 0]}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Donut Chart & Radial Bar Chart */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Donut Chart: Status da Frota */}
                        <Card className="border-border shadow-sm flex flex-col">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-bold text-foreground flex items-center justify-between">
                                    <span>Status Operacional da Frota</span>
                                    <PieIcon className="h-4 w-4 text-muted-foreground" />
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Distribuição de veículos por condição de uso
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-2">
                                <ChartContainer config={donutConfigFrota} className="mx-auto aspect-square max-h-[250px]">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                                        <Pie
                                            data={donutDataFrota}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={4}
                                            stroke="none"
                                        >
                                            {donutDataFrota.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ChartContainer>
                                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-border/50 text-xs">
                                    {donutDataFrota.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-1.5 rounded-md bg-muted/30">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                                                <span className="text-muted-foreground font-medium">{item.name}</span>
                                            </div>
                                            <span className="font-bold text-foreground">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Radial Bar Chart: Cumprimento de Metas */}
                        <Card className="border-border shadow-sm flex flex-col">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-bold text-foreground">
                                    Indicadores de SLA & Metas
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    Percentual de cumprimento dos objetivos mensais
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 pb-2">
                                <ChartContainer config={radialConfigMetas} className="mx-auto aspect-square max-h-[250px]">
                                    <RadialBarChart
                                        data={radialDataMetas}
                                        innerRadius={30}
                                        outerRadius={100}
                                        barSize={14}
                                        startAngle={180}
                                        endAngle={0}
                                    >
                                        <RadialBar
                                            minAngle={15}
                                            background
                                            clockWise
                                            dataKey="score"
                                            cornerRadius={8}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                    </RadialBarChart>
                                </ChartContainer>
                                <div className="space-y-2 mt-2 pt-2 border-t border-border/50 text-xs">
                                    {radialDataMetas.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <span className="text-muted-foreground flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.fill }} />
                                                {item.name}
                                            </span>
                                            <span className="font-bold text-foreground">{item.score}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
