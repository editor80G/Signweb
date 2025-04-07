import React, { useEffect, useState, useMemo } from 'react';
//import axios from 'axios';
import config from '../../../config';
import { getTranslation } from '../../i18n/getTranslations';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import styles from './Publications.module.css';

const Publications = ({ type }) => {
    const [publications, setPublications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useLanguage();

    useEffect(() => {
        let isMounted = true;

        const fetchPublications = async () => {
            setLoading(true);
            try {
                const endpoint = type
                    ? `/publications?type=${type}`
                    : '/publications';
                const response = await api.get(endpoint);
                if (isMounted) {
                    const { magazines = [], catalogs = [] } = response.data.publications || {};
                    const success = response.data.success || false;
                    if (success) {
                        if (type === 'magazine') {
                            setPublications(magazines);
                        } else if (type === 'catalog') {
                            setPublications(catalogs);
                        } else {
                            setPublications([...magazines, ...catalogs]);
                        }
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.response?.data?.error || err.message || 'Failed to fetch publications');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchPublications();

        return () => {
            isMounted = false;
        };
    }, [type]);

    // Memoize publications to avoid recalculating on every render
    const memoizedPublications = useMemo(() => publications, [publications]);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div className="publications-container">
            <h2 className="home-title"
            >
                {type === 'magazine' && getTranslation('PUB_LIST_MAGAZINE', language)}
                {type === 'catalog' && getTranslation('PUB_LIST_CATALOG', language)}
                {type !== 'magazine' && type !== 'catalog' && getTranslation('PUB_LIST_DEFAULT', language)}
            </h2>
            {memoizedPublications.length > 0 ? (
                <div className="publications-grid">
                    {memoizedPublications.map((publication) => (
                        <div className="publication-item" key={publication._id}>
                            <Link to={`/publications/details/${publication._id}`}>
                                <img
                                    className="publication-image"
                                    src={`${config.baseUrl}${publication.image}`}
                                    alt={type === 'magazine' && `${getTranslation('PUB_MAGAZINE_TITLE', language)} ${publication.issue}` || `${getTranslation('PUB_CATALOG_TITLE', language)} ${publication.issue}`}
                                />
                            </Link>
                            <div className={styles.publicationDetails}>
                                {type === 'magazine' && (
                                    <p>
                                        <Link to={`/publications/details/${publication._id}`}>
                                            {getTranslation('PUB_MAGAZINE_TITLE', language)} {publication.issue}
                                        </Link>
                                    </p>
                                )}
                                {type === 'catalog' && (
                                    <p>
                                        <Link to={`/publications/details/${publication._id}`}>
                                            {getTranslation('PUB_CATALOG_TITLE', language)} {publication.issue}
                                        </Link>
                                    </p>
                                )}
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