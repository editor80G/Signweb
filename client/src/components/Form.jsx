import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Form = () => {
    const [formData, setFormData] = useState({
        country: '',
        email: '',
        isPrinted: false,
        name: '',
        lastName: '',
        gender: '',
        monthOfBirth: '',
        jobFunction: '',
        business: '',
        mobilePhone: '',
        isTextMessageOn: true,
        company: '',
        businessPhone: '',
        streetType: '',
        streetName: '',
        houseNumber: '',
        apartmentType: '',
        apartmentNumber: '',
        address2: '',
        city: '',
        area: '',
        region: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Include external scripts if necessary
        const script1 = document.createElement('script');
        script1.src = '/Scripts/jquery.validate.min.js';
        script1.async = true;
        document.body.appendChild(script1);

        const script2 = document.createElement('script');
        script2.src = '/Scripts/jquery.validate.unobtrusive.min.js';
        script2.async = true;
        document.body.appendChild(script2);

        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/your-api-endpoint', formData);
            setSuccessMessage('Form submitted successfully!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error submitting form.');
            setSuccessMessage('');
        }
    };

    return (
        <>
            <div id="right-block">
                {errorMessage && (
                    <div id="dialog" title="Сообщение сервера" style={{ color: 'red', fontSize: '16px' }}>
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div id="dialog" title="Сообщение сервера" style={{ color: 'green', fontSize: '16px' }}>
                        {successMessage}
                    </div>
                )}
                <form id="formSubscription" onSubmit={handleSubmit}>
                    <div className="editor-field" id="country">
                        <select name="country" value={formData.country} onChange={handleChange} style={{ width: '300px' }}>
                            {/* Add your options here */}
                        </select>
                        {errors.country && <div>{errors.country}</div>}
                        <div id="alert"></div>
                    </div>

                    <div className="editor-label" id="email">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="editor-field">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '300px' }} />
                        {errors.email && <div>{errors.email}</div>}
                    </div>

                    <div style={{ height: '10px' }}></div>
                    <label>Выберите формат:</label>
                    <div className="editor-field" id="sub-option">
                        <input type="radio" name="isPrinted" value="false" checked={!formData.isPrinted} onChange={handleChange} id="IsPrinted_No" />
                        <label className="editor-field" style={{ fontWeight: 'bold' }} htmlFor="IsPrinted_No">Электронная версия</label>
                        {errors.isPrinted && <div>{errors.isPrinted}</div>}
                    </div>
                    <div className="editor-field" id="printed">
                        <input type="radio" name="isPrinted" value="true" checked={formData.isPrinted} onChange={handleChange} id="IsPrinted_Yes" />
                        <label className="editor-field" style={{ fontWeight: 'bold' }} htmlFor="IsPrinted_Yes">Электронная + печатная версия</label>
                    </div>

                    <div className="editor-label">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="editor-field" id="first-name">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '300px' }} />
                        {errors.name && <div>{errors.name}</div>}
                    </div>

                    <div className="editor-label">
                        <label htmlFor="lastName">Last Name</label>
                    </div>
                    <div className="editor-field" id="last-name">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '300px' }} />
                        {errors.lastName && <div>{errors.lastName}</div>}
                    </div>

                    <div className="editor-label">
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <div className="editor-field" id="gender">
                        <input type="radio" name="gender" value="M" checked={formData.gender === 'M'} onChange={handleChange} id="Gender_Male" />
                        <label className="editor-field" htmlFor="Gender_Male">мужской</label>
                        <input type="radio" name="gender" value="F" checked={formData.gender === 'F'} onChange={handleChange} id="Gender_Female" />
                        <label className="editor-field" htmlFor="Gender_Female">женский</label>
                        {errors.gender && <div>{errors.gender}</div>}
                    </div>

                    <div className="editor-label">
                        <label htmlFor="monthOfBirth">Month of Birth</label>
                    </div>
                    <div className="editor-field" id="month">
                        <select name="monthOfBirth" value={formData.monthOfBirth} onChange={handleChange} style={{ width: '300px' }}>
                            <option value="-1">Выберите месяц вашего рождения...</option>
                            <option value="1">январь</option>
                            <option value="2">февраль</option>
                            <option value="3">март</option>
                            <option value="4">апрель</option>
                            <option value="5">май</option>
                            <option value="6">июнь</option>
                            <option value="7">июль</option>
                            <option value="8">август</option>
                            <option value="9">сентябрь</option>
                            <option value="10">октябрь</option>
                            <option value="11">ноябрь</option>
                            <option value="12">декабрь</option>
                        </select>
                        {errors.monthOfBirth && <div>{errors.monthOfBirth}</div>}
                    </div>

                    <div id="all-job">
                        <div className="editor-field" id="job">
                            <select name="jobFunction" value={formData.jobFunction} onChange={handleChange} style={{ width: '300px' }}>
                                {/* Add your options here */}
                            </select>
                            {errors.jobFunction && <div>{errors.jobFunction}</div>}
                        </div>
                    </div>

                    <div id="all-business">
                        <div className="editor-field" id="biz">
                            <select name="business" value={formData.business} onChange={handleChange} style={{ width: '300px' }}>
                                {/* Add your options here */}
                            </select>
                            {errors.business && <div>{errors.business}</div>}
                        </div>
                    </div>

                    <div className="editor-label">
                        <label htmlFor="mobilePhone">Mobile Phone</label>
                    </div>
                    <div className="editor-field" id="mobile">
                        <input type="text" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} />
                        {errors.mobilePhone && <div>{errors.mobilePhone}</div>}
                    </div>

                    <div className="editor-label">
                        <label htmlFor="isTextMessageOn">Receive Text Messages</label>
                    </div>
                    <div className="editor-field">
                        <input type="checkbox" name="isTextMessageOn" checked={formData.isTextMessageOn} onChange={handleChange} />
                        {errors.isTextMessageOn && <div>{errors.isTextMessageOn}</div>}
                    </div>

                    <div className="editor-label">
                        <label htmlFor="company">Company</label>
                    </div>
                    <div className="editor-field">
                        <input type="text" name="company" value={formData.company} onChange={handleChange} style={{ width: '300px' }} />
                        {errors.company && <div>{errors.company}</div>}
                    </div>

                    <div id="mail">
                        <div id="postal-address">
                            <div className="editor-label">
                                <label htmlFor="businessPhone">Business Phone</label>
                            </div>
                            <div className="editor-field" id="biz-phone">
                                <input type="text" name="businessPhone" value={formData.businessPhone} onChange={handleChange} style={{ width: '300px' }} />
                                {errors.businessPhone && <div>{errors.businessPhone}</div>}
                            </div>

                            <div className="editor-field" id="address-1">
                                <span id="street-type">
                                    <select name="streetType" value={formData.streetType} onChange={handleChange} style={{ width: '100px' }}>
                                        <option value="-1">Тип улицы...</option>
                                        <option value="1">улица</option>
                                        <option value="2">проспект</option>
                                        <option value="3">бульвар</option>
                                        <option value="4">переулок</option>
                                        <option value="5">площадь</option>
                                        <option value="6">проезд</option>
                                        <option value="7">дорога</option>
                                        <option value="8">шоссе</option>
                                        <option value="9">проулок</option>
                                        <option value="10">спуск</option>
                                    </select>
                                    {errors.streetType && <div>{errors.streetType}</div>}
                                </span>
                                <span className="editor-field" id="address">
                                    <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} style={{ width: '195px' }} placeholder="Название улицы..." />
                                    {errors.streetName && <div>{errors.streetName}</div>}
                                </span>
                                <span className="editor-field" id="house-number">
                                    <input type="text" name="houseNumber" value={formData.houseNumber} onChange={handleChange} style={{ width: '60px' }} placeholder="№ дома..." />
                                    {errors.houseNumber && <div>{errors.houseNumber}</div>}
                                </span>
                                <span id="ap-type">
                                    <select name="apartmentType" value={formData.apartmentType} onChange={handleChange} style={{ width: '150px' }}>
                                        <option value="-1">Помещение (оф/кв)...</option>
                                        <option value="1">офис</option>
                                        <option value="2">квартира</option>
                                        <option value="3">комната</option>
                                        <option value="100">все здание</option>
                                    </select>
                                    {errors.apartmentType && <div>{errors.apartmentType}</div>}
                                </span>
                                <span className="editor-field" id="apartment-number">
                                    <input type="text" name="apartmentNumber" value={formData.apartmentNumber} onChange={handleChange} style={{ width: '60px' }} placeholder="№ офиса..." />
                                    {errors.apartmentNumber && <div>{errors.apartmentNumber}</div>}
                                </span>
                            </div>

                            <div className="editor-label">
                                <label htmlFor="address2">Address 2</label>
                            </div>
                            <div className="editor-field">
                                <input type="text" name="address2" value={formData.address2} onChange={handleChange} style={{ width: '300px' }} />
                                {errors.address2 && <div>{errors.address2}</div>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Form;
