import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ExpandableSearch from '@/components/ui/expandable-search';
import { SwitchAlert } from '@/components/SwitchAlert';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

export default function TemplateDesignInteractive() {
    const [alertState, setAlertState] = useState({
        open: false,
        type: 'info',
        title: '',
        message: ''
    });

    const [demoSearchQuery, setDemoSearchQuery] = useState('');

    const showAlert = (type, title, message) => {
        setAlertState({ open: true, type, title, message });
    };

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid gap-6 md:grid-cols-2">
                    {/* ── ExpandableSearch ─────────────────────────────── */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">ExpandableSearch — Campo de Pesquisa Expansível</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">ExpandableSearch</code> inicia como um botão (ActionButton) compacto de Pesquisa e se expande suavemente para um campo de input quando clicado. Ele suporta injetar os resultados da pesquisa nativamente através de um dropdown.
                            </p>

                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold text-foreground">Exemplo Interativo:</span>
                                    <div className="bg-muted p-4 rounded-xl border border-border flex justify-end">
                                        <ExpandableSearch 
                                            value={demoSearchQuery}
                                        onChange={(e) => setDemoSearchQuery(e.target.value)}
                                        onClear={() => setDemoSearchQuery('')}
                                        placeholder="Pesquisar frutas..."
                                        renderResults={(closeSearch) => {
                                            const frutas = ['Maçã', 'Banana', 'Laranja', 'Uva', 'Morango', 'Abacaxi'];
                                            const filtradas = frutas.filter(f => f.toLowerCase().includes(demoSearchQuery.toLowerCase()));
                                            
                                            return demoSearchQuery.length > 0 ? (
                                                <div className="flex flex-col gap-1">
                                                    {filtradas.map(fruta => (
                                                        <button 
                                                            key={fruta}
                                                            onClick={() => {
                                                                showAlert('success', 'Resultado clicado', `Você selecionou: ${fruta}`);
                                                                closeSearch();
                                                                setDemoSearchQuery('');
                                                            }}
                                                            className="flex flex-col text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm text-sm transition-colors"
                                                        >
                                                            {fruta}
                                                        </button>
                                                    ))}
                                                    {filtradas.length === 0 && (
                                                        <div className="text-muted-foreground p-3 text-sm text-center">Nenhuma fruta encontrada.</div>
                                                    )}
                                                </div>
                                            ) : null;
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import ExpandableSearch from '@/components/ui/expandable-search';
import { useState } from 'react';

const [busca, setBusca] = useState('');

{/* Uso Básico */}
<ExpandableSearch 
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    onClear={() => setBusca('')}
    placeholder="Pesquisar..."
    
    // Opcional: renderizar dropdown com resultados
    renderResults={(closeSearch) => (
        busca.length > 0 ? (
            <div className="flex flex-col gap-2">
                <button onClick={() => { /* navega */; closeSearch(); }}>
                    Resultado para "{busca}"
                </button>
            </div>
        ) : (
            <div className="text-muted-foreground">Nenhum resultado.</div>
        )
    )}
/>
`}
                            </pre>
                        </CardContent>
                    </Card>

                    {/* SwitchAlert Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Alertas (SwitchAlert)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                Para exibir feedback ou confirmações visuais, utilize o componente <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">SwitchAlert</code> (estilo SweetAlert).
                            </p>

                            <div className="bg-muted p-4 rounded-xl border border-border space-y-4">
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Demonstração Interativa:</span>
                                <div className="flex flex-wrap gap-4">
                                    <Button 
                                        className="bg-green-600 hover:bg-green-700 text-white"
                                        onClick={() => showAlert('success', 'Tudo certo!', 'O registro foi salvo com sucesso.')}
                                    >
                                        Alerta de Sucesso
                                    </Button>

                                    <Button 
                                        variant="destructive"
                                        onClick={() => showAlert('error', 'Ops, ocorreu um erro', 'Não foi possível conectar ao servidor.')}
                                    >
                                        Alerta de Erro
                                    </Button>

                                    <Button 
                                        variant="outline" 
                                        className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                        onClick={() => showAlert('confirm', 'Tem certeza?', 'Essa ação não poderá ser desfeita.')}
                                    >
                                        Alerta de Confirmação
                                    </Button>

                                    <Button 
                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                        onClick={() => showAlert('info', 'Aviso', 'O sistema passará por manutenção.')}
                                    >
                                        Alerta de Informação
                                    </Button>
                                </div>
                            </div>
                            
                            <SwitchAlert
                                open={alertState.open}
                                onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}
                                type={alertState.type}
                                title={alertState.title}
                                message={alertState.message}
                                onConfirm={() => setAlertState(prev => ({ ...prev, open: false }))}
                            />

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Como usar no seu componente:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { SwitchAlert } from '@/components/SwitchAlert';
import { useState } from 'react';

export default function MeuComponente() {
  const [alertState, setAlertState] = useState({ open: false, type: 'info', title: '', message: '' });

  const showAlert = (type, title, message) => {
    setAlertState({ open: true, type, title, message });
  };

  return (
    <>
      <Button onClick={() => showAlert('success', 'Sucesso!', 'Ação executada com sucesso.')}>
        Mostrar Alerta
      </Button>

      <SwitchAlert
        open={alertState.open}
        onOpenChange={(open) => setAlertState(prev => ({ ...prev, open }))}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onConfirm={() => setAlertState(prev => ({ ...prev, open: false }))}
      />
    </>
  );
}`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tooltip Documentation */}
                    <Card className="p-6 space-y-4 md:col-span-2">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg font-semibold">Balão Informativo (Tooltip)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-4">
                            <p className="text-muted-foreground text-sm">
                                O componente <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">Tooltip</code> exibe uma mensagem informativa quando o usuário passa o mouse ou foca em um elemento. Utilize a prop <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">side</code> para definir a posição do balão (<code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">top</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">right</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">bottom</code>, <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">left</code>).
                            </p>

                            <div className="bg-muted p-6 rounded-xl border border-border space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-foreground">Posicionamento (Side)</h4>
                                    <p className="text-xs text-muted-foreground">Use a prop <code className="font-mono text-primary">side</code> para alterar a posição do tooltip.</p>
                                </div>

                                <div className="flex flex-wrap items-center justify-center gap-3 py-6 bg-card rounded-lg border border-border/60">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Left</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="left">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Top</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Bottom</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" size="sm">Right</Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                                <p>Add to library</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <span className="text-xs font-semibold text-foreground">Estrutura de Código:</span>
                                <pre className="bg-slate-900 text-slate-100 text-xs p-3 rounded-lg overflow-x-auto">
{`import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Right</Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`}
                                </pre>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
