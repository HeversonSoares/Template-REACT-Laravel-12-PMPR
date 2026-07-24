// =============================================================================
// TempoPage — Página principal do módulo Tempo (visual aprimorado com emojis)
// =============================================================================
// Caminho: resources/js/modules/Tempo/pages/TempoPage.jsx
// =============================================================================

import React, { useEffect } from 'react';

// ─── Layout principal da aplicação ───────────────────────────────────────────
import Layout from '@/components/Layout';

// ─── Menu do módulo Tempo ─────────────────────────────────────────────────────
import TempoMenu from '../components/TempoMenu';

// ─── Hook de lógica: estados + chamadas ao tempoService ──────────────────────
import { useTempo } from '../hooks/useTempo';

// ─── Componentes de UI (shadcn/ui) ────────────────────────────────────────────
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Search, Globe, Thermometer, Droplets, Droplet, Wind, Sun, Activity, Gauge, CloudFog, Glasses, Clock, CalendarDays, ArrowDown, ArrowUp, Satellite, CloudSun, Cloud, CloudDrizzle, CloudRain, Snowflake, CloudSnow, CloudLightning } from 'lucide-react';

const WeatherIcon = ({ name, className }) => {
    const icons = {
        Sun, CloudSun, Cloud, CloudFog, CloudDrizzle, CloudRain, Snowflake, CloudSnow, CloudLightning
    };
    const IconComponent = icons[name] || Cloud;
    return <IconComponent className={className} />;
};

const chartConfig = {
    temperatura: {
        label: "Temperatura (°C)",
        color: "hsl(var(--primary))",
    },
};

// =============================================================================
// ESTILOS INLINE — removidos
// =============================================================================

import ExpandableSearch from '@/components/ui/expandable-search';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TempoPage() {
    const {
        cidade,
        setCidade,
        local,
        previsao,
        isLoading,
        erro,
        buscar,
    } = useTempo();

    useEffect(() => {
        buscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') buscar();
    };

    // ── Skeleton enquanto carrega ─────────────────────────────────────────────
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
                    <div className="grid gap-4 md:grid-cols-4">
                        <Skeleton className="h-36 rounded-2xl bg-muted" />
                        <Skeleton className="h-36 rounded-2xl bg-muted" />
                        <Skeleton className="h-36 rounded-2xl bg-muted" />
                        <Skeleton className="h-36 rounded-2xl bg-muted" />
                    </div>
                    <Skeleton className="h-48 rounded-2xl bg-muted" />
                    <Skeleton className="h-64 rounded-2xl bg-muted" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">

                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TempoMenu onAtualizar={buscar} isLoading={isLoading} localNome={local?.nome}>
                    <ExpandableSearch
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        onClear={() => setCidade('')}
                        onKeyDown={handleKeyDown}
                        onSearch={buscar}
                        placeholder="Nome da cidade..."
                        className="mr-2"
                        defaultExpanded={true}
                    />
                </TempoMenu>


                {/* ── Mensagem de erro ────────────────────────────────────── */}
                {erro && (
                    <Card className="border-destructive/50 bg-destructive/5 rounded-2xl">
                        <CardContent className="pt-5">
                            <div className="flex items-center gap-3 text-destructive">
                                <span className="text-2xl">⚠️</span>
                                <div>
                                    <p className="font-medium text-sm">Erro ao buscar dados</p>
                                    <p className="text-xs mt-0.5 text-destructive/80">{erro}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ── Conteúdo principal ──────────────────────────────────── */}
                {previsao && (
                    <div className="space-y-6">

                        {/* ── 1. Cards de métricas atuais ─────────────────── */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

                            {/* Temperatura */}
                            <Card
                                className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Temperatura
                                    </CardTitle>
                                    <Thermometer className="h-5 w-5 text-red-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.temperatura}°C
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <Activity className="h-3 w-3" /> Sensação: {previsao.atual.sensacaoTermica}°C
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Umidade */}
                            <Card
                                className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Umidade
                                    </CardTitle>
                                    <Droplet className="h-5 w-5 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.umidade}%
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <Droplets className="h-3 w-3" /> Umidade relativa do ar
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Vento */}
                            <Card
                                className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Vento
                                    </CardTitle>
                                    <Wind className="h-5 w-5 text-slate-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.ventoKmh}{' '}
                                        <span className="text-xl font-semibold">km/h</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <Gauge className="h-3 w-3" /> Velocidade do vento
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Índice UV */}
                            <Card
                                className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Índice UV
                                    </CardTitle>
                                    <Sun className="h-5 w-5 text-orange-400" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.indiceUV}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <Glasses className="h-3 w-3" /> {badges_uv(previsao.atual.indiceUV)}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Condição */}
                            <Card
                                className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Condição
                                    </CardTitle>
                                    <CloudFog className="h-5 w-5 text-slate-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-foreground tracking-tight">
                                        <WeatherIcon name={previsao.atual.icone} className="w-10 h-10" />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1 truncate" title={previsao.atual.descricao}>
                                        {previsao.atual.descricao}
                                    </p>
                                </CardContent>
                            </Card>

                        </div>

                        {/* ── 3. Previsão horária (próximas 12h) ──────────── */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-foreground flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-muted-foreground" /> Previsão Horária
                                </CardTitle>
                                <CardDescription>Próximas {Math.min(previsao.horas.length, 12)} horas</CardDescription>
                            </CardHeader>
                            <Separator className="opacity-30" />
                            <CardContent className="pt-4">
                                <ChartContainer config={chartConfig} className="h-[140px] w-full">
                                    <LineChart data={previsao.horas.slice(0, 12)} margin={{ top: 20, left: -20, right: 12, bottom: 0 }}>
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="hora"
                                            tickLine={false}
                                            axisLine={false}
                                            tickMargin={8}
                                            tickFormatter={(value) => formatarHora(value)}
                                        />
                                        <YAxis 
                                            tickLine={false} 
                                            axisLine={false} 
                                            tickMargin={8} 
                                            domain={['auto', 'auto']}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent indicator="line" labelFormatter={(value) => formatarHora(value)} />}
                                        />
                                        <Line
                                            dataKey="temperatura"
                                            type="natural"
                                            stroke="var(--color-temperatura)"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: "var(--color-temperatura)" }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* ── 4. Previsão dos próximos 7 dias ─────────────── */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-foreground flex items-center gap-2">
                                    <CalendarDays className="h-5 w-5 text-muted-foreground" /> Próximos 7 Dias
                                </CardTitle>
                                <CardDescription>Previsão diária</CardDescription>
                            </CardHeader>
                            <Separator className="opacity-30" />
                            <CardContent className="p-0">
                                <div className="divide-y divide-border/40">
                                    {previsao.dias.map((dia, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/30 transition-colors duration-150"
                                        >
                                            {/* Dia da semana */}
                                            <span className="text-sm font-bold text-foreground w-10 shrink-0">
                                                {i === 0 ? 'Hoje' : dia.diaSemana}
                                            </span>

                                            {/* Ícone grande */}
                                            <div className="w-8 flex justify-center shrink-0">
                                                <WeatherIcon name={dia.icone} className="w-6 h-6 text-foreground" />
                                            </div>

                                            {/* Descrição */}
                                            <span className="flex-1 text-sm text-muted-foreground hidden sm:block truncate">
                                                {dia.descricao}
                                            </span>

                                            {/* Precipitação */}
                                            <div className="w-14 flex justify-end shrink-0">
                                                {dia.probabilidadeChuvaMax > 0 ? (
                                                    <span className="text-blue-400 text-xs font-semibold flex items-center gap-0.5">
                                                        <Droplet className="h-3 w-3 fill-current" />{dia.probabilidadeChuvaMax}%
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground/30 text-xs">—</span>
                                                )}
                                            </div>

                                            {/* Temperaturas min/max */}
                                            <div className="flex items-center gap-2 text-sm shrink-0">
                                                <span className="text-blue-400 font-semibold flex items-center"><ArrowDown className="h-3 w-3 mr-0.5" />{dia.temperaturaMin}°</span>
                                                <span className="text-muted-foreground/40">/</span>
                                                <span className="text-orange-400 font-bold flex items-center"><ArrowUp className="h-3 w-3 mr-0.5" />{dia.temperaturaMax}°</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 5. Rodapé com info da API ────────────────────── */}
                        <p className="text-xs text-muted-foreground text-center pb-2 flex items-center justify-center gap-1.5">
                            <Satellite className="h-4 w-4" />
                            Dados fornecidos por{' '}
                            <a
                                href="https://open-meteo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline underline-offset-2 hover:no-underline font-medium"
                            >
                                Open-Meteo
                            </a>
                            {' '}— API pública.
                        </p>

                    </div>
                )}

            </div>
        </Layout>
    );
}

// =============================================================================
// FUNÇÕES AUXILIARES (privadas — usadas apenas nesta página)
// =============================================================================

/**
 * Formata uma string de hora ISO para exibição compacta (ex: "14h").
 * @param {string} isoString - Data/hora no formato ISO 8601.
 * @returns {string}
 */
function formatarHora(isoString) {
    const d = new Date(isoString);
    return `${String(d.getHours()).padStart(2, '0')}h`;
}

/**
 * Retorna descrição legível do risco UV.
 * @param {number} uv - Índice UV.
 * @returns {string}
 */
function badges_uv(uv) {
    if (uv <= 2)  return 'Baixo — sem riscos';
    if (uv <= 5)  return 'Moderado — use protetor';
    if (uv <= 7)  return 'Alto — evite o sol';
    if (uv <= 10) return 'Muito alto — perigo!';
    return 'Extremo — risco máximo';
}

/**
 * Retorna emoji representativo do índice UV.
 * @param {number} uv - Índice UV.
 * @returns {string}
 */
function emoji_uv(uv) {
    if (uv <= 2)  return '🌤️';
    if (uv <= 5)  return '☀️';
    if (uv <= 7)  return '🔆';
    if (uv <= 10) return '🌞';
    return '🔥';
}
