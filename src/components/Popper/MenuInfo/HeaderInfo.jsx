import { faFacebook, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import default_avatar from '../../../../public/images/default_avatar.png';
import SignInwithGoogle from '../../FireBase/signInWIthGoogle';
import styles from './MenuInfo.module.scss';
const cx = classNames.bind(styles);
const subMenuHeaderItemData = [
    {
        leftIcon: faGoogle,
        title: "Sign in with Google",
    },
    {
        leftIcon: faFacebook,
        title: "Sign in with Facebook",

    },
    {
        leftIcon: faPhone,
        title: "Sign in with Phone",

    },
    {
        leftIcon: faTwitter,
        title: "Sign in with Twitter",

    },

]
function HeaderInfo({ isLogin }) {
    const user = useSelector(state => state.user.user);

    return (
        <header className={cx('header')}>
            <div className={cx("menu")}>
                {isLogin
                    ?
                    <div>
                        <div className={cx("user")}>
                            <div className={cx("avatar")}>
                                <img src={user?.photoURL || default_avatar} />
                            </div>
                            <div className={cx("info")}>
                                <div className={cx("name")}>
                                    <div>{user.displayName ?? "Admin"}</div>
                                    <div className={cx("package")}>Basic</div>
                                </div>
                                <div className={cx("email")}>{user.email ?? "pWk6S@example.com"}</div>
                            </div>
                        </div>
                        <button className={cx("btn-upgrade")}>Nâng cấp tài khoản</button>
                    </div>
                    :
                    <div className={cx("not-login")}>
                        <SignInwithGoogle>
                            <div className={cx("login")}>
                                <FontAwesomeIcon icon={faGoogle} />
                                <div>Đăng nhập với Google</div>
                            </div>
                        </SignInwithGoogle>
                    </div>

                }
            </div>
        </header >
    );
}

HeaderInfo.propTypes = {
    isLogin: PropTypes.bool
};

export default HeaderInfo;
