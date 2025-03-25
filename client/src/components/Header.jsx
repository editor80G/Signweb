import React from 'react';
import logo from '../assets/images/logo-sign-magazine.jpg';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
    return (
        <header id="header">

            <div className="logo-container">
                <img id="logo" src={logo} alt="Logo" />
            </div>
            <div className="locals-container">
                <LanguageSwitcher />
            </div>

        </header>
    );
};

export default Header;