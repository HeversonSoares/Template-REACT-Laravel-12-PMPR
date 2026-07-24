import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Search, SlidersHorizontal, MoreHorizontal, AlertCircle, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function TemplateTablesResumo() {
    const chamados = [
        {
            id: "CHM-3829",
            assunto: "Falha de conexão com o banco de dados principal",
            solicitante: "Maria Silva (Operações)",
            prioridade: "Critica",
            status: "Aberto",
            data: "20/07/2026 08:30"
        },
        {
            id: "CHM-3825",
            assunto: "Instabilidade na API de integração externa",
            solicitante: "João Souza (Template)",
            prioridade: "Alta",
            status: "Em Atendimento",
            data: "20/07/2026 07:15"
        },
        {
            id: "CHM-3811",
            assunto: "Configuração de novas chaves de API de homologação",
            solicitante: "Carlos Santos (QA)",
            prioridade: "Média",
            status: "Pendente",
            data: "19/07/2026 16:45"
        },
        {
            id: "CHM-3798",
            assunto: "Atualização de segurança do servidor de produção",
            solicitante: "Admin (Infraestrutura)",
            prioridade: "Alta",
            status: "Resolvido",
            data: "19/07/2026 14:00"
        },
        {
            id: "CHM-3790",
            assunto: "Ajuste de layout no painel administrativo",
            solicitante: "Ana Rodrigues (UI/UX)",
            prioridade: "Baixa",
            status: "Resolvido",
            data: "19/07/2026 11:20"
        }
    ];

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'Critica':
                return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none shadow-none font-semibold flex items-center gap-1 w-fit"><AlertCircle className="h-3 w-3" /> Crítica</Badge>;
            case 'Alta':
                return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none shadow-none font-semibold flex items-center gap-1 w-fit"><AlertTriangle className="h-3 w-3" /> Alta</Badge>;
            case 'Média':
                return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none shadow-none font-semibold flex items-center gap-1 w-fit font-medium">Média</Badge>;
            case 'Baixa':
                return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-none shadow-none font-semibold flex items-center gap-1 w-fit font-medium">Baixa</Badge>;
            default:
                return null;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Aberto':
                return <Badge className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none font-semibold flex items-center gap-1 w-fit"><Clock className="h-3 w-3" /> Aberto</Badge>;
            case 'Em Atendimento':
                return <Badge className="bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200 shadow-none font-semibold flex items-center gap-1 w-fit"><Clock className="h-3 w-3" /> Em Atendimento</Badge>;
            case 'Pendente':
                return <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 shadow-none font-semibold flex items-center gap-1 w-fit"><Clock className="h-3 w-3" /> Pendente</Badge>;
            case 'Resolvido':
                return <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 shadow-none font-semibold flex items-center gap-1 w-fit"><CheckCircle2 className="h-3 w-3" /> Resolvido</Badge>;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <Card>
                    <CardHeader className="pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle className="text-lg">Resumo de Chamados e Suporte</CardTitle>
                            <CardDescription>Visualização em tempo real das solicitações de suporte e status de resolução.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-initial">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Buscar chamado..." className="pl-9 h-9 w-full md:w-64" />
                            </div>
                            <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                                <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]">ID Chamado</TableHead>
                                    <TableHead>Assunto / Descrição</TableHead>
                                    <TableHead>Solicitante</TableHead>
                                    <TableHead>Prioridade</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Data de Abertura</TableHead>
                                    <TableHead className="text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chamados.map((chamado) => (
                                    <TableRow key={chamado.id}>
                                        <TableCell className="font-semibold text-foreground">{chamado.id}</TableCell>
                                        <TableCell className="max-w-[300px] truncate font-medium text-foreground">{chamado.assunto}</TableCell>
                                        <TableCell>{chamado.solicitante}</TableCell>
                                        <TableCell>{getPriorityBadge(chamado.prioridade)}</TableCell>
                                        <TableCell>{getStatusBadge(chamado.status)}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">{chamado.data}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center py-4 border-t">
                        <span className="text-xs text-muted-foreground">Exibindo 5 de 42 chamados</span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled className="h-8 text-xs font-semibold">Anterior</Button>
                            <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Próximo</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}
