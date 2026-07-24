import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import AdvancedComponentsForm from '../components/forms/AdvancedComponentsForm';

export default function TemplateFormsAvancado() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                <div className="max-w-3xl mx-auto w-full">
                    <AdvancedComponentsForm />
                </div>
            </div>
        </Layout>
    );
}
