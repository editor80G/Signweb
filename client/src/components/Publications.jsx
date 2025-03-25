import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';

const Publications = ({ type }) => {
    const [publications, setPublications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();


    useEffect(() => {
        const fetchPublications = async () => {
            setPublications([]); // Clear the list before loading
            setLoading(true); // Set loading state
            try {
                const endpoint = type
                    ? `http://localhost:3000/publications?type=${type}`
                    : 'http://localhost:3000/publications';

                const { magazines = [], catalogs = [] } = (await axios.get(endpoint)).data.publications || {};
                // Update state based on the type
                if (type === 'magazine') {
                    setPublications(magazines);
                } else if (type === 'catalog') {
                    setPublications(catalogs);
                } else {
                    setPublications([...magazines, ...catalogs]);
                }
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch publications');
            } finally {
                setLoading(false);
            }
        };
        fetchPublications();
    }, [type]); // Fetch publications when the type changes

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="publications-container">
            <h2>
                {type === 'magazine' && getTranslation('PUB_LIST_MAGAZINE', language)}
                {type === 'catalog' && getTranslation('PUB_LIST_CATALOG', language)}
                {type !== 'magazine' && type !== 'catalog' && getTranslation('PUB_LIST_DEFAULT', language)}
            </h2>
            {publications.length > 0 ? (
                <div className="publications-grid">
                    {publications.map((publication) => (
                        <div className="publication-item" key={publication._id}>
                            <a
                                href={`${config.baseUrl}${publication.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="publication-image"
                                    src={`${config.baseUrl}${publication.image}`}
                                    alt={type === 'magazine' && `${getTranslation('PUB_MAGAZINE_TITLE', language)} ${publication.issue}` || `${getTranslation('PUB_CATALOG_TITLE', language)} ${publication.issue}`}
                                />
                            </a>
                            <div className="publication-details">
                                {type === 'magazine' && <p>{getTranslation('PUB_MAGAZINE_TITLE', language)} {publication.issue}</p>}
                                {type === 'catalog' && <p>{getTranslation('PUB_CATALOG_TITLE', language)} {publication.issue}</p>}
                                {type !== 'magazine' && type !== 'catalog' && <p>{publication.issue}</p>}
                                {/* <p>
                                    <a
                                        href={`${config.baseUrl}${publication.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Скачать №{publication.issue}
                                    </a>
                                </p> */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No publications available.</p>
            )}
        </div>
    );
};

export default Publications;