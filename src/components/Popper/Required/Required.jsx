import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import SignInwithGoogle from '../../FireBase/signInWIthGoogle';
import styles from './Required.module.scss';

const cx = classNames.bind(styles);


function Required({ children, title, placement = "right-start", isLoggedIn }) {

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <header className={cx('header')}>
                    <h5 className={cx('header-title')}>{title}</h5>
                </header>
                <p className={cx("desc")}>Đăng nhập để tiếp tục</p>
                <div className={cx("menu")}>
                    <SignInwithGoogle>
                        <Button variant="contained" style={{ marginLeft: 10 }}>Đăng nhập</Button>
                    </SignInwithGoogle>
                </div>
            </div>
        </div>
    );


    return (
        isLoggedIn
            ?
            <>{children}</>
            :
            <Tippy
                interactive
                delay={[0, 100]}
                offset={[-50, 10]}
                placement={placement}
                render={renderResult}
                trigger="click"
                zIndex={500}
            >
                {children}
            </Tippy>
    );
}

Required.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    placement: PropTypes.string,
    isLoggedIn: PropTypes.bool
};

export default Required;
