import React, { useState, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
    Plus,
    MoreHorizontal,
    User,
    Calendar,
    Flag,
    GripVertical,
    Trash2,
    Pencil,
    CheckCircle2,
    Clock,
    CircleDashed,
    AlertCircle,
    Search,
    X,
    Tag,
} from 'lucide-react';

// ─── Dados iniciais do Kanban ─────────────────────────────────────────────────
const INITIAL_COLUMNS = {
    backlog: {
        id: 'backlog',
        title: 'Backlog',
        color: 'bg-slate-500',
        lightColor: 'bg-slate-500/10',
        borderColor: 'border-slate-500/30',
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
        color: 'bg-blue-500',
        lightColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30',
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
        color: 'bg-amber-500',
        lightColor: 'bg-amber-500/10',
        borderColor: 'border-amber-500/30',
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
        color: 'bg-emerald-500',
        lightColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
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
    high:   { label: 'Alta',   class: 'text-red-500',    bg: 'bg-red-500/10',    border: 'border-red-500/20' },
    medium: { label: 'Média',  class: 'text-amber-500',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20' },
    low:    { label: 'Baixa',  class: 'text-emerald-500',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20' },
};

// ─── Avatares coloridos por sigla ─────────────────────────────────────────────
const AVATAR_COLORS = {
    HS: 'bg-blue-500',
    CS: 'bg-purple-500',
    MR: 'bg-emerald-500',
    JL: 'bg-amber-500',
};

function Avatar({ initials }) {
    const color = AVATAR_COLORS[initials] || 'bg-slate-500';
    return (
        <div className={`h-6 w-6 rounded-full ${color} text-white text-[10px] font-bold flex items-center justify-center shrink-0`}>
            {initials}
        </div>
    );
}

function PriorityBadge({ priority }) {
    const cfg = PRIORITY_CONFIG[priority];
    if (!cfg) return null;
    return (
        <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md border ${cfg.bg} ${cfg.border} ${cfg.class}`}>
            <Flag className="h-2.5 w-2.5" />
            {cfg.label}
        </span>
    );
}

// ─── Card Kanban ──────────────────────────────────────────────────────────────
function KanbanCard({ card, columnId, onDragStart, onDelete, onEdit, isDragging }) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, card.id, columnId)}
            className={`group bg-card border border-border rounded-xl p-3.5 space-y-2.5 cursor-grab active:cursor-grabbing
                transition-all duration-200 hover:shadow-md hover:border-primary/30
                ${isDragging ? 'opacity-40 scale-95' : 'opacity-100'}
            `}
        >
            {/* Top row: tag + actions */}
            <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                    <Tag className="h-2.5 w-2.5" />
                    {card.tag}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(card, columnId)}
                        className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                        <Pencil className="h-3 w-3" />
                    </button>
                    <button
                        onClick={() => onDelete(card.id, columnId)}
                        className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>
            </div>

            {/* Title */}
            <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                {card.title}
            </p>

            {/* Description */}
            {card.description && (
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                    {card.description}
                </p>
            )}

            <Separator className="opacity-50" />

            {/* Bottom: priority + due date + avatar */}
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                    <PriorityBadge priority={card.priority} />
                    {card.dueDate && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Calendar className="h-2.5 w-2.5" />
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
        <div className="flex flex-col min-w-[280px] max-w-[320px] flex-shrink-0 h-full">
            {/* Column header */}
            <div className={`flex items-center justify-between mb-3 px-1`}>
                <div className="flex items-center gap-2">
                    <div className={`h-6 w-6 rounded-md ${column.lightColor} border ${column.borderColor} flex items-center justify-center`}>
                        <Icon className={`h-3.5 w-3.5 ${column.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-sm font-bold text-foreground">{column.title}</span>
                    <span className={`h-5 min-w-5 px-1.5 rounded-full ${column.lightColor} border ${column.borderColor} text-[10px] font-bold flex items-center justify-center ${column.color.replace('bg-', 'text-')}`}>
                        {column.cards.length}
                    </span>
                </div>
                <button
                    onClick={() => onAddCard(column.id)}
                    className="h-6 w-6 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            {/* Drop zone */}
            <div
                onDragOver={(e) => onDragOver(e, column.id)}
                onDrop={(e) => onDrop(e, column.id)}
                className={`flex flex-col gap-2.5 flex-1 rounded-xl p-2 min-h-[200px] transition-colors duration-200
                    ${isOver ? `${column.lightColor} border-2 border-dashed ${column.borderColor}` : 'border-2 border-dashed border-transparent'}
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
                    <div className="flex-1 flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground/40">
                        <Icon className="h-8 w-8" />
                        <p className="text-xs">Sem cartões</p>
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
    const [dialogMode, setDialogMode]   = useState('add'); // 'add' | 'edit'
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
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />

                {/* ── Barra de status + filtros ─────────────────────────────── */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    {/* Progress */}
                    <div className="flex items-center gap-4">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-foreground">Progresso geral</span>
                                <span className="text-xs font-bold text-primary">{progress}%</span>
                            </div>
                            <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-700"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {COLUMN_ORDER.map(id => {
                                const col = columns[id];
                                const Icon = col.icon;
                                return (
                                    <div key={id} className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <Icon className={`h-3 w-3 ${col.color.replace('bg-', 'text-')}`} />
                                        <span className="font-semibold text-foreground">{col.cards.length}</span>
                                        <span className="hidden sm:inline">{col.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground" />
                            <Input
                                placeholder="Buscar cards..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="pl-7 h-8 text-xs w-44"
                            />
                            {search && (
                                <button onClick={() => setSearch('')} className="absolute right-2 top-2 text-muted-foreground hover:text-foreground">
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                        <Select value={filterPriority} onValueChange={setFilterPriority}>
                            <SelectTrigger className="h-8 text-xs w-36">
                                <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="high">🔴 Alta</SelectItem>
                                <SelectItem value="medium">🟡 Média</SelectItem>
                                <SelectItem value="low">🟢 Baixa</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => openAddDialog('backlog')}>
                            <Plus className="h-3.5 w-3.5" />
                            Novo Card
                        </Button>
                    </div>
                </div>

                {/* ── Board ─────────────────────────────────────────────────── */}
                <div
                    className="flex gap-5 overflow-x-auto pb-6"
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
                    <DialogContent className="bg-background border border-border text-foreground sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle className="text-lg font-bold text-foreground">
                                {dialogMode === 'add' ? 'Novo Card' : 'Editar Card'}
                            </DialogTitle>
                            <DialogDescription className="text-muted-foreground text-xs">
                                {dialogMode === 'add'
                                    ? `Adicionando ao: ${columns[targetCol]?.title}`
                                    : 'Atualize as informações do card.'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-2">
                            {/* Título */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">Título *</label>
                                <Input
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="O que precisa ser feito?"
                                />
                            </div>

                            {/* Descrição */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-foreground">Descrição</label>
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
                                    <label className="text-xs font-semibold text-foreground">Prioridade</label>
                                    <Select value={form.priority} onValueChange={v => setForm(f => ({ ...f, priority: v }))}>
                                        <SelectTrigger className="text-xs">
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
                                    <label className="text-xs font-semibold text-foreground">Tag</label>
                                    <Select value={form.tag} onValueChange={v => setForm(f => ({ ...f, tag: v }))}>
                                        <SelectTrigger className="text-xs">
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
                                    <label className="text-xs font-semibold text-foreground">Responsável</label>
                                    <Select value={form.assignee} onValueChange={v => setForm(f => ({ ...f, assignee: v }))}>
                                        <SelectTrigger className="text-xs">
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
                                    <label className="text-xs font-semibold text-foreground">Data limite</label>
                                    <Input
                                        type="date"
                                        value={form.dueDate}
                                        onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
                                        className="text-xs"
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

                        <DialogFooter className="gap-2">
                            <Button variant="outline" size="sm" onClick={() => setIsDialogOpen(false)}>
                                Cancelar
                            </Button>
                            <Button size="sm" variant="success" onClick={handleSave} disabled={!form.title.trim()}>
                                {dialogMode === 'add' ? 'Criar Card' : 'Salvar Alterações'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </Layout>
    );
}
