import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import config from '../../config';
import { AuthContext } from '../context/AuthContext';
import { getTranslation } from '../i18n/getTranslations';
import { useLanguage } from '../context/LanguageContext';
import api from '../utils/api';


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
                alert(getTranslation('PUB_DELETE_SUCCESS', language) || 'Publication deleted successfully.');
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
        <div className="details-publication">
            <h2>{getTranslation('PUB_DETAILS_TITLE', language) || 'Publication Details'}</h2>
            <div className="publication-details">
                <img
                    src={`${config.baseUrl}${publication.image}`}
                    alt={`${getTranslation('PUB_IMAGE', language)} ${publication.issue}`}
                    className="publication-image"
                />
                <p>
                    <strong>{getTranslation('PUB_ISSUE', language)}:</strong> {publication.issue}
                </p>
                <p>
                    <strong>{getTranslation('PUB_DATE', language)}:</strong> {new Date(publication.date).toLocaleDateString()}
                </p>
                <p>
                    <strong>{getTranslation('PUB_TYPE_LABEL', language)}:</strong> {publication.type}
                </p>

                {isAuthenticated && isOwner ? (
                    <>
                        <p>
                            <a href={`${config.baseUrl}${publication.file}`} target="_blank" rel="noopener noreferrer">
                                {getTranslation('PUB_DOWNLOAD_FILE', language) || 'Download File'}
                            </a>
                        </p>
                        <div className="publication-actions">
                            <button onClick={handleEdit} className="btn btn-edit">
                                {getTranslation('PUB_EDIT', language) || 'Edit'}
                            </button>
                            <button onClick={handleDelete} className="btn btn-delete">
                                {getTranslation('PUB_DELETE', language) || 'Delete'}
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default DetailsPublication;