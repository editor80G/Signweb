import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthStatus } from '../../hooks/useAuthStatus';

const AuthGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { loading } = useAuthStatus();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/register" replace />;
    }

    return <Outlet />;
};

export default AuthGuard;

