import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home/Home';
import Publications from '../pages/Publications/Publications';
import CreatePublication from '../pages/CreatePublication/CreatePublication';
import DetailsPublication from '../pages/DetailsPublication/DetailsPublication';
import EditPublication from '../pages/EditPublication/EditPublication';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import RoleGuard from '../guards/RoleGuard';
import AuthPage from '../pages/AuthPage/AuthPage';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Logout from '../pages/Logout/Logout';
import AccessDenied from '../components/common/AccessDenied/AccessDenied';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >

                {/* Public routes */}
                <Route index element={<Home />} />
                <Route path="/publications/magazines" element={<Publications type="magazine" />} />
                <Route path="/publications/catalogs" element={<Publications type="catalog" />} />
                <Route path="/publications/details/:id" element={<DetailsPublication />} />
                <Route path="/access-denied" element={<AccessDenied />} />

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
                    {/* <Route path="/publications/create" element={<CreatePublication />} />
                    <Route path="/publications/edit/:id" element={<EditPublication />} /> */}
                    <Route path="/logout" element={<Logout />} />
                </Route>
                {/* Guarded routes for admin users */}
                <Route element={<RoleGuard allowedRoles={['admin']} />}>
                    <Route path="/publications/create" element={<CreatePublication />} />
                    <Route path="/publications/edit/:id" element={<EditPublication />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;