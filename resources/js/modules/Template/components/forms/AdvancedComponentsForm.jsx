import React, { useState } from 'react';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardDescription, 
    CardContent, 
    CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { CustomCheckbox } from '@/components/ui/custom-checkbox';
import { MultiSelect } from '@/components/ui/multi-select';

export default function AdvancedComponentsForm() {
    const [advancedForm, setAdvancedForm] = useState({
        policeUnit: '',
        permissions: [],
        mfaEnabled: true,
        termsAccepted: false,
        shareTelemetry: true
    });

    return (
        <Card className="flex flex-col justify-between mt-6">
            <CardHeader>
                <CardTitle className="text-lg">Componentes Avançados (Select2 & Checkbox)</CardTitle>
                <CardDescription>Demonstração de seleção com pesquisa (estilo Select2) e caixas de seleção personalizadas.</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => { e.preventDefault(); alert(`Unidade: ${advancedForm.policeUnit || 'Nenhuma'}, Termos: ${advancedForm.termsAccepted}`); }}>
                <CardContent className="space-y-6">
                    {/* Searchable Select (Select2 style) */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Selecione a Unidade Militar (Searchable Dropdown)</label>
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
                        <p className="text-[11px] text-muted-foreground">Filtra dinamicamente as opções enquanto você digita.</p>
                    </div>

                    {/* Multi-Select Dropdown */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Permissões Especiais (Multi-Select)</label>
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
                        <p className="text-[11px] text-muted-foreground">Permite escolher múltiplos itens e exibe como tags removíveis.</p>
                    </div>

                    <hr className="border-border" />

                    {/* Custom Checkboxes */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-foreground">Controles de Segurança e Privacidade</label>
                        
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
    );
}
