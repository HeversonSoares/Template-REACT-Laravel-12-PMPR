import React, { useState, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import ActionButton from '@/components/ui/action-button';
import ExpandableSearch from '@/components/ui/expandable-search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Plus,
    Calendar,
    Trash2,
    Pencil,
    CheckCircle2,
    Clock,
    CircleDashed,
    AlertCircle,
    Kanban,
    TrendingUp,
    BarChart2,
} from 'lucide-react';

// ─── Dados iniciais do Kanban ─────────────────────────────────────────────────
const INITIAL_COLUMNS = {
    backlog: {
        id: 'backlog',
        title: 'Backlog',
        accent: '#94a3b8',
        icon: CircleDashed,
        cards: [
            {
                id: 'c1', title: 'Revisão de requisitos de segurança',
                description: 'Auditar os endpoints da API quanto à autenticação e autorização.',
                priority: 'high', tag: 'Backend', assignee: 'CS', dueDate: '2026-08-10',
            },
            {
                id: 'c2', title: 'Documentação da arquitetura BFF',
                description: 'Criar diagrama de fluxo e documentação do padrão BFF adotado.',
                priority: 'medium', tag: 'Docs', assignee: 'MR', dueDate: '2026-08-15',
            },
            {
                id: 'c3', title: 'Migração do banco de dados legado',
                description: 'Planejar e executar a migração das tabelas do sistema antigo.',
                priority: 'low', tag: 'Database', assignee: 'JL', dueDate: '2026-09-01',
            },
        ],
    },
    todo: {
        id: 'todo',
        title: 'A Fazer',
        accent: '#3b82f6',
        icon: Clock,
        cards: [
            {
                id: 'c4', title: 'Implementar filtro avançado na tabela de frotas',
                description: 'Adicionar filtros de data, status e tipo de veículo.',
                priority: 'high', tag: 'Frontend', assignee: 'HS', dueDate: '2026-07-28',
            },
            {
                id: 'c5', title: 'Criar tela de relatório mensal',
                description: 'Dashboard com métricas consolidadas por mês.',
                priority: 'medium', tag: 'Frontend', assignee: 'CS', dueDate: '2026-08-05',
            },
        ],
    },
    inProgress: {
        id: 'inProgress',
        title: 'Em Progresso',
        accent: '#f59e0b',
        icon: AlertCircle,
        cards: [
            {
                id: 'c6', title: 'Integração com API de efetivo PMPR',
                description: 'Conectar o BFF Laravel ao endpoint externo de efetivo.',
                priority: 'high', tag: 'Backend', assignee: 'MR', dueDate: '2026-07-25',
            },
            {
                id: 'c7', title: 'Componente de upload de arquivos',
                description: 'Drag-and-drop com preview e validação de tipo/tamanho.',
                priority: 'medium', tag: 'Frontend', assignee: 'HS', dueDate: '2026-07-30',
            },
        ],
    },
    done: {
        id: 'done',
        title: 'Concluído',
        accent: '#10b981',
        icon: CheckCircle2,
        cards: [
            {
                id: 'c8', title: 'Setup inicial do projeto React + Laravel',
                description: 'Configuração do Vite, Tailwind, shadcn/ui e estrutura de módulos.',
                priority: 'high', tag: 'DevOps', assignee: 'HS', dueDate: '2026-07-01',
            },
            {
                id: 'c9', title: 'Layout principal com sidebar responsiva',
                description: 'Sidebar colapsável com suporte a modo escuro e mobile.',
                priority: 'medium', tag: 'Frontend', assignee: 'HS', dueDate: '2026-07-10',
            },
        ],
    },
};

const COLUMN_ORDER = ['backlog', 'todo', 'inProgress', 'done'];

// ─── Prioridade config ────────────────────────────────────────────────────────
const PRIORITY_CONFIG = {
    high:   { label: 'Alta',   dot: '#ef4444', borderColor: '#ef4444' },
    medium: { label: 'Média',  dot: '#f59e0b', borderColor: '#f59e0b' },
    low:    { label: 'Baixa',  dot: '#10b981', borderColor: '#10b981' },
};

