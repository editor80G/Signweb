import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { businessTypes } from '../constants/businessTypes';
import { getTranslation } from '../i18n/getTranslations';
import { jobTitles } from '../constants/jobTitles';
import { countries } from '../constants/countries';
import { Form, Button, Input, Select } from 'antd';
import { useLanguage } from '../context/LanguageContext';
import Login from './Login';

const { Option } = Select;
const Register = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { handleAuthChange } = useContext(AuthContext);
    const [form] = Form.useForm(); // Initialize the form instance for dynamic updates


    const onFinish = async (values) => {
        const { email, password, confirmPassword, businessType, jobTitle, country } = values;

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/auth/register',
                { email, password, confirmPassword, businessType, jobTitle, country },
                { withCredentials: true }
            );
            console.log('Success:', response.data.message);
            handleAuthChange(true);
            navigate('/'); // Redirect to the home page on success
        } catch (err) {
            console.error('Error:', err.response?.data?.error || 'Failed to connect to the server');
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
        <>
            <div>
                <h2 className="home-title">{getTranslation('ACCOUNT_REGISTER_TITLE', language)}</h2>
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
                        maxWidth: 600,
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
                                <Option key={type.id} value={type.id}>
                                    {getTranslation(type.key, language)}
                                </Option>
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
                                <Option key={title.id} value={title.id}>
                                    {getTranslation(title.key, language)}
                                </Option>
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
                                <Option key={country.countryCode} value={country.countryCode}>
                                    {getTranslation(`COUNTRIES.${country.countryCode}`, language)}
                                </Option>
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
        </>
    );
};

export default Register;