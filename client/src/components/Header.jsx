import React from 'react';
import logo from '../assets/images/logo-sign-magazine.jpg';

const Header = () => {
    return (
        <header id="header">
            <img id="logo" src={logo} alt="Logo" />
        </header>
    );
};

export default Header;