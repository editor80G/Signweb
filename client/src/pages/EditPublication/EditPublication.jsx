import React, { useEffect } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { publicationTypes } from '../../constants/publicationTypes';
import { getTranslation } from '../../i18n/getTranslations';
import { Form, Button, Input, Select, DatePicker } from 'antd';
import { useLanguage } from '../../context/LanguageContext';
import { useParams } from 'react-router-dom';
import styles from './EditPublication.module.css';
import dayjs from 'dayjs';

const { Option } = Select;
const EditPublication = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const [form] = Form.useForm(); // Initialize the form instance for dynamic updates
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            console.error('No publication ID provided');
            return;
        }

        const fetchPublication = async () => {
            try {
                const response = await api.get(`/publications/edit/${id}`);
                const publication = response.data.publication; // Extract the publication object

                if (!publication) {
                    console.error('Publication not found');
                    return;
                }

                form.setFieldsValue({
                    issue: publication.issue,
                    date: dayjs(publication.date),
                    image: publication.image,
                    file: publication.file,
                    type: Number(publication.type),
                });
            } catch (err) {
                console.error('Error fetching publication:', err.response?.data?.error || 'Failed to connect to the server');
            }
        };
        fetchPublication();
    }, [id, form]);

    const onFinish = async (values) => {
        try {
            const response = await api.put(`/publications/edit/${id}`, values);
            console.log('Update success:', response.data.success);
            if (values.type === 'catalog') {
                navigate(`/publications/catalogs`);
            } else {
                navigate(`/publications/magazines`);
            }
        } catch (err) {
            // Log the full error object for debugging
            console.error('Full error object:', err);

            // Extract and log the error message
            const errorMessage = err.response?.data?.error || err.message || 'Failed to connect to the server';
            console.error('Error:', errorMessage);

            // Optionally, display the error message to the user
            alert(errorMessage);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <>
            <div className={styles.container}>
                <h2 className={styles.heading}>{getTranslation('PUB_EDIT_TITLE', language)}</h2>
                <Form
                    form={form} // Pass the form instance to the Form component for dynamic updates

                    name="edit"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 800,
                    }}
                    initialValues={{
                        date: dayjs(),  // Set the initial date to today
                        //remember: true, // for checkboxes
                        country: language === 'ru' ? 'RU' : 'US',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label={getTranslation('PUB_ISSUE', language)}
                        name="issue"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUB_ISSUE_VALIDATION_MESSAGE', language),
                                // type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUB_DATE', language)}
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUB_DATE_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        {/* <Input /> */}
                        <DatePicker
                            format="YYYY-MM-DD" // Формат отображения даты
                            style={{ width: '100%' }} // Растягиваем DatePicker на всю ширину
                        />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUB_IMAGE', language)}
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUB_IMAGE_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUB_FILE', language)}
                        name="file"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUB_FILE__VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={getTranslation('PUB_TYPE_LABEL', language)}
                        name="type"
                        rules={[
                            {
                                required: true,
                                message: getTranslation('PUB_TYPE_VALIDATION_MESSAGE', language),
                            },
                        ]}
                    >
                        <Select placeholder={getTranslation('PUB_TYPE_PLACEHOLDER', language)}>
                            {Object.values(publicationTypes).map((t) => (
                                <Option key={t.publicationTypeKey} value={t.id}>
                                    {getTranslation(`PUB_TYPES.${t.publicationTypeKey}`, language)}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            {getTranslation('PUB_SAVE_CHANGES', language)}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default EditPublication;