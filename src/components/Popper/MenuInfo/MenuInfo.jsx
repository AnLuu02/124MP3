import { faArrowRightToBracket, faArrowUpFromBracket, faBan } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import stylesSong from "../../Song/Song.module.scss";
import stylesSongFull from "../../SongFull/SongFull.module.scss";
import { logout } from '../../store/userReducer';
import HeaderInfo from "./HeaderInfo";
import styles from './MenuInfo.module.scss';
import MenuItemInfo from './MenuItemInfo';

const cx = classNames.bind(styles);
const cxSongFull = classNames.bind(stylesSongFull);
const cxSong = classNames.bind(stylesSong);
function MenuInfo({ children }, ref) {
    const isLogin = useSelector(state => state.user.isLogin);
    const user = useSelector(state => state.user.user);
    useEffect(() => {
        console.log("User: ", user)
    })
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <HeaderInfo isLogin={isLogin} />
                <div className={cx('menu-body', "not-login")}>
                    <h3 className={cx('title')}>{!isLogin ? "Đăng ký gói" : "Nâng cấp gói"}</h3>
                    <div className={cx('menu-item', 'plus')}>
                        <div className={cx('card-header')}>
                            <h3>124Mp3</h3>
                            <div >PLUS</div>
                        </div>
                        <h4 className={cx('price')}>Chỉ từ 13.000đ/tháng</h4>
                        <p className={cx('desc')}>Nghe nhạc với chất lượng cao nhất, không quảng cáo</p>
                        <button>Tìm hiểu thêm</button>
                    </div>
                    <div className={cx('menu-item', "premium")}>
                        <div className={cx('card-header')}>
                            <h3>124Mp3</h3>
                            <div >PREMIUM</div>
                        </div>
                        <h4 className={cx('price')}>Chỉ từ 13.000đ/tháng</h4>
                        <p className={cx('desc')}>Nghe nhạc với chất lượng cao nhất, không quảng cáo</p>
                        <button>Tìm hiểu thêm</button>
                    </div>
                </div>
                {isLogin && <div className={cx("menu")}>
                    <hr />
                    <MenuItemInfo className={cx("menu-item-custom")} data={{ leftIcon: faBan, title: "Danh sách chặn" }} />
                    <MenuItemInfo className={cx("menu-item-custom")} data={{ leftIcon: faArrowUpFromBracket, title: "Tải lên" }} />
                    <hr />
                    <MenuItemInfo
                        className={cx("menu-item-custom")}
                        data={{ leftIcon: faArrowRightToBracket, title: "Đăng xuất" }}

                        onClick={logout()}

                    />
                </div>}
            </div>
        </div>
    );


    return (
        <Tippy
            interactive
            delay={[0, 100]}
            placement='bottom-start'
            render={renderResult}
            trigger="click"
            zIndex={105}
            onShow={() => {
                if (Array.isArray(ref)) {
                    ref.filter((item) => {
                        if (item?.current) {
                            item?.current?.classList?.add(cxSongFull("showMenu"));
                            item?.current?.classList?.add(cxSong("showMenu"));
                        }
                    })
                }

            }}
            onHide={() => {
                if (Array.isArray(ref)) {
                    ref.filter((item) => {
                        if (item?.current) {
                            if (item?.current?.classList?.contains(cxSongFull("showMenu"))) {
                                item?.current?.classList?.remove(cxSongFull("showMenu"));
                            }
                            if (item?.current?.classList?.contains(cxSong("showMenu"))) {
                                item?.current?.classList?.remove(cxSong("showMenu"));
                            }
                        }
                    })
                }
            }}
        >
            {children}
        </Tippy>
    );
}

MenuInfo.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    placement: PropTypes.string
};

export default forwardRef(MenuInfo);
