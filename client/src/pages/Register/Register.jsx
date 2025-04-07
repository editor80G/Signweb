import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessTypes } from '../../constants/businessTypes';
import { jobTitles } from '../../constants/jobTitles';
import { countries } from '../../constants/countries';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslation } from '../../i18n/getTranslations';
import { Form, Button, Input, Select } from 'antd';
import { useRegister } from '../../hooks/useRegister';
import styles from './Register.module.css';


const Register = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { register } = useRegister();
    const [form] = Form.useForm(); // Initialize the form instance for dynamic updates

    // Load reCAPTCHA script dynamically
    useEffect(() => {
        if (window.grecaptcha) {
            window.grecaptcha.enterprise.ready(() => {
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
                alert(getTranslation('ACCOUNT_VALIDATION_RECAPTCHA', language));
                return;
            }
            console.log('Payload sent to register:', { ...values, captchaToken }); // Убедитесь, что captchaToken присутствует

            const success = await register({ ...values, captchaToken });
            console.log('Register success:', success);
            if (success) {
                navigate('/');
            }
        } catch (err) {
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





    // Dynamically update the country field when the language changes
    useEffect(() => {
        const defaultCountry = language === 'ru' ? 'RU' : 'US';
        form.setFieldsValue({ country: defaultCountry });
    }, [language, form]);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{getTranslation('ACCOUNT_REGISTER_TITLE', language)}</h2>
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
                    country: language === 'ru' ? 'RU' : 'US',
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

                <Form.Item
                    label={getTranslation('ACCOUNT_CONFIRM_PASSWORD', language)}
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_PASSWORD_CONFIRM', language),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_BUSINESS_TYPE', language)}
                    name="businessType"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_BUSINESS_TYPE', language),
                        },
                    ]}
                >
                    <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_BUSINESS_TYPE', language)}>
                        {businessTypes.map((type) => (
                            <Select.Option key={type.id} value={type.id}>
                                {getTranslation(type.key, language)}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_JOB_TITLE', language)}
                    name="jobTitle"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_JOB_TITLE', language),
                        },
                    ]}
                >
                    <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_JOB_TITLE', language)}>
                        {jobTitles.map((title) => (
                            <Select.Option key={title.id} value={title.id}>
                                {getTranslation(title.key, language)}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_COUNTRY', language)}
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_COUNTRY', language),
                        },
                    ]}
                >
                    <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_COUNTRY', language)}>
                        {Object.values(countries).map((country) => (
                            <Select.Option key={country.countryCode} value={country.countryCode}>
                                {getTranslation(`COUNTRIES.${country.countryCode}`, language)}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {getTranslation('ACCOUNT_REGISTER', language)}
                    </Button>
                </Form.Item>
            </Form>
        </div>

    );
};

export default Register;