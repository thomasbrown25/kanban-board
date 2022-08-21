import React from 'react';
import { Provider } from 'react-redux/es/exports';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import configureAppStore from './store/store';

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
