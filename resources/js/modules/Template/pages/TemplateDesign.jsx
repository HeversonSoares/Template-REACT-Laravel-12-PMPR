import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TemplateDesign() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Standard Header Documentation */}
                    <Card className="p-6 space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Cabeçalho de Página (Page Header)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-slate-650 text-sm">
                                Use este padrão para o título principal no topo de cada página. Ele agrupa o título da página e uma descrição curta de apoio.
                            </p>
                            
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="space-y-0.5 border border-slate-200/60 p-4 rounded-lg bg-white">
                                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">Título da Página</h2>
                                    <p className="text-sm text-slate-500">Descrição ou subtítulo de apoio da página.</p>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-slate-700">Estrutura JSX:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<div className="space-y-0.5">
  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
    Título da Página
  </h2>
  <p className="text-sm text-slate-500">
    Descrição ou subtítulo de apoio da página.
  </p>
</div>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Standard Card Titles */}
                    <Card className="p-6 space-y-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Títulos de Seção / Cards</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-slate-650 text-sm">
                                Para títulos dentro de Cards, tabelas e seções secundárias da página, use o componente CardTitle configurado para text-lg.
                            </p>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Exemplo Visual:</span>
                                <div className="border border-slate-200/60 p-4 rounded-lg bg-white">
                                    <CardTitle className="text-lg font-semibold">Filtros de Pesquisa</CardTitle>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-slate-700">Estrutura JSX:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<CardHeader>
  <CardTitle className="text-lg font-semibold">
    Filtros de Pesquisa
  </CardTitle>
</CardHeader>`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subtitles & Alerts */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Outros Elementos Tipográficos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-slate-700">Subtítulo de Seção Menor (h3)</h3>
                                    <div className="border border-slate-200/60 p-4 rounded-lg bg-white">
                                        <h3 className="text-base font-semibold text-slate-900">Título da Seção</h3>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<h3 className="text-base font-semibold text-slate-900">
  Título da Seção
</h3>`}
                                    </pre>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-sm font-semibold text-slate-700">Texto Mutado / Legendas (p)</h3>
                                    <div className="border border-slate-200/60 p-4 rounded-lg bg-white">
                                        <p className="text-[11px] text-slate-400">Mensagem informativa menor.</p>
                                    </div>
                                    <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`<p className="text-[11px] text-slate-400">
  Mensagem informativa menor.
</p>`}
                                    </pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
