import { string } from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { PropTypes } from 'prop-types';

const ProtectedNavLink = ({ children, to, ...res }) => {
    const isLoggedIn = useSelector(state => state.user.isLogin);

    const handleClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
        }
    };

    return (
        <NavLink to={to} onClick={handleClick} {...res}>
            {children}
        </NavLink>
    );
};

ProtectedNavLink.propTypes = {
    children: PropTypes.node,
    to: string,
    res: PropTypes.object,
};


export default ProtectedNavLink;
