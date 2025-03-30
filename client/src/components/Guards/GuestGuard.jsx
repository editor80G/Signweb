
import { Navigate, Outlet } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useAuthStatus } from '../../hooks/useAuthStatus';

const GuestGuard = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const { loading } = useAuthStatus();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default GuestGuard;