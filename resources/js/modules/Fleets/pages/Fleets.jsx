import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
    CardFooter 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { 
    Truck, 
    Search, 
    RefreshCw, 
    AlertOctagon, 
    Compass, 
    MapPin, 
    Fuel, 
    Calendar,
    Wrench,
    FileSpreadsheet,
    Eye
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const MOCK_VEHICLES = [
    { id: '1', plate: 'BRA-2E19', model: 'Chevrolet S10 (PMPR)', driver: 'Sgt. Rodrigues Santos', fuel: '85%', nextMaint: '20/08/2026', status: 'in_use' },
    { id: '2', plate: 'BRA-4012', model: 'Toyota Hilux (PMPR)', driver: 'Sd. Ana Oliveira', fuel: '42%', nextMaint: '15/09/2026', status: 'in_use' },
    { id: '3', plate: 'BRA-0112', model: 'Renault Duster (PMPR)', driver: 'Nenhum (Reserva)', fuel: '90%', nextMaint: '01/10/2026', status: 'available' },
    { id: '4', plate: 'BRA-2041', model: 'Fiat Cronos (PMPR)', driver: 'Cabo Mendes', fuel: '12%', nextMaint: '18/07/2026', status: 'maintenance' },
    { id: '5', plate: 'BRA-3K49', model: 'Volvo FH 540 (Caminhão)', driver: 'Valdir Sousa', fuel: '55%', nextMaint: '12/10/2026', status: 'in_use' }
];

const MOCK_ALERTS = [
    { id: 'a1', plate: 'BRA-2E19', event: 'Excesso de velocidade', detail: 'Atingiu 112 km/h (Limite: 90 km/h)', time: 'Há 12 minutos', severity: 'medium' },
    { id: 'a2', plate: 'BRA-1A38', event: 'Falha no Motor (Injeção)', detail: 'Código OBD2: P0301 (Falha de Ignição)', time: 'Há 1 hora', severity: 'high' },
    { id: 'a3', plate: 'BRA-5G22', event: 'Saída de Cerca Virtual', detail: 'Deixou o perímetro autorizado (Zona Sul)', time: 'Há 3 horas', severity: 'low' },
];

export default function Fleets() {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const [search, setSearch] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedTab, setSelectedTab] = useState('vehicles');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 750);
        return () => clearTimeout(timer);
    }, []);

    const triggerRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            setVehicles(prev => prev.map(v => ({
                ...v,
                fuel: v.status === 'in_use' ? `${Math.max(10, parseInt(v.fuel) - Math.floor(Math.random() * 5))}%` : v.fuel
            })));
        }, 1200);
    };

    const filteredVehicles = vehicles.filter(v => 
        v.plate.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        v.driver.toLowerCase().includes(search.toLowerCase())
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
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-28 bg-slate-200" />
                            <Skeleton className="h-10 w-28 bg-slate-200" />
                        </div>
                    </div>
                    {/* Metrics Grid Skeleton */}
                    <div className="grid gap-4 md:grid-cols-4">
                        {[1, 2, 3, 4].map(i => (
                            <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-4 w-20 bg-slate-200" />
                                    <Skeleton className="h-6 w-12 bg-slate-200" />
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    {/* Card/Table Skeleton */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48 bg-slate-200 mb-2" />
                            <Skeleton className="h-4 w-96 bg-slate-200" />
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Skeleton className="h-10 w-full bg-slate-200" />
                            {[1, 2, 3].map(i => (
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
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-2.5">
                                <Truck className="h-6 w-6 text-slate-700 shrink-0" />
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900">Controle de Frotas Externo</h2>
                            </div>
                            <p className="text-sm text-slate-500">
                                Gerenciamento de veículos, telemetria em tempo real e agendamento de manutenções via webhook.
                            </p>
                        </div>
                        <Button 
                            onClick={triggerRefresh}
                            disabled={isRefreshing}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl gap-2 shadow"
                        >
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> 
                            {isRefreshing ? 'Atualizando...' : 'Atualizar Telemetria'}
                        </Button>
                    </div>

                    <hr className="border-slate-200" />

                    <div className="flex items-center justify-between">
                        {/* Navigation Menu */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-1">
                                <NavigationMenuItem>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab('vehicles')}
                                        className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${selectedTab === 'vehicles' ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                                    >
                                        Veículos Integrados ({vehicles.length})
                                    </button>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab('alerts')}
                                        className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${selectedTab === 'alerts' ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                                    >
                                        Alertas de Telemetria ({alerts.length})
                                    </button>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab('settings')}
                                        className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${selectedTab === 'settings' ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                                    >
                                        Configuração de GPS
                                    </button>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">

                    {/* VEHICLES TAB */}
                    <TabsContent value="vehicles" className="space-y-4 outline-none">
                        <Card className="bg-white border-slate-250 shadow-sm">
                            <CardHeader className="pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle className="text-slate-900">Frota de Veículos</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Veículos sincronizados com o provedor de telemetria externo.
                                    </CardDescription>
                                </div>
                                <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 w-full sm:w-64">
                                    <Search className="h-4 w-4 text-slate-400 mr-2" />
                                    <input 
                                        type="text" 
                                        placeholder="Buscar placa, modelo, motorista..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="bg-transparent border-0 outline-none text-xs text-slate-800 placeholder-slate-400 w-full"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto rounded-lg border border-slate-200">
                                    <Table>
                                        <TableHeader className="bg-slate-50">
                                            <TableRow className="hover:bg-slate-50 border-slate-200">
                                                <TableHead className="text-slate-500 font-semibold">Placa</TableHead>
                                                <TableHead className="text-slate-500 font-semibold">Modelo</TableHead>
                                                <TableHead className="text-slate-500 font-semibold">Motorista</TableHead>
                                                <TableHead className="text-slate-500 font-semibold">Combustível</TableHead>
                                                <TableHead className="text-slate-500 font-semibold">Próx. Manutenção</TableHead>
                                                <TableHead className="text-slate-500 font-semibold">Status</TableHead>
                                                <TableHead className="text-slate-500 w-[100px] text-right font-semibold">Rastrear</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredVehicles.map((v) => (
                                                <TableRow key={v.id} className="hover:bg-slate-50/50 border-slate-200">
                                                    <TableCell className="font-mono font-bold text-slate-700">{v.plate}</TableCell>
                                                    <TableCell className="font-semibold text-slate-850 text-slate-800">{v.model}</TableCell>
                                                    <TableCell className="text-slate-600">{v.driver}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1.5">
                                                            <Fuel className="h-3.5 w-3.5 text-slate-400" />
                                                            <span className="text-xs font-mono">{v.fuel}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-xs text-slate-605">
                                                        <div className="flex items-center gap-1.5 text-slate-500">
                                                            {v.nextMaint === 'Em Manutenção' ? (
                                                                <Wrench className="h-3.5 w-3.5 text-amber-500" />
                                                            ) : (
                                                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                            )}
                                                            <span className={v.nextMaint === 'Em Manutenção' ? 'text-amber-600 font-bold' : ''}>
                                                                {v.nextMaint}
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {v.status === 'in_use' && (
                                                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">
                                                                Em Trânsito
                                                            </Badge>
                                                        )}
                                                        {v.status === 'idle' && (
                                                            <Badge className="bg-blue-50 text-blue-755 text-blue-700 border border-blue-200 text-[10px]">
                                                                Garagem / Livre
                                                            </Badge>
                                                        )}
                                                        {v.status === 'maintenance' && (
                                                            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
                                                                Manutenção
                                                            </Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm" className="h-8 text-emerald-700 hover:text-emerald-600 hover:bg-slate-100 gap-1 text-xs">
                                                            <MapPin className="h-3.5 w-3.5" /> Mapa
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

                    {/* ALERTS TAB */}
                    <TabsContent value="alerts" className="space-y-4 outline-none">
                        <Card className="bg-white border-slate-250 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-rose-600">
                                    <AlertOctagon className="h-5 w-5 text-rose-500" /> Ocorrências Recentes do GPS
                                </CardTitle>
                                <CardDescription className="text-slate-500">
                                    Eventos críticos enviados via Webhook em tempo real a partir dos rastreadores de bordo.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {alerts.map((alert) => (
                                        <div key={alert.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-4 justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="font-mono text-[10px] bg-white text-slate-700 border-slate-200">
                                                        {alert.plate}
                                                    </Badge>
                                                    <span className="text-sm font-bold text-slate-800">{alert.event}</span>
                                                    <span className="text-slate-500 text-xs font-mono">• {alert.time}</span>
                                                </div>
                                                <p className="text-xs text-slate-600">{alert.detail}</p>
                                            </div>
                                            <div>
                                                {alert.severity === 'high' && (
                                                    <Badge className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px]">
                                                        Urgente
                                                    </Badge>
                                                )}
                                                {alert.severity === 'medium' && (
                                                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px]">
                                                        Alerta
                                                    </Badge>
                                                )}
                                                {alert.severity === 'low' && (
                                                    <Badge className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px]">
                                                        Informação
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* GPS SETTINGS TAB */}
                    <TabsContent value="settings" className="space-y-4 outline-none">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="bg-white border-slate-250 shadow-sm lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="text-slate-900">Configurações de Telemetria & GPS</CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Selecione o provedor de hardware e configure o endpoint para recepção de logs.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Provedor Homologado</label>
                                        <Select defaultValue="sascar">
                                            <SelectTrigger className="bg-white border-slate-200 text-slate-800">
                                                <SelectValue placeholder="Selecione o provedor" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-slate-200 text-slate-800">
                                                <SelectItem value="sascar">Sascar Telematics</SelectItem>
                                                <SelectItem value="graber">Graber Rastreamento</SelectItem>
                                                <SelectItem value="ituran">Ituran Fleet</SelectItem>
                                                <SelectItem value="custom">API Customizada / Hardware Genérico</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Webhook Endpoint URL (Recebimento)</label>
                                        <Input 
                                            defaultValue="https://gateway.empresa.com/api/v1/webhooks/telemetry" 
                                            disabled
                                            className="bg-slate-50 border-slate-200 text-slate-400 font-mono text-xs cursor-not-allowed"
                                        />
                                        <p className="text-[10px] text-slate-500">Esta URL recebe as notificações push do provedor de GPS e as processa no BFF.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Chave de Assinatura Webhook (HMAC Secret)</label>
                                        <Input 
                                            type="password" 
                                            value="whsec_T1l2e3m4e5t6r7i8a9F0r1o2t3a4s" 
                                            disabled
                                            className="bg-slate-50 border-slate-200 text-slate-400 font-mono text-xs"
                                        />
                                    </div>
                                </CardContent>
                                <CardFooter className="border-t border-slate-150 pt-4 flex justify-end gap-2">
                                    <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Configuração</Button>
                                </CardFooter>
                            </Card>

                            <Card className="bg-white border-slate-250 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-slate-900">
                                        <Compass className="h-5 w-5 text-emerald-650 text-emerald-600" /> Coleta de Telemetria
                                    </CardTitle>
                                    <CardDescription className="text-slate-500">
                                        Status de recepção dos eventos por satélite.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 text-xs text-slate-650">
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Webhooks recebidos hoje:</span>
                                        <span className="text-slate-800 font-bold font-mono">14,204</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Taxa de descarte:</span>
                                        <span className="text-slate-800 font-bold font-mono">0.05%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span className="text-slate-500">Último recebido:</span>
                                        <span className="text-emerald-600 font-bold">12s atrás</span>
                                    </div>
                                    
                                    <div className="space-y-2 pt-2">
                                        <p className="font-semibold text-slate-700">Status do Envio das Notificações:</p>
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                            <span className="text-[11px] text-slate-500">Telegram/Slack Alerts ON</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
