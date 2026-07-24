import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
    ChevronRight, ChevronLeft, CheckCircle2, User, Building2, CreditCard,
    Check, Layers3
} from 'lucide-react';

const steps = [
    { id: 1, label: 'Pessoal',   icon: User,        desc: 'Informações básicas' },
    { id: 2, label: 'Empresa',   icon: Building2,   desc: 'Dados organizacionais' },
    { id: 3, label: 'Plano',     icon: CreditCard,  desc: 'Escolha do plano' },
    { id: 4, label: 'Revisão',   icon: Check,       desc: 'Confirmar dados' },
];

const plans = [
    { id: 'starter', name: 'Starter', price: 'Grátis', features: ['5 usuários', '1 GB armazenamento', 'Suporte por e-mail'], color: 'border-border' },
    { id: 'pro', name: 'Pro', price: 'R$ 49/mês', features: ['25 usuários', '10 GB armazenamento', 'Suporte prioritário', 'Relatórios avançados'], color: 'border-primary', highlight: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Sob consulta', features: ['Ilimitado', 'Armazenamento ilimitado', 'Suporte 24/7', 'SLA garantido', 'Deploy dedicado'], color: 'border-border' },
];

function StepIndicator({ current }) {
    return (
        <div className="flex items-center justify-between mb-6 px-2">
            {steps.map((step, idx) => {
                const done = current > step.id;
                const active = current === step.id;
                const Icon = step.icon;
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center gap-1.5 min-w-[60px]">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                                done ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20'
                                : active ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                : 'border-border bg-muted text-muted-foreground'
                            }`}>
                                {done ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                            </div>
                            <div className="text-center hidden sm:block">
                                <p className={`text-[11px] font-bold ${active ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground'}`}>{step.label}</p>
                                <p className="text-[10px] text-muted-foreground leading-tight">{step.desc}</p>
                            </div>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-1 transition-all duration-500 ${current > step.id ? 'bg-primary' : 'bg-border'}`} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

export default function WizardForm() {
    const [step, setStep] = useState(1);
    const [done, setDone] = useState(false);
    const [form, setForm] = useState({
        nome: '', email: '', telefone: '',
        empresa: '', cnpj: '', segmento: '', tamanho: '',
        plano: 'pro',
    });

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e?.target ? e.target.value : e }));

    const next = () => setStep(s => Math.min(4, s + 1));
    const prev = () => setStep(s => Math.max(1, s - 1));

    if (done) return (
        <Card className="border-emerald-200 dark:border-emerald-800">
            <CardContent className="py-12 flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                    <p className="font-bold text-foreground text-xl">Cadastro concluído!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Bem-vindo, <span className="font-semibold text-foreground">{form.nome}</span>.<br />
                        Plano <span className="font-semibold text-primary capitalize">{form.plano}</span> ativado para <span className="font-semibold">{form.empresa}</span>.
                    </p>
                </div>
                <Button variant="outline" onClick={() => { setDone(false); setStep(1); }}>Reiniciar demonstração</Button>
            </CardContent>
        </Card>
    );

    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Layers3 className="w-5 h-5 text-primary" />
                            Formulário por Etapas (Wizard)
                        </CardTitle>
                        <CardDescription className="mt-1">Multi-step form com stepper visual e validação por etapa.</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">Exemplo</Badge>
                </div>
            </CardHeader>

            <CardContent>
                <StepIndicator current={step} />

                {/* Passo 1: Pessoal */}
                {step === 1 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-sm font-bold text-foreground">Informações Pessoais</h3>
                        <div className="space-y-1.5">
                            <label htmlFor="wiz-nome" className="text-sm font-semibold text-foreground">Nome completo <span className="text-destructive">*</span></label>
                            <Input id="wiz-nome" placeholder="Ex: Maria Oliveira" value={form.nome} onChange={set('nome')} required />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="wiz-email" className="text-sm font-semibold text-foreground">E-mail <span className="text-destructive">*</span></label>
                            <Input id="wiz-email" type="email" placeholder="maria@empresa.com.br" value={form.email} onChange={set('email')} required />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="wiz-tel" className="text-sm font-semibold text-foreground">Telefone</label>
                            <Input id="wiz-tel" placeholder="(41) 99000-0000" value={form.telefone} onChange={set('telefone')} />
                        </div>
                    </div>
                )}

                {/* Passo 2: Empresa */}
                {step === 2 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-sm font-bold text-foreground">Dados da Empresa</h3>
                        <div className="space-y-1.5">
                            <label htmlFor="wiz-empresa" className="text-sm font-semibold text-foreground">Nome da Empresa <span className="text-destructive">*</span></label>
                            <Input id="wiz-empresa" placeholder="Acme Corp." value={form.empresa} onChange={set('empresa')} required />
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="wiz-cnpj" className="text-sm font-semibold text-foreground">CNPJ</label>
                            <Input id="wiz-cnpj" placeholder="00.000.000/0001-00" value={form.cnpj} onChange={set('cnpj')} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-foreground">Segmento</label>
                                <Select value={form.segmento} onValueChange={(v) => setForm(f => ({...f, segmento: v}))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tech">Tecnologia</SelectItem>
                                        <SelectItem value="saude">Saúde</SelectItem>
                                        <SelectItem value="educacao">Educação</SelectItem>
                                        <SelectItem value="varejo">Varejo</SelectItem>
                                        <SelectItem value="industria">Indústria</SelectItem>
                                        <SelectItem value="publico">Setor Público</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-foreground">Porte</label>
                                <Select value={form.tamanho} onValueChange={(v) => setForm(f => ({...f, tamanho: v}))}>
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="mei">MEI / Autônomo</SelectItem>
                                        <SelectItem value="pequena">Pequena (até 50)</SelectItem>
                                        <SelectItem value="media">Média (50–500)</SelectItem>
                                        <SelectItem value="grande">Grande (500+)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Passo 3: Plano */}
                {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-sm font-bold text-foreground">Escolha seu Plano</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {plans.map(plan => (
                                <label
                                    key={plan.id}
                                    className={`flex flex-col gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        form.plano === plan.id
                                            ? 'border-primary shadow-md shadow-primary/15 bg-primary/5'
                                            : 'border-border hover:border-primary/40 hover:bg-muted/30'
                                    } ${plan.highlight && form.plano !== plan.id ? 'relative' : ''}`}
                                >
                                    {plan.highlight && (
                                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                                            <Badge className="text-[10px] px-2 py-0 bg-primary text-primary-foreground">Recomendado</Badge>
                                        </div>
                                    )}
                                    <input type="radio" name="plano" value={plan.id} checked={form.plano === plan.id}
                                        onChange={() => setForm(f => ({...f, plano: plan.id}))} className="sr-only" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-bold text-sm text-foreground">{plan.name}</p>
                                            <p className="text-xs text-primary font-semibold mt-0.5">{plan.price}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                            form.plano === plan.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                                        }`}>
                                            {form.plano === plan.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                        </div>
                                    </div>
                                    <ul className="space-y-1 mt-1">
                                        {plan.features.map(f => (
                                            <li key={f} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                                                <Check className="w-3 h-3 text-emerald-500 flex-shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Passo 4: Revisão */}
                {step === 4 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h3 className="text-sm font-bold text-foreground">Revisão dos Dados</h3>
                        <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
                            {[
                                { label: 'Nome', value: form.nome || '—' },
                                { label: 'E-mail', value: form.email || '—' },
                                { label: 'Telefone', value: form.telefone || '—' },
                                { label: 'Empresa', value: form.empresa || '—' },
                                { label: 'CNPJ', value: form.cnpj || '—' },
                                { label: 'Segmento', value: form.segmento || '—' },
                                { label: 'Porte', value: form.tamanho || '—' },
                                { label: 'Plano', value: plans.find(p => p.id === form.plano)?.name || '—' },
                            ].map(row => (
                                <div key={row.label} className="flex items-center justify-between px-4 py-2.5 hover:bg-muted/30 transition-colors">
                                    <span className="text-xs text-muted-foreground font-medium">{row.label}</span>
                                    <span className="text-xs font-semibold text-foreground">{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-muted-foreground">Ao confirmar, você aceita os termos de uso da plataforma.</p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={prev} disabled={step === 1} className="gap-2">
                    <ChevronLeft className="w-4 h-4" /> Anterior
                </Button>
                <div className="flex items-center gap-2">
                    {steps.map(s => (
                        <div key={s.id} className={`h-1.5 rounded-full transition-all duration-300 ${
                            s.id === step ? 'w-6 bg-primary' : s.id < step ? 'w-3 bg-primary/50' : 'w-3 bg-muted'
                        }`} />
                    ))}
                </div>
                {step < 4
                    ? <Button onClick={next} className="gap-2">Próximo <ChevronRight className="w-4 h-4" /></Button>
                    : <Button onClick={() => setDone(true)} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"><Check className="w-4 h-4" /> Confirmar</Button>
                }
            </CardFooter>
        </Card>
    );
}
