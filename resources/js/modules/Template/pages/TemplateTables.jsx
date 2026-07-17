import React from 'react';
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
import { Badge } from '@/components/ui/badge';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Search, SlidersHorizontal, MoreHorizontal } from 'lucide-react';

export default function TemplateTables() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <Card>
                    <CardHeader className="pb-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <CardTitle className="text-lg">Gestão de Dispositivos e Frotas</CardTitle>
                            <CardDescription>Visão tabular integrada de todos os veículos operacionais cadastrados.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-initial">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Buscar dispositivo..." className="pl-9 h-9 w-full md:w-64" />
                            </div>
                            <Button variant="outline" size="sm" className="h-9 flex items-center gap-1">
                                <SlidersHorizontal className="h-3.5 w-3.5" /> Filtros
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID Veículo</TableHead>
                                    <TableHead>Identificador / Modelo</TableHead>
                                    <TableHead>Motorista Responsável</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Nível Bateria/Combustível</TableHead>
                                    <TableHead className="text-right">Ação</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-semibold text-foreground">VTR-0041</TableCell>
                                    <TableCell>Chevrolet S10 - PMPR - PM-8831</TableCell>
                                    <TableCell>Sgt. Rodrigues Santos</TableCell>
                                    <TableCell>
                                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none shadow-none">Em Serviço</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                                                <div className="bg-emerald-500 h-2" style={{ width: '85%' }}></div>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium">85%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-semibold text-foreground">VTR-0912</TableCell>
                                    <TableCell>Toyota Hilux - PMPR - PM-4012</TableCell>
                                    <TableCell>Sd. Ana Oliveira</TableCell>
                                    <TableCell>
                                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-none shadow-none">Em Serviço</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                                                <div className="bg-amber-500 h-2" style={{ width: '42%' }}></div>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium">42%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-semibold text-foreground">VTR-0023</TableCell>
                                    <TableCell>Renault Duster - PMPR - PM-0112</TableCell>
                                    <TableCell>Nenhum (Reserva)</TableCell>
                                    <TableCell>
                                        <Badge className="bg-slate-200 text-foreground hover:bg-slate-300 border-none shadow-none">Disponível</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                                                <div className="bg-emerald-500 h-2" style={{ width: '90%' }}></div>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium">90%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell className="font-semibold text-foreground">VTR-1188</TableCell>
                                    <TableCell>Fiat Cronos - PMPR - PM-2041</TableCell>
                                    <TableCell>Cabo Mendes</TableCell>
                                    <TableCell>
                                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none shadow-none">Manutenção</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-muted rounded-full h-2 overflow-hidden">
                                                <div className="bg-rose-500 h-2" style={{ width: '12%' }}></div>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium">12%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center py-4 border-t">
                        <span className="text-xs text-muted-foreground">Exibindo 4 de 12 veículos</span>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled className="h-8 text-xs font-semibold">Anterior</Button>
                            <Button variant="outline" size="sm" className="h-8 text-xs font-semibold">Próximo</Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}
