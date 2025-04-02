import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { AuthContext } from '../../context/AuthContext';
import { getTranslation } from '../../i18n/getTranslations';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../utils/api';
import styles from './DetailsPublication.module.css';


const DetailsPublication = () => {
    const { id } = useParams(); // Get the publication ID from the URL
    const navigate = useNavigate();
    const [publication, setPublication] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useContext(AuthContext);
    const { language } = useLanguage();

    useEffect(() => {
        const fetchPublication = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/publications/details/${id}`);
                setPublication(response.data.publication); // Assuming the API returns the publication object
                setIsOwner(response.data.isOwner); // Assuming the API returns the ownership status
                console.log('isOwner:', response.data.isOwner);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch publication details');
            } finally {
                setLoading(false);
            }
        };

        fetchPublication();
    }, [id]);

    const handleEdit = () => {
        navigate(`/publications/edit/${id}`); // Navigate to the edit page
    };

    const handleDelete = async () => {
        if (window.confirm(getTranslation('PUB_DELETE_CONFIRM', language) || 'Are you sure you want to delete this publication?')) {
            try {
                await api.delete(`/publications/delete/${id}`);
                //alert(getTranslation('PUB_DELETE_SUCCESS', language) || 'Publication deleted successfully.');
                navigate('/publications/magazines'); // Redirect to the publications list
            } catch (err) {
                alert(getTranslation('PUB_DELETE_ERROR', language) || 'Failed to delete the publication.'), err;
            }
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }
    if (!publication) {
        return <p>{getTranslation('PUB_NOT_FOUND', language) || 'Publication not found.'}</p>;
    }

    return (
        <div className={styles.rowDetailsPublication}>
            <div className={styles.leftColumnDetailsPublication}>
                <img
                    src={`${config.baseUrl}${publication.image}`}
                    alt={`${getTranslation('PUB_IMAGE', language)} ${publication.issue}`}
                    className={styles.imageCoverDetailsPublication}
                />
                <p className={styles.imageCoverTitleDetailsPublication}>
                    <strong>{getTranslation('PUB_ISSUE', language)}:</strong> {publication.issue}
                </p>
                <p className={styles.imageCoverTxtDetailsPublication}>
                    <strong>{getTranslation('SEARCH_PUBLICATIONS_DATE', language)}:</strong> {publication.type === '1'
                        ? new Date(publication.date).toLocaleDateString(language, { month: 'long', year: 'numeric' }) // Полный формат: месяц и год
                        : new Date(publication.date).getFullYear() // Только год
                    }
                </p>
            </div>
            <div className={styles.rightColumnDetailsPublication}>
                <h2 className={styles.headingDetailsPublication}>{getTranslation('PUB_DETAILS_TITLE', language) || 'Publication Details'}</h2>
                <p className={styles.details}>
                    1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat id itaque possimus magnam placeat. Itaque incidunt rem corrupti aspernatur sapiente animi. Rem maxime quae ut odio cumque possimus voluptas esse!
                </p>
                <p className={styles.details}>
                    2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat id itaque possimus magnam placeat. Itaque incidunt rem corrupti aspernatur sapiente animi. Rem maxime quae ut odio cumque possimus voluptas esse!
                </p>
                <p className={styles.details}>
                    3. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat id itaque possimus magnam placeat. Itaque incidunt rem corrupti aspernatur sapiente animi. Rem maxime quae ut odio cumque possimus voluptas esse!
                </p>
                {isAuthenticated ? (
                    <>
                        <p className={styles.buttonsContainerDetailsPublication}>
                            <a href={`${config.baseUrl}${publication.file}`} target="_blank" rel="noopener noreferrer">
                                {`${getTranslation('PUB_DOWNLOAD_FILE', language) || 'Download File'} ${publication.type === '1'
                                    ? getTranslation('PUB_TYPES.MAGAZINE', language) || 'Magazine'
                                    : getTranslation('PUB_TYPES.CATALOG', language) || 'Catalog'
                                    }`}
                            </a>
                        </p>
                        {isOwner && (
                            <div className={styles.buttonsContainerDetailsPublication}>
                                <button onClick={handleEdit} className="btn btn-edit">
                                    {getTranslation('PUB_EDIT', language) || 'Edit'}
                                </button>
                                <button onClick={handleDelete} className="btn btn-delete">
                                    {getTranslation('PUB_DELETE', language) || 'Delete'}
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className={styles.notification}>
                        {getTranslation('PUB_LOGIN_REQUIRED', language) || 'Login required to download publication.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DetailsPublication;