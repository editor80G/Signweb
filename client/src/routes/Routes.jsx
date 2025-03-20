import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Register from './components/Registration';
// import Publications from './components/Publications';
import Home from '../components/Home';

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/publications" element={<Publications />} /> */}
            <Route path="/" element={<Home />} >
                {/* <Route path="register" element={<Register />} /> */}
            </Route>
            {/* <Route path="/" element={<Form />} /> */}
        </Routes>
    );
};

export default AppRoutes;