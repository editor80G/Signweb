import React, { useState } from 'react';
import { Form, Input, Button, List, Typography } from 'antd';
// import axios from 'axios';
import styles from './SearchPublication.module.css';
import api from '../../utils/api'; // Adjust the import path as necessary
import config from '../../../config';
import { getTranslation } from '../../i18n/getTranslations';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
//const { Title } = Typography; //
const Title = Typography.Title; // Import Title from Ant Design Typography

const SearchPage = () => {
    const [form] = Form.useForm(); // Initialize the form instance
    const [results, setResults] = useState([]); // State to store search results
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [error, setError] = useState(null); // State to store error messages
    const { language } = useLanguage(); // Get the current language from context

    const handleSearch = async (values) => {
        const { query } = values; // Extract the search query from the form
        setLoading(true); // Set loading state to true
        setError(null); // Clear previous errors
        try {
            //const response = await axios.get(`/search?search=${query}`); // Call the search API
            const response = await api.get(`/search?search=${query}`); // Use the API utility to call the search endpoint
            setResults(response.data.publications || []); // Update results with API response
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch search results'); // Handle errors
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        // <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
        <div className={styles.searchContainer}>
            <Title level={2}>Search Publications</Title>
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
                    <Input placeholder="Enter search query" style={{ width: 300 }} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Search
                    </Button>
                </Form.Item>
            </Form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* <List
                className={styles.publicationsGrid}
                bordered
                dataSource={results}
                renderItem={(item) => (
                    <List.Item>
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
                                <Typography.Text strong>Issue: {item.issue}</Typography.Text>
                                <br />
                                <Typography.Text>Date: {new Date(item.date).toLocaleDateString()}</Typography.Text>
                                <br />
                                <a href={item.file} target="_blank" rel="noopener noreferrer">
                                    Open File
                                </a>
                            </div>
                        </div>
                    </List.Item>
                )}
                locale={{ emptyText: 'No results found' }}
            /> */}
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
                            <Typography.Text strong>Issue: {item.issue}</Typography.Text>
                            <br />
                            <Typography.Text>Date: {new Date(item.date).toLocaleDateString()}</Typography.Text>
                            <br />
                            <a href={item.file} target="_blank" rel="noopener noreferrer">
                                Open File
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;