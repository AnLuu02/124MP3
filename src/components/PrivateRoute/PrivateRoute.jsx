// components/PrivateRoute.js
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(state => state.user.isLogin);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [])
    return (
        isLoggedIn ? children : null
    );
};

export default PrivateRoute;
