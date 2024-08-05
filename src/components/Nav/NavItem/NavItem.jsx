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
    const RequiredComponent = isAuth ? Required : Fragment
    const ProtectedNavLinkComponent = isAuth ? ProtectedNavLink : NavLink
    return (
        <RequiredComponent placement="auto" valueMenu={true} title={"Yêu cầu đăng nhập"} isLoggedIn={isLoggedIn}>
            <li className={cx(className)} onClick={onClick}>
                <ProtectedNavLinkComponent to={to} className={cx("nav_item", { "active": location.pathname === to })}>
                    {icon}
                    <div> {title}</div>
                </ProtectedNavLinkComponent>
            </li>
        </RequiredComponent>
    );
}
NavItem.propTypes = {
    isAuth: PropTypes.bool,
    className: PropTypes.string,
    to: PropTypes.string,
    title: PropTypes.string,
    iconSvg: PropTypes.node,
    iconFontAwesome: PropTypes.node,
    onClick: PropTypes.func
}
export default NavItem