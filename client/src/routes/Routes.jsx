import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Publications from '../components/Publications';
import CreatePublication from '../components/CreatePublication';
import DetailsPublication from '../components/DetailsPublication';
import EditPublication from '../components/EditPublication';
import AuthGuard from '../components/Guards/AuthGuard';
import GuestGuard from '../components/Guards/GuestGuard';
import AuthPage from '../components/AuthPage/AuthPage';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >

                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="/publications/magazines" element={<Publications type="magazine" />} />
                <Route path="/publications/catalogs" element={<Publications type="catalog" />} />
                <Route path="/publications/details/:id" element={<DetailsPublication />} />

                {/* Guarded routes for guests */}
                <Route element={<GuestGuard />}>
                    <Route path="/auth" element={<AuthPage />}>
                        <Route index element={<Login />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                </Route>

                {/* Guarded routes for authenticated users */}
                <Route element={<AuthGuard />}>
                    <Route path="/publications/create" element={<CreatePublication />} />
                    <Route path="/publications/edit/:id" element={<EditPublication />} />
                    <Route path="/logout" element={<Logout />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;