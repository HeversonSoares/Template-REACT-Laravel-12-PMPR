// =============================================================================
// TEMPLATE LIMPO — Ponto de partida para novas páginas
// =============================================================================
// Copie este arquivo para o seu módulo e adapte conforme a necessidade.
// Caminho sugerido: resources/js/modules/SeuModulo/pages/SuaPagina.jsx
//
// Após copiar:
//   1. Renomeie a função exportada (ex: MinhaNovaPage)
//   2. Registre a rota em resources/js/app.jsx
//   3. Adicione o item de menu no arquivo *Menu.jsx do seu módulo
// =============================================================================

import React, { useState, useEffect } from 'react';

// ─── Layout principal da aplicação (sidebar + topbar + main) ─────────────────
import Layout from '@/components/Layout';

// ─── TemplateMenu: cabeçalho + navegação do módulo Template ──────────────────
// Substitua pelo *Menu.jsx do seu próprio módulo.
import TemplateMenu from '../components/TemplateMenu';

// ─── Card: container de conteúdo padrão ──────────────────────────────────────
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card';

// ─── Skeleton: placeholder de carregamento ───────────────────────────────────
import { Skeleton } from '@/components/ui/skeleton';

// ─── Button: botão estilizado (variantes: default, outline, ghost, destructive,
//             secondary, success) ────────────────────────────────────────────
import { Button } from '@/components/ui/button';

// ─── ActionButton: botão com ícone padronizado, suporta modo responsivo/compact
//     Props: icon, label, variant, size, compact, responsive, disabled, onClick
import ActionButton from '@/components/ui/action-button';

// ─── Input: campo de texto padronizado ───────────────────────────────────────
import { Input } from '@/components/ui/input';

// ─── Select: caixa de seleção padronizada ────────────────────────────────────
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

// ─── Dialog (Modal): caixa de diálogo sobreposta ─────────────────────────────
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

// ─── Badge: etiqueta colorida de status ──────────────────────────────────────
import { Badge } from '@/components/ui/badge';

// ─── Separator: linha divisória visual ───────────────────────────────────────
import { Separator } from '@/components/ui/separator';

// ─── Tabs: abas de conteúdo ──────────────────────────────────────────────────
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// ─── Table: tabela de dados padronizada ──────────────────────────────────────
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// ─── Switch: toggle on/off ───────────────────────────────────────────────────
import { Switch } from '@/components/ui/switch';

// ─── PageHeader: cabeçalho interno de seção (tamanho "sm" para sub-seções) ───
import PageHeader from '@/components/PageHeader';

// ─── Ícones: use os do lucide-react ──────────────────────────────────────────
import {
    Plus,
    Save,
    Trash2,
    Download,
    Search,
    FileText,
    RefreshCw,
    CheckCircle,
    AlertCircle,
    Info,
} from 'lucide-react';

// =============================================================================
// DADOS DE EXEMPLO — remova/substitua pelos dados reais do seu módulo
// =============================================================================
const EXEMPLO_DADOS = [
    { id: 1, nome: 'Registro Alpha',  status: 'Ativo',     tipo: 'Tipo A' },
    { id: 2, nome: 'Registro Beta',   status: 'Inativo',   tipo: 'Tipo B' },
    { id: 3, nome: 'Registro Gama',   status: 'Pendente',  tipo: 'Tipo A' },
];