// ─── Tag colors ───────────────────────────────────────────────────────────────
const TAG_COLORS = {
    Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    Backend:  'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
    Database: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
    DevOps:   'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    Docs:     'bg-teal-100 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
    Design:   'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300',
};

// ─── Avatares coloridos por sigla ─────────────────────────────────────────────
const AVATAR_META = {
    HS: { bg: '#3b82f6', label: 'Heverson S.' },
    CS: { bg: '#8b5cf6', label: 'Carlos S.' },
    MR: { bg: '#10b981', label: 'Marina R.' },
    JL: { bg: '#f59e0b', label: 'João L.' },
};

function Avatar({ initials }) {
    const meta = AVATAR_META[initials] || { bg: '#64748b', label: initials };
    return (
        <div
            title={meta.label}
            className="h-7 w-7 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0 ring-2 ring-background"
            style={{ backgroundColor: meta.bg }}
        >
            {initials}
        </div>
    );
}

function PriorityDot({ priority }) {
    const cfg = PRIORITY_CONFIG[priority];
    if (!cfg) return null;
    return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: cfg.dot }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.dot }} />
            {cfg.label}
        </span>
    );
}

function TagBadge({ tag }) {
    const colorClass = TAG_COLORS[tag] || 'bg-muted text-muted-foreground';
    return (
        <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${colorClass}`}>
            {tag}
        </span>
    );
}

// ─── Card Kanban ──────────────────────────────────────────────────────────────
function KanbanCard({ card, columnId, onDragStart, onDelete, onEdit, isDragging }) {
    const priorityCfg = PRIORITY_CONFIG[card.priority] || {};

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, card.id, columnId)}
            className={`group relative bg-card border border-border/60 border-l-[3px] rounded-lg p-4 cursor-grab active:cursor-grabbing
                transition-all duration-150 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:border-border
                ${isDragging ? 'opacity-30 scale-[0.97]' : 'opacity-100'}
            `}
            style={{ borderLeftColor: priorityCfg.borderColor }}
        >
            {/* Actions (hover) */}
            <div className="absolute top-3 right-3 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(card, columnId)}
                    className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                    <Pencil className="h-3 w-3" />
                </button>
                <button
                    onClick={() => onDelete(card.id, columnId)}
                    className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                >
                    <Trash2 className="h-3 w-3" />
                </button>
            </div>

            {/* Tag */}
            <div className="mb-2.5">
                <TagBadge tag={card.tag} />
            </div>

            {/* Title */}
            <p className="text-[13px] font-semibold text-foreground leading-snug line-clamp-2 pr-10 mb-1">
                {card.title}
            </p>

            {/* Description */}
            {card.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {card.description}
                </p>
            )}

            {/* Footer: priority + date + avatar */}
            <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-border/40">
                <div className="flex items-center gap-3">
                    <PriorityDot priority={card.priority} />
                    {card.dueDate && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                            <Calendar className="h-3 w-3" />
                            {new Date(card.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                        </span>
                    )}
                </div>
                {card.assignee && <Avatar initials={card.assignee} />}
            </div>
        </div>
    );
}

// ─── Coluna Kanban ────────────────────────────────────────────────────────────
function KanbanColumn({ column, onDragStart, onDragOver, onDrop, onDelete, onEdit, onAddCard, draggingId, dragOverCol }) {
    const Icon = column.icon;
    const isOver = dragOverCol === column.id;

    return (
        <div className="flex flex-col w-[300px] flex-shrink-0">
            {/* Column header */}
            <div className="flex items-center justify-between mb-3 px-0.5">
                <div className="flex items-center gap-2.5">
                    <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: column.accent }}
                    />
                    <span className="text-[13px] font-semibold text-foreground tracking-tight">
                        {column.title}
                    </span>
                    <span
                        className="min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                        style={{ backgroundColor: column.accent }}
                    >
                        {column.cards.length}
                    </span>
                </div>
                <button
                    onClick={() => onAddCard(column.id)}
                    className="h-7 w-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    title="Adicionar card"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            {/* Drop zone */}
            <div
                onDragOver={(e) => onDragOver(e, column.id)}
                onDrop={(e) => onDrop(e, column.id)}
                className={`flex flex-col gap-2 flex-1 rounded-xl min-h-[200px] transition-all duration-200
                    ${isOver ? 'bg-accent/40 ring-2 ring-dashed ring-border p-2' : 'p-0'}
                `}
            >
                {column.cards.map((card) => (
                    <KanbanCard
                        key={card.id}
                        card={card}
                        columnId={column.id}
                        onDragStart={onDragStart}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        isDragging={draggingId === card.id}
                    />
                ))}

                {column.cards.length === 0 && !isOver && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 py-10 rounded-xl border-2 border-dashed border-border/40">
                        <Icon className="h-6 w-6 text-muted-foreground/30" />
                        <p className="text-xs text-muted-foreground/40 font-medium">Sem cartões</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Componente Principal ─────────────────────────────────────────────────────
export default function TemplateKanban() {
    const [columns, setColumns] = useState(INITIAL_COLUMNS);
    const [draggingId, setDraggingId]   = useState(null);
    const [draggingCol, setDraggingCol] = useState(null);
    const [dragOverCol, setDragOverCol] = useState(null);
    const [search, setSearch]           = useState('');
    const [filterPriority, setFilterPriority] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSheetOpen, setIsSheetOpen]   = useState(false);
    const [dialogMode, setDialogMode]     = useState('add'); // 'add' | 'edit'
    const [targetCol, setTargetCol]     = useState('backlog');
    const [editingCard, setEditingCard] = useState(null);

    // Form state
    const [form, setForm] = useState({ title: '', description: '', priority: 'medium', tag: 'Frontend', assignee: 'HS', dueDate: '' });

    const idCounter = useRef(100);

    // ── Drag handlers ─────────────────────────────────────────────────────────
    const handleDragStart = useCallback((e, cardId, colId) => {
        setDraggingId(cardId);
        setDraggingCol(colId);
        e.dataTransfer.effectAllowed = 'move';
    }, []);

    const handleDragOver = useCallback((e, colId) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        setDragOverCol(colId);
    }, []);

    const handleDrop = useCallback((e, targetColId) => {
        e.preventDefault();
        if (!draggingId || draggingCol === targetColId) {
            setDraggingId(null);
            setDraggingCol(null);
            setDragOverCol(null);
            return;
        }

        setColumns(prev => {
            const srcCards  = [...prev[draggingCol].cards];
            const destCards = [...prev[targetColId].cards];
            const idx = srcCards.findIndex(c => c.id === draggingId);
            if (idx === -1) return prev;
            const [moved] = srcCards.splice(idx, 1);
            destCards.push(moved);
            return {
                ...prev,
                [draggingCol]:  { ...prev[draggingCol],  cards: srcCards  },
                [targetColId]:  { ...prev[targetColId],  cards: destCards  },
            };
        });

        setDraggingId(null);
        setDraggingCol(null);
        setDragOverCol(null);
    }, [draggingId, draggingCol]);

    // ── CRUD ──────────────────────────────────────────────────────────────────
    const handleDelete = useCallback((cardId, colId) => {
        setColumns(prev => ({
            ...prev,
            [colId]: { ...prev[colId], cards: prev[colId].cards.filter(c => c.id !== cardId) },
        }));
    }, []);

    const openAddDialog = useCallback((colId) => {
        setDialogMode('add');
        setTargetCol(colId);
        setForm({ title: '', description: '', priority: 'medium', tag: 'Frontend', assignee: 'HS', dueDate: '' });
        setIsDialogOpen(true);
    }, []);

    const openEditDialog = useCallback((card, colId) => {
        setDialogMode('edit');
        setTargetCol(colId);
        setEditingCard(card);
        setForm({ title: card.title, description: card.description || '', priority: card.priority, tag: card.tag, assignee: card.assignee, dueDate: card.dueDate || '' });
        setIsDialogOpen(true);
    }, []);

    const handleSave = useCallback(() => {
        if (!form.title.trim()) return;

        if (dialogMode === 'add') {
            const newCard = { id: `c${++idCounter.current}`, ...form };
            setColumns(prev => ({
                ...prev,
                [targetCol]: { ...prev[targetCol], cards: [...prev[targetCol].cards, newCard] },
            }));
        } else {
            setColumns(prev => ({
                ...prev,
                [targetCol]: {
                    ...prev[targetCol],
                    cards: prev[targetCol].cards.map(c => c.id === editingCard.id ? { ...c, ...form } : c),
                },
            }));
        }

        setIsDialogOpen(false);
    }, [dialogMode, form, targetCol, editingCard]);

    // ── Filtro ─────────────────────────────────────────────────────────────────
    const filteredColumns = React.useMemo(() => {
        const q = search.toLowerCase();
        return Object.fromEntries(
            Object.entries(columns).map(([id, col]) => [
                id,
                {
                    ...col,
                    cards: col.cards.filter(c => {
                        const matchSearch = !q || c.title.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q);
                        const matchPriority = filterPriority === 'all' || c.priority === filterPriority;
                        return matchSearch && matchPriority;
                    }),
                },
            ])
        );
    }, [columns, search, filterPriority]);

    const totalCards = Object.values(columns).reduce((s, col) => s + col.cards.length, 0);
    const doneCards  = columns.done.cards.length;
    const progress   = totalCards > 0 ? Math.round((doneCards / totalCards) * 100) : 0;

    return (
        <Layout>
            <div className="p-6 space-y-5 w-full">
                <TemplateMenu>
                    {/* Search */}
                    <ExpandableSearch
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        onClear={() => setSearch('')}
                        placeholder="Buscar cards..."
                    />



                    {/* Progresso */}
                    <ActionButton
                        icon={BarChart2}
                        label="Progresso"
                        tooltip="Ver progresso"
                        variant="outline"
                        compact
                        onClick={() => setIsSheetOpen(true)}
                    />

                    {/* Novo Card — mesmo estilo do ActionButton padrão */}
                    <ActionButton
                        icon={Plus}
                        label="Novo"
                        title="Novo Card"
                        variant="default"
                        compact
                        onClick={() => openAddDialog('backlog')}
                    />
                </TemplateMenu>



                {/* ── Board ─────────────────────────────────────────────────── */}
                <div
                    className="flex gap-5 overflow-x-auto pb-4"
                    onDragLeave={() => setDragOverCol(null)}
                >
                    {COLUMN_ORDER.map(colId => (
                        <KanbanColumn
                            key={colId}
                            column={filteredColumns[colId]}
                            onDragStart={handleDragStart}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onDelete={handleDelete}
                            onEdit={openEditDialog}
                            onAddCard={openAddDialog}
                            draggingId={draggingId}
                            dragOverCol={dragOverCol}
                        />
                    ))}
                </div>

                {/* ── Dialog Add/Edit ───────────────────────────────────────── */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="bg-background border border-border text-foreground sm:max-w-[480px]">
                        <DialogHeader>
                            <DialogTitle className="text-base font-semibold text-foreground">
                                {dialogMode === 'add' ? 'Novo Card' : 'Editar Card'}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-xs">
                                {dialogMode === 'add'
                                    ? `Adicionando à coluna: ${columns[targetCol]?.title}`
                                    : 'Atualize as informações do card.'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-1">
                            {/* Título */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Título *</label>
                                <Input
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="O que precisa ser feito?"
                                    className="text-sm"
                                />
                            </div>

                            {/* Descrição */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">Descrição</label>
                                <textarea
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    placeholder="Detalhes opcionais..."
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* Prioridade */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Prioridade</label>
                                    <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
                                        <SelectTrigger className="text-xs h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high">🔴 Alta</SelectItem>
                                            <SelectItem value="medium">🟡 Média</SelectItem>
                                            <SelectItem value="low">🟢 Baixa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Tag */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Tag</label>
                                    <Select value={form.tag} onValueChange={v => setForm(f => ({ ...f, tag: v }))}>
                                        <SelectTrigger className="text-xs h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Frontend">Frontend</SelectItem>
                                            <SelectItem value="Backend">Backend</SelectItem>
                                            <SelectItem value="Database">Database</SelectItem>
                                            <SelectItem value="DevOps">DevOps</SelectItem>
                                            <SelectItem value="Docs">Docs</SelectItem>
                                            <SelectItem value="Design">Design</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Responsável */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Responsável</label>
                                    <Select value={form.assignee} onValueChange={v => setForm(f => ({ ...f, assignee: v }))}>
                                        <SelectTrigger className="text-xs h-9">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="HS">HS — Heverson</SelectItem>
                                            <SelectItem value="CS">CS — Carlos</SelectItem>
                                            <SelectItem value="MR">MR — Marina</SelectItem>
                                            <SelectItem value="JL">JL — João</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Data limite */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">Data limite</label>
                                    <Input
                                        type="date"
                                        value={form.dueDate}
                                        onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                                        className="text-xs h-9"
                                    />
                                </div>
                            </div>

                            {/* Coluna destino (apenas no modo add) */}
                            {dialogMode === 'add' && (
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-foreground">Coluna</label>
                                    <Select value={targetCol} onValueChange={setTargetCol}>
                                        <SelectTrigger className="text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {COLUMN_ORDER.map(id => (
                                                <SelectItem key={id} value={id}>{columns[id].title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <DialogFooter className="gap-2 pt-1">
                            <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                                Cancelar
                            </Button>
                            <Button size="sm" variant="success" onClick={handleSave} disabled={!form.title.trim()}>
                                {dialogMode === 'add' ? 'Criar Card' : 'Salvar'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* ── Sheet Progresso ───────────────────────────────────────── */}
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetContent side="right" className="w-[380px] sm:w-[420px]">
                        <SheetHeader className="mb-6">
                            <SheetTitle className="flex items-center gap-2 text-base font-semibold">
                                <BarChart2 className="h-4 w-4 text-muted-foreground" />
                                Progresso do Board
                            </SheetTitle>
                            <SheetDescription className="text-xs text-muted-foreground">
                                Visão geral do andamento das tarefas por coluna.
                            </SheetDescription>
                        </SheetHeader>

                        {/* Overall progress */}
                        <div className="mb-6 p-4 rounded-xl bg-muted/40 border border-border/50 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-foreground">Progresso geral</span>
                                <span
                                    className="text-sm font-bold"
                                    style={{ color: '#10b981' }}
                                >
                                    {progress}%
                                </span>
                            </div>
                            <div className="h-2.5 bg-background rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{ width: `${progress}%`, backgroundColor: '#10b981' }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {doneCards} de {totalCards} tarefas concluídas
                            </p>
                        </div>

                        {/* Per-column breakdown */}
                        <div className="space-y-3">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Por coluna</p>
                            {COLUMN_ORDER.map(colId => {
                                const col = columns[colId];
                                const Icon = col.icon;
                                const colPct = totalCards > 0 ? Math.round((col.cards.length / totalCards) * 100) : 0;
                                return (
                                    <div key={colId} className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className="h-2 w-2 rounded-full"
                                                    style={{ backgroundColor: col.accent }}
                                                />
                                                <span className="text-sm font-medium text-foreground">{col.title}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {col.cards.length} tarefa{col.cards.length !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${colPct}%`, backgroundColor: col.accent }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Priority breakdown */}
                        <div className="mt-6 space-y-3">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Por prioridade</p>
                            {[
                                { key: 'high',   label: 'Alta',   color: '#ef4444' },
                                { key: 'medium', label: 'Média',  color: '#f59e0b' },
                                { key: 'low',    label: 'Baixa',  color: '#10b981' },
                            ].map(({ key, label, color }) => {
                                const count = Object.values(columns).flatMap(c => c.cards).filter(c => c.priority === key).length;
                                const pct = totalCards > 0 ? Math.round((count / totalCards) * 100) : 0;
                                return (
                                    <div key={key} className="flex items-center gap-3">
                                        <span className="flex items-center gap-1.5 w-16 text-xs font-medium" style={{ color }}>
                                            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                                            {label}
                                        </span>
                                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{ width: `${pct}%`, backgroundColor: color }}
                                            />
                                        </div>
                                        <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </Layout>
    );
}
