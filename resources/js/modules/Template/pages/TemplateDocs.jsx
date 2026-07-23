import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import { Card } from '@/components/ui/card';
import { FileText, Printer, Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ActionButton from '@/components/ui/action-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Importa todos os arquivos markdown da pasta docs na raiz do projeto
const docsGlob = import.meta.glob('../../../../../docs/*.md', { query: '?raw', import: 'default', eager: true });

export default function TemplateDocs() {
    const [searchParams, setSearchParams] = useSearchParams();
    const fileParam = searchParams.get('file');

    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef(null);

    // Foca o input quando expande
    useEffect(() => {
        if (isSearchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchExpanded]);

    // Formata a lista de documentos
    const docs = Object.keys(docsGlob).map((path) => {
        const fileName = path.split('/').pop();
        const name = fileName.replace('.md', '').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return {
            path,
            fileName,
            name,
            content: docsGlob[path]
        };
    });

    const selectedDoc = fileParam 
        ? docs.find(d => d.fileName === fileParam) 
        : (docs.length > 0 ? docs[0] : null);

    // Função de busca
    const searchResults = searchQuery.trim() === '' ? [] : docs.flatMap(doc => {
        const lowerContent = doc.content.toLowerCase();
        const lowerQuery = searchQuery.toLowerCase();
        const results = [];
        let index = lowerContent.indexOf(lowerQuery);
        
        while (index !== -1) {
            // Pegar um snippet ao redor do resultado
            const start = Math.max(0, index - 40);
            const end = Math.min(doc.content.length, index + lowerQuery.length + 40);
            let snippet = doc.content.substring(start, end);
            snippet = snippet.replace(/\n/g, ' '); // remove quebras de linha no snippet
            
            // Só adiciona se não for muito parecido com o último
            if (results.length === 0 || index - results[results.length-1].index > 50) {
                results.push({ doc, index, snippet });
            }
            if (results.length >= 3) break; // Limita a 3 resultados por documento
            
            index = lowerContent.indexOf(lowerQuery, index + 1);
        }
        return results;
    });

    return (
        <Layout>
            <div className="p-6 space-y-6 w-full h-[calc(100vh-3.5rem)] flex flex-col">
                <TemplateMenu>
                    <div className="relative flex items-center gap-2">
                        {isSearchExpanded ? (
                            <div className="flex items-center bg-background border rounded-md px-2 shadow-sm w-64 md:w-80 transition-all">
                                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                                <Input 
                                    ref={searchInputRef}
                                    placeholder="Pesquisar nos documentos..." 
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                                />
                                <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }}>
                                    <X className="w-4 h-4" />
                                </Button>
                                
                                {/* Dropdown de resultados */}
                                {searchQuery && (
                                    <div className="absolute top-[calc(100%+0.5rem)] right-0 w-[400px] max-h-[60vh] overflow-y-auto bg-popover border text-popover-foreground rounded-md shadow-md z-50 p-2">
                                        {searchResults.length > 0 ? (
                                            <div className="flex flex-col gap-1">
                                                {searchResults.map((res, i) => (
                                                    <button 
                                                        key={`${res.doc.fileName}-${i}`}
                                                        onClick={() => {
                                                            setSearchParams({ file: res.doc.fileName });
                                                            setIsSearchExpanded(false);
                                                            setSearchQuery('');
                                                        }}
                                                        className="flex flex-col text-left px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded-sm text-sm"
                                                    >
                                                        <span className="font-medium flex items-center gap-2 text-primary">
                                                            <FileText className="w-3 h-3" />
                                                            {res.doc.name}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground w-full mt-1 line-clamp-2 leading-relaxed text-left whitespace-pre-wrap">
                                                            ...{res.snippet}...
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-sm text-muted-foreground">Nenhum resultado encontrado.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <ActionButton
                                icon={Search}
                                label="Pesquisar"
                                variant="outline"
                                onClick={() => setIsSearchExpanded(true)}
                                compact
                            />
                        )}

                        <ActionButton
                            icon={Printer}
                            label="Imprimir"
                            variant="outline"
                            onClick={() => window.print()}
                            compact
                        />
                    </div>
                </TemplateMenu>
            
                <div className="flex flex-1 overflow-hidden gap-6 w-full">
                    {/* Conteúdo Principal do Documento */}
                    <Card className="flex-1 overflow-hidden shadow-sm border-border flex flex-col">
                        {selectedDoc ? (
                            <>
                                <div className="px-8 py-4 border-b bg-card flex items-center justify-between shrink-0">
                                    <div>
                                        <h2 className="text-xl font-bold">{selectedDoc.name}</h2>
                                        <p className="text-sm text-muted-foreground">{selectedDoc.fileName}</p>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto p-8">
                                    <article className="prose prose-slate max-w-4xl dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {selectedDoc.content}
                                        </ReactMarkdown>
                                    </article>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                                <FileText className="w-16 h-16 mb-4 text-muted/50" />
                                <p>Selecione um documento no menu superior para ler o conteúdo.</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
