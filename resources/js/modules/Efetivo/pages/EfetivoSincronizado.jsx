import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import EfetivoMenu from '../components/EfetivoMenu';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle
} from '@/components/ui/card';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Search, RefreshCw, Check } from 'lucide-react';

const MOCK_EMPLOYEES = [
    { id: '1', extId: 'EXT-011A', name: 'Alessandra Santos', role: 'Gerente de Produto', email: 'alessandra.santos@empresa.com', status: 'synchronized', lastUpdate: '15/07/2026 12:00' },
    { id: '2', extId: 'EXT-992B', name: 'Thiago Oliveira', role: 'Engenheiro de Software Senior', email: 'thiago.oliveira@empresa.com', status: 'synchronized', lastUpdate: '15/07/2026 11:32' },
    { id: '3', extId: 'EXT-304C', name: 'Camila Fernandes', role: 'Designer UX/UI', email: 'camila.fernandes@empresa.com', status: 'pending', lastUpdate: 'Pendente - Aguardando aprovação' },
    { id: '4', extId: 'EXT-512D', name: 'Daniel Souza', role: 'Analista de Suporte', email: 'daniel.souza@empresa.com', status: 'error', lastUpdate: 'Erro no CPF inválido' },
    { id: '5', extId: 'EXT-045F', name: 'Mariana Lima', role: 'Diretora de RH', email: 'mariana.lima@empresa.com', status: 'synchronized', lastUpdate: '15/07/2026 10:15' }
];

export default function EfetivoSincronizado() {
    const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
    const [searchTerm, setSearchTerm] = useState('');
    const [syncingAll, setSyncingAll] = useState(false);
    const [syncStatus, setSyncStatus] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 850);
        return () => clearTimeout(timer);
    }, []);

    const triggerSyncSingle = (id) => {
        setSyncStatus(prev => ({ ...prev, [id]: 'syncing' }));
        setTimeout(() => {
            setSyncStatus(prev => ({ ...prev, [id]: 'done' }));
            setEmployees(prev => prev.map(emp => {
                if (emp.id === id) {
                    return { ...emp, status: 'synchronized', lastUpdate: 'Agora mesmo' };
                }
                return emp;
            }));
            setTimeout(() => {
                setSyncStatus(prev => ({ ...prev, [id]: null }));
            }, 2000);
        }, 1500);
    };

    const triggerSyncAll = () => {
        setSyncingAll(true);
        setTimeout(() => {
            setEmployees(prev => prev.map(emp => ({
                ...emp,
                status: emp.status === 'error' ? 'error' : 'synchronized',
                lastUpdate: emp.status === 'error' ? emp.lastUpdate : 'Agora mesmo'
            })));
            setSyncingAll(false);
        }, 2000);
    };

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <Layout>
                <div className="w-full p-6 space-y-6 animate-pulse">
                    <Skeleton className="h-24 w-full bg-slate-200" />
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48 bg-slate-200 mb-2" />
                            <Skeleton className="h-4 w-96 bg-slate-200" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-10 w-full bg-slate-200" />
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-8 flex-1 bg-slate-200" />
                                    <Skeleton className="h-8 flex-1 bg-slate-200" />
                                    <Skeleton className="h-8 flex-1 bg-slate-200" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="w-full p-6">
                <EfetivoMenu onSyncAll={triggerSyncAll} isSyncing={syncingAll} />

                <Card className="bg-white border-slate-250 shadow-sm mt-6">
                    <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle className="text-slate-900">Efetivo Importado</CardTitle>
                            <CardDescription className="text-slate-500">
                                Lista de perfis importados e vinculados.
                            </CardDescription>
                        </div>
                        <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-64">
                            <Search className="h-4 w-4 text-slate-400 mr-2" />
                            <input 
                                type="text" 
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="bg-transparent border-0 outline-none text-xs text-slate-800 placeholder-slate-400 w-full"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-lg border border-slate-200">
                            <Table>
                                <TableHeader className="bg-slate-50">
                                    <TableRow className="hover:bg-slate-50 border-slate-200">
                                        <TableHead className="text-slate-500 font-semibold">ID Externo</TableHead>
                                        <TableHead className="text-slate-500 font-semibold">Nome</TableHead>
                                        <TableHead className="text-slate-500 font-semibold">Cargo</TableHead>
                                        <TableHead className="text-slate-500 font-semibold">E-mail</TableHead>
                                        <TableHead className="text-slate-500 font-semibold">Status</TableHead>
                                        <TableHead className="text-slate-500 font-semibold">Última Sincronização</TableHead>
                                        <TableHead className="text-slate-500 w-[100px] text-right font-semibold">Ação</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredEmployees.map((emp) => (
                                        <TableRow key={emp.id} className="hover:bg-slate-50/50 border-slate-200">
                                            <TableCell className="font-mono text-xs text-emerald-600 font-semibold">{emp.extId}</TableCell>
                                            <TableCell className="font-semibold text-slate-800">{emp.name}</TableCell>
                                            <TableCell className="text-slate-600">{emp.role}</TableCell>
                                            <TableCell className="text-slate-500 text-xs">{emp.email}</TableCell>
                                            <TableCell>
                                                {emp.status === 'synchronized' && (
                                                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">
                                                        Sincronizado
                                                    </Badge>
                                                )}
                                                {emp.status === 'pending' && (
                                                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
                                                        Pendente
                                                    </Badge>
                                                )}
                                                {emp.status === 'error' && (
                                                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px]">
                                                        Erro
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-slate-500 text-xs">{emp.lastUpdate}</TableCell>
                                            <TableCell className="text-right">
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm"
                                                    disabled={syncStatus[emp.id] === 'syncing'}
                                                    onClick={() => triggerSyncSingle(emp.id)}
                                                    className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                                                >
                                                    {syncStatus[emp.id] === 'done' ? (
                                                        <Check className="h-4 w-4 text-emerald-650" />
                                                    ) : (
                                                        <RefreshCw className={`h-4 w-4 ${syncStatus[emp.id] === 'syncing' ? 'animate-spin text-emerald-600' : ''}`} />
                                                    )}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
