import React, { useState } from 'react';
import { Form, Input, Button, List, Typography } from 'antd';
import styles from './SearchPublication.module.css';
import api from '../../../utils/api';
import config from '../../../../config';
import { getTranslation } from '../../../i18n/getTranslations';
import { useLanguage } from '../../../context/LanguageContext';
import { Link } from 'react-router-dom';

const Title = Typography.Title;

const SearchPage = () => {
    const [form] = Form.useForm();
    const [results, setResults] = useState([]); // State to store search results
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [error, setError] = useState(null); // State to store error messages
    const { language } = useLanguage(); // Get the current language from context

    const handleSearch = async (values) => {
        const { query } = values; // Extract the search query from the form
        setLoading(true); // Set loading state to true
        setError(null); // Clear previous errors
        try {
            const response = await api.get(`/search?search=${query}`);
            setResults(response.data.publications || []); // Update results with API response
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch search results'); // Handle errors
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className={styles.searchContainer}>
            <Title level={2}>{getTranslation('SEARCH_PUBLICATIONS_TITLE', language)}</Title>
            <Form
                form={form}
                layout="inline"
                onFinish={handleSearch}
                style={{ marginBottom: '20px' }}
            >
                <Form.Item
                    name="query"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a search query!',
                        },
                    ]}
                >
                    <Input placeholder={getTranslation('SEARCH_PUBLICATIONS_PLACEHOLDER', language)} style={{ width: 300 }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        {getTranslation('SEARCH_PUBLICATIONS_BUTTON', language)}
                    </Button>
                </Form.Item>
            </Form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className={styles.publicationsGrid}>
                {results.map((item) => (
                    <div className={styles.publicationItem} key={item._id}>
                        <Link to={`/publications/details/${item._id}`}>
                            <img
                                className={styles.publicationImage}
                                src={`${config.baseUrl}${item.image}`}
                                alt={
                                    item.type === '1'
                                        ? `${getTranslation('PUB_MAGAZINE_TITLE', language)} ${item.issue}`
                                        : `${getTranslation('PUB_CATALOG_TITLE', language)} ${item.issue}`
                                }
                            />
                        </Link>
                        <div className={styles.publicationDetails}>
                            <Typography.Text strong>
                                {item.type === '1'
                                    ? `${getTranslation('PUB_MAGAZINE_TITLE', language)}: ${item.issue}`
                                    : `${getTranslation('PUB_CATALOG_TITLE', language)}: ${item.issue}`}
                            </Typography.Text>
                            <br />
                            <Typography.Text>
                                {getTranslation('SEARCH_PUBLICATIONS_DATE', language)}: {item.type === '1'
                                    ? new Date(item.date).toLocaleDateString(language, { month: 'long', year: 'numeric' }) // Полный формат: месяц и год
                                    : new Date(item.date).getFullYear() // Только год
                                }
                            </Typography.Text>                           <br />
                            <Link to={`/publications/details/${item._id}`}>
                                {getTranslation('PUB_DETAILS_TITLE', language)}
                            </Link>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;