import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import WizardForm from '../components/forms/WizardForm';

export default function TemplateFormsWizard() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                <div className="max-w-3xl mx-auto w-full">
                    <WizardForm />
                </div>
            </div>
        </Layout>
    );
}
