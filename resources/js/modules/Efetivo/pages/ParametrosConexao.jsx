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
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ShieldAlert, Check } from 'lucide-react';

export default function ParametrosConexao() {
    return (
        <Layout>
            <div className="w-full p-6">
                <EfetivoMenu />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    <Card className="bg-card border shadow-sm lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-foreground">Configurações do Endpoint de Integração</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Defina a URL base, chaves e credenciais para autenticação de requisições.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-foreground">Base URL do RH Externo</label>
                                <Input 
                                    defaultValue="https://api.talentflow-hrms.com/v2/integration" 
                                    className="bg-card border text-foreground focus-visible:ring-emerald-500 font-mono text-xs"
                                />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Client ID / Token Key</label>
                                    <Input 
                                        defaultValue="tf_client_889104_prod" 
                                        className="bg-card border text-foreground focus-visible:ring-emerald-500 font-mono text-xs"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-foreground">Secret Key</label>
                                    <Input 
                                        type="password" 
                                        value="••••••••••••••••••••••••••••" 
                                        disabled
                                        className="bg-muted/50 border text-muted-foreground focus-visible:ring-emerald-500 font-mono text-xs"
                                    />
                                </div>
                            </div>

                            <div className="border-t border my-4 pt-4 space-y-4">
                                <h3 className="text-sm font-bold text-foreground">Regras de Sincronização</h3>
                                <div className="flex items-center justify-between py-1">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Sincronização Automática Noturna</p>
                                        <p className="text-xs text-muted-foreground">Executa a sincronização completa todos os dias às 02h00.</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                                </div>
                                <div className="flex items-center justify-between py-1">
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Notificar Erros</p>
                                        <p className="text-xs text-muted-foreground">Envia e-mail de alerta caso ocorram falhas de conexão ou integridade.</p>
                                    </div>
                                    <Switch defaultChecked className="data-[state=checked]:bg-emerald-600" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t border pt-4 flex justify-end gap-2">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs">Salvar Configurações</Button>
                        </CardFooter>
                    </Card>

                    <Card className="bg-card border shadow-sm flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-600">
                                <ShieldAlert className="h-5 w-5" /> Status do Link
                            </CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Status atual de conectividade entre servidores.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-muted/50 p-4 rounded-xl border border space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Conectividade:</span>
                                    <span className="text-emerald-600 font-bold">100% Ativo</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Ping:</span>
                                    <span className="text-foreground font-mono">42ms (Estável)</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Última checagem:</span>
                                    <span className="text-slate-655 text-muted-foreground">Agora mesmo</span>
                                </div>
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <p className="font-semibold text-foreground">Certificado SSL:</p>
                                <p className="flex items-center gap-1 text-emerald-650 text-emerald-600 font-semibold">
                                    <Check className="h-3 w-3" /> Válido até Jan/2027
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border">
                            <Button variant="outline" className="w-full border hover:bg-muted/50 text-xs gap-1.5">
                                Testar Endpoint
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
