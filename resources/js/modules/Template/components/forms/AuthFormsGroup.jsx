import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogIn, UserPlus, KeyRound, Eye, EyeOff, Lock, Mail, User, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';

function LoginForm() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const [form, setForm] = useState({ email: '', senha: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); alert('Login simulado com sucesso!'); }, 1200);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-2">
                <div className="space-y-1.5">
                    <label htmlFor="login-email" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" /> E-mail
                    </label>
                    <Input id="login-email" type="email" placeholder="seu@email.com.br"
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                </div>

                <div className="space-y-1.5">
                    <label htmlFor="login-senha" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Senha
                    </label>
                    <div className="relative">
                        <Input id="login-senha" type={show ? 'text' : 'password'} placeholder="••••••••"
                            value={form.senha} onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} required />
                        <button type="button" onClick={() => setShow(s => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <Switch checked={remember} onCheckedChange={setRemember} />
                        <span className="text-sm text-muted-foreground">Lembrar de mim</span>
                    </label>
                    <button type="button" className="text-xs text-primary hover:underline font-medium">
                        Esqueci a senha
                    </button>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Entrando...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2"><LogIn className="w-4 h-4" /> Entrar</span>
                    )}
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs text-muted-foreground bg-card px-3">ou continue com</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button type="button" variant="outline" size="sm" className="gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </Button>
                    <Button type="button" variant="outline" size="sm" className="gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.05-.01-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </Button>
                </div>
            </CardContent>
        </form>
    );
}

function RegisterForm() {
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [form, setForm] = useState({ nome: '', email: '', senha: '', confirmar: '' });

    const strength = (() => {
        const p = form.senha;
        let s = 0;
        if (p.length >= 8) s++;
        if (/[A-Z]/.test(p)) s++;
        if (/[0-9]/.test(p)) s++;
        if (/[^A-Za-z0-9]/.test(p)) s++;
        return s;
    })();
    const strengthLabels = ['', 'Fraca', 'Razoável', 'Boa', 'Forte'];
    const strengthColors = ['', 'bg-destructive', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.senha !== form.confirmar) { alert('As senhas não coincidem!'); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setDone(true); }, 1400);
    };

    if (done) return (
        <CardContent className="py-10 flex flex-col items-center gap-3 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
                <p className="font-bold text-foreground text-lg">Conta criada com sucesso!</p>
                <p className="text-sm text-muted-foreground mt-1">Verifique seu e-mail para ativar a conta.</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setDone(false)}>Voltar</Button>
        </CardContent>
    );

    return (
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-2">
                <div className="space-y-1.5">
                    <label htmlFor="reg-nome" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-muted-foreground" /> Nome completo
                    </label>
                    <Input id="reg-nome" placeholder="João da Silva"
                        value={form.nome} onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} required />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="reg-email" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" /> E-mail
                    </label>
                    <Input id="reg-email" type="email" placeholder="seu@email.com.br"
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="reg-senha" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Senha
                    </label>
                    <div className="relative">
                        <Input id="reg-senha" type={show ? 'text' : 'password'} placeholder="Mín. 8 caracteres"
                            value={form.senha} onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} required />
                        <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {form.senha && (
                        <div className="space-y-1">
                            <div className="flex gap-1">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-muted'}`} />
                                ))}
                            </div>
                            <p className="text-[11px] text-muted-foreground">Força: <span className="font-semibold">{strengthLabels[strength]}</span></p>
                        </div>
                    )}
                </div>
                <div className="space-y-1.5">
                    <label htmlFor="reg-confirmar" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground" /> Confirmar Senha
                    </label>
                    <div className="relative">
                        <Input id="reg-confirmar" type={showConfirm ? 'text' : 'password'} placeholder="Repita a senha"
                            value={form.confirmar} onChange={e => setForm(f => ({ ...f, confirmar: e.target.value }))} required />
                        <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    {form.confirmar && form.senha !== form.confirmar && (
                        <p className="text-xs text-destructive">As senhas não coincidem.</p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Criando...</span>
                    : <span className="flex items-center gap-2"><UserPlus className="w-4 h-4" />Criar Conta</span>}
                </Button>
            </CardContent>
        </form>
    );
}

function ForgotForm() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1200);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-2">
                {!sent ? (
                    <>
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                            <p className="text-sm text-amber-800 dark:text-amber-300 flex items-start gap-2">
                                <KeyRound className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                Informe seu e-mail cadastrado. Enviaremos um link para redefinir sua senha.
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="forgot-email" className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-muted-foreground" /> E-mail cadastrado
                            </label>
                            <Input id="forgot-email" type="email" placeholder="seu@email.com.br"
                                value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading
                                ? <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Enviando...</span>
                                : <span className="flex items-center gap-2"><Mail className="w-4 h-4" />Enviar Link de Recuperação</span>
                            }
                        </Button>
                    </>
                ) : (
                    <div className="py-6 flex flex-col items-center gap-3 text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                        </div>
                        <div>
                            <p className="font-bold text-foreground">E-mail enviado!</p>
                            <p className="text-sm text-muted-foreground mt-1">Verifique a caixa de entrada de <span className="font-semibold">{email}</span>.</p>
                        </div>
                        <button type="button" onClick={() => setSent(false)} className="text-sm text-primary hover:underline flex items-center gap-1">
                            <ArrowLeft className="w-3.5 h-3.5" /> Tentar outro e-mail
                        </button>
                    </div>
                )}
            </CardContent>
        </form>
    );
}

export default function AuthFormsGroup() {
    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <LogIn className="w-5 h-5 text-primary" />
                            Formulários de Autenticação
                        </CardTitle>
                        <CardDescription className="mt-1">Login, Registro e Recuperação de Senha com feedback visual.</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">Exemplo</Badge>
                </div>
            </CardHeader>

            <CardContent className="pb-2">
                <Tabs defaultValue="login">
                    <TabsList className="w-full grid grid-cols-3 mb-4">
                        <TabsTrigger value="login" className="gap-1.5 text-xs"><LogIn className="w-3.5 h-3.5" />Login</TabsTrigger>
                        <TabsTrigger value="registro" className="gap-1.5 text-xs"><UserPlus className="w-3.5 h-3.5" />Registro</TabsTrigger>
                        <TabsTrigger value="recuperar" className="gap-1.5 text-xs"><KeyRound className="w-3.5 h-3.5" />Recuperar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="m-0">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="registro" className="m-0">
                        <RegisterForm />
                    </TabsContent>
                    <TabsContent value="recuperar" className="m-0">
                        <ForgotForm />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
