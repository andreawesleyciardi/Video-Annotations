import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App';



let basename = process.env.BASENAME;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter basename={ basename }>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);