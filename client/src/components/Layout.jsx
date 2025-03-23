import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div id="page">
            <Header />
            <Nav />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;