import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { businessTypes } from '../constants.js/businessTypes';
import { getTranslation } from '../i18n/getTranslations';
import { jobTitles } from '../constants.js/jobTitles';
import { countries } from '../constants.js/countries';
import { Form, Button, Input, Select } from 'antd';
import { useLanguage } from '../context/LanguageContext';


const { Option } = Select;
//const { language } = useLanguage(); // Get the current language from context
//const translatedText = getTranslation('someKey', language); // Pass the language to getTranslation


const Register = () => {
    const { language } = useLanguage();
    const navigate = useNavigate();
    const { handleAuthChange } = useContext(AuthContext);
    const [form] = Form.useForm(); // Initialize the form instance for dynamic updates


    const onFinish = async (values) => {
        const { email, password, confirmPassword, businessType, jobTitle, country } = values;

        if (password !== confirmPassword) {
            console.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/auth/register',
                { email, password, businessType, jobTitle, country },
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
    useEffect(() => {
        const defaultCountry = language === 'ru' ? 'RU' : 'US';
        form.setFieldsValue({ country: defaultCountry });
    }, [language, form]);

    return (
        <div>
            <h2 className="home-title">{getTranslation('ACCOUNT_REGISTER', language)}</h2>
            <Form
                form={form} // Pass the form instance to the Form component for dynamic updates

                name="register"
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
                    label={getTranslation('ACCOUNT_EMAIL', language)}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_EMAIL', language),
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_PASSWORD', language)}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_PASSWORD', language),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_CONFIRM_PASSWORD', language)}
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_PASSWORD_CONFIRM', language),
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_BUSINESS_TYPE', language)}
                    name="businessType"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_BUSINESS_TYPE', language),
                        },
                    ]}
                >
                    <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_BUSINESS_TYPE', language)}>
                        {businessTypes.map((type) => (
                            <Option key={type.id} value={type.id}>
                                {getTranslation(type.key, language)}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_JOB_TITLE', language)}
                    name="jobTitle"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_JOB_TITLE', language),
                        },
                    ]}
                >
                    <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_JOB_TITLE', language)}>
                        {jobTitles.map((title) => (
                            <Option key={title.id} value={title.id}>
                                {getTranslation(title.key, language)}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={getTranslation('ACCOUNT_COUNTRY', language)}
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: getTranslation('ACCOUNT_VALIDATION_COUNTRY', language),
                        },
                    ]}
                >
                    <Select placeholder={getTranslation('ACCOUNT_PLACEHOLDER_COUNTRY', language)}>
                        {Object.values(countries).map((country) => (
                            <Option key={country.countryCode} value={country.countryCode}>
                                {getTranslation(`COUNTRIES.${country.countryCode}`, language)}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        {getTranslation('ACCOUNT_SUBMIT', language)}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { businessTypes } from '../constants.js/businessTypes';
// import { getTranslation } from '../i18n/getTranslations';
// import { jobTitles } from '../constants.js/jobTitles';
// import { Form, Button, Input } from "antd";

// const Register = ({ language }) => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         confirmPassword: '',
//         businessType: businessTypes[0],
//         jobTitle: jobTitles[0]
//     });
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState(null);
//     const navigate = useNavigate(); // Initialize the useNavigate hook
//     const { handleAuthChange } = useContext(AuthContext);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (formData.password !== formData.confirmPassword) {
//             setError('Passwords do not match');
//             return;
//         }
//         try {
//             const response = await axios.post('http://localhost:3000/auth/register', formData, { withCredentials: true });
//             setSuccess(response.data.message);
//             setError(null);
//             handleAuthChange(true);
//             navigate('/'); // Redirect to the home page on success
//         } catch (err) {
//             const errorMessage = err.response?.data?.error || 'Failed to connect to the server';
//             setError(errorMessage);
//             setSuccess(null);
//         }
//     };

//     return (
//         <div>
//             <h2 className="home-title">Смотреть архив номеров</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange} required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange} required
//                     />
//                 </div>
//                 <div>
//                     <label>Confirm Password:</label>
//                     <input
//                         type="password"
//                         name="confirmPassword"
//                         value={formData.confirmPassword}
//                         onChange={handleChange} required
//                     />
//                 </div>
//                 <div>
//                     <label>Business Type:</label>
//                     <select
//                         id="businessType"
//                         name="businessType"
//                         value={formData.businessType}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select business type</option>

//                         {businessTypes.map((type) => (
//                             <option key={type.id} value={type.id}>
//                                 {getTranslation(type.key, language)}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Job Title:</label>
//                     <select
//                         id="jobTitle"
//                         name="jobTitle"
//                         value={formData.jobTitle}
//                         onChange={handleChange}
//                     >
//                         <option value="">Select a job title</option>
//                         {jobTitles.map((title) => (
//                             <option key={title.id} value={title.id}>
//                                 {getTranslation(title.key, language)}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <br />
//                 <button type="submit">Register</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {success && <p style={{ color: 'green' }}>{success}</p>}
//         </div>
//     );
// };

// export default Register;