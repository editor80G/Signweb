import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getTranslation } from '../../i18n/getTranslations';
import { useLanguage } from '../../context/LanguageContext';

const Nav = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { language } = useLanguage();
    return (
        <nav>
            <ul>
                <li><Link to="/">{getTranslation('NAV_HOME', language)}</Link></li>
                <li className="dropdown">
                    <span>{getTranslation('NAV_OUR_PUBLICATIONS', language)}</span>
                    <ul className="dropdown-content">
                        <li><Link to="/publications/magazines">{getTranslation('NAV_OUR_PUBLICATIONS_OUTDOOR', language)}</Link></li>
                        <li><Link to="/publications/catalogs">{getTranslation('NAV_OUR_PUBLICATIONS_CATALOG', language)}</Link></li>
                    </ul>
                </li>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/publications/create">{getTranslation('NAV_CREATE_PUBLICATION', language)}</Link></li>
                        <li><Link to="/logout">{getTranslation('NAV_LOGOUT', language)}</Link></li>
                    </>
                ) : (
                    <li><Link to="/auth/register">{getTranslation('NAV_REGISTER_LOGIN', language)}</Link></li>
                )}
            </ul>
        </nav >
    );
};

export default Nav;
