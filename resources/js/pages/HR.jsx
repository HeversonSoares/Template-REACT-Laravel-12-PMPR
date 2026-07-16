import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
    CardFooter 
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Skeleton } from '../components/ui/skeleton';
import { 
    Users, 
    RefreshCw, 
    ArrowLeftRight, 
    Check, 
    Search, 
    ShieldAlert, 
    Calendar,
    Settings,
    Briefcase
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '../components/ui/navigation-menu';

const MOCK_EMPLOYEES = [
    { id: '1', extId: 'EXT-011A', name: 'Alessandra Santos', role: 'Gerente de Produto', email: 'alessandra.santos@empresa.com', status: 'synchronized', lastUpdate: '15/07/2026 12:00' },
    { id: '2', extId: 'EXT-992B', name: 'Thiago Oliveira', role: 'Engenheiro de Software Senior', email: 'thiago.oliveira@empresa.com', status: 'synchronized', lastUpdate: '15/07/2026 11:32' },
    { id: '3', extId: 'EXT-304C', name: 'Camila Fernandes', role: 'Designer UX/UI', email: 'camila.fernandes@empresa.com', status: 'pending', lastUpdate: 'Pendente - Aguardando aprovação' },
    { id: '4', extId: 'EXT-512D', name: 'Daniel Souza', role: 'Analista de Suporte', email: 'daniel.souza@empresa.com', status: 'error', lastUpdate: 'Erro no CPF inválido' },
    { id: '5', extId: 'EXT-045F', name: 'Mariana Lima', role: 'Diretora de RH', email: 'mariana.lima@empresa.com', status: 'synchronized', lastUpdate: '15/07/2026 10:15' }
];

const MOCK_MAPPINGS = [
    { localField: 'Nome Completo', type: 'string', externalField: 'full_name', required: true },
    { localField: 'E-mail Principal', type: 'string', externalField: 'corporate_email', required: true },
    { localField: 'Cargo/Função', type: 'string', externalField: 'current_position.title', required: false },
    { localField: 'Salário Base', type: 'number', externalField: 'contract.compensation.salary', required: false },
    { localField: 'Data de Admissão', type: 'date', externalField: 'hiring_date', required: true },
];

export default function HR() {
    const navigate = useNavigate();
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
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-80 bg-slate-200" />
                            <Skeleton className="h-4 w-96 bg-slate-200" />
                            {/* Breadcrumb Skeleton */}
                            <Skeleton className="h-4 w-40 bg-slate-200 mt-2" />
                        </div>
                        <Skeleton className="h-10 w-44 rounded-xl bg-slate-200" />
                    </div>
                    {/* Tabs Skeleton */}
                    <Skeleton className="h-10 w-64 bg-slate-200" />
                    {/* Card/Table Skeleton */}
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
            <div className="w-full p-6 space-y-6">
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <Users className="h-6 w-6 text-slate-700 shrink-0" />
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Integração RH (Recursos Humanos)</h1>
                            </div>
                            <p className="text-slate-500 text-sm mt-1">
                                Módulo de conexão com a plataforma externa de RH corporativo.
                            </p>
                        </div>
                        <Button 
                            onClick={triggerSyncAll}
                            disabled={syncingAll}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl gap-2 shadow"
                        >
                            <RefreshCw className={`h-4 w-4 ${syncingAll ? 'animate-spin' : ''}`} /> 
                            {syncingAll ? 'Sincronizando...' : 'Sincronizar Tudo'}
                        </Button>
                    </div>

                    <hr className="border-slate-200" />

                    <div className="flex items-center justify-between">
                        {/* Navigation Menu */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-1">
                                <NavigationMenuItem>
                                    <Link to="/" className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm`}>
                                        Hub
                                    </Link>
                                </NavigationMenuItem>
                                <span className="text-slate-350 self-center">/</span>
                                <NavigationMenuItem>
                                    <span className={`${navigationMenuTriggerStyle()} bg-slate-100 text-slate-900 font-semibold rounded-md h-9 text-xs sm:text-sm cursor-default hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100`}>
                                        RH
                                    </span>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Tabs for different sections */}
                <Tabs defaultValue="employees" className="space-y-6">
                    <TabsList className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm">
                        <TabsTrigger value="employees" className="data-[state=active]:bg-emerald-650 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-4 py-2 text-xs sm:text-sm text-slate-600">
                            Funcionários Sincronizados
                        </TabsTrigger>
                        <TabsTrigger value="mapping" className="data-[state=active]:bg-emerald-650 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-4 py-2 text-xs sm:text-sm text-slate-600">
                            Mapeamento de Campos
                        </TabsTrigger>
                        <TabsTrigger value="config" className="data-[state=active]:bg-emerald-650 data-[state=active]:bg-emerald-600 data-[state=active]:text-white rounded-lg px-4 py-2 text-xs sm:text-sm text-slate-600">
                            Parâmetros de Conexão
                        </TabsTrigger>
                    </TabsList>

                    {/* EMPLOYEES TAB */}
                    <TabsContent value="employees" className="space-y-4 outline-none">
                        <Card className="bg-white border-slate-250 shadow-sm">
                            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle className="text-slate-900">Colaboradores Importados</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Lista de perfis importados e vinculados entre o ERP central e o software de RH.
                                    </CardDescription>
                                </div>
                                <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-64">
                                    <Search className="h-4 w-4 text-slate-400 mr-2" />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar colaborador..."
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
                    </TabsContent>

                    {/* FIELD MAPPING TAB */}
                    <TabsContent value="mapping" className="space-y-4 outline-none">
                        <Card className="bg-white border-slate-250 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-slate-900">De/Para - Mapeamento de Campos</CardTitle>
                                <CardDescription className="text-slate-500">
                                    Correlacione as colunas da API externa de RH com os campos internos do banco de dados principal.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-slate-550 pb-2 border-b border-slate-200">
                                        <div className="col-span-4">Campo no Banco Core</div>
                                        <div className="col-span-2">Tipo de Dado</div>
                                        <div className="col-span-5">Propriedade do JSON (API Externa)</div>
                                        <div className="col-span-1 text-center">Obrigatório</div>
                                    </div>

                                    {MOCK_MAPPINGS.map((map, idx) => (
                                        <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3 border-b border-slate-100">
                                            <div className="col-span-4 font-semibold text-slate-700 flex items-center gap-2">
                                                <Briefcase className="h-4 w-4 text-slate-400" />
                                                {map.localField}
                                            </div>
                                            <div className="col-span-2">
                                                <Badge variant="outline" className="border-slate-200 text-slate-500 bg-slate-50 text-[10px]">
                                                    {map.type}
                                                </Badge>
                                            </div>
                                            <div className="col-span-5">
                                                <Input 
                                                    defaultValue={map.externalField} 
                                                    className="bg-white border-slate-200 font-mono text-xs text-slate-800 focus-visible:ring-emerald-500 h-9"
                                                />
                                            </div>
                                            <div className="col-span-1 flex justify-center">
                                                <span className={`h-2.5 w-2.5 rounded-full ${map.required ? 'bg-emerald-500' : 'bg-slate-300'}`} title={map.required ? 'Obrigatório' : 'Opcional'}></span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-slate-150 pt-4 flex justify-end gap-2">
                                <Button variant="outline" className="border-slate-200 hover:bg-slate-50 text-xs">Descartar Alterações</Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Mapeamento</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* CONNECTION CONFIG TAB */}
                    <TabsContent value="config" className="space-y-4 outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="bg-white border-slate-250 shadow-sm lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-slate-900">Configurações do Endpoint de Integração</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Defina a URL base, chaves e credenciais para autenticação de requisições.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Base URL do RH Externo</label>
                                        <Input 
                                            defaultValue="https://api.talentflow-hrms.com/v2/integration" 
                                            className="bg-white border-slate-200 text-slate-800 focus-visible:ring-emerald-500 font-mono text-xs"
                                        />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Client ID / Token Key</label>
                                            <Input 
                                                defaultValue="tf_client_889104_prod" 
                                                className="bg-white border-slate-200 text-slate-800 focus-visible:ring-emerald-500 font-mono text-xs"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Secret Key</label>
                                            <Input 
                                                type="password" 
                                                value="••••••••••••••••••••••••••••" 
                                                disabled
                                                className="bg-slate-50 border-slate-200 text-slate-400 focus-visible:ring-emerald-500 font-mono text-xs"
                                            />
                                        </div>
                                    </div>

                                    <div className="border-t border-slate-150 my-4 pt-4 space-y-4">
                                        <h3 className="text-sm font-bold text-slate-800">Regras de Sincronização</h3>
                                        <div className="flex items-center justify-between py-1">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700">Sincronização Automática Noturna</p>
                                                <p className="text-xs text-slate-500">Executa a sincronização completa todos os dias às 02h00.</p>
                                            </div>
                                            <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                                        </div>
                                        <div className="flex items-center justify-between py-1">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-700">Notificar Erros</p>
                                                <p className="text-xs text-slate-500">Envia e-mail de alerta caso ocorram falhas de conexão ou integridade.</p>
                                            </div>
                                            <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t border-slate-150 pt-4 flex justify-end gap-2">
                                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Configurações</Button>
                                </CardFooter>
                            </Card>

                            <Card className="bg-white border-slate-250 shadow-sm flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-amber-600">
                                        <ShieldAlert className="h-5 w-5" /> Status do Link
                                    </CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Status atual de conectividade entre servidores.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Conectividade:</span>
                                            <span className="text-emerald-600 font-bold">100% Ativo</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Ping:</span>
                                            <span className="text-slate-700 font-mono">42ms (Estável)</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-500">Última checagem:</span>
                                            <span className="text-slate-655 text-slate-600">Agora mesmo</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-slate-500 space-y-1">
                                        <p className="font-semibold text-slate-700">Certificado SSL:</p>
                                        <p className="flex items-center gap-1 text-emerald-650 text-emerald-600 font-semibold">
                                            <Check className="h-3 w-3" /> Válido até Jan/2027
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-4 border-t border-slate-150">
                                    <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 text-xs gap-1.5">
                                        Testar Endpoint
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
