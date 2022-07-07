import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Experiments from './../features/Experiments';
import Developer from './../features/Developer';



const Main = React.memo((props) => {
    
    return (
        <main>
            <Routes>
                <Route path="/" element={ <React.Suspense fallback={<></>}> <Experiments { ...props } /> </React.Suspense> } />
                <Route path="/experiments" element={ <React.Suspense fallback={<></>}> <Experiments { ...props } /> </React.Suspense> } />
                <Route path="/developer" element={ <React.Suspense fallback={<></>}> <Developer { ...props } /> </React.Suspense> } />
            </Routes>
        </main>
    );
});

export default Main;
