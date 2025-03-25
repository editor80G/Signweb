import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { publicationTypes } from '../constants.js/publicationTypes';
import { getTranslation } from '../i18n/getTranslations';
import { Form, Button, Input, Select } from 'antd';
import { useLanguage } from '../context/LanguageContext';


const { Option } = Select;
const CreatePublication = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { handleAuthChange } = useContext(AuthContext);
    const [form] = Form.useForm(); // Initialize the form instance for dynamic updates


    const onFinish = async (values) => {
        const { type, issue, date, image, file } = values;
        if (!type || !issue || !date || !image || !file) {
            console.error('All fields are required');
            return;
        };
        try {
            const response = await axios.post(
                'http://localhost:3000/publications/create',
                { type, issue, date, image, file },
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
    // useEffect(() => {
    //     const defaultCountry = language === 'ru' ? 'RU' : 'US';
    //     form.setFieldsValue({ country: defaultCountry });
    // }, [language, form]);

    return (
        <>
            <div>
                <h2 className="home-title">{getTranslation('PUBLICATION_CREATE_TITLE', language)}</h2>
                <Form
                    form={form} // Pass the form instance to the Form component for dynamic updates

                    name="create"
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
                        label={getTranslation('PUBLICATION_ISSUE', language)}
                        name="issue"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUBLICATION_ISSUE_VALIDATION_MESSAGE', language),
                                // type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUBLICATION_DATE', language)}
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUBLICATION_DATE_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUBLICATION_IMAGE_PATH', language)}
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUBLICATION_IMAGE_PATH_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUBLICATION_FILE_PATH', language)}
                        name="file"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUBLICATION_FILE_PATH_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUBLICATION_TYPE', language)}
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUBLICATION_TYPE_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_BUSINESS_TYPE', language)}>
                            {publicationTypes.map((type) => (
                                <Option key={type.id} value={type.id}>
                                    {getTranslation(type.key, language)}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {getTranslation('PUBLICATION_CREATE', language)}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default CreatePublication;