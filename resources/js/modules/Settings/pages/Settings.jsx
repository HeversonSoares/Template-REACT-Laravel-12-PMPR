import React, { useState } from 'react';
import Layout from '@/components/Layout';
import PageHeader from '@/components/PageHeader';
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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
    Key, 
    Server, 
    Bell, 
    Copy, 
    Check, 
    Plus, 
    Trash2, 
    AlertTriangle,
    CheckCircle,
    Settings as SettingsIcon
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const MOCK_API_KEYS = [
    { id: 'k1', name: 'Integração de RH Produção', prefix: 'tok_live_rh_••••', created: '10/06/2026', status: 'active' },
    { id: 'k2', name: 'Leitor IoT Telemetria', prefix: 'tok_live_iot_••••', created: '14/07/2026', status: 'active' }
];

export default function Settings() {
    const navigate = useNavigate();
    const [apiKeys, setApiKeys] = useState(MOCK_API_KEYS);
    const [copiedId, setCopiedId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 700);
        return () => clearTimeout(timer);
    }, []);
    const [newKeyName, setNewKeyName] = useState('');
    const [newKeyCreated, setNewKeyCreated] = useState(null);

    const handleCopy = (id) => {
        setCopiedId(id);
        navigator.clipboard.writeText('tok_live_example_secret_key_1234567890abcdef');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleToggleKey = (id) => {
        setApiKeys(prev => prev.map(k => {
            if (k.id === id) {
                return { ...k, status: k.status === 'active' ? 'inactive' : 'active' };
            }
            return k;
        }));
    };

    const handleDeleteKey = (id) => {
        setApiKeys(prev => prev.filter(k => k.id !== id));
    };

    const handleCreateKey = (e) => {
        e.preventDefault();
        if (!newKeyName) return;

        const newId = `k_${Date.now()}`;
        const newKey = {
            id: newId,
            name: newKeyName,
            prefix: 'tok_live_new_••••',
            created: 'Hoje',
            status: 'active'
        };

        setApiKeys(prev => [...prev, newKey]);
        setNewKeyCreated('tok_live_new_abc123xyz789_generated_just_now');
        setNewKeyName('');
    };

    if (isLoading) {
        return (
            <Layout>
                <div className="w-full p-6 space-y-8 animate-pulse">
                    {/* Header Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-64 bg-slate-200" />
                        <Skeleton className="h-4 w-96 bg-slate-200" />
                        {/* Breadcrumb Skeleton */}
                        <Skeleton className="h-4 w-40 bg-slate-200 mt-2" />
                    </div>
                    {/* Content Grid Skeleton */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {[1, 2].map(i => (
                            <Card key={i}>
                                <CardHeader>
                                    <Skeleton className="h-6 w-36 bg-slate-200" />
                                    <Skeleton className="h-4 w-64 bg-slate-200" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-10 w-full bg-slate-200" />
                                    <Skeleton className="h-10 w-full bg-slate-200" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="w-full p-6 space-y-8">
                {/* Header */}
                <div className="space-y-4">
                    <PageHeader
                        title="Configurações Gerais"
                        description="Gerencie chaves de API, webhooks e parâmetros globais do Gateway de Integração."
                        icon={SettingsIcon}
                    />

                    <hr className="border-border" />

                    <div className="flex items-center justify-between overflow-x-auto pb-2 w-full">
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
                                        Configurações
                                    </span>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>

                {/* API Keys Card */}
                <Card className="bg-card border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-foreground">
                            <Key className="h-5 w-5 text-emerald-600" /> Chaves de Acesso da API (Tokens)
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Tokens utilizados por sistemas externos para autenticar no Gateway BFF.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Create Key Form */}
                        <form onSubmit={handleCreateKey} className="flex gap-2">
                            <Input 
                                placeholder="Nome para identificação do Token (ex: ERP Produção)"
                                value={newKeyName}
                                onChange={e => setNewKeyName(e.target.value)}
                                className="bg-card border focus-visible:ring-emerald-500 text-sm"
                            />
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-1 shrink-0 text-xs sm:text-sm">
                                <Plus className="h-4 w-4" /> Gerar Token
                            </Button>
                        </form>

                        {newKeyCreated && (
                            <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl space-y-2">
                                <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5">
                                    <CheckCircle className="h-4 w-4" /> Token gerado com sucesso! Copie agora, pois ele não será exibido novamente:
                                </p>
                                <div className="flex bg-muted/50 rounded-lg p-2.5 items-center justify-between border border">
                                    <code className="text-xs text-foreground font-mono select-all truncate mr-4">
                                        {newKeyCreated}
                                    </code>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText(newKeyCreated);
                                            setNewKeyCreated(null);
                                        }}
                                        className="text-emerald-700 hover:text-emerald-600 hover:bg-slate-100 text-xs shrink-0"
                                    >
                                        Copiar e Fechar
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Keys List */}
                        <div className="space-y-3">
                            {apiKeys.map((key) => (
                                <div key={key.id} className="flex items-center justify-between p-3.5 bg-muted/50 border border rounded-xl">
                                    <div className="space-y-1">
                                        <p className="text-sm font-semibold text-foreground">{key.name}</p>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <span className="font-mono">{key.prefix}</span>
                                            <span>Criado em: {key.created}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <Switch 
                                                checked={key.status === 'active'}
                                                onCheckedChange={() => handleToggleKey(key.id)}
                                                className="data-[state=checked]:bg-emerald-600"
                                            />
                                            <span className="text-xs text-slate-550 hidden sm:inline">
                                                {key.status === 'active' ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => handleCopy(key.id)}
                                            className="h-8 w-8 text-slate-550 hover:text-foreground hover:bg-slate-100"
                                            title="Copiar Prefixo"
                                        >
                                            {copiedId === key.id ? <Check className="h-4 w-4 text-emerald-650" /> : <Copy className="h-4 w-4" />}
                                        </Button>
                                        <Button 
                                            variant="ghost" 
                                            size="icon"
                                            onClick={() => handleDeleteKey(key.id)}
                                            className="h-8 w-8 text-muted-foreground hover:text-rose-600 hover:bg-slate-100"
                                            title="Excluir Token"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Gateway & Timeout Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-card border shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <Server className="h-5 w-5 text-emerald-600" /> Parâmetros de Conexão
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Ajustes de comunicação HTTP e persistência.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Timeout da Requisição (segundos)</label>
                                <Select defaultValue="30">
                                    <SelectTrigger className="bg-card border text-foreground">
                                        <SelectValue placeholder="Timeout" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border text-foreground">
                                        <SelectItem value="10">10 segundos (Rápido)</SelectItem>
                                        <SelectItem value="30">30 segundos (Padrão)</SelectItem>
                                        <SelectItem value="60">60 segundos (Lento / ERPs legados)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Nível de Log (BFF Core)</label>
                                <Select defaultValue="info">
                                    <SelectTrigger className="bg-card border text-foreground">
                                        <SelectValue placeholder="Nível de log" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border text-foreground">
                                        <SelectItem value="debug">DEBUG (Rastreamento completo)</SelectItem>
                                        <SelectItem value="info">INFO (Produção padrão)</SelectItem>
                                        <SelectItem value="warn">WARN & ERROR (Apenas erros)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border pt-4 flex justify-end">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Ajustes</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-card border shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-foreground">
                                <Bell className="h-5 w-5 text-emerald-600" /> Notificação de Falhas
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Notifique o time em tempo real quando as integrações falharem.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between py-1">
                                <div>
                                    <p className="text-sm font-semibold text-slate-850 text-foreground">Alertas por E-mail</p>
                                    <p className="text-xs text-muted-foreground">Envio para administradores.</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                            </div>

                            <div className="flex items-center justify-between py-1">
                                <div>
                                    <p className="text-sm font-semibold text-slate-850 text-foreground">Webhook Slack / Discord</p>
                                    <p className="text-xs text-muted-foreground">Envio em canais de DevOps.</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-muted-foreground">Webhook URL</label>
                                <Input 
                                    placeholder="https://hooks.slack.com/services/..." 
                                    defaultValue=""
                                    className="bg-card border text-foreground focus-visible:ring-emerald-500 text-xs"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border pt-4 flex justify-end">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Notificações</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