// =============================================================================
// COMPONENTE PRINCIPAL
// =============================================================================
export default function TemplateBlank() {
    // ── Estado: carregamento inicial ──────────────────────────────────────────
    const [isLoading, setIsLoading]       = useState(true);

    // ── Estado: controle de modal/dialog ─────────────────────────────────────
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // ── Estado: campos de formulário ─────────────────────────────────────────
    const [nome, setNome]                 = useState('');
    const [tipo, setTipo]                 = useState('');
    const [ativo, setAtivo]               = useState(false);

    // ── Simula carregamento de dados (substitua por fetch/axios real) ─────────
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

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
                    <div className="grid gap-4 md:grid-cols-3">
                        <Skeleton className="h-28 rounded-xl bg-muted" />
                        <Skeleton className="h-28 rounded-xl bg-muted" />
                        <Skeleton className="h-28 rounded-xl bg-muted" />
                    </div>
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
                {/* Componente TemplateMenu: unifica PageHeader + ModuleNavigation  */}
                {/* Substitua por <SeuModuloMenu /> ao usar em outro módulo      */}
                <TemplateMenu />

                {/* ── Área de conteúdo principal ──────────────────────────── */}
                <div className="space-y-6">

                    {/* ── 1. Cards de métricas / KPIs ─────────────────────── */}
                    {/* Use para resumos rápidos no topo da página              */}
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                    Total de Registros
                                </CardTitle>
                                <FileText className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">
                                    {EXEMPLO_DADOS.length}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Atualizado agora
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                    Ativos
                                </CardTitle>
                                <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">
                                    {EXEMPLO_DADOS.filter(d => d.status === 'Ativo').length}
                                </div>
                                <p className="text-xs text-emerald-600 mt-1 font-medium">
                                    registros ativos
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="hover:shadow-md transition-shadow">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
                                    Pendentes
                                </CardTitle>
                                <AlertCircle className="h-4 w-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-foreground">
                                    {EXEMPLO_DADOS.filter(d => d.status === 'Pendente').length}
                                </div>
                                <p className="text-xs text-amber-600 mt-1 font-medium">
                                    aguardando ação
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ── 2. Card principal: filtros + ações + tabela ─────── */}
                    <Card>
                        {/* Cabeçalho do card com PageHeader no tamanho "sm" */}
                        <CardHeader className="border-b border-border pb-4">
                            <PageHeader
                                title="Lista de Registros"
                                description="Gerencie os registros cadastrados no sistema."
                                icon={FileText}
                                size="sm"
                            >
                                {/* ── ActionButton: botão padronizado com ícone ── */}
                                {/* variant="outline" → borda; variant="default" → primário */}
                                {/* variant="success" → verde; variant="destructive" → vermelho */}
                                <ActionButton
                                    icon={Download}
                                    label="Exportar"
                                    variant="outline"
                                    responsive
                                />
                                <ActionButton
                                    icon={RefreshCw}
                                    label="Atualizar"
                                    variant="outline"
                                    responsive
                                />

                                {/* ── Dialog (Modal) ─────────────────────────── */}
                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <ActionButton
                                            icon={Plus}
                                            label="Novo Registro"
                                            variant="default"
                                            responsive
                                        />
                                    </DialogTrigger>

                                    <DialogContent className="bg-background border border-border text-foreground sm:max-w-[460px]">
                                        <DialogHeader>
                                            <DialogTitle className="text-xl font-bold text-foreground">
                                                Novo Registro
                                            </DialogTitle>
                                            <DialogDescription className="text-muted-foreground">
                                                Preencha os campos abaixo para cadastrar um novo item.
                                            </DialogDescription>
                                        </DialogHeader>

                                        {/* ── Formulário dentro do Dialog ──── */}
                                        <div className="grid gap-4 py-4">
                                            {/* Input */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="nome" className="text-right text-sm font-medium">
                                                    Nome
                                                </label>
                                                <Input
                                                    id="nome"
                                                    value={nome}
                                                    onChange={(e) => setNome(e.target.value)}
                                                    placeholder="Digite o nome..."
                                                    className="col-span-3"
                                                />
                                            </div>

                                            {/* Select */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label htmlFor="tipo" className="text-right text-sm font-medium">
                                                    Tipo
                                                </label>
                                                <div className="col-span-3">
                                                    <Select value={tipo} onValueChange={setTipo}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Selecione um tipo..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="tipo-a">Tipo A</SelectItem>
                                                            <SelectItem value="tipo-b">Tipo B</SelectItem>
                                                            <SelectItem value="tipo-c">Tipo C</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>

                                            {/* Switch */}
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <label className="text-right text-sm font-medium">
                                                    Ativo
                                                </label>
                                                <div className="col-span-3 flex items-center gap-2">
                                                    <Switch
                                                        checked={ativo}
                                                        onCheckedChange={setAtivo}
                                                    />
                                                    <span className="text-sm text-muted-foreground">
                                                        {ativo ? 'Sim' : 'Não'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                                Cancelar
                                            </Button>
                                            <Button variant="success" onClick={() => setIsDialogOpen(false)}>
                                                <Save className="h-4 w-4" />
                                                Salvar
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </PageHeader>
                        </CardHeader>

                        {/* ── Barra de filtros ──────────────────────────────── */}
                        <div className="px-6 py-3 border-b border-border flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <div className="relative flex-1 w-full sm:max-w-xs">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar registros..."
                                    className="pl-8"
                                />
                            </div>
                            <Select>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="ativo">Ativo</SelectItem>
                                    <SelectItem value="inativo">Inativo</SelectItem>
                                    <SelectItem value="pendente">Pendente</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* ── Tabela de dados ───────────────────────────────── */}
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-12">#</TableHead>
                                        <TableHead>Nome</TableHead>
                                        <TableHead>Tipo</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {EXEMPLO_DADOS.map((row) => (
                                        <TableRow key={row.id} className="hover:bg-muted/40">
                                            <TableCell className="text-muted-foreground text-xs">
                                                {row.id}
                                            </TableCell>
                                            <TableCell className="font-medium text-foreground">
                                                {row.nome}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {row.tipo}
                                            </TableCell>
                                            <TableCell>
                                                {/* ── Badge de status ── */}
                                                <Badge
                                                    variant={
                                                        row.status === 'Ativo'
                                                            ? 'default'
                                                            : row.status === 'Pendente'
                                                            ? 'secondary'
                                                            : 'outline'
                                                    }
                                                >
                                                    {row.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Info className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>

                        <CardFooter className="px-6 py-3 border-t border-border text-xs text-muted-foreground">
                            Exibindo {EXEMPLO_DADOS.length} registro(s)
                        </CardFooter>
                    </Card>

                    {/* ── 3. Seção com Tabs ────────────────────────────────── */}
                    <Card>
                        <CardHeader className="pb-0">
                            <CardTitle className="text-base text-foreground">
                                Detalhes Adicionais
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Organize conteúdo em abas quando há múltiplas categorias.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <Tabs defaultValue="informacoes">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="informacoes">Informações</TabsTrigger>
                                    <TabsTrigger value="historico">Histórico</TabsTrigger>
                                    <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
                                </TabsList>

                                <TabsContent value="informacoes">
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground">
                                            Conteúdo da aba <strong>Informações</strong>. Insira aqui os
                                            detalhes principais do item selecionado.
                                        </p>
                                        <Separator />
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="font-medium text-foreground">Campo 1:</span>
                                                <span className="text-muted-foreground ml-2">Valor de exemplo</span>
                                            </div>
                                            <div>
                                                <span className="font-medium text-foreground">Campo 2:</span>
                                                <span className="text-muted-foreground ml-2">Outro valor</span>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="historico">
                                    <p className="text-sm text-muted-foreground">
                                        Conteúdo da aba <strong>Histórico</strong>. Liste aqui os eventos
                                        ou alterações relacionadas ao registro.
                                    </p>
                                </TabsContent>

                                <TabsContent value="configuracoes">
                                    <p className="text-sm text-muted-foreground">
                                        Conteúdo da aba <strong>Configurações</strong>. Exiba opções de
                                        configuração específicas para este contexto.
                                    </p>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </Layout>
    );
}
