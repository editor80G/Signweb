import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Publications from '../components/Publications';
import CreatePublication from '../components/CreatePublication';
import DetailsPublication from '../components/DetailsPublication';
import EditPublication from '../components/EditPublication';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="/publications/magazines" element={<Publications type="magazine" />} />
                <Route path="/publications/catalogs" element={<Publications type="catalog" />} />
                <Route path="/publications/create" element={<CreatePublication />} />
                <Route path="/publications/details/:id" element={<DetailsPublication />} />
                <Route path="/publications/edit/:id" element={<EditPublication />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;