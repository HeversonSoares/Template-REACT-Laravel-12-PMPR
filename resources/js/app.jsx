import '../css/app.css';
import './bootstrap';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// ==============================================================================
// IMPORTAÇÃO DE MÓDULOS (ARQUITETURA MODULAR)
// Aqui nós importamos as páginas (componentes) de dentro dos seus respectivos módulos.
// Sempre que criar um novo módulo em "resources/js/modules/", importe a página principal dele aqui.
// ==============================================================================
import Dashboard from './modules/Dashboard/pages/Dashboard';
import Login from './modules/Auth/pages/Login';
import Register from './modules/Auth/pages/Register';
import Fleets from './modules/Fleets/pages/Fleets';
import Settings from './modules/Settings/pages/Settings';
import Templates from './modules/Template/pages/TemplateIndex';
import TemplateDashboard from './modules/Template/pages/TemplateDashboard';
import TemplateCharts from './modules/Template/pages/TemplateCharts';
import TemplateTables from './modules/Template/pages/TemplateTables';
import TemplateTablesResumo from './modules/Template/pages/TemplateTablesResumo';
import TemplateForms from './modules/Template/pages/TemplateForms';
import TemplateDesignHeaders from './modules/Template/pages/TemplateDesignHeaders';
import TemplateDesignTypography from './modules/Template/pages/TemplateDesignTypography';
import TemplateDesignNavigation from './modules/Template/pages/TemplateDesignNavigation';
import TemplateDesignButtons from './modules/Template/pages/TemplateDesignButtons';
import TemplateDesignInteractive from './modules/Template/pages/TemplateDesignInteractive';
import TemplateBlank from './modules/Template/pages/TemplateBlank';
import TemplateKanban from './modules/Template/pages/TemplateKanban';
import TemplateGrid2 from './modules/Template/pages/TemplateGrid2';
import TemplateGrid3 from './modules/Template/pages/TemplateGrid3';
import TemplateGrid4 from './modules/Template/pages/TemplateGrid4';
import TemplateGridAsymmetric from './modules/Template/pages/TemplateGridAsymmetric';
import TemplateGridMasonry from './modules/Template/pages/TemplateGridMasonry';
import TemplateGridSplit from './modules/Template/pages/TemplateGridSplit';
import PesquisaEfetivo from './modules/Efetivo/pages/PesquisaEfetivo';
import EfetivoSincronizado from './modules/Efetivo/pages/EfetivoSincronizado';
import MapeamentoCampos from './modules/Efetivo/pages/MapeamentoCampos';
import ParametrosConexao from './modules/Efetivo/pages/ParametrosConexao';
import AreaDeTrabalho from './modules/AreaDeTrabalho/pages/AreaDeTrabalho';
import TempoPage from './modules/Tempo/pages/TempoPage';
import TemplateDocs from './modules/Template/pages/TemplateDocs';

function App() {
    return (
        // O BrowserRouter envolve a aplicação para permitir a navegação sem recarregar a página (Single Page Application).
        <BrowserRouter>
            {/* O componente Routes agrupa todas as rotas da nossa aplicação */}
            <Routes>
                {/* 
                  Como registrar uma nova rota:
                  1. 'path' é a URL que o usuário vai acessar no navegador (ex: www.site.com/minha-rota).
                  2. 'element' é o Componente (importado lá em cima) que será renderizado na tela.
                */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/area-de-trabalho" element={<AreaDeTrabalho />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Módulos do Sistema */}
                <Route path="/efetivo" element={<PesquisaEfetivo />} />
                <Route path="/efetivo/sincronizado" element={<EfetivoSincronizado />} />
                <Route path="/efetivo/mapeamento" element={<MapeamentoCampos />} />
                <Route path="/efetivo/parametros" element={<ParametrosConexao />} />
                
                <Route path="/fleets" element={<Fleets />} />
                <Route path="/tempo" element={<TempoPage />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/templates/dashboard" element={<TemplateDashboard />} />
                <Route path="/templates/charts" element={<TemplateCharts />} />
                <Route path="/templates/tables" element={<TemplateTables />} />
                <Route path="/templates/tables-resumo" element={<TemplateTablesResumo />} />
                <Route path="/templates/forms" element={<TemplateForms />} />
                <Route path="/templates/design/headers" element={<TemplateDesignHeaders />} />
                <Route path="/templates/design/typography" element={<TemplateDesignTypography />} />
                <Route path="/templates/design/navigation" element={<TemplateDesignNavigation />} />
                <Route path="/templates/design/buttons" element={<TemplateDesignButtons />} />
                <Route path="/templates/design/interactive" element={<TemplateDesignInteractive />} />
                <Route path="/templates/blank" element={<TemplateBlank />} />
                <Route path="/templates/kanban" element={<TemplateKanban />} />
                {/* Grid Templates */}
                <Route path="/templates/grid-2"          element={<TemplateGrid2 />} />
                <Route path="/templates/grid-3"          element={<TemplateGrid3 />} />
                <Route path="/templates/grid-4"          element={<TemplateGrid4 />} />
                <Route path="/templates/grid-asymmetric" element={<TemplateGridAsymmetric />} />
                <Route path="/templates/grid-masonry"    element={<TemplateGridMasonry />} />
                <Route path="/templates/grid-split"      element={<TemplateGridSplit />} />
                
                {/* Docs Template */}
                <Route path="/templates/docs"            element={<TemplateDocs />} />
                
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
