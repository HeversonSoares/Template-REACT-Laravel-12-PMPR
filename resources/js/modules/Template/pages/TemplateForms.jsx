import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
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
import { SearchableSelect } from '@/components/ui/searchable-select';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';
import { MultiSelect } from '@/components/ui/multi-select';

export default function TemplateForms() {
    const [formLoading, setFormLoading] = useState(false);

    // Mock states for interactive feeling
    const [formState, setFormState] = useState({
        projectName: '',
        category: 'design',
        visibility: 'public',
        notifications: true,
        newsletter: false
    });

    const [advancedForm, setAdvancedForm] = useState({
        policeUnit: '',
        permissions: [],
        mfaEnabled: true,
        termsAccepted: false,
        shareTelemetry: true
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
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* FORM 1: Configurações Gerais do Projeto */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg">Configurações Gerais do Projeto</CardTitle>
                            <CardDescription>Edite as configurações de infraestrutura e alertas das suas instâncias.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleFormSubmit}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="projectName" className="text-sm font-semibold text-slate-700">Nome do Projeto</label>
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
                                        <label className="text-sm font-semibold text-slate-700">Categoria</label>
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
                                        <label className="text-sm font-semibold text-slate-700">Visibilidade</label>
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
                                    <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50/50">
                                        <div className="space-y-0.5">
                                            <label className="text-xs font-semibold text-slate-800" htmlFor="notify-switch">Notificações por E-mail</label>
                                            <p className="text-[10px] text-slate-500">Enviar status automático das viaturas.</p>
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

                    {/* FORM 2: Cadastro de Novo Usuário/Operador */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg">Cadastro de Novo Operador</CardTitle>
                            <CardDescription>Crie uma nova conta com credenciais de acesso específicas.</CardDescription>
                        </CardHeader>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Usuário cadastrado com sucesso (Mock)'); }}>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Nome Completo</label>
                                        <Input id="fullName" placeholder="Ex: Roberto Silva" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="userEmail" className="text-sm font-semibold text-slate-700">E-mail Corporativo</label>
                                        <Input id="userEmail" type="email" placeholder="nome@pm.pr.gov.br" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Função / Cargo</label>
                                        <Select defaultValue="operador">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">Administrador</SelectItem>
                                                <SelectItem value="operador">Operador de Central</SelectItem>
                                                <SelectItem value="supervisor">Supervisor de Frota</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="userPhone" className="text-sm font-semibold text-slate-700">Telefone / Ramal</label>
                                        <Input id="userPhone" placeholder="(41) 99999-9999" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50/50">
                                    <div className="space-y-0.5">
                                        <label className="text-xs font-semibold text-slate-800" htmlFor="user-active">Usuário Ativo</label>
                                        <p className="text-[10px] text-slate-500">Permitir login imediatamente após o cadastro.</p>
                                    </div>
                                    <Switch id="user-active" defaultChecked />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                <Button type="button" variant="outline" size="sm">Limpar</Button>
                                <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">Cadastrar</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* FORM 3: Chamado de Suporte / Registro de Incidentes */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg">Reportar Incidente / Suporte</CardTitle>
                            <CardDescription>Registre falhas em equipamentos ou avarias em viaturas da frota.</CardDescription>
                        </CardHeader>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Chamado aberto com sucesso (Mock)'); }}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="issueTitle" className="text-sm font-semibold text-slate-700">Título do Incidente</label>
                                    <Input id="issueTitle" placeholder="Ex: Pneu furado / Falha no rastreador" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Equipamento Relacionado</label>
                                        <Select defaultValue="viatura">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="viatura">Viatura</SelectItem>
                                                <SelectItem value="tablet">Tablet / Computador de Bordo</SelectItem>
                                                <SelectItem value="radio">Rádio Transmissor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Nível de Urgência</label>
                                        <Select defaultValue="media">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="baixa">Baixa</SelectItem>
                                                <SelectItem value="media">Média</SelectItem>
                                                <SelectItem value="alta">Alta (Crítica)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="issueDesc" className="text-sm font-semibold text-slate-700">Descrição Detalhada</label>
                                    <textarea 
                                        id="issueDesc" 
                                        rows="3" 
                                        className="flex w-full rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Descreva as especificidades do problema ocorrido..."
                                        required
                                    ></textarea>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                <Button type="button" variant="outline" size="sm">Limpar</Button>
                                <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">Enviar Chamado</Button>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* FORM 4: Configurações de API & Integrações */}
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg">Chaves e Integrações de API</CardTitle>
                            <CardDescription>Gere credenciais para integração com sistemas externos.</CardDescription>
                        </CardHeader>
                        <form onSubmit={(e) => { e.preventDefault(); alert('Chave de API salva com sucesso (Mock)'); }}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="apiKey" className="text-sm font-semibold text-slate-700">Chave da API Secreta</label>
                                    <div className="relative">
                                        <Input id="apiKey" type="password" value="••••••••••••••••••••••••••••••••••••••••" readOnly />
                                        <Button type="button" variant="link" className="absolute right-0 top-0 h-full px-3 text-xs text-amber-600 hover:text-amber-700 font-semibold" onClick={() => alert('Chave copiada!')}>
                                            Copiar
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="webhookUrl" className="text-sm font-semibold text-slate-700">URL do Webhook de Destino</label>
                                    <Input id="webhookUrl" placeholder="https://api.seusistema.com/v1/webhooks" type="url" />
                                </div>

                                <div className="space-y-3 pt-2">
                                    <div className="flex items-center justify-between p-2 border rounded-lg bg-slate-50/50">
                                        <div className="space-y-0.5">
                                            <label className="text-xs font-semibold text-slate-800" htmlFor="debug-logs">Logs Detalhados</label>
                                            <p className="text-[10px] text-slate-500">Rastrear requisições em ambiente de testes.</p>
                                        </div>
                                        <Switch id="debug-logs" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                <Button type="button" variant="outline" size="sm">Resetar Chave</Button>
                                <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">Salvar Configuração</Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>

                {/* ROW 3: Componentes Avançados */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <Card className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-lg">Componentes Avançados (Select2 & Checkbox)</CardTitle>
                            <CardDescription>Demonstração de seleção com pesquisa (estilo Select2) e caixas de seleção personalizadas.</CardDescription>
                        </CardHeader>
                        <form onSubmit={(e) => { e.preventDefault(); alert(`Unidade: ${advancedForm.policeUnit || 'Nenhuma'}, Termos: ${advancedForm.termsAccepted}`); }}>
                            <CardContent className="space-y-6">
                                {/* Searchable Select (Select2 style) */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Selecione a Unidade Militar (Searchable Dropdown)</label>
                                    <SearchableSelect 
                                        placeholder="Pesquise por batalhão ou cidade..."
                                        options={[
                                            { value: '1bpm', label: '1º Batalhão de Polícia Militar - Ponta Grossa' },
                                            { value: '12bpm', label: '12º Batalhão de Polícia Militar - Curitiba' },
                                            { value: '13bpm', label: '13º Batalhão de Polícia Militar - Curitiba' },
                                            { value: '17bpm', label: '17º Batalhão de Polícia Militar - São José dos Pinhais' },
                                            { value: '20bpm', label: '20º Batalhão de Polícia Militar - Curitiba' }
                                        ]}
                                        value={advancedForm.policeUnit}
                                        onChange={(val) => setAdvancedForm({...advancedForm, policeUnit: val})}
                                    />
                                    <p className="text-[11px] text-slate-400">Filtra dinamicamente as opções enquanto você digita.</p>
                                </div>

                                {/* Multi-Select Dropdown */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Permissões Especiais (Multi-Select)</label>
                                    <MultiSelect 
                                        placeholder="Selecione as permissões de acesso..."
                                        options={[
                                            { value: 'read_reports', label: 'Visualizar Relatórios' },
                                            { value: 'write_reports', label: 'Editar Relatórios' },
                                            { value: 'manage_users', label: 'Gerenciar Usuários' },
                                            { value: 'delete_records', label: 'Excluir Registros' },
                                            { value: 'export_data', label: 'Exportar Dados' }
                                        ]}
                                        selectedValues={advancedForm.permissions}
                                        onChange={(vals) => setAdvancedForm({...advancedForm, permissions: vals})}
                                    />
                                    <p className="text-[11px] text-slate-400">Permite escolher múltiplos itens e exibe como tags removíveis.</p>
                                </div>

                                <hr className="border-slate-100" />

                                {/* Custom Checkboxes */}
                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-slate-800">Controles de Segurança e Privacidade</label>
                                    
                                    <CustomCheckbox 
                                        id="terms"
                                        label="Aceitar os Termos de Uso do Sistema"
                                        description="Declaro estar ciente das normas de uso aceitável de informações sensíveis."
                                        checked={advancedForm.termsAccepted}
                                        onChange={(val) => setAdvancedForm({...advancedForm, termsAccepted: val})}
                                    />

                                    <CustomCheckbox 
                                        id="telemetry"
                                        label="Compartilhar Telemetria de Uso"
                                        description="Enviar dados de telemetria anônimos para melhoria de desempenho da plataforma."
                                        checked={advancedForm.shareTelemetry}
                                        onChange={(val) => setAdvancedForm({...advancedForm, shareTelemetry: val})}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2 border-t pt-4">
                                <Button type="button" variant="outline" size="sm" onClick={() => setAdvancedForm({policeUnit: '', permissions: [], mfaEnabled: true, termsAccepted: false, shareTelemetry: true})}>
                                    Resetar
                                </Button>
                                <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                                    Enviar Formulário
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
