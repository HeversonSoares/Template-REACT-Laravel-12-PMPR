import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Link } from 'react-router-dom';
import {
    UserPlus, LogIn, Layers3, SlidersHorizontal, Braces, ClipboardList,
    ArrowRight, CheckCircle2
} from 'lucide-react';

const formSections = [
    {
        to: '/templates/forms/cadastro',
        icon: UserPlus,
        title: 'Formulário de Cadastro',
        description: 'Campos de texto, textarea, selects, radio group visual, switches e checkbox customizado.',
        tags: ['Input', 'Textarea', 'Select', 'Switch', 'Radio', 'Checkbox'],
        color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-900',
        iconColor: 'text-blue-600 dark:text-blue-400',
        badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
    },
    {
        to: '/templates/forms/auth',
        icon: LogIn,
        title: 'Login & Autenticação',
        description: 'Login com OAuth, registro com medidor de força de senha e recuperação de senha em etapas.',
        tags: ['Login', 'Registro', 'Senha', 'OAuth', 'Tabs'],
        color: 'from-violet-500/10 to-purple-500/10 border-violet-200 dark:border-violet-900',
        iconColor: 'text-violet-600 dark:text-violet-400',
        badge: 'bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300',
    },
    {
        to: '/templates/forms/wizard',
        icon: Layers3,
        title: 'Wizard (Passo a Passo)',
        description: 'Formulário multi-etapas com stepper visual, navegação entre passos e revisão final.',
        tags: ['Stepper', 'Multi-step', 'Revisão', 'Planos'],
        color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900',
        iconColor: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    },
    {
        to: '/templates/forms/filtros',
        icon: SlidersHorizontal,
        title: 'Filtros & Busca Avançada',
        description: 'Painel de filtros expansível, chips removíveis, Searchable Select e Multi-Select.',
        tags: ['SearchableSelect', 'MultiSelect', 'Chips', 'Switch', 'Toggle'],
        color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-900',
        iconColor: 'text-emerald-600 dark:text-emerald-400',
        badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
        to: '/templates/forms/avancado',
        icon: Braces,
        title: 'Componentes Avançados',
        description: 'Select2 com pesquisa, Multi-Select com tags e checkboxes customizados.',
        tags: ['SearchableSelect', 'MultiSelect', 'CustomCheckbox'],
        color: 'from-rose-500/10 to-pink-500/10 border-rose-200 dark:border-rose-900',
        iconColor: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
    },
];

const highlights = [
    'Todos os exemplos são funcionais e interativos',
    'Baseados nos componentes shadcn/ui',
    'Com estados de loading, validação e feedback',
    'Prontos para adaptar ao seu projeto',
];

export default function TemplateFormsOverview() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />

                {/* Header */}
                <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <ClipboardList className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold text-foreground">Formulários</h1>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed max-w-2xl">
                                Exemplos completos de formulários usando os componentes do shadcn/ui.
                                Cada seção demonstra um padrão diferente — desde cadastros simples até wizards multi-etapas.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {highlights.map(h => (
                                    <span key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {h}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {formSections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <Link
                                key={section.to}
                                to={section.to}
                                className={`group relative flex flex-col gap-4 p-5 rounded-2xl border bg-gradient-to-br ${section.color} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`w-10 h-10 rounded-xl bg-background/60 backdrop-blur-sm border border-white/20 flex items-center justify-center ${section.iconColor}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-foreground text-base leading-tight">{section.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{section.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                                    {section.tags.map(tag => (
                                        <span key={tag} className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${section.badge}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Dica */}
                <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Braces className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">Dica de uso</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            Os componentes de formulário estão em <code className="bg-muted px-1 py-0.5 rounded text-[11px]">resources/js/modules/Template/components/forms/</code>.
                            Copie e adapte livremente para os seus módulos.
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
