import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutTemplate, BookOpen, Layers, ShieldCheck } from 'lucide-react';

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

                    {/* Nova seção explicando arquitetura de rotas e fluxo */}
                    <Card className="border-border shadow-sm overflow-hidden bg-card">
                        <div className="p-6 border-b border-border bg-muted/20">
                            <h3 className="text-lg font-bold text-foreground">Arquitetura de Rotas e Fluxo da Aplicação (React SPA + Laravel BFF)</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Entenda como o frontend em React (Single Page Application) e o backend Laravel (BFF) cooperam na mesma origem de forma segura.
                            </p>
                        </div>
                        <CardContent className="p-6 space-y-8">
                            
                            {/* Diagrama Visual Interativo */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">Fluxo de Requisições</h4>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-muted/10 p-6 border border-border rounded-xl">
                                    <div className="p-4 bg-background border border-border rounded-lg text-center shadow-sm">
                                        <div className="text-xs font-bold text-primary mb-1">Navegador</div>
                                        <p className="text-[11px] text-muted-foreground">Usuário acessa URL ou faz uma requisição HTTP</p>
                                    </div>
                                    
                                    <div className="flex justify-center text-muted-foreground py-2 md:py-0">
                                        <span className="text-sm font-mono font-bold">➜</span>
                                    </div>

                                    <div className="p-4 bg-background border border-border rounded-lg text-center shadow-sm relative">
                                        <div className="text-xs font-bold text-amber-500 mb-1">Laravel (Web Server)</div>
                                        <p className="text-[11px] text-muted-foreground">Roteia com base no padrão da URL</p>
                                    </div>

                                    <div className="flex flex-col gap-4">
                                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-center">
                                            <div className="text-xs font-bold text-emerald-500">Se for `/api/*`</div>
                                            <p className="text-[10px] text-muted-foreground">Laravel executa o controller e retorna JSON</p>
                                        </div>
                                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                                            <div className="text-xs font-bold text-blue-500">Qualquer outra rota</div>
                                            <p className="text-[10px] text-muted-foreground">Retorna view principal. React Router assume a tela</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-border" />

                            {/* Diretrizes para Desenvolvedores */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
                                        Como Criar Rotas no Backend
                                    </h4>
                                    <div className="text-xs space-y-2 text-muted-foreground">
                                        <p>
                                            Todas as rotas de dados/ações devem ser prefixadas com <strong>`/api/...`</strong> no arquivo de rotas do Laravel para evitar conflitos com o React.
                                        </p>
                                        <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-[11px] text-foreground font-mono">
{`// routes/web.php
Route::get('/api/meus-dados', [MeuController::class, 'index']);

// Deixe sempre por último:
Route::fallback(function () {
    return view('app');
});`}
                                        </pre>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">2</span>
                                        Como Criar Views e Páginas
                                    </h4>
                                    <div className="text-xs space-y-2 text-muted-foreground">
                                        <p>
                                            Não crie novas views `.blade.php`. A view <code>app.blade.php</code> é estática e serve apenas para carregar o React SPA. Crie novas páginas e componentes dentro de:
                                        </p>
                                        <pre className="bg-muted p-3 rounded-lg overflow-x-auto text-[11px] text-foreground font-mono">
{`// resources/js/modules/
// Exemplo de novo arquivo de página:
resources/js/modules/NovoModulo/pages/MinhaPagina.jsx`}
                                        </pre>
                                        <p>
                                            Depois, registre a rota correspondente do frontend no arquivo <code>resources/js/app.jsx</code> usando o <code>&lt;Route /&gt;</code> do React Router.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </CardContent>
                    </Card>

                    {/* Seção explicando segurança da arquitetura */}
                    <Card className="border-border shadow-sm overflow-hidden bg-card">
                        <div className="p-6 border-b border-border bg-muted/20">
                            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Segurança por Design na Prática
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Como nossa SPA se protege contra vulnerabilidades comuns como XSS, CSRF e vazamento de chaves confidenciais.
                            </p>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Proteção contra XSS
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        A sessão do usuário é gerenciada usando <strong>Cookies HttpOnly e Secure</strong> criados pelo Laravel. O JavaScript no frontend não consegue ler esses cookies, tornando impossível para scripts maliciosos (XSS) roubarem a sessão do usuário. Evitamos o armazenamento de tokens no <code>localStorage</code>.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Mitigação de CSRF
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        O Laravel exige verificação CSRF em todas as requisições que alteram estado. O frontend lê o cookie <code>XSRF-TOKEN</code> e o envia automaticamente no cabeçalho <code>X-XSRF-TOKEN</code> de requisições <code>POST</code>, <code>PUT</code> e <code>DELETE</code>.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Isolamento de Credenciais
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Segredos e credenciais de banco de dados e APIs externas são mantidos estritamente no backend. Apenas variáveis de ambiente prefixadas com <code>VITE_</code> no arquivo <code>.env</code> são empacotadas para o frontend.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                        Vantagem de CORS Simplificado
                                    </h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Ao rodar na mesma origem (mesmo domínio), eliminamos a complexidade de CORS e as vulnerabilidades comuns resultantes de configurações incorretas como <code>Access-Control-Allow-Origin: *</code>.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}

