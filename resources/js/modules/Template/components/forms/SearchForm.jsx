import React from 'react';
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
import { Search } from 'lucide-react';

export default function SearchForm() {
    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle className="text-lg">Pesquisar Registros</CardTitle>
                <CardDescription>Utilize o formulário abaixo para buscar informações usando o ícone padrão.</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => { e.preventDefault(); alert('Pesquisa realizada com sucesso (Mock)'); }}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="searchQuery" className="text-sm font-semibold text-foreground">Termo de Pesquisa</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                id="searchQuery" 
                                placeholder="Buscar por nome, placa ou protocolo..." 
                                className="pl-9"
                                required
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 border-t pt-4">
                    <Button type="button" variant="outline" size="sm">Limpar</Button>
                    <Button type="submit" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                        Pesquisar
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
