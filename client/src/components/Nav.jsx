import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Nav = () => {
    const { isAuthenticated, handleAuthChange } = useContext(AuthContext);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
            handleAuthChange(response.data.isAuthenticated);
        } catch (error) {
            handleAuthChange(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/publications">Publications</Link></li>
                {!isAuthenticated && <li><Link to="/register">Register</Link></li>}
                {/* Add other navigation links here */}
            </ul>
        </nav>
    );
};

export default Nav;
