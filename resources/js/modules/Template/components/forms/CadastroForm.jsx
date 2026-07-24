import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Briefcase, Shield, CheckCircle2 } from 'lucide-react';

const InputField = ({ label, id, icon: Icon, required, children, hint }) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
            {label}
            {required && <span className="text-destructive text-xs">*</span>}
        </label>
        {children}
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
);

export default function CadastroForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nome: '', sobrenome: '', email: '', telefone: '',
        cargo: '', departamento: '', cidade: '', estado: '',
        bio: '', perfil: 'usuario', ativo: true, notificacoes: false,
        aceiteTermos: false, genero: '',
    });

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e?.target ? e.target.value : e }));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.aceiteTermos) { alert('Aceite os termos para continuar.'); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
    };

    if (submitted) return (
        <Card className="border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20">
            <CardContent className="py-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <p className="font-bold text-foreground text-lg">Cadastro realizado com sucesso!</p>
                    <p className="text-sm text-muted-foreground mt-1">Bem-vindo, <span className="font-semibold text-foreground">{form.nome}</span>.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>Novo cadastro</Button>
            </CardContent>
        </Card>
    );

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Formulário de Cadastro
                        </CardTitle>
                        <CardDescription className="mt-1">Dados pessoais, profissionais e preferências de conta.</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">Exemplo</Badge>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">

                    {/* Seção: Dados Pessoais */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-border">
                            <User className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Dados Pessoais</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Nome" id="nome" required>
                                <Input id="nome" placeholder="Ex: João" value={form.nome} onChange={set('nome')} required />
                            </InputField>
                            <InputField label="Sobrenome" id="sobrenome" required>
                                <Input id="sobrenome" placeholder="Ex: Silva" value={form.sobrenome} onChange={set('sobrenome')} required />
                            </InputField>
                        </div>

                        <InputField label="E-mail" id="email" icon={Mail} required>
                            <Input id="email" type="email" placeholder="joao@exemplo.com.br" value={form.email} onChange={set('email')} required />
                        </InputField>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Telefone" id="telefone" icon={Phone}>
                                <Input id="telefone" placeholder="(41) 99999-0000" value={form.telefone} onChange={set('telefone')} />
                            </InputField>
                            <InputField label="Gênero" id="genero">
                                <Select value={form.genero} onValueChange={(v) => setForm(f => ({ ...f, genero: v }))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="m">Masculino</SelectItem>
                                        <SelectItem value="f">Feminino</SelectItem>
                                        <SelectItem value="nd">Prefiro não informar</SelectItem>
                                    </SelectContent>
                                </Select>
                            </InputField>
                        </div>
                    </div>

                    {/* Seção: Dados Profissionais */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-border">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Dados Profissionais</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Cargo" id="cargo" icon={Briefcase}>
                                <Input id="cargo" placeholder="Ex: Analista de Sistemas" value={form.cargo} onChange={set('cargo')} />
                            </InputField>
                            <InputField label="Departamento" id="departamento">
                                <Select value={form.departamento} onValueChange={(v) => setForm(f => ({ ...f, departamento: v }))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                                        <SelectItem value="op">Operações</SelectItem>
                                        <SelectItem value="fin">Financeiro</SelectItem>
                                        <SelectItem value="jur">Jurídico</SelectItem>
                                    </SelectContent>
                                </Select>
                            </InputField>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label="Cidade" id="cidade" icon={MapPin}>
                                <Input id="cidade" placeholder="Ex: Curitiba" value={form.cidade} onChange={set('cidade')} />
                            </InputField>
                            <InputField label="Estado" id="estado">
                                <Select value={form.estado} onValueChange={(v) => setForm(f => ({ ...f, estado: v }))}>
                                    <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                                    <SelectContent>
                                        {['PR','SP','RJ','MG','RS','SC','BA','GO','DF'].map(uf =>
                                            <SelectItem key={uf} value={uf}>{uf}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </InputField>
                        </div>

                        <InputField label="Biografia / Descrição" id="bio" hint="Máximo de 300 caracteres.">
                            <textarea
                                id="bio"
                                rows={3}
                                maxLength={300}
                                placeholder="Descreva brevemente sua experiência ou área de atuação..."
                                value={form.bio}
                                onChange={set('bio')}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm resize-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground"
                            />
                            <p className="text-[11px] text-muted-foreground text-right -mt-1">{form.bio.length}/300</p>
                        </InputField>
                    </div>

                    {/* Seção: Perfil & Permissões */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-1 border-b border-border">
                            <Shield className="w-4 h-4 text-primary" />
                            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">Perfil & Permissões</h3>
                        </div>

                        {/* Radio group manual */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-foreground">Perfil de Acesso</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                    { value: 'usuario', label: 'Usuário', desc: 'Acesso básico somente leitura' },
                                    { value: 'operador', label: 'Operador', desc: 'Pode criar e editar registros' },
                                    { value: 'admin', label: 'Administrador', desc: 'Acesso total ao sistema' },
                                ].map(opt => (
                                    <label
                                        key={opt.value}
                                        className={`flex flex-col gap-1 p-3 rounded-lg border cursor-pointer transition-all ${
                                            form.perfil === opt.value
                                                ? 'border-primary bg-primary/5 shadow-sm'
                                                : 'border-border hover:border-primary/50 hover:bg-muted/40'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                                                form.perfil === opt.value ? 'border-primary' : 'border-muted-foreground'
                                            }`}>
                                                {form.perfil === opt.value && (
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                )}
                                            </div>
                                            <input
                                                type="radio" name="perfil" value={opt.value}
                                                checked={form.perfil === opt.value}
                                                onChange={set('perfil')}
                                                className="sr-only"
                                            />
                                            <span className="text-sm font-semibold">{opt.label}</span>
                                        </div>
                                        <p className="text-[11px] text-muted-foreground pl-6">{opt.desc}</p>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Switches */}
                        <div className="space-y-3">
                            {[
                                { key: 'ativo', label: 'Conta Ativa', desc: 'Usuário pode acessar o sistema imediatamente.' },
                                { key: 'notificacoes', label: 'Receber Notificações', desc: 'Alertas de sistema por e-mail e push.' },
                            ].map(sw => (
                                <div key={sw.key} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{sw.label}</p>
                                        <p className="text-[11px] text-muted-foreground">{sw.desc}</p>
                                    </div>
                                    <Switch
                                        checked={form[sw.key]}
                                        onCheckedChange={(v) => setForm(f => ({ ...f, [sw.key]: v }))}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Checkbox termos */}
                        <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                            form.aceiteTermos ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20' : 'border-border hover:border-primary/50'
                        }`}>
                            <input
                                type="checkbox"
                                checked={form.aceiteTermos}
                                onChange={(e) => setForm(f => ({ ...f, aceiteTermos: e.target.checked }))}
                                className="mt-0.5 w-4 h-4 rounded accent-primary cursor-pointer"
                            />
                            <div>
                                <p className="text-sm font-semibold text-foreground">Aceito os Termos de Uso e Política de Privacidade <span className="text-destructive">*</span></p>
                                <p className="text-[11px] text-muted-foreground">Ao marcar, você concorda com o tratamento dos seus dados conforme a LGPD.</p>
                            </div>
                        </label>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center gap-2 border-t pt-4">
                    <Button
                        type="button" variant="ghost" size="sm"
                        onClick={() => setForm({ nome:'', sobrenome:'', email:'', telefone:'', cargo:'', departamento:'', cidade:'', estado:'', bio:'', perfil:'usuario', ativo:true, notificacoes:false, aceiteTermos:false, genero:'' })}
                    >
                        Limpar formulário
                    </Button>
                    <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[130px]">
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                                Salvando...
                            </span>
                        ) : 'Criar Cadastro'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
