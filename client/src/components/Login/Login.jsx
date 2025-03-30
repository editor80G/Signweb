import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getTranslation } from '../../i18n/getTranslations';
import { Form, Button, Input } from 'antd';
import { useLanguage } from '../../context/LanguageContext';

const Login = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { handleLogin } = useContext(AuthContext);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const success = await handleLogin(values);
            console.log('Login success:', success);
            if (success) {
                navigate('/');
            }
        }
        catch (err) {
            console.error('Error:', err.message);
            form.setFields([
                {
                    name: 'email',
                    errors: [err.message], // Show the error message on the email field
                },
            ]);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <div>
            <h2 className="home-title">{getTranslation('ACCOUNT_LOGIN_TITLE', language)}</h2>
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
                    <Button type="primary" htmlType="submit">
                        {getTranslation('ACCOUNT_LOGIN', language)}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;