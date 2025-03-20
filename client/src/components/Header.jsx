import React from 'react';
import logo from '../assets/images/logo-sign-magazine.jpg';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    return (
        <header id="header">
            <img id="logo" src={logo} alt="Logo" />
            {/* TODO: Add LanguageSwitcher component here */}
            <LanguageSwitcher />
        </header>
    );
};

export default Header;