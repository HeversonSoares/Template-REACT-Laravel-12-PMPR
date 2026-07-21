// =============================================================================
// TEMPLATE LIMPO — Ponto de partida para novas páginas
// =============================================================================
// Copie este arquivo para o seu módulo e adapte conforme a necessidade.
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

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateBlank() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full min-h-[calc(100vh-6.5rem)] flex flex-col">
                {/* ── Cabeçalho do módulo + navegação ─────────────────────── */}
                <TemplateMenu />

                {/* ── Card em Branco Responsivo (linha sutil, preenche altura até o rodapé) ── */}
                <Card className="flex-1 w-full border border-border shadow-sm flex flex-col items-center justify-center text-center p-6">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-foreground">
                            Página em Branco
                        </CardTitle>
                        <CardDescription className="text-muted-foreground max-w-md">
                            Este é um card em branco responsivo padronizado. Utilize este espaço para construir novos componentes e funcionalidades do seu módulo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            Substitua este conteúdo pelo layout ou formulário desejado.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
