import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import magazinesImage from '../assets/images/sign-magazines.jpg';
import '../App.css';
// Предполагается, что стили вынесены в отдельный файл
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Registration from './Registration';


const Home = () => {

    const { isAuthenticated, handleAuthChange } = useContext(AuthContext);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('http://localhost:3000/auth/status', { withCredentials: true });
            handleAuthChange(response.data.isAuthenticated);
        } catch (error) {
            console.error('Ошибка проверки статуса аутентификации:', error);
            handleAuthChange(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-intro">

                    <div className="home-left">
                        <h2 className="home-title">
                            Журнал НАРУЖКА (Украина) поможет ориентироваться в технологиях и материалах для наружной рекламы, найти надежных партнеров!
                        </h2>
                        <h3 className="home-subtitle">Оформите БЕСПЛАТНУЮ подписку сейчас!</h3>
                        <p>
                            Журнал НАРУЖКА рассчитан на изготовителей визуальной рекламы, продавцов материалов и оборудования для рекламы, заказчиков наружной рекламы.
                            Это компетентный источник информации для всех представителей индустрии визуальной рекламы.
                            Это информация о новых материалах для производства вывесок, оборудовании для широкоформатной печати.
                            В каждом номере публикуются идеи по рекламному оформлению, новости о реализованных проектах, список поставщиков услуг, материалов и оборудования.
                        </p>
                        <p>Постоянные разделы номера:</p>
                        <ul>
                            <li>События индустрии</li>
                            <li>Фотогалерея реализованных проектов</li>
                            <li>Светотехника</li>
                            <li>Материалы и оборудование для рекламы</li>
                        </ul>
                        <p>...и многое другое!</p>
                        <p>
                            Для Украины существует подписка на печатную версию, для других стран подписка только на электронную версию.
                            Подписка на БЕСПЛАТНУЮ печатную версию не гарантирует регулярного получения, номера будут присылаться выборочно на усмотрение редакции.
                        </p>
                    </div>
                    <div className="home-right">
                        <img className="home-image" src={magazinesImage} alt="Magazines" />
                        <div className="home-links">
                            <Link to="/issues" className="home-link">Архив журнала «Наружка»</Link>
                            <Link to="/catalogs" className="home-link">Архив каталога «Реклама и дизайн в Украине»</Link>
                        </div>
                    </div>
                </div>
                <div className="home-outlet">
                    {!isAuthenticated ? <Registration /> : <Outlet />}
                </div>
            </div>
        </div>
    );
};

export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import magazinesImage from '../assets/images/sign-magazines.jpg';

// const Home = () => {
//     return (
//         <>
//             <div className="parent">
//             <div className="parent">

//                 <div className="child" >
//                     <h2 style={{ fontSize: '25px' }}>
//                         Журнал НАРУЖКА (Украина) поможет ориентироваться в технологиях и материалах для наружной рекламы, найти надежных партнеров!
//                     </h2>
//                     <div style={{ float: 'left', width: '300px' }}>
//                         <h3 style={{ fontStyle: 'italic' }}>Оформите БЕСПЛАТНУЮ подписку сейчас!</h3>
//                         <p>
//                             Журнал НАРУЖКА расчитан на изготовителей визуальной рекламы, продавцов материалов и оборудования для рекламы, заказчиков наружной рекламы.
//                             Это компетентный источник информации для всех представителей индустрии визуальной рекламы.
//                             Это информация о новых материалах для производства вывесок, оборудовании для широкоформатной печати.
//                             В каждом номере публикуются идеи по рекламному оформлению, новости о реализованных проектах, список поставщиков услуг, материалов и оборудования.
//                         </p>
//                         <p>Постоянные разделы номера:</p>
//                         <ul>
//                             <li>События индустрии</li>
//                             <li>Фотогалерея реализованных проектов</li>
//                             <li>Светотехника</li>
//                             <li>Материалы и оборудование для рекламы</li>
//                         </ul>
//                         <p>...и многое другое!</p>
//                         <p>
//                             Для Украины существует подписка на печатную версию, для других стран подписка только электронную версию.
//                             Подписка на БЕСПЛАТНУЮ печатную версию не гарантирует регулярного получения, номера будут присылаться выборочно на усмотрение редакции.
//                         </p>
//                     </div>
//                     <div style={{ float: 'right', width: '250px' }}>
//                         <img style={{ float: 'right', width: '250px', position: 'relative' }} src={magazinesImage} alt="Magazines" />
//                         <div style={{ textAlign: 'center' }}>
//                             <Link to="/issues">Архив журнала «Наружка»</Link>
//                         </div>
//                         <div style={{ textAlign: 'center' }}>
//                             <Link to="/catalogs">Архив каталога «Реклама и дизайн в Украине»</Link>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="child">
//                     <Outlet />
//                 </div>
//                 {/* <div className="child">
//                 </div> */}
//             </div>
//         </>
//     );
// };

//export default Home;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import magazinesImage from '../assets/images/sign-magazines.jpg';

// const Home = () => {
//     return (
//         <>
//             <div className="clear"></div>
//             <div id="left-block" style={{ display: 'block', wordWrap: 'break-word' }}>
//                 <h2 style={{ fontSize: '25px' }}>
//                     Журнал НАРУЖКА (Украина) поможет ориентироваться в технологиях и материалах для наружной рекламы, найти надежных партнеров!
//                 </h2>
//                 <div style={{ float: 'left', width: '300px' }}>
//                     <h3 style={{ fontStyle: 'italic' }}>Оформите БЕСПЛАТНУЮ подписку сейчас!</h3>
//                     <p>
//                         Журнал НАРУЖКА расчитан на изготовителей визуальной рекламы, продавцов материалов и оборудования для рекламы, заказчиков наружной рекламы.
//                         Это компетентный источник информации для всех представителей индустрии визуальной рекламы.
//                         Это информация о новых материалах для производства вывесок, оборудовании для широкоформатной печати.
//                         В каждом номере публикуются идеи по рекламному оформлению, новости о реализованных проектах, список поставщиков услуг, материалов и оборудования.
//                         Постоянные разделы номера:
//                         <ul>
//                             <li>События индустрии</li>
//                             <li>Фотогалерея реализованных проектов</li>
//                             <li>Светотехника</li>
//                             <li>Материалы и оборудование для рекламы</li>
//                         </ul>
//                         ...и многое другое!
//                     </p>
//                     <p>
//                         Для Украины существует подписка на печатную версию, для других стран подписка только электронную версию.
//                         Подписка на БЕСПЛАТНУЮ печатную версию не гарантирует регулярного получения, номера будут присылаться выборочно на усмотрение редакции.
//                     </p>
//                 </div>
//                 <div style={{ float: 'right', width: '250px' }}>
//                     <img style={{ float: 'right', width: '250px', position: 'relative' }} src={magazinesImage} alt="Magazines" />
//                     <div style={{ textAlign: 'center' }}>
//                         <Link to="/issues">Архив журнала «Наружка»</Link>
//                     </div>
//                     <div style={{ textAlign: 'center' }}>
//                         <Link to="/catalogs">Архив каталога «Реклама и дизайн в Украине»</Link>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Home;