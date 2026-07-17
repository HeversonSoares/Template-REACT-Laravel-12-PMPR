import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { 
    LayoutTemplate,
    ExternalLink,
    Plus
} from 'lucide-react';

export default function TemplateMenu() {
    const location = useLocation();
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2.5">
                        <LayoutTemplate className="h-6 w-6 text-muted-foreground shrink-0" />
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Templates de Dashboard</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">Exemplos práticos e prontos de componentes usando a biblioteca shadcn/ui.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open('https://ui.shadcn.com/', '_blank')} className="flex items-center gap-1.5 shadow-sm text-xs font-semibold">
                        Shadcn Docs <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1.5 shadow-sm text-xs font-semibold">
                                <Plus className="h-4 w-4" /> Novo Template
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-background border border-border text-foreground sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-foreground">Adicionar Componente</DialogTitle>
                                <DialogDescription className="text-muted-foreground">
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
                                <Button onClick={() => setIsOpenDialog(false)} className="bg-primary text-primary-foreground hover:bg-primary/90">Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <hr className="border-border" />

            <div className="flex items-center justify-between pb-2">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-1">
                        <NavigationMenuItem>
                            <Link
                                to="/templates"
                                className={`${navigationMenuTriggerStyle()} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/templates') ? 'bg-accent text-accent-foreground font-semibold' : 'bg-transparent'}`}
                            >
                                Visão Geral
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/templates/dashboard"
                                className={`${navigationMenuTriggerStyle()} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/templates/dashboard') ? 'bg-accent text-accent-foreground font-semibold' : 'bg-transparent'}`}
                            >
                                Dashboard
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={`${navigationMenuTriggerStyle()} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/templates/tables') ? 'bg-accent text-accent-foreground font-semibold' : 'bg-transparent'}`}>
                                Tabelas
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="min-w-[200px] p-2 bg-popover border border-border rounded-xl shadow-lg flex flex-col gap-1 z-50">
                                    <Link
                                        to="/templates/tables"
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors ${
                                            isActive('/templates/tables')
                                                ? 'bg-primary/10 text-primary font-bold'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground font-medium'
                                        }`}
                                    >
                                        Tabela 1: Gestão de Frotas
                                    </Link>
                                    <Link
                                        to="/templates/tables"
                                        className={`w-full text-left px-3 py-2 text-xs sm:text-sm rounded-lg transition-colors font-medium text-muted-foreground hover:bg-muted hover:text-foreground`}
                                    >
                                        Tabela 2: Resumo de Chamados
                                    </Link>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/templates/forms"
                                className={`${navigationMenuTriggerStyle()} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/templates/forms') ? 'bg-accent text-accent-foreground font-semibold' : 'bg-transparent'}`}
                            >
                                Formulários
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Link
                                to="/templates/design"
                                className={`${navigationMenuTriggerStyle()} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all rounded-md h-9 text-xs sm:text-sm ${isActive('/templates/design') ? 'bg-accent text-accent-foreground font-semibold' : 'bg-transparent'}`}
                            >
                                Design UI UX
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
}
