// =============================================================================
// TempoPage — Página principal do módulo Tempo
// =============================================================================
// Caminho: resources/js/modules/Tempo/pages/TempoPage.jsx
//
// Esta página demonstra o padrão completo de chamada a uma API externa:
//   Service  →  Hook customizado  →  Página (UI)
//
// Após copiar o padrão para outro módulo:
//   1. Crie o *Service.js em services/
//   2. Crie o use*Hook.js em hooks/
//   3. Crie o *Menu.jsx em components/
//   4. Construa a página aqui em pages/
//   5. Registre a rota em resources/js/app.jsx
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

// ─── Ícones ───────────────────────────────────────────────────────────────────
import {
    Search,
    Thermometer,
    Droplets,
    Wind,
    Eye,
    Sun,
    AlertCircle,
    MapPin,
    CloudRain,
    Layers,
} from 'lucide-react';

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TempoPage() {
    // ── Hook: encapsula toda lógica de estado + chamadas de API ───────────────
    const {
        cidade,
        setCidade,
        local,
        previsao,
        isLoading,
        erro,
        buscar,
    } = useTempo();

    // ── Busca automática ao montar o componente (cidade padrão: Curitiba) ─────
    useEffect(() => {
        buscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Permite buscar pressionando Enter no campo de cidade ──────────────────
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
                        <Skeleton className="h-32 rounded-xl bg-muted" />
                        <Skeleton className="h-32 rounded-xl bg-muted" />
                        <Skeleton className="h-32 rounded-xl bg-muted" />
                        <Skeleton className="h-32 rounded-xl bg-muted" />
                    </div>
                    <Skeleton className="h-48 rounded-xl bg-muted" />
                    <Skeleton className="h-64 rounded-xl bg-muted" />
                </div>
            </Layout>
        );
    }

    // ── Render principal ──────────────────────────────────────────────────────
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">

                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TempoMenu onAtualizar={buscar} isLoading={isLoading} />

                {/* ── Barra de busca por cidade ──────────────────────────── */}
                <Card>
                    <CardContent className="pt-5">
                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <div className="relative flex-1 w-full sm:max-w-sm">
                                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="cidade-input"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Digite o nome da cidade..."
                                    className="pl-8"
                                />
                            </div>
                            <Button
                                id="buscar-btn"
                                onClick={buscar}
                                disabled={isLoading || !cidade.trim()}
                            >
                                <Search className="h-4 w-4" />
                                Buscar
                            </Button>

                            {/* Badge com nome da cidade encontrada */}
                            {local && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5" />
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
                    <Card className="border-destructive/50 bg-destructive/5">
                        <CardContent className="pt-5">
                            <div className="flex items-center gap-3 text-destructive">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">Erro ao buscar dados</p>
                                    <p className="text-xs mt-0.5 text-destructive/80">{erro}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* ── Conteúdo principal (exibido apenas quando previsao está disponível) */}
                {previsao && (
                    <div className="space-y-6">

                        {/* ── 1. Cards de métricas atuais ─────────────────── */}
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">

                            {/* Temperatura */}
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                        Temperatura
                                    </CardTitle>
                                    <Thermometer className="h-4 w-4 text-orange-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground">
                                        {previsao.atual.temperatura}°C
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Sensação: {previsao.atual.sensacaoTermica}°C
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Umidade */}
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                        Umidade
                                    </CardTitle>
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground">
                                        {previsao.atual.umidade}%
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Umidade relativa do ar
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Vento */}
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                        Vento
                                    </CardTitle>
                                    <Wind className="h-4 w-4 text-teal-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground">
                                        {previsao.atual.ventoKmh} km/h
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Velocidade do vento
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Índice UV */}
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                        Índice UV
                                    </CardTitle>
                                    <Sun className="h-4 w-4 text-yellow-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold text-foreground">
                                        {previsao.atual.indiceUV}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {badges_uv(previsao.atual.indiceUV)}
                                    </p>
                                </CardContent>
                            </Card>

                        </div>

                        {/* ── 2. Condição atual detalhada ─────────────────── */}
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-4xl" role="img" aria-label={previsao.atual.descricao}>
                                            {previsao.atual.icone}
                                        </span>
                                        <div>
                                            <CardTitle className="text-lg text-foreground">
                                                {previsao.atual.descricao}
                                            </CardTitle>
                                            <CardDescription>
                                                Condição meteorológica atual
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        Código WMO: {previsao.atual.codigoClima}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-4">
                                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <CloudRain className="h-4 w-4 text-blue-400" />
                                        <span>Precipitação: <strong className="text-foreground">{previsao.atual.precipitacao} mm</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Layers className="h-4 w-4 text-slate-400" />
                                        <span>Nuvens: <strong className="text-foreground">{previsao.atual.coberturaNuvens}%</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Eye className="h-4 w-4 text-indigo-400" />
                                        <span>Sensação: <strong className="text-foreground">{previsao.atual.sensacaoTermica}°C</strong></span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 3. Previsão horária (próximas 12h) ──────────── */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-foreground">
                                    Previsão Horária
                                </CardTitle>
                                <CardDescription>Próximas {Math.min(previsao.horas.length, 12)} horas</CardDescription>
                            </CardHeader>
                            <Separator />
                            <CardContent className="pt-4">
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {previsao.horas.slice(0, 12).map((hora, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-1.5 min-w-[60px] p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-center"
                                        >
                                            <span className="text-[10px] text-muted-foreground font-medium">
                                                {formatarHora(hora.hora)}
                                            </span>
                                            <span className="text-xl" role="img" aria-label={hora.icone}>
                                                {hora.icone}
                                            </span>
                                            <span className="text-sm font-bold text-foreground">
                                                {hora.temperatura}°
                                            </span>
                                            {hora.probabilidadeChuva > 0 && (
                                                <span className="text-[10px] text-blue-500 font-medium">
                                                    {hora.probabilidadeChuva}%
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 4. Previsão dos próximos 7 dias ─────────────── */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base text-foreground">
                                    Próximos 7 Dias
                                </CardTitle>
                                <CardDescription>Previsão diária</CardDescription>
                            </CardHeader>
                            <Separator />
                            <CardContent className="p-0">
                                <div className="divide-y divide-border">
                                    {previsao.dias.map((dia, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-4 px-6 py-3 hover:bg-muted/40 transition-colors"
                                        >
                                            {/* Dia da semana */}
                                            <span className="text-sm font-semibold text-foreground w-8">
                                                {i === 0 ? 'Hoje' : dia.diaSemana}
                                            </span>

                                            {/* Ícone */}
                                            <span className="text-xl w-7 text-center" role="img" aria-label={dia.descricao}>
                                                {dia.icone}
                                            </span>

                                            {/* Descrição */}
                                            <span className="flex-1 text-sm text-muted-foreground hidden sm:block">
                                                {dia.descricao}
                                            </span>

                                            {/* Precipitação */}
                                            {dia.probabilidadeChuvaMax > 0 && (
                                                <div className="flex items-center gap-1 text-blue-500 text-xs w-10 justify-end">
                                                    <CloudRain className="h-3 w-3" />
                                                    <span>{dia.probabilidadeChuvaMax}%</span>
                                                </div>
                                            )}

                                            {/* Temperaturas min/max */}
                                            <div className="flex items-center gap-2 text-sm w-24 justify-end shrink-0">
                                                <span className="text-blue-400 font-medium">{dia.temperaturaMin}°</span>
                                                <span className="text-muted-foreground">/</span>
                                                <span className="text-orange-400 font-bold">{dia.temperaturaMax}°</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ── 5. Rodapé com info da API ────────────────────── */}
                        <p className="text-xs text-muted-foreground text-center pb-2">
                            Dados fornecidos por{' '}
                            <a
                                href="https://open-meteo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline underline-offset-2 hover:no-underline"
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
    if (uv <= 2)  return 'Baixo';
    if (uv <= 5)  return 'Moderado';
    if (uv <= 7)  return 'Alto';
    if (uv <= 10) return 'Muito alto';
    return 'Extremo';
}
