import React from 'react';
import Layout from '@/components/Layout';
import TemplateMenu from '../components/TemplateMenu';
import AuthFormsGroup from '../components/forms/AuthFormsGroup';

export default function TemplateFormsAuth() {
    return (
        <Layout>
            <div className="p-6 space-y-6 w-full">
                <TemplateMenu />
                <div className="max-w-lg mx-auto w-full">
                    <AuthFormsGroup />
                </div>
            </div>
        </Layout>
    );
}
