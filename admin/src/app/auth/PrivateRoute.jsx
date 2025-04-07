import { Navigate } from 'react-router-dom';
import useAuth from "app/hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Navigate to="/admin" /> : children; 
};

export default PrivateRoute;