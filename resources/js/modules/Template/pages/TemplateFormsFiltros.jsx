import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import FiltrosForm from '../components/forms/FiltrosForm';

export default function TemplateFormsFiltros() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                <div className="max-w-4xl mx-auto w-full">
                    <FiltrosForm />
                </div>
            </div>
        </Layout>
    );
}
