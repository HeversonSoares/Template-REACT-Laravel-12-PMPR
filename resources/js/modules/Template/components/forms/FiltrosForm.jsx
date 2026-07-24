import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { MultiSelect } from '@/components/ui/multi-select';
import { Switch } from '@/components/ui/switch';
import { Search, Filter, X, SlidersHorizontal, RotateCcw, Download } from 'lucide-react';

const statusOptions = [
    { value: 'ativo', label: 'Ativo' },
    { value: 'inativo', label: 'Inativo' },
    { value: 'pendente', label: 'Pendente' },
    { value: 'bloqueado', label: 'Bloqueado' },
];

const categoriaOptions = [
    { value: 'admin', label: 'Administrador' },
    { value: 'operador', label: 'Operador' },
    { value: 'visualizador', label: 'Visualizador' },
    { value: 'auditor', label: 'Auditor' },
    { value: 'supervisor', label: 'Supervisor' },
];

const unidadeOptions = [
    { value: '1bpm', label: '1º BPM - Ponta Grossa' },
    { value: '12bpm', label: '12º BPM - Curitiba' },
    { value: '13bpm', label: '13º BPM - Curitiba' },
    { value: '17bpm', label: '17º BPM - São José dos Pinhais' },
    { value: '20bpm', label: '20º BPM - Curitiba' },
    { value: '5bpm', label: '5º BPM - Londrina' },
    { value: '2bpm', label: '2º BPM - Guarapuava' },
];

function FilterChip({ label, onRemove }) {
    return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
            {label}
            <button onClick={onRemove} className="hover:text-destructive transition-colors ml-0.5">
                <X className="w-3 h-3" />
            </button>
        </div>
    );
}

