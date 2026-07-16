import React, { useState } from 'react';
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog';
import { Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
} from '../components/ui/navigation-menu';
import { 
    LayoutDashboard, 
    Table as TableIcon, 
    FileText, 
    Layers, 
    TrendingUp, 
    Users, 
    DollarSign, 
    Activity,
    Plus,
    Search,
    ChevronDown,
    MoreHorizontal,
    SlidersHorizontal,
    ExternalLink,
    Check,
    LayoutTemplate
} from 'lucide-react';

// Custom Searchable Select (Select2 style Combobox)
function SearchableSelect({ options, placeholder, value, onChange }) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');
    
    const selectedOption = options.find(opt => opt.value === value);
    const filtered = options.filter(opt => 
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
                <span className={selectedOption ? "text-slate-900" : "text-slate-400"}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-100 bg-white p-1 text-slate-900 shadow-md">
                        <div className="flex items-center border-b px-2 pb-1 mb-1">
                            <Search className="h-3.5 w-3.5 mr-2 text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex h-8 w-full rounded-sm bg-transparent py-1.5 text-xs outline-none"
                            />
                        </div>
                        {filtered.length === 0 ? (
                            <div className="py-2 px-2 text-xs text-slate-500">Nenhum item encontrado.</div>
                        ) : (
                            filtered.map(opt => (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => {
                                        onChange(opt.value);
                                        setOpen(false);
                                        setSearch('');
                                    }}
                                    className="w-full text-left rounded-sm px-2 py-1.5 text-xs hover:bg-slate-100 transition-colors flex items-center justify-between"
                                >
                                    <span>{opt.label}</span>
                                    {value === opt.value && <Check className="h-3.5 w-3.5 text-amber-600" />}
                                </button>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

// Custom Checkbox Component
function CustomCheckbox({ id, label, description, checked, onChange }) {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex items-center h-5">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-350 text-amber-650 focus:ring-amber-500 focus:outline-none cursor-pointer accent-amber-600"
                />
            </div>
            <div className="grid gap-0.5 leading-none">
                <label htmlFor={id} className="text-sm font-semibold text-slate-700 cursor-pointer">
                    {label}
                </label>
                {description && (
                    <p className="text-xs text-slate-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

// Custom MultiSelect Component
function MultiSelect({ options, placeholder, selectedValues = [], onChange }) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const filtered = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const toggleOption = (val) => {
        if (selectedValues.includes(val)) {
            onChange(selectedValues.filter(v => v !== val));
        } else {
            onChange([...selectedValues, val]);
        }
    };

    return (
        <div className="relative w-full">
            <div
                onClick={() => setOpen(!open)}
                className="flex min-h-[38px] w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm cursor-pointer"
            >
                <div className="flex flex-wrap gap-1">
                    {selectedValues.length === 0 ? (
                        <span className="text-slate-400">{placeholder}</span>
                    ) : (
                        selectedValues.map(val => {
                            const opt = options.find(o => o.value === val);
                            return (
                                <Badge
                                    key={val}
                                    className="bg-amber-100 text-amber-800 hover:bg-amber-255 border-none flex items-center gap-1 py-0.5 px-2 text-xs font-semibold rounded shadow-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleOption(val);
                                    }}
                                >
                                    {opt ? opt.label : val}
                                    <span className="text-[10px] ml-1 font-bold cursor-pointer">×</span>
                                </Badge>
                            );
                        })
                    )}
                </div>
                <ChevronDown className="h-4 w-4 opacity-50 shrink-0 ml-2" />
            </div>
            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-100 bg-white p-1 text-slate-900 shadow-md">
                        <div className="flex items-center border-b px-2 pb-1 mb-1">
                            <Search className="h-3.5 w-3.5 mr-2 text-slate-400 shrink-0" />
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex h-8 w-full rounded-sm bg-transparent py-1.5 text-xs outline-none"
                            />
                        </div>
                        {filtered.length === 0 ? (
                            <div className="py-2 px-2 text-xs text-slate-500">Nenhum item encontrado.</div>
                        ) : (
                            filtered.map(opt => {
                                const isSelected = selectedValues.includes(opt.value);
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => toggleOption(opt.value)}
                                        className="w-full text-left rounded-sm px-2 py-1.5 text-xs hover:bg-slate-100 transition-colors flex items-center justify-between"
                                    >
                                        <span className={isSelected ? "font-semibold text-amber-700" : ""}>{opt.label}</span>
                                        {isSelected && <Check className="h-3.5 w-3.5 text-amber-600" />}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default function Templates() {
    const [selectedTab, setSelectedTab] = useState('overview');
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [themeDark, setThemeDark] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    // Mock states for interactive feeling
    const [formState, setFormState] = useState({
        projectName: '',
        category: 'design',
        visibility: 'public',
        notifications: true,
        newsletter: false
    });

    const [advancedForm, setAdvancedForm] = useState({
        policeUnit: '',
        permissions: [],
        mfaEnabled: true,
        termsAccepted: false,
        shareTelemetry: true
    });

    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormLoading(true);
        setTimeout(() => {
            setFormLoading(false);
            alert('Formulário enviado com sucesso (Mock)');
        }, 1200);
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="w-full p-6 space-y-6 animate-pulse">
                    {/* Header Skeleton */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-64 bg-slate-200" />
                            <Skeleton className="h-4 w-96 bg-slate-200" />
                            {/* Breadcrumb Skeleton */}
                            <Skeleton className="h-4 w-40 bg-slate-200 mt-2" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-10 w-28 bg-slate-200" />
                            <Skeleton className="h-10 w-28 bg-slate-200" />
                        </div>
                    </div>
                    {/* Tabs List Skeleton */}
                    <Skeleton className="h-10 w-80 bg-slate-200" />
                    {/* Metric Cards Skeleton */}
                    <div className="grid gap-4 md:grid-cols-4">
                        {[1, 2, 3, 4].map(i => (
                            <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-4 w-20 bg-slate-200" />
                                    <Skeleton className="h-6 w-16 bg-slate-200" />
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                {/* Header */}
                {/* Header */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2.5">
                                <LayoutTemplate className="h-6 w-6 text-slate-700 shrink-0" />
                                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Templates de Dashboard</h1>
                            </div>
                            <p className="text-slate-500 text-sm mt-1">Exemplos práticos e prontos de componentes usando a biblioteca shadcn/ui.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => window.open('https://ui.shadcn.com/', '_blank')} className="flex items-center gap-1.5 shadow-sm text-xs font-semibold">
                                Shadcn Docs <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                            <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white flex items-center gap-1.5 shadow-sm text-xs font-semibold">
                                        <Plus className="h-4 w-4" /> Novo Template
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Adicionar Novo Item</DialogTitle>
                                        <DialogDescription>
                                            Preencha as informações básicas para adicionar um novo componente à lista.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="name" className="text-right text-sm font-medium">Nome</label>
                                            <Input id="name" defaultValue="Minha Tabela Personalizada" className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <label htmlFor="category" className="text-right text-sm font-medium">Categoria</label>
                                            <div className="col-span-3">
                                                <Select defaultValue="tables">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="dashboards">Dashboards</SelectItem>
                                                        <SelectItem value="tables">Tabelas</SelectItem>
                                                        <SelectItem value="forms">Formulários</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsOpenDialog(false)}>Cancelar</Button>
                                        <Button onClick={() => setIsOpenDialog(false)} className="bg-slate-900 text-white hover:bg-slate-800">Salvar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    <hr className="border-slate-200" />

                    <div className="flex items-center justify-between">
                        {/* Submenu de Templates */}
                        <NavigationMenu>
                            <NavigationMenuList className="flex gap-1">
                                <NavigationMenuItem>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab('overview')}
                                        className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${selectedTab === 'overview' ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                                    >
                                        Visão Geral
                                    </button>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${selectedTab === 'tables' ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}>
                                        Tabelas
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="min-w-[200px] p-2 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col gap-1 z-50">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTab('tables')}
                                                className="w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors text-slate-650 hover:bg-slate-50 hover:text-slate-900 font-medium"
                                            >
                                                Tabela 1: Gestão de Frotas
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTab('tables')}
                                                className="w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors text-slate-650 hover:bg-slate-50 hover:text-slate-900 font-medium"
                                            >
                                                Tabela 2: Resumo de Chamados
                                            </button>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTab('forms')}
                                        className={`${navigationMenuTriggerStyle()} bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all rounded-md h-9 text-xs sm:text-sm ${selectedTab === 'forms' ? 'bg-slate-100 text-slate-900 font-semibold' : ''}`}
                                    >
                                        Formulários
                                    </button>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* Tabs controlled programmatically via the Submenu */}
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">

                    {/* OVERVIEW CONTENT */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Cards Grid */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-slate-500">Receita Total</CardTitle>
                                    <DollarSign className="h-4 w-4 text-emerald-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">R$ 45.231,89</div>
                                    <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" /> +20.1% em relação ao mês passado
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-slate-500">Novas Assinaturas</CardTitle>
                                    <Users className="h-4 w-4 text-blue-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+2.350</div>
                                    <p className="text-xs text-blue-600 mt-1 font-medium flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" /> +180.1% em relação ao mês passado
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-slate-500">Vendas</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-amber-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+12.234</div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        +19% em relação ao mês passado
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xs font-semibold uppercase text-slate-500">Usuários Ativos</CardTitle>
                                    <Activity className="h-4 w-4 text-indigo-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+573</div>
                                    <p className="text-xs text-emerald-600 mt-1 font-medium">
                                        +201 ativos na última hora
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Middle Content */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="lg:col-span-4">
                                <CardHeader>
                                    <CardTitle className="text-lg">Desempenho Semanal</CardTitle>
                                    <CardDescription>Visualização analítica baseada no tráfego da rede atual.</CardDescription>
                                </CardHeader>
                                <CardContent className="h-64 flex items-end justify-between gap-2 pt-4 px-6">
                                    {/* Mocking a simple SVG/CSS bar chart */}
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '65%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Seg</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '45%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Ter</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '85%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Qua</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-amber-500 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '30%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Qui</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-amber-600 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '95%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Sex</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-slate-400 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '20%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Sáb</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 flex-1">
                                        <div className="w-full bg-slate-100 rounded-t-md h-40 flex items-end">
                                            <div className="w-full bg-slate-400 rounded-t-md transition-all duration-500 hover:opacity-85" style={{ height: '15%' }}></div>
                                        </div>
                                        <span className="text-xs font-medium text-slate-500">Dom</span>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-3">
                                <CardHeader>
                                    <CardTitle className="text-lg">Atividade Recente</CardTitle>
                                    <CardDescription>Acompanhamento de processos executados no sistema.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-bold">P</div>
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-slate-800">Pagamento Processado</p>
                                            <p className="text-[11px] text-slate-500">Fatura #1024 no valor de R$ 349,00</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400">Há 5m</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs font-bold">U</div>
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-slate-800">Novo Usuário Registrado</p>
                                            <p className="text-[11px] text-slate-500">lucas.silva@exemplo.com</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400">Há 12m</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 text-xs font-bold">A</div>
                                        <div className="flex-1">
                                            <p className="text-xs font-semibold text-slate-800">Alerta de Segurança</p>
                                            <p className="text-[11px] text-slate-500">Tentativa de login malsucedida de IP externo</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400">Há 45m</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* TABLES CONTENT */}
                    <TabsContent value="tables" className="space-y-4">
                        <Card>
                            <CardHeader className="pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <CardTitle className="text-lg">Gestão de Dispositivos e Frotas</CardTitle>
                                    <CardDescription>Visão tabular integrada de todos os veículos operacionais cadastrados.</CardDescription>
                                </div>
                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:flex-initial">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                        <Input placeholder="Buscar dispositivo..." className="pl-9 h-9 w-full md:w-64" />
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
                                            <TableHead className="w-[100px]">ID Veículo</TableHead>
                                            <TableHead>Identificador / Modelo</TableHead>
                                            <TableHead>Motorista Responsável</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Nível Bateria/Combustível</TableHead>
                                            <TableHead className="text-right">Ação</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold text-slate-800">VTR-0041</TableCell>
                                            <TableCell>Chevrolet S10 - PMPR - PM-8831</TableCell>
                                            <TableCell>Sgt. Rodrigues Santos</TableCell>
                                            <TableCell>
                                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none shadow-none">Em Serviço</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-emerald-500 h-2" style={{ width: '85%' }}></div>
                                                    </div>
                                                    <span className="text-xs text-slate-600 font-medium">85%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-700">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="font-semibold text-slate-800">VTR-0912</TableCell>
                                            <TableCell>Toyota Hilux - PMPR - PM-4012</TableCell>
                                            <TableCell>Sd. Ana Oliveira</TableCell>
                                            <TableCell>
                                                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none shadow-none">Em Serviço</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-amber-500 h-2" style={{ width: '42%' }}></div>
                                                    </div>
                                                    <span className="text-xs text-slate-600 font-medium">42%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-700">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="font-semibold text-slate-800">VTR-0023</TableCell>
                                            <TableCell>Renault Duster - PMPR - PM-0112</TableCell>
                                            <TableCell>Nenhum (Reserva)</TableCell>
                                            <TableCell>
                                                <Badge className="bg-slate-200 text-slate-700 hover:bg-slate-300 border-none shadow-none">Disponível</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-emerald-500 h-2" style={{ width: '90%' }}></div>
                                                    </div>
                                                    <span className="text-xs text-slate-600 font-medium">90%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-700">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className="font-semibold text-slate-800">VTR-1188</TableCell>
                                            <TableCell>Fiat Cronos - PMPR - PM-2041</TableCell>
                                            <TableCell>Cabo Mendes</TableCell>
                                            <TableCell>
                                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none shadow-none">Manutenção</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                                                        <div className="bg-rose-500 h-2" style={{ width: '12%' }}></div>
                                                    </div>
                                                    <span className="text-xs text-slate-600 font-medium">12%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-700">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center py-4 border-t">
                                <span className="text-xs text-slate-500">Exibindo 4 de 12 veículos</span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" disabled className="h-8 text-xs font-semibold">Anterior</Button>
                                    <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Próximo</Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* FORMS CONTENT */}
                    <TabsContent value="forms" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* FORM 1: Configurações Gerais do Projeto */}
                            <Card className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="text-lg">Configurações Gerais do Projeto</CardTitle>
                                    <CardDescription>Edite as configurações de infraestrutura e alertas das suas instâncias.</CardDescription>
                                </CardHeader>
                                <form onSubmit={handleFormSubmit}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="projectName" className="text-sm font-semibold text-slate-700">Nome do Projeto</label>
                                            <Input 
                                                id="projectName" 
                                                placeholder="Ex: Sistema de Escalas" 
                                                value={formState.projectName}
                                                onChange={(e) => setFormState({...formState, projectName: e.target.value})}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Categoria</label>
                                                <Select 
                                                    value={formState.category} 
                                                    onValueChange={(val) => setFormState({...formState, category: val})}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="design">Design & UI</SelectItem>
                                                        <SelectItem value="development">Desenvolvimento</SelectItem>
                                                        <SelectItem value="security">Segurança</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Visibilidade</label>
                                                <Select 
                                                    value={formState.visibility} 
                                                    onValueChange={(val) => setFormState({...formState, visibility: val})}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="public">Público</SelectItem>
                                                        <SelectItem value="private">Privado</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50/50">
                                                <div className="space-y-0.5">
                                                    <label className="text-xs font-semibold text-slate-800" htmlFor="notify-switch">Notificações por E-mail</label>
                                                    <p className="text-[10px] text-slate-500">Enviar status automático das viaturas.</p>
                                                </div>
                                                <Switch 
                                                    id="notify-switch"
                                                    checked={formState.notifications}
                                                    onCheckedChange={(val) => setFormState({...formState, notifications: val})}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                        <Button type="button" variant="outline" size="sm" onClick={() => setFormState({projectName: '', category: 'design', visibility: 'public', notifications: true, newsletter: false})}>
                                            Limpar
                                        </Button>
                                        <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white" disabled={formLoading}>
                                            Salvar Projeto
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* FORM 2: Cadastro de Novo Usuário/Operador */}
                            <Card className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="text-lg">Cadastro de Novo Operador</CardTitle>
                                    <CardDescription>Crie uma nova conta com credenciais de acesso específicas.</CardDescription>
                                </CardHeader>
                                <form onSubmit={(e) => { e.preventDefault(); alert('Usuário cadastrado com sucesso (Mock)'); }}>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Nome Completo</label>
                                                <Input id="fullName" placeholder="Ex: Roberto Silva" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label htmlFor="userEmail" className="text-sm font-semibold text-slate-700">E-mail Corporativo</label>
                                                <Input id="userEmail" type="email" placeholder="nome@pm.pr.gov.br" required />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Função / Cargo</label>
                                                <Select defaultValue="operador">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="admin">Administrador</SelectItem>
                                                        <SelectItem value="operador">Operador de Central</SelectItem>
                                                        <SelectItem value="supervisor">Supervisor de Frota</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="userPhone" className="text-sm font-semibold text-slate-700">Telefone / Ramal</label>
                                                <Input id="userPhone" placeholder="(41) 99999-9999" />
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50/50">
                                            <div className="space-y-0.5">
                                                <label className="text-xs font-semibold text-slate-800" htmlFor="user-active">Usuário Ativo</label>
                                                <p className="text-[10px] text-slate-500">Permitir login imediatamente após o cadastro.</p>
                                            </div>
                                            <Switch id="user-active" defaultChecked />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                        <Button type="button" variant="outline" size="sm">Limpar</Button>
                                        <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">Cadastrar</Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* FORM 3: Chamado de Suporte / Registro de Incidentes */}
                            <Card className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="text-lg">Reportar Incidente / Suporte</CardTitle>
                                    <CardDescription>Registre falhas em equipamentos ou avarias em viaturas da frota.</CardDescription>
                                </CardHeader>
                                <form onSubmit={(e) => { e.preventDefault(); alert('Chamado aberto com sucesso (Mock)'); }}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="issueTitle" className="text-sm font-semibold text-slate-700">Título do Incidente</label>
                                            <Input id="issueTitle" placeholder="Ex: Pneu furado / Falha no rastreador" required />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Equipamento Relacionado</label>
                                                <Select defaultValue="viatura">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="viatura">Viatura</SelectItem>
                                                        <SelectItem value="tablet">Tablet / Computador de Bordo</SelectItem>
                                                        <SelectItem value="radio">Rádio Transmissor</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-slate-700">Nível de Urgência</label>
                                                <Select defaultValue="media">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="baixa">Baixa</SelectItem>
                                                        <SelectItem value="media">Média</SelectItem>
                                                        <SelectItem value="alta">Alta (Crítica)</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="issueDesc" className="text-sm font-semibold text-slate-700">Descrição Detalhada</label>
                                            <textarea 
                                                id="issueDesc" 
                                                rows="3" 
                                                className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Descreva as especificidades do problema ocorrido..."
                                                required
                                            ></textarea>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                        <Button type="button" variant="outline" size="sm">Limpar</Button>
                                        <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">Enviar Chamado</Button>
                                    </CardFooter>
                                </form>
                            </Card>

                            {/* FORM 4: Configurações de API & Integrações */}
                            <Card className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="text-lg">Chaves e Integrações de API</CardTitle>
                                    <CardDescription>Gere credenciais para integração com sistemas externos.</CardDescription>
                                </CardHeader>
                                <form onSubmit={(e) => { e.preventDefault(); alert('Chave de API salva com sucesso (Mock)'); }}>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="apiKey" className="text-sm font-semibold text-slate-700">Chave da API Secreta</label>
                                            <div className="relative">
                                                <Input id="apiKey" type="password" value="••••••••••••••••••••••••••••••••••••••••" readOnly />
                                                <Button type="button" variant="link" className="absolute right-0 top-0 h-full px-3 text-xs text-amber-600 hover:text-amber-700 font-semibold" onClick={() => alert('Chave copiada!')}>
                                                    Copiar
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="webhookUrl" className="text-sm font-semibold text-slate-700">URL do Webhook de Destino</label>
                                            <Input id="webhookUrl" placeholder="https://api.seusistema.com/v1/webhooks" type="url" />
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50/50">
                                                <div className="space-y-0.5">
                                                    <label className="text-xs font-semibold text-slate-800" htmlFor="debug-logs">Logs Detalhados</label>
                                                    <p className="text-[10px] text-slate-500">Rastrear requisições em ambiente de testes.</p>
                                                </div>
                                                <Switch id="debug-logs" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                        <Button type="button" variant="outline" size="sm">Resetar Chave</Button>
                                        <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">Salvar Configuração</Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </div>

                        {/* ROW 3: Componentes Avançados */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                            <Card className="flex flex-col justify-between">
                                <CardHeader>
                                    <CardTitle className="text-lg">Componentes Avançados (Select2 & Checkbox)</CardTitle>
                                    <CardDescription>Demonstração de seleção com pesquisa (estilo Select2) e caixas de seleção personalizadas.</CardDescription>
                                </CardHeader>
                                <form onSubmit={(e) => { e.preventDefault(); alert(`Unidade: ${advancedForm.policeUnit || 'Nenhuma'}, Termos: ${advancedForm.termsAccepted}`); }}>
                                    <CardContent className="space-y-6">
                                        {/* Searchable Select (Select2 style) */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Selecione a Unidade Militar (Searchable Dropdown)</label>
                                            <SearchableSelect 
                                                placeholder="Pesquise por batalhão ou cidade..."
                                                options={[
                                                    { value: '1bpm', label: '1º Batalhão de Polícia Militar - Ponta Grossa' },
                                                    { value: '12bpm', label: '12º Batalhão de Polícia Militar - Curitiba' },
                                                    { value: '13bpm', label: '13º Batalhão de Polícia Militar - Curitiba' },
                                                    { value: '17bpm', label: '17º Batalhão de Polícia Militar - São José dos Pinhais' },
                                                    { value: '20bpm', label: '20º Batalhão de Polícia Militar - Curitiba' }
                                                ]}
                                                value={advancedForm.policeUnit}
                                                onChange={(val) => setAdvancedForm({...advancedForm, policeUnit: val})}
                                            />
                                            <p className="text-[11px] text-slate-400">Filtra dinamicamente as opções enquanto você digita.</p>
                                        </div>

                                        {/* Multi-Select Dropdown */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Permissões Especiais (Multi-Select)</label>
                                            <MultiSelect 
                                                placeholder="Selecione as permissões de acesso..."
                                                options={[
                                                    { value: 'read_reports', label: 'Visualizar Relatórios' },
                                                    { value: 'write_reports', label: 'Editar Relatórios' },
                                                    { value: 'manage_users', label: 'Gerenciar Usuários' },
                                                    { value: 'delete_records', label: 'Excluir Registros' },
                                                    { value: 'export_data', label: 'Exportar Dados' }
                                                ]}
                                                selectedValues={advancedForm.permissions}
                                                onChange={(vals) => setAdvancedForm({...advancedForm, permissions: vals})}
                                            />
                                            <p className="text-[11px] text-slate-400">Permite escolher múltiplos itens e exibe como tags removíveis.</p>
                                        </div>

                                        <hr className="border-slate-100" />

                                        {/* Custom Checkboxes */}
                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-slate-800">Controles de Segurança e Privacidade</label>
                                            
                                            <CustomCheckbox 
                                                id="terms"
                                                label="Aceitar os Termos de Uso do Sistema"
                                                description="Declaro estar ciente das normas de uso aceitável de informações sensíveis."
                                                checked={advancedForm.termsAccepted}
                                                onChange={(val) => setAdvancedForm({...advancedForm, termsAccepted: val})}
                                            />

                                            <CustomCheckbox 
                                                id="telemetry"
                                                label="Compartilhar Telemetria de Uso"
                                                description="Enviar dados de telemetria anônimos para melhoria de desempenho da plataforma."
                                                checked={advancedForm.shareTelemetry}
                                                onChange={(val) => setAdvancedForm({...advancedForm, shareTelemetry: val})}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                        <Button type="button" variant="outline" size="sm" onClick={() => setAdvancedForm({policeUnit: '', permissions: [], mfaEnabled: true, termsAccepted: false, shareTelemetry: true})}>
                                            Resetar
                                        </Button>
                                        <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                                            Enviar Formulário
                                        </Button>
                                    </CardFooter>
                                </form>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
}
