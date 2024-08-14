import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlay, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight, faCirclePlus, faCode, faLink, faShare, faTowerBroadcast, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import create_playlist_SVG from '../../../../public/images/create_playlist_SVG.svg';
import stylesSong from "../../Song/Song.module.scss";
import stylesSongFull from "../../SongFull/SongFull.module.scss";
import { handleShowModal } from "../../store/ModalReducer/modalReducer";
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from "./MenuItem";
const cx = classNames.bind(styles);
const cxSongFull = classNames.bind(stylesSongFull);
const cxSong = classNames.bind(stylesSong);

const subMenuItemData = [
    {
        leftIcon: faFacebook,
        title: "Facebook"
    }, {
        leftIcon: faDiscord,
        title: "Discord"
    }, {
        leftIcon: faCode,
        title: "Mã nhúng"
    }
]
const MenuItemData = [
    {
        leftIcon: faHeart,
        title: "Thêm vào thư viện"
    },
    {
        leftIcon: faCirclePlay,
        title: "Thêm vào danh sách phát"
    },
    {
        leftIcon: faWaveSquare,
        title: "Phát tiếp theo"
    },
    {
        leftIcon: faTowerBroadcast,
        title: "Phát nội dung tương tự"
    },
    {
        leftIcon: faCirclePlus,
        title: "Thêm vào Playlist",
        rightIcon: faAngleRight
    },
    {
        leftIcon: faLink,
        title: "Sao chép link"
    }
]
function Menu({ children, valueMenu }, ref) {
    const dispatch = useDispatch();
    const onShow = () => {
        dispatch(handleShowModal("CREATE_PLAYLIST"));

    }
    const renderShare = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <div className={cx("menu")}>
                    {subMenuItemData.map((item, index) => (
                        <MenuItem key={index} data={item} />
                    ))}

                </div>

            </div>
        </div>
    );

    const renderAddPlaylist = (attrs) => (
        <div className={cx('menu-list', 'customAddPlaylist')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <div className={cx("searchBox")}>
                    <input type="text" placeholder="Tìm playlist" />
                </div>
                <div className={cx("menu")}>
                    <div className={cx("menu-item", "createPlaylist")} onClick={onShow}>
                        {/* <FontAwesomeIcon className={cx("icon")} icon={faPlus} /> */}
                        <div className={cx("icon")}>
                            <img src={create_playlist_SVG} />
                        </div>
                        <span>Tạo playlist mới</span>

                    </div>
                    {subMenuItemData.map((item, index) => (
                        <MenuItem key={index} data={item} />
                    ))}

                </div>

            </div>
        </div >
    );
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <Header valueMenu={valueMenu} />
                <div className={cx("menu")}>
                    {MenuItemData.map((item, index) => (
                        <MenuItem key={index} data={item} />
                    ))}
                    <Tippy
                        interactive
                        delay={[0, 100]}
                        placement="left-end"
                        render={renderAddPlaylist}
                        offset={[0, -10]}
                    >
                        <div className={cx("menu-item")}>
                            <FontAwesomeIcon className={cx("icon")} icon={faCirclePlus} />
                            <span>Thêm vào playlist</span>
                            <FontAwesomeIcon className={cx("icon", "icon_sub_menu")} icon={faAngleRight} />

                        </div>
                    </Tippy>
                    <Tippy
                        interactive
                        delay={[0, 100]}
                        placement="right-end"
                        render={renderShare}
                        offset={[0, -10]}
                    >
                        <div className={cx("menu-item")}>
                            <FontAwesomeIcon className={cx("icon")} icon={faShare} />
                            <span>Chia sẻ</span>
                            <FontAwesomeIcon className={cx("icon", "icon_sub_menu")} icon={faAngleRight} />

                        </div>
                    </Tippy>
                </div>
                <div className={cx("copyright")}>
                    Cung cấp bởi 124Mp3 Media
                </div>
            </div>
        </div>
    );


    return (<>

        <Tippy
            interactive
            delay={[0, 100]}
            placement='auto-end'
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

    </>
    );
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    valueMenu: PropTypes.object,
    placement: PropTypes.string
};

export default forwardRef(Menu);
