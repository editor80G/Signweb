import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Logout = () => {
    const { handleLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                const success = await handleLogout(); 
                if (success) {
                    console.log('Logout success:', success); 
                    navigate('/auth/login');
                } else {
                    console.error('Logout failed');
                }
            } catch (err) {
                console.error('Error during logout:', err.message);
            }
        };

        performLogout();
    }, [handleLogout, navigate]);

    return null; // No UI needed
};

export default Logout;
// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// //import { getTranslation } from '../../i18n/getTranslations';
// //import { useLanguage } from '../../context/LanguageContext';
// //import { Link } from 'react-router-dom';

// const Logout = () => {
//     const { handleLogout } = useContext(AuthContext);
//     const navigate = useNavigate();
//     // const { language } = useLanguage();
//     try {
//         const success = await handleLogout();
//         console.log('Success:', success);
//             if (success) {
//                 navigate('/');
//             }
//     }
//     catch (err) {
//         console.error('Error:', err.message);
     
//     }

//     if (success) {
//         navigate('/login');
//     }

//     useEffect(() => {
//         handleLogout(); // Perform logout logic
//         navigate('/'); // Redirect to home page
//     }, [handleLogout, navigate]);

//     return null; // No UI needed

//     // return (
//     //     <button onClick={handleLogout}>
//     //         {getTranslation('NAV_LOGOUT', language)}
//     //     </button>
//     //     // <Link to="/" onClick={handleLogout}>{getTranslation('NAV_LOGOUT', language)}</Link>
//     // );
// };

// export default Logout;