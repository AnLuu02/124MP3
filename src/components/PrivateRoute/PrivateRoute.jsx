// components/PrivateRoute.js
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { notifyError } from '../../utils/toastifyMessage';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(state => state.user.isLogin);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const hasNotified = useRef(false);
    const prevPathname = useRef(pathname);

    useEffect(() => {
        if (!isLoggedIn && pathname.includes('/library')) {
            if (!hasNotified.current) {
                hasNotified.current = true;
                notifyError({
                    message: "Bạn cần đăng nhập để xem trang này"
                });
                navigate('/');
            }
        } else {
            hasNotified.current = false;
        }

        prevPathname.current = pathname;
    }, [isLoggedIn, pathname, navigate]);

    return !isLoggedIn && pathname.includes('/library') ? null : children;
};

export default PrivateRoute;
