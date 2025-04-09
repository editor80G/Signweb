// import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const RoleGuard = ({ allowedRoles }) => {
//     const { authState } = useContext(AuthContext);

//     if (authState.loading) {
//         return <div>Loading...</div>;
//     }

//     if (!authState.isAuthenticated || !allowedRoles.includes(authState.userRole)) {
//         return <Navigate to="/access-denied" replace />;
//     }

//     return <Outlet />;
// };

// export default RoleGuard;

import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RoleGuard = ({ allowedRoles }) => {
    const { authState } = useContext(AuthContext);

    if (authState.loading) {
        return <div>Loading...</div>;
    }

    // Проверяем, есть ли пересечение между ролями пользователя и разрешёнными ролями
    const hasAccess = Array.isArray(authState.userRole) &&
        authState.userRole.some(role => allowedRoles.includes(role));

    if (!authState.isAuthenticated || !hasAccess) {
        return <Navigate to="/access-denied" replace />;
    }

    return <Outlet />;
};

export default RoleGuard;