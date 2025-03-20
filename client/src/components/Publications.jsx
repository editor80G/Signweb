import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

const Publications = () => {
    const [publications, setPublications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('/publications');
                setPublications(response.data.publications);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch publications');
            }
        };

        fetchPublications();
    }, []);

    return (
        <div>
            <h2>Publications</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {publications.map((publication) => (
                    <li key={publication._id}>{publication.issue}</li>
                ))}
            </ul>
        </div>
    );
};

export default Publications;