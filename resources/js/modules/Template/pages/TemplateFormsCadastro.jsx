import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import CadastroForm from '../components/forms/CadastroForm';

export default function TemplateFormsCadastro() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                <div className="max-w-3xl mx-auto w-full">
                    <CadastroForm />
                </div>
            </div>
        </Layout>
    );
}
