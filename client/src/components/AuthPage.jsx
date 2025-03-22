import React, { useState } from 'react';
import Registration from './Registration';
import Login from './Login';
import { Button } from 'antd';
import { useLanguage } from '../context/LanguageContext';
import { getTranslation } from '../i18n/getTranslations';

const AuthPage = () => {
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const { language } = useLanguage();

    return (
        <div>
            {isLoginVisible ? (
                <Login />
            ) : (
                <Registration />
            )}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {isLoginVisible ? (
                    <div>
                        <span>{getTranslation('ACCOUNT_DO_NOT_HAVE_AN_ACCOUNT', language)} </span>
                        <Button type="link" style={{ outline: 'none', boxShadow: 'none' }} onClick={() => setIsLoginVisible(false)}>
                            {getTranslation('ACCOUNT_REGISTER', language)}
                        </Button>
                    </div>
                ) : (
                    <div>
                        <span>{getTranslation('ACCOUNT_ALREADY_HAVE_ACCOUNT', language)} </span>
                        <Button type="link" style={{ outline: 'none', boxShadow: 'none' }} onClick={() => setIsLoginVisible(true)}>
                            {getTranslation('ACCOUNT_GO_TO_LOGIN', language)}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthPage;