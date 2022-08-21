import React from 'react';
import Dashboard from './components/dashboard/dashboard.component';

import './App.css';
import Layout from './components/layout/layout.component';

export default function App() {
    // here I would usually set up some routing for the pages, which would render the dashboard component
    return (
        <Layout>
            <Dashboard />
        </Layout>
    );
}
