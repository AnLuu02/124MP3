import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import Required from '../../Popper/Required/Required';
import ProtectedNavLink from '../ProtectedNavLink/ProtectedNavLink';
import styles from './NavItem.module.scss';
const cx = classNames.bind(styles);
function NavItem({ isAuth = false, to, title, iconSvg = null, iconFontAwesome = null, className, onClick }) {
    const location = useLocation();
    const isLoggedIn = useSelector(state => state.user.isLogin);
    const icon = (iconSvg) ? iconSvg : iconFontAwesome;
    const ProtectedNavLinkComponent = isAuth ? ProtectedNavLink : NavLink
    const song = useSelector(state => state.song.song);

    const isShowSidebar = useSelector(state => state.mobile.isShowSidebar);
    function RequiredComponent({ children }) {
        if (isAuth) {
            return <Required
                placement="auto"
                valueMenu={true}
                title={"Yêu cầu đăng nhập"}
                isLoggedIn={isLoggedIn}
            >
                {children}
            </Required>
        }
        return <Fragment>{children}</Fragment>
    }

    const handleActiveNav = () => {
        return location.pathname === to || (to != "/" && location.pathname.startsWith(to))
    }

    return (
        <RequiredComponent>
            <li className={cx("navItem", className, { "active": song.name ? true : false }, isShowSidebar ? "showFullSidebar" : "")} onClick={onClick}>
                <ProtectedNavLinkComponent to={to} className={cx("nav_item", { "active": handleActiveNav() })}>
                    {icon}
                    <div className={cx("title")}> {title}</div>
                </ProtectedNavLinkComponent>
            </li>
        </RequiredComponent>
    );
}

NavItem.propTypes = {
    isAuth: PropTypes.bool,
    className: PropTypes.object,
    to: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    iconSvg: PropTypes.node,
    iconFontAwesome: PropTypes.node,
    onClick: PropTypes.func,
    children: PropTypes.node
};

NavItem.defaultProps = {
    isAuth: false,
    iconSvg: null,
    iconFontAwesome: null,
    className: null,
    onClick: () => { },
};

export default NavItem