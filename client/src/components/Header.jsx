import React from 'react';
import logo from '../assets/images/logo-sign-magazine.jpg';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    return (
        <header id="header">
            <LanguageSwitcher />
            <div className="header-container">
                <img id="logo" src={logo} alt="Logo" />

            </div>

        </header>
    );
};

export default Header;