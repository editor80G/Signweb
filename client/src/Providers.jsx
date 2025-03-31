// import React, { useState } from 'react';
// //import React from 'react';
// import { AuthProvider } from './context/AuthProvider';
// import { LanguageContext } from './context/LanguageContext';
// import { LanguageProvider } from './context/LanguageProvider';

// const Providers = ({ children }) => {
//     const [language, setLanguage] = useState('en');
//     return (
//         <AuthProvider>
//             <LanguageContext.Provider value={{ language, setLanguage }}>
//                 {/* <LanguageProvider> */}
//                 {children}
//                 {/* </LanguageProvider> */}
//             </LanguageContext.Provider>
//         </AuthProvider>
//     );
// };
// // Simple logic of LanguageContext is implemented in Providers.jsx
// // The logic of AuthContext is implemented in AuthProvider.jsx 
// export default Providers;


import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { LanguageProvider } from './context/LanguageProvider';

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </AuthProvider>
    );
};

export default Providers;