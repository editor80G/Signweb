import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import { Outlet, useLocation } from 'react-router-dom';
import SearchPublication from './SearchPublication/SearchPublication';


const Layout = () => {
    const location = useLocation();
    // Show SearchPublication only on specific routes
    const showSearch = location.pathname.includes('/publications/magazines') || location.pathname.includes('/publications/catalogs');

    return (
        <div id="page">
            <Header />
            <Nav />
            {showSearch && <SearchPublication />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;