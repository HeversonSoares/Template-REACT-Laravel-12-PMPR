import React from 'react';
import Layout from '@/components/Layout';
import EfetivoMenu from '../components/EfetivoMenu';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PesquisaEfetivo() {
  return (
    <Layout>
      <div className="w-full p-6">
        <EfetivoMenu />
        
        <div className="space-y-6 mt-6">
          <h1 className="text-3xl font-bold">Pesquisa de Efetivo</h1>
      
      <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded-r-md">
        <p className="font-semibold">Atenção:</p>
        <p className="text-sm">
          Os registros exibidos incluem policiais inativos e históricos de policiais já desvinculados 
          (reserva, demissão, exclusão ou outros motivos). Também podem aparecer policiais atualmente ativos que, 
          em algum momento, tiveram quebra de vínculo registrada no passado. Não exibe registros de exclusão caso ocorreu na inatividade.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros de Pesquisa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Seção Principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            
            <div className="space-y-2">
              <label className="text-sm font-medium">CPF:</label>
              <Input placeholder="Digite o CPF" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">RG:</label>
              <Input placeholder="Digite o RG" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nome:</label>
              <Input placeholder="Digite o Nome" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Posto/Grad:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cel">Coronel</SelectItem>
                  <SelectItem value="tc">Tenente Coronel</SelectItem>
                  <SelectItem value="maj">Major</SelectItem>
                  <SelectItem value="cap">Capitão</SelectItem>
                  <SelectItem value="1ten">1º Tenente</SelectItem>
                  <SelectItem value="2ten">2º Tenente</SelectItem>
                  <SelectItem value="asp">Aspirante</SelectItem>
                  <SelectItem value="sub">Subtenente</SelectItem>
                  <SelectItem value="1sgt">1º Sargento</SelectItem>
                  <SelectItem value="2sgt">2º Sargento</SelectItem>
                  <SelectItem value="3sgt">3º Sargento</SelectItem>
                  <SelectItem value="cb">Cabo</SelectItem>
                  <SelectItem value="sd">Soldado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quadro:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qopm">QOPM</SelectItem>
                  <SelectItem value="qopms">QOPMS</SelectItem>
                  <SelectItem value="qoa">QOA</SelectItem>
                  <SelectItem value="qpm">QPM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Sexo:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m">Masculino</SelectItem>
                  <SelectItem value="f">Feminino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mês de nascimento:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Janeiro</SelectItem>
                  <SelectItem value="2">Fevereiro</SelectItem>
                  <SelectItem value="3">Março</SelectItem>
                  <SelectItem value="4">Abril</SelectItem>
                  <SelectItem value="5">Maio</SelectItem>
                  <SelectItem value="6">Junho</SelectItem>
                  <SelectItem value="7">Julho</SelectItem>
                  <SelectItem value="8">Agosto</SelectItem>
                  <SelectItem value="9">Setembro</SelectItem>
                  <SelectItem value="10">Outubro</SelectItem>
                  <SelectItem value="11">Novembro</SelectItem>
                  <SelectItem value="12">Dezembro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Dia de nascimento:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                    <SelectItem key={dia} value={dia.toString()}>{dia}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de serviço:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operacional">Operacional</SelectItem>
                  <SelectItem value="administrativo">Administrativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Aplicação Nome:</label>
              <Input placeholder="Digite a Aplicação Nome" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cidade de atuação (ou Cidade):</label>
              <Input placeholder="Digite a Cidade" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Situação:</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="reserva">Reserva</SelectItem>
                  <SelectItem value="demitido">Demitido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 lg:col-span-2 xl:col-span-4">
              <label className="text-sm font-medium">Unidade:</label>
              <div className="text-xs text-muted-foreground mb-1">
                (Para pesquisar batalhões e diretorias digite por extenso sem acentuação ex: VIGESIMO NONO BATALHAO)
              </div>
              <Input placeholder="Digite a Unidade" />
            </div>
            
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Limpar</Button>
          <Button>Pesquisar</Button>
        </CardFooter>
      </Card>
        </div>
      </div>
    </Layout>
  );
}
