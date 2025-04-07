import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getTranslation } from '../../i18n/getTranslations';
import { Form, Button, Input } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css';

const Login = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { login } = useLogin();
    const [form] = Form.useForm();
    const [recaptchaReady, setRecaptchaReady] = useState(false);

    // Load reCAPTCHA script dynamically
    useEffect(() => {
        if (window.grecaptcha) {
            window.grecaptcha.enterprise.ready(() => {
                setRecaptchaReady(true);
                console.log('reCAPTCHA is ready');
            });
        } else {
            console.error('reCAPTCHA not loaded');
        }
    }, []);

    const handleRecaptcha = async () => {
        if (window.grecaptcha) {
            const token = await window.grecaptcha.enterprise.execute('6LeD0AsrAAAAAExinf4S5J104V1ncJ4uTkeyetS3', { action: 'submit' });
            console.log('CAPTCHA Token:', token);
            return token;
        } else {
            console.error('reCAPTCHA not loaded');
            return null;
        }
    };

    const onFinish = async (values) => {
        try {
            const captchaToken = await handleRecaptcha();
            if (!captchaToken) {
                form.setFields([
                    {
                        name: 'email',
                        errors: [getTranslation('ACCOUNT_VALIDATION_RECAPTCHA', language)],
                    },
                ]);
                return;
            }

            const success = await login({ ...values, captchaToken });
            console.log('Login success:', success);
            if (success) {
                const redirectTo = new URLSearchParams(window.location.search).get('redirectTo') || '/';
                navigate(redirectTo);
            }
        }
        catch (err) {
            console.error('Error:', err.message);
            form.setFields([
                {
                    name: 'email',
                    errors: [getTranslation(err.message, language) || 'An unknown error occured.'], // Show the error message on the email field
                },
            ]);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{getTranslation('ACCOUNT_LOGIN_TITLE', language)}</h2>
            <Form
                form={form} // Pass the form instance to the Form component for dynamic updates

                name="register"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 1000,
                    minWidth: 600,
                }}
                initialValues={{
                    //remember: true, // for checkboxes
                    // country: language === 'ru' ? 'RU' : 'US',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label={getTranslation('ACCOUNT_EMAIL', language)}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_EMAIL', language),
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_PASSWORD', language)}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_PASSWORD', language),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" disabled={!recaptchaReady}>
                        {getTranslation('ACCOUNT_LOGIN', language)}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;