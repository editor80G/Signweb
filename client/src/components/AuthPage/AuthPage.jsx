//import React, { useState } from 'react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import { Button } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../i18n/getTranslations';

const AuthPage = () => {
    // const [isLoginVisible, setIsLoginVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { language } = useLanguage();

    // Determine whether to show Login or Register based on the current path
    const isLoginVisible = location.pathname === '/auth/login';

    const toggleAuthPage = () => {
        navigate(isLoginVisible ? '/auth/register' : '/auth/login');
    };

    return (
        <div>
            {isLoginVisible ? <Login /> : <Register />}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {isLoginVisible ? (
                    <div>
                        <span>{getTranslation('ACCOUNT_DO_NOT_HAVE_AN_ACCOUNT', language)} </span>
                        <Button
                            type="link"
                            style={{ outline: 'none', boxShadow: 'none' }}
                            onClick={toggleAuthPage}
                        >
                            {getTranslation('ACCOUNT_REGISTER', language)}
                        </Button>
                    </div>
                ) : (
                    <div>
                        <span>{getTranslation('ACCOUNT_ALREADY_HAVE_ACCOUNT', language)} </span>
                        <Button
                            type="link"
                            style={{ outline: 'none', boxShadow: 'none' }}
                            onClick={toggleAuthPage}
                        >
                            {getTranslation('ACCOUNT_GO_TO_LOGIN', language)}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );

    // return (
    //     <div>
    //         {isLoginVisible ? (
    //             <Login />
    //         ) : (
    //             <Register />
    //         )}
    //         <div style={{ textAlign: 'center', marginTop: '20px' }}>
    //             {isLoginVisible ? (
    //                 <div>
    //                     <span>{getTranslation('ACCOUNT_DO_NOT_HAVE_AN_ACCOUNT', language)} </span>
    //                     <Button type="link" style={{ outline: 'none', boxShadow: 'none' }} onClick={() => setIsLoginVisible(false)}>
    //                         {getTranslation('ACCOUNT_REGISTER', language)}
    //                     </Button>
    //                 </div>
    //             ) : (
    //                 <div>
    //                     <span>{getTranslation('ACCOUNT_ALREADY_HAVE_ACCOUNT', language)} </span>
    //                     <Button type="link" style={{ outline: 'none', boxShadow: 'none' }} onClick={() => setIsLoginVisible(true)}>
    //                         {getTranslation('ACCOUNT_GO_TO_LOGIN', language)}
    //                     </Button>
    //                 </div>
    //             )}
    //         </div>
    //     </div>
    // );
};

export default AuthPage;