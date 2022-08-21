import React from 'react';
import { Provider } from 'react-redux/es/exports';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import configureAppStore from './store/store';

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <DndProvider backend={HTML5Backend}>
                <App />
            </DndProvider>
        </Provider>
    </React.StrictMode>
);
