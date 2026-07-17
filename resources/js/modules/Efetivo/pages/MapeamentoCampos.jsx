import React from 'react';
import Layout from '@/components/Layout';
import EfetivoMenu from '../components/EfetivoMenu';
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle, 
    CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Briefcase } from 'lucide-react';

const MOCK_MAPPINGS = [
    { localField: 'Nome Completo', type: 'string', externalField: 'full_name', required: true },
    { localField: 'E-mail Principal', type: 'string', externalField: 'corporate_email', required: true },
    { localField: 'Cargo/Função', type: 'string', externalField: 'current_position.title', required: false },
    { localField: 'Salário Base', type: 'number', externalField: 'contract.compensation.salary', required: false },
    { localField: 'Data de Admissão', type: 'date', externalField: 'hiring_date', required: true },
];

export default function MapeamentoCampos() {
    return (
        <Layout>
            <div className="w-full p-6">
                <EfetivoMenu />

                <Card className="bg-card border shadow-sm mt-6">
                    <CardHeader>
                        <CardTitle className="text-foreground">De/Para - Mapeamento de Campos</CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Correlacione as colunas da API externa de RH com os campos internos do banco de dados principal.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-slate-550 pb-2 border-b border">
                                <div className="col-span-4">Campo no Banco Core</div>
                                <div className="col-span-2">Tipo de Dado</div>
                                <div className="col-span-5">Propriedade do JSON (API Externa)</div>
                                <div className="col-span-1 text-center">Obrigatório</div>
                            </div>

                            {MOCK_MAPPINGS.map((map, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-4 items-center py-3 border-b border">
                                    <div className="col-span-4 font-semibold text-foreground flex items-center gap-2">
                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                        {map.localField}
                                    </div>
                                    <div className="col-span-2">
                                        <Badge variant="outline" className="border text-muted-foreground bg-muted/50 text-[10px]">
                                            {map.type}
                                        </Badge>
                                    </div>
                                    <div className="col-span-5">
                                        <Input 
                                            defaultValue={map.externalField} 
                                            className="bg-card border font-mono text-xs text-foreground focus-visible:ring-emerald-500 h-9"
                                        />
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        <span className={`h-2.5 w-2.5 rounded-full ${map.required ? 'bg-emerald-500' : 'bg-slate-300'}`} title={map.required ? 'Obrigatório' : 'Opcional'}></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="border-t border pt-4 flex justify-end gap-2">
                        <Button variant="outline" className="border hover:bg-muted/50 text-xs">Descartar Alterações</Button>
                        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Mapeamento</Button>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}
