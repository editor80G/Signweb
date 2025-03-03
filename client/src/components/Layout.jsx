import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;