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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// =============================================================================
// ESTILOS INLINE — removidos
// =============================================================================

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
                <TempoMenu onAtualizar={buscar} isLoading={isLoading} />

                {/* ── Barra de busca por cidade ──────────────────────────── */}
                <Card className="rounded-2xl shadow-sm">
                    <CardContent className="pt-5">
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <div className="relative flex-1 w-full sm:max-w-sm">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base select-none pointer-events-none">
                                    📍
                                </span>
                                <Input
                                    id="cidade-input"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite o nome da cidade..."
                                    className="pl-10 rounded-xl"
                                />
                            </div>
                            <Button
                                id="buscar-btn"
                                onClick={buscar}
                                disabled={isLoading || !cidade.trim()}
                                className="rounded-xl gap-2"
                            >
                                <span>🔍</span>
                                Buscar
                            </Button>

                            {local && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span className="text-base">🌐</span>
                                    <span>
                                        {local.nome}
                                        {local.estado && `, ${local.estado}`}
                                        {local.pais && ` (${local.pais})`}
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

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
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">

                            {/* Temperatura */}
                            <Card
                                className="rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        Temperatura
                                    </CardTitle>
                                    <span className="text-2xl" role="img" aria-label="termômetro">🌡️</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.temperatura}°C
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <span>🤔</span> Sensação: {previsao.atual.sensacaoTermica}°C
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
                                    <span className="text-2xl" role="img" aria-label="gotas">💧</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.umidade}%
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <span>💦</span> Umidade relativa do ar
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
                                    <span className="text-2xl" role="img" aria-label="vento">💨</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.ventoKmh}{' '}
                                        <span className="text-xl font-semibold">km/h</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <span>🌬️</span> Velocidade do vento
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
                                    <span className="text-2xl" role="img" aria-label="UV">{emoji_uv(previsao.atual.indiceUV)}</span>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-black text-foreground tracking-tight">
                                        {previsao.atual.indiceUV}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                                        <span>🕶️</span> {badges_uv(previsao.atual.indiceUV)}
                                    </p>
                                </CardContent>
                            </Card>

                        </div>

                        {/* ── 2. Condição atual detalhada ─────────────────── */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span
                                            className="text-6xl drop-shadow-lg"
                                            role="img"
                                            aria-label={previsao.atual.descricao}
                                            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.25))' }}
                                        >
                                            {previsao.atual.icone}
                                        </span>
                                        <div>
                                            <CardTitle className="text-xl text-foreground">
                                                {previsao.atual.descricao}
                                            </CardTitle>
                                            <CardDescription className="mt-0.5">
                                                ✨ Condição meteorológica atual
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs rounded-full px-3 py-1">
                                        Código WMO: {previsao.atual.codigoClima}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <Separator className="opacity-30" />
                            <CardContent className="pt-4">
                                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                                        <span className="text-2xl">🌧️</span>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Precipitação</p>
                                            <p className="font-bold text-foreground">{previsao.atual.precipitacao} mm</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                                        <span className="text-2xl">☁️</span>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Cobertura de Nuvens</p>
                                            <p className="font-bold text-foreground">{previsao.atual.coberturaNuvens}%</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-background/30 backdrop-blur-sm">
                                        <span className="text-2xl">🥶</span>
                                        <div>
                                            <p className="text-xs text-muted-foreground">Sensação Térmica</p>
                                            <p className="font-bold text-foreground">{previsao.atual.sensacaoTermica}°C</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 3. Previsão horária (próximas 12h) ──────────── */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-foreground flex items-center gap-2">
                                    <span>🕐</span> Previsão Horária
                                </CardTitle>
                                <CardDescription>Próximas {Math.min(previsao.horas.length, 12)} horas</CardDescription>
                            </CardHeader>
                            <Separator className="opacity-30" />
                            <CardContent className="pt-4">
                                <div className="flex gap-2 overflow-x-auto pb-3">
                                    {previsao.horas.slice(0, 12).map((hora, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-2 min-w-[68px] p-3 rounded-2xl border border-border/50 hover:bg-muted/60 hover:border-primary/30 hover:shadow-md transition-all duration-200 text-center cursor-default"
                                        >
                                            <span className="text-[11px] text-muted-foreground font-semibold tracking-wide">
                                                {formatarHora(hora.hora)}
                                            </span>
                                            <span className="text-2xl" role="img" aria-label={hora.icone}>
                                                {hora.icone}
                                            </span>
                                            <span className="text-sm font-bold text-foreground">
                                                {hora.temperatura}°
                                            </span>
                                            {hora.probabilidadeChuva > 0 ? (
                                                <span className="text-[10px] text-blue-400 font-semibold flex items-center gap-0.5">
                                                    💧{hora.probabilidadeChuva}%
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-muted-foreground/40">—</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 4. Previsão dos próximos 7 dias ─────────────── */}
                        <Card className="rounded-2xl">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-foreground flex items-center gap-2">
                                    <span>📅</span> Próximos 7 Dias
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
                                            <span className="text-2xl w-8 text-center shrink-0" role="img" aria-label={dia.descricao}>
                                                {dia.icone}
                                            </span>

                                            {/* Descrição */}
                                            <span className="flex-1 text-sm text-muted-foreground hidden sm:block truncate">
                                                {dia.descricao}
                                            </span>

                                            {/* Precipitação */}
                                            <div className="w-14 flex justify-end shrink-0">
                                                {dia.probabilidadeChuvaMax > 0 ? (
                                                    <span className="text-blue-400 text-xs font-semibold flex items-center gap-0.5">
                                                        💧{dia.probabilidadeChuvaMax}%
                                                    </span>
                                                ) : (
                                                    <span className="text-muted-foreground/30 text-xs">—</span>
                                                )}
                                            </div>

                                            {/* Temperaturas min/max */}
                                            <div className="flex items-center gap-2 text-sm shrink-0">
                                                <span className="text-blue-400 font-semibold">🔵 {dia.temperaturaMin}°</span>
                                                <span className="text-muted-foreground/40">/</span>
                                                <span className="text-orange-400 font-bold">🔴 {dia.temperaturaMax}°</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 5. Rodapé com info da API ────────────────────── */}
                        <p className="text-xs text-muted-foreground text-center pb-2 flex items-center justify-center gap-1.5">
                            <span>🛰️</span>
                            Dados fornecidos por{' '}
                            <a
                                href="https://open-meteo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline underline-offset-2 hover:no-underline font-medium"
                            >
                                Open-Meteo
                            </a>
                            {' '}— API pública, sem necessidade de token.
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
