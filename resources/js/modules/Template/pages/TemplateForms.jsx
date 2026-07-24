import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import ProjectSettingsForm from '../components/forms/ProjectSettingsForm';
import SearchForm from '../components/forms/SearchForm';
import AdvancedComponentsForm from '../components/forms/AdvancedComponentsForm';

export default function TemplateForms() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* FORM 1: Configurações Gerais do Projeto */}
                    <ProjectSettingsForm />

                    {/* FORM 2: Pesquisa (Com ícone padrão) */}
                    <SearchForm />
                </div>

                {/* Componentes Avançados */}
                <div className="grid grid-cols-1 gap-6 mt-6">
                    <AdvancedComponentsForm />
                </div>
            </div>
        </Layout>
    );
}