export default function FiltrosForm() {
    const [expanded, setExpanded] = useState(true);
    const [form, setForm] = useState({
        busca: '', unidade: '', status: [], categorias: [],
        dataInicio: '', dataFim: '', soAtivos: false,
    });

    const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));
    const setInput = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

    const activeFilters = [
        ...(form.busca ? [{ key: 'busca', label: `Busca: "${form.busca}"`, clear: () => setForm(f => ({ ...f, busca: '' })) }] : []),
        ...(form.unidade ? [{ key: 'unidade', label: `Unidade: ${unidadeOptions.find(u => u.value === form.unidade)?.label}`, clear: () => setForm(f => ({ ...f, unidade: '' })) }] : []),
        ...form.status.map(s => ({ key: `status-${s}`, label: `Status: ${statusOptions.find(o => o.value === s)?.label}`, clear: () => setForm(f => ({ ...f, status: f.status.filter(v => v !== s) })) })),
        ...form.categorias.map(c => ({ key: `cat-${c}`, label: `Categoria: ${categoriaOptions.find(o => o.value === c)?.label}`, clear: () => setForm(f => ({ ...f, categorias: f.categorias.filter(v => v !== c) })) })),
        ...(form.dataInicio ? [{ key: 'di', label: `De: ${form.dataInicio}`, clear: () => setForm(f => ({ ...f, dataInicio: '' })) }] : []),
        ...(form.dataFim ? [{ key: 'df', label: `Até: ${form.dataFim}`, clear: () => setForm(f => ({ ...f, dataFim: '' })) }] : []),
        ...(form.soAtivos ? [{ key: 'ativos', label: 'Apenas ativos', clear: () => setForm(f => ({ ...f, soAtivos: false })) }] : []),
    ];

    const reset = () => setForm({ busca: '', unidade: '', status: [], categorias: [], dataInicio: '', dataFim: '', soAtivos: false });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Busca: "${form.busca}" | Filtros: ${activeFilters.length} ativo(s)`);
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <SlidersHorizontal className="w-5 h-5 text-primary" />
                            Formulário de Filtros & Busca
                        </CardTitle>
                        <CardDescription className="mt-1">Pesquisa avançada com chips dinâmicos, Multi-Select e Searchable Select.</CardDescription>
                    </div>
                    <Badge variant="outline" className="text-xs">Exemplo</Badge>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">

                    {/* Barra de busca principal */}
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                className="pl-9"
                                placeholder="Buscar por nome, matrícula, e-mail..."
                                value={form.busca}
                                onChange={setInput('busca')}
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="gap-2 shrink-0"
                            onClick={() => setExpanded(e => !e)}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="hidden sm:inline">Filtros</span>
                            {activeFilters.length > 0 && (
                                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                                    {activeFilters.length}
                                </span>
                            )}
                        </Button>
                        <Button type="submit" className="gap-2 shrink-0">
                            <Search className="w-4 h-4" />
                            <span className="hidden sm:inline">Buscar</span>
                        </Button>
                    </div>

                    {/* Painel de filtros avançados */}
                    {expanded && (
                        <div className="rounded-xl border border-border bg-muted/20 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-bold text-foreground flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" /> Filtros Avançados
                                </p>
                                {activeFilters.length > 0 && (
                                    <button type="button" onClick={reset} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors">
                                        <RotateCcw className="w-3 h-3" /> Limpar todos
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Searchable Select - Unidade */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">Unidade / Batalhão</label>
                                    <SearchableSelect
                                        placeholder="Pesquisar unidade..."
                                        options={unidadeOptions}
                                        value={form.unidade}
                                        onChange={set('unidade')}
                                    />
                                </div>

                                {/* Multi-Select - Status */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">Status</label>
                                    <MultiSelect
                                        placeholder="Selecionar status..."
                                        options={statusOptions}
                                        selectedValues={form.status}
                                        onChange={set('status')}
                                    />
                                </div>

                                {/* Multi-Select - Categorias */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">Perfil / Categoria</label>
                                    <MultiSelect
                                        placeholder="Selecionar perfis..."
                                        options={categoriaOptions}
                                        selectedValues={form.categorias}
                                        onChange={set('categorias')}
                                    />
                                </div>

                                {/* Período */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground uppercase tracking-wide">Período de Cadastro</label>
                                    <div className="flex gap-2">
                                        <Input type="date" value={form.dataInicio} onChange={setInput('dataInicio')} className="text-xs" />
                                        <Input type="date" value={form.dataFim} onChange={setInput('dataFim')} className="text-xs" />
                                    </div>
                                </div>
                            </div>

                            {/* Toggle */}
                            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Exibir apenas registros ativos</p>
                                    <p className="text-[11px] text-muted-foreground">Ocultar registros inativos ou bloqueados.</p>
                                </div>
                                <Switch checked={form.soAtivos} onCheckedChange={set('soAtivos')} />
                            </div>
                        </div>
                    )}

                    {/* Chips de filtros ativos */}
                    {activeFilters.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-xs text-muted-foreground font-medium">Filtros ativos:</p>
                            <div className="flex flex-wrap gap-2">
                                {activeFilters.map(f => (
                                    <FilterChip key={f.key} label={f.label} onRemove={f.clear} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resultado simulado */}
                    <div className="rounded-xl border border-border overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border">
                            <p className="text-xs font-semibold text-foreground">Resultado simulado</p>
                            <Button type="button" variant="ghost" size="sm" className="gap-1.5 text-xs h-7">
                                <Download className="w-3.5 h-3.5" /> Exportar
                            </Button>
                        </div>
                        <div className="divide-y divide-border">
                            {[
                                { nome: 'João da Silva', status: 'Ativo', perfil: 'Operador', unidade: '12º BPM' },
                                { nome: 'Maria Oliveira', status: 'Ativo', perfil: 'Administrador', unidade: '1º BPM' },
                                { nome: 'Carlos Pereira', status: 'Pendente', perfil: 'Visualizador', unidade: '17º BPM' },
                                { nome: 'Ana Costa', status: 'Inativo', perfil: 'Auditor', unidade: '5º BPM' },
                            ].map((row, i) => (
                                <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-muted/20 transition-colors">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{row.nome}</p>
                                        <p className="text-xs text-muted-foreground">{row.unidade} · {row.perfil}</p>
                                    </div>
                                    <Badge variant={row.status === 'Ativo' ? 'default' : 'secondary'} className="text-xs">
                                        {row.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between border-t pt-4">
                    <Button type="button" variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-muted-foreground">
                        <RotateCcw className="w-4 h-4" /> Resetar
                    </Button>
                    <Button type="submit" className="gap-2">
                        <Search className="w-4 h-4" /> Aplicar Filtros
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
