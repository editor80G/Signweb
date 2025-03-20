import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { businessTypes } from '../constants.js/businessTypes';
import { getTranslation } from '../i18n/getTranslations';
import { jobTitles } from '../constants.js/jobTitles';

const Register = ({ language }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        businessType: businessTypes[0],
        jobTitle: jobTitles[0]
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const { handleAuthChange } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/auth/register', formData, { withCredentials: true });
            setSuccess(response.data.message);
            setError(null);
            handleAuthChange(true);
            navigate('/'); // Redirect to the home page on success
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Failed to connect to the server';
            setError(errorMessage);
            setSuccess(null);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange} required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange} required
                    />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange} required
                    />
                </div>
                <div>
                    <label>Business Type:</label>
                    <select
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                    >
                        <option value="">Select business type</option>

                        {businessTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {getTranslation(type.key, language)}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Job Title:</label>
                    <select
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                    >
                        <option value="">Select a job title</option>
                        {jobTitles.map((title) => (
                            <option key={title.id} value={title.id}>
                                {getTranslation(title.key, language)}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Register;