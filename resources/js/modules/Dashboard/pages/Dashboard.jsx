import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
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
import { Switch } from '@/components/ui/switch';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { 
    Layers, 
    Activity, 
    CheckCircle2, 
    AlertTriangle, 
    Clock, 
    Plus, 
    ArrowUpRight, 
    Database, 
    RefreshCw,
    Search
} from 'lucide-react';

const INITIAL_MODULES = [
    {
        id: 'hr',
        name: 'RH & Portal do Colaborador',
        description: 'Integração de funcionários, folhas de pagamento, férias e dados cadastrais.',
        type: 'REST API',
        status: 'active',
        lastSync: 'Há 10 minutos',
        health: 'good',
        errors: 0,
        route: '/efetivo'
    },
    {
        id: 'fleets',
        name: 'Gestão de Frotas & Viaturas',
        description: 'Monitoramento GPS de viaturas, consumo de combustível e alertas de manutenção.',
        type: 'Websocket / IoT',
        status: 'active',
        lastSync: 'Em tempo real',
        health: 'warning',
        errors: 3,
        route: '/fleets'
    },
    {
        id: 'settings',
        name: 'Configurações de Integração',
        description: 'Gerenciamento de chaves de API, webhooks e variáveis de ambiente.',
        type: 'Core Config',
        status: 'active',
        lastSync: 'Nunca',
        health: 'good',
        errors: 0,
        route: '/settings'
    },
    {
        id: 'templates',
        name: 'Biblioteca de Templates',
        description: 'Templates de Dashboard prontos com componentes baseados em shadcn/ui.',
        type: 'Exemplo UI',
        status: 'active',
        lastSync: 'Em tempo real',
        health: 'good',
        errors: 0,
        route: '/templates'
    }
];

export default function Dashboard() {
    const navigate = useNavigate();
    const [modules, setModules] = useState(INITIAL_MODULES);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Form State
    const [newModuleName, setNewModuleName] = useState('');
    const [newModuleDesc, setNewModuleDesc] = useState('');
    const [newModuleType, setNewModuleType] = useState('REST API');

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleToggleStatus = (id) => {
        setModules(prev => prev.map(mod => {
            if (mod.id === id) {
                const nextStatus = mod.status === 'active' ? 'inactive' : 'active';
                return {
                    ...mod,
                    status: nextStatus,
                    health: nextStatus === 'active' ? 'good' : 'unknown',
                    lastSync: nextStatus === 'active' ? 'Agora mesmo' : 'Nunca'
                };
            }
            return mod;
        }));
    };

    const handleAddModule = (e) => {
        e.preventDefault();
        if (!newModuleName) return;

        const newId = newModuleName.toLowerCase().replace(/\s+/g, '-');
        const newMod = {
            id: newId,
            name: newModuleName,
            description: newModuleDesc || 'Sem descrição fornecida.',
            type: newModuleType,
            status: 'inactive',
            lastSync: 'Nunca',
            health: 'unknown',
            errors: 0,
            route: '#'
        };

        setModules(prev => [...prev, newMod]);
        setNewModuleName('');
        setNewModuleDesc('');
        setIsAddOpen(false);
    };

    const filteredModules = modules.filter(mod => 
        mod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        mod.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeCount = modules.filter(m => m.status === 'active').length;
    const warningCount = modules.filter(m => m.status === 'active' && m.health === 'warning').length;

    if (isLoading) {
        return (
            <Layout>
                <div className="w-full p-6 space-y-8 animate-pulse">
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64 bg-slate-200" />
                            <Skeleton className="h-4 w-96 bg-slate-200" />
                            {/* Breadcrumb Skeleton */}
                            <Skeleton className="h-4 w-32 bg-slate-200 mt-2" />
                        </div>
                        <Skeleton className="h-10 w-32 rounded-xl bg-slate-200" />
                    </div>
                    {/* Cards Skeleton */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardHeader className="space-y-2">
                                    <Skeleton className="h-4 w-24 bg-slate-200" />
                                    <Skeleton className="h-8 w-16 bg-slate-200" />
                                </CardHeader>
                                <CardContent>
                                    <Skeleton className="h-4 w-full bg-slate-200" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    {/* Modules grid Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32 bg-slate-200" />
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i} className="h-48">
                                    <CardHeader className="space-y-2">
                                        <Skeleton className="h-6 w-32 bg-slate-200" />
                                        <Skeleton className="h-4 w-full bg-slate-200" />
                                    </CardHeader>
                                    <CardContent>
                                        <Skeleton className="h-10 w-full bg-slate-200" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="w-full p-6 space-y-8">
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2.5">
                                <Layers className="h-6 w-6 text-slate-700 shrink-0" />
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                                    Hub de Módulos Externos
                                </h2>
                            </div>
                            <p className="text-sm text-slate-500">
                                Gerencie conexões, sincronização e integridade dos sistemas conectados ao core.
                            </p>
                        </div>
                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-amber-550 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl gap-2 shadow">
                                    <Plus className="h-4 w-4" /> Novo Módulo
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white border border-slate-200 text-slate-905 sm:max-w-[425px]">
                                <form onSubmit={handleAddModule}>
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-slate-900">Adicionar Módulo Externo</DialogTitle>
                                        <DialogDescription className="text-slate-500">
                                            Cadastre uma nova integração externa. Você precisará configurar as credenciais depois.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-slate-700">Nome do Módulo</label>
                                            <Input 
                                                id="name" 
                                                value={newModuleName}
                                                onChange={e => setNewModuleName(e.target.value)}
                                                placeholder="Ex: CRM Salesforce" 
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-500"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="description" className="text-sm font-medium text-slate-700">Descrição</label>
                                            <Input 
                                                id="description" 
                                                value={newModuleDesc}
                                                onChange={e => setNewModuleDesc(e.target.value)}
                                                placeholder="Ex: Integração de contatos e leads" 
                                                className="bg-white border-slate-200 text-slate-900 focus-visible:ring-emerald-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="type" className="text-sm font-medium text-slate-700">Tipo de Integração</label>
                                            <Select value={newModuleType} onValueChange={setNewModuleType}>
                                                <SelectTrigger className="bg-white border-slate-200 text-slate-800">
                                                    <SelectValue placeholder="Selecione o protocolo" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-slate-200 text-slate-800">
                                                    <SelectItem value="REST API">REST API</SelectItem>
                                                    <SelectItem value="GraphQL">GraphQL</SelectItem>
                                                    <SelectItem value="Webhooks">Webhooks</SelectItem>
                                                    <SelectItem value="SOAP XML">SOAP XML / gRPC</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            onClick={() => setIsAddOpen(false)}
                                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
                                            Cadastrar
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <hr className="border-slate-200" />

                    <div className="flex items-center justify-between">
                        {/* Navigation Menu */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-1">
                                <NavigationMenuItem>
                                    <span className={`${navigationMenuTriggerStyle()} bg-slate-100 text-slate-900 font-semibold rounded-md h-9 text-xs sm:text-sm cursor-default hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100`}>
                                        Hub
                                    </span>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-white border-slate-250 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-slate-550">Total de Módulos</CardTitle>
                            <Layers className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-slate-900">{modules.length}</div>
                            <p className="text-xs text-slate-500 mt-1">Sistemas registrados</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-250 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-slate-550">Conexões Ativas</CardTitle>
                            <Activity className="h-4 w-4 text-emerald-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-emerald-600">{activeCount}</div>
                            <p className="text-xs text-slate-500 mt-1">Prontos para sincronização</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-250 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-slate-550">Instabilidade/Alertas</CardTitle>
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-amber-600">{warningCount}</div>
                            <p className="text-xs text-slate-500 mt-1">Requer atenção manual</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-slate-250 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-semibold text-slate-550">Requisições (24h)</CardTitle>
                            <Database className="h-4 w-4 text-slate-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-extrabold text-slate-900">24,530</div>
                            <p className="text-xs text-emerald-600 mt-1 font-semibold flex items-center gap-1">
                                +12% em relação a ontem
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Grid of Cards */}
                <div className="space-y-4">
                    <div className="flex items-center bg-white border border-slate-250 rounded-xl px-3 py-2 max-w-md shadow-sm">
                        <Search className="h-4 w-4 text-slate-400 mr-2" />
                        <input 
                            type="text" 
                            placeholder="Buscar módulo ou descrição..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="bg-transparent border-0 outline-none text-sm text-slate-800 placeholder-slate-400 w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredModules.map((mod) => (
                            <Card 
                                key={mod.id} 
                                className={`bg-white border-slate-250 shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${
                                    mod.status === 'inactive' ? 'opacity-70 bg-slate-50/50' : ''
                                }`}
                            >
                                <CardHeader>
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                {mod.name}
                                            </CardTitle>
                                            <CardDescription className="text-slate-500 mt-1 text-xs sm:text-sm">
                                                {mod.description}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                                            <Badge variant="outline" className="border-slate-200 text-slate-650 bg-slate-50 text-[10px]">
                                                {mod.type}
                                            </Badge>
                                            {mod.status === 'active' ? (
                                                mod.health === 'good' ? (
                                                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">
                                                        Saudável
                                                    </Badge>
                                                ) : (
                                                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
                                                        Instável
                                                    </Badge>
                                                )
                                            ) : (
                                                <Badge className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px]">
                                                    Inativo
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="py-3.5 border-t border-b border-slate-100 bg-slate-50/30 flex flex-wrap gap-y-2 justify-between items-center text-xs">
                                    <div className="flex items-center gap-1.5 text-slate-500">
                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                        <span>Última Sincronização:</span>
                                        <span className="text-slate-700 font-semibold">{mod.lastSync}</span>
                                    </div>
                                    {mod.errors > 0 && (
                                        <div className="flex items-center gap-1 text-rose-600 font-semibold">
                                            <AlertTriangle className="h-3.5 w-3.5" />
                                            <span>{mod.errors} erros de envio</span>
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter className="pt-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Switch 
                                            checked={mod.status === 'active'}
                                            onCheckedChange={() => handleToggleStatus(mod.id)}
                                            className="data-[state=checked]:bg-emerald-600"
                                        />
                                        <span className="text-xs text-slate-550 font-medium">
                                            {mod.status === 'active' ? 'Ativo' : 'Desativado'}
                                        </span>
                                    </div>

                                    {mod.status === 'active' && mod.route !== '#' ? (
                                        <Button 
                                            onClick={() => navigate(mod.route)}
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-emerald-700 hover:text-emerald-600 hover:bg-slate-100 gap-1"
                                        >
                                            Ver Painel <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button 
                                            disabled 
                                            variant="ghost" 
                                            size="sm" 
                                            className="text-slate-400 gap-1"
                                        >
                                            Não configurável
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Module Sync Logs Table */}
                <div className="bg-white border border-slate-250 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <h3 className="text-lg font-semibold text-slate-900">Log Global de Integração</h3>
                            <p className="text-sm text-slate-500">Últimos eventos transmitidos pelo Gateway central.</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 gap-1 text-xs">
                            <RefreshCw className="h-3.5 w-3.5" /> Atualizar
                        </Button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow className="hover:bg-slate-50 border-slate-200">
                                    <TableHead className="text-slate-500 w-[120px] font-semibold">Timestamp</TableHead>
                                    <TableHead className="text-slate-500 w-[150px] font-semibold">Módulo</TableHead>
                                    <TableHead className="text-slate-500 w-[100px] font-semibold">Tipo</TableHead>
                                    <TableHead className="text-slate-500 font-semibold">Payload/Evento</TableHead>
                                    <TableHead className="text-slate-500 w-[100px] text-right font-semibold">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="hover:bg-slate-50/50 border-slate-200">
                                    <TableCell className="font-mono text-slate-500 text-xs">12:30:15</TableCell>
                                    <TableCell className="font-semibold text-slate-700">RH Integration</TableCell>
                                    <TableCell><Badge variant="outline" className="text-[10px] border-slate-200 text-slate-600 bg-slate-50">REST POST</Badge></TableCell>
                                    <TableCell className="text-slate-600 text-xs font-mono truncate max-w-[300px]">{"{ employee_id: 1045, action: 'promoted_role' }"}</TableCell>
                                    <TableCell className="text-right"><Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">Sucesso</Badge></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-200">
                                    <TableCell className="font-mono text-slate-500 text-xs">12:28:44</TableCell>
                                    <TableCell className="font-semibold text-slate-700">Frotas</TableCell>
                                    <TableCell><Badge variant="outline" className="text-[10px] border-slate-200 text-slate-600 bg-slate-50">Webhook</Badge></TableCell>
                                    <TableCell className="text-slate-600 text-xs font-mono truncate max-w-[300px]">{"{ vehicle_plate: 'BRA2E19', speed: 95, speed_limit_exceeded: true }"}</TableCell>
                                    <TableCell className="text-right"><Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">Sucesso</Badge></TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-slate-50/50 border-slate-200">
                                    <TableCell className="font-mono text-slate-500 text-xs">11:15:02</TableCell>
                                    <TableCell className="font-semibold text-slate-700">WMS Estoque</TableCell>
                                    <TableCell><Badge variant="outline" className="text-[10px] border-slate-200 text-slate-650 bg-slate-50">GraphQL</Badge></TableCell>
                                    <TableCell className="text-slate-600 text-xs font-mono truncate max-w-[300px]">{"query { getStock(id: 'SKU-99081') } -> ERR: Network timeout"}</TableCell>
                                    <TableCell className="text-right"><Badge className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px]">Falhou</Badge></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
