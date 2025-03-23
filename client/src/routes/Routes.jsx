import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Publications from '../components/Publications';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/publications/magazines" element={<Publications type="magazine" />} />
                <Route path="/publications/catalogs" element={<Publications type="catalog" />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;