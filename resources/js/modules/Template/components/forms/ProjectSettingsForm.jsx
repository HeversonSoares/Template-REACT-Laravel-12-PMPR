import React, { useState } from 'react';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function ProjectSettingsForm() {
    const [formLoading, setFormLoading] = useState(false);
    const [formState, setFormState] = useState({
        projectName: '',
        category: 'design',
        visibility: 'public',
        notifications: true,
        newsletter: false
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setFormLoading(true);
        setTimeout(() => {
            setFormLoading(false);
            alert('Formulário enviado com sucesso (Mock)');
        }, 1200);
    };

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle className="text-lg">Configurações Gerais do Projeto</CardTitle>
                <CardDescription>Edite as configurações de infraestrutura e alertas das suas instâncias.</CardDescription>
            </CardHeader>
            <form onSubmit={handleFormSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="projectName" className="text-sm font-semibold text-foreground">Nome do Projeto</label>
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
                            <label className="text-sm font-semibold text-foreground">Categoria</label>
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
                            <label className="text-sm font-semibold text-foreground">Visibilidade</label>
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
                        <div className="flex items-center justify-between p-2 border rounded-lg bg-muted/50">
                            <div className="space-y-0.5">
                                <label className="text-xs font-semibold text-foreground" htmlFor="notify-switch">Notificações por E-mail</label>
                                <p className="text-[10px] text-muted-foreground">Enviar status automático das viaturas.</p>
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
    );
}
