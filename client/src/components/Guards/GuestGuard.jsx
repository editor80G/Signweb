// import { Navigate, Outlet } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const AuthGuard = ({ children }) => {
//     const { isAuthenticated } = useContext(AuthContext);

//     if (isAuthenticated) {
//         return <Navigate to="/" replace />;
//     }
//     // If children are passed, render them, otherwise use <Outlet /> for nested routes
//     return children ? children : <Outlet />;
// };

// export default AuthGuard;



import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const GuestGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);

    // Если пользователь аутентифицирован, перенаправляем на главную страницу
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Если пользователь не аутентифицирован, рендерим дочерние маршруты
    return <Outlet />;
};

export default GuestGuard;