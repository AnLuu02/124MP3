import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlay, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight, faCode, faLink, faPlus, faShare, faTowerBroadcast, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { collection, getDocs, query, where } from "firebase/firestore";
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import create_playlist_SVG from '../../../../public/images/create_playlist_SVG.svg';
import { db } from "../../FireBase/firebaseConfig";
import stylesSong from "../../SongItem/Song/Song.module.scss";
import stylesSongOptions from "../../SongItem/SongOptions/SongOptions.module.scss";
import { handleShowModal } from "../../store/ModalReducer/modalReducer";
import HeaderMenuSongOptions from './HeaderMenuSongOptions';
import styles from './MenuSongOptions.module.scss';
import MenuSongOptionsItem from "./MenuSongOptionsItem";
const cx = classNames.bind(styles);
const cxSongOptions = classNames.bind(stylesSongOptions);
const cxSong = classNames.bind(stylesSong);

const subMenuSongOptionsItemData = [
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
const MenuSongOptionsItemData = [
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
        leftIcon: faLink,
        title: "Sao chép link"
    }
]
const MenuSongOptions = forwardRef(
    function MenuSongOptions({ children, valueMenu }, ref) {
        const [show, setShow] = useState(false);
        const [playlists, setPlaylists] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, serError] = useState(null);
        const dispatch = useDispatch();
        const user = useSelector(state => state.user.user);

        useEffect(() => {
            const getAllPlaylist = async () => {
                if (user?.uid) {
                    const q = query(collection(db, 'playlistCollection'), where('userId', '==', user.uid));
                    try {
                        const querySnapshot = await getDocs(q);
                        const documents = [];
                        querySnapshot.forEach((doc) => {
                            documents.push({ id: doc.id, ...doc.data() });
                        });
                        setPlaylists(documents);
                    } catch (e) {
                        console.error('Error getting documents:', e);
                        serError(e);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
            };

            getAllPlaylist();
        });
        const onShow = () => {
            dispatch(handleShowModal("CREATE_PLAYLIST"));

        }

        const renderShare = (attrs) => (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <div className={cx('wrapper', 'menu-popper')}>
                    <div className={cx("menu")}>
                        {subMenuSongOptionsItemData.map((item, index) => (
                            <MenuSongOptionsItem key={index} data={item} />
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
                        {subMenuSongOptionsItemData.map((item, index) => (
                            <MenuSongOptionsItem key={index} item={item} dataSong={valueMenu} />
                        ))}

                    </div>

                </div>
            </div >
        );
        const renderResult = (attrs) => (
            <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                <div className={cx('wrapper', 'menu-popper')}>
                    <HeaderMenuSongOptions valueMenu={valueMenu} />
                    <div className={cx("menu")}>
                        {MenuSongOptionsItemData.map((item, index) => (
                            <MenuSongOptionsItem key={index} item={item} dataSong={valueMenu} />
                        ))}
                        <Tippy
                            interactive
                            delay={[0, 100]}
                            placement="left-end"
                            render={renderAddPlaylist}
                            offset={[0, -10]}
                            hideOnClick={false}
                        >
                            <div className={cx("menu-item")}>
                                <FontAwesomeIcon className={cx("icon")} icon={faPlus} />
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
                interactive={true}
                delay={[0, 100]}
                placement='auto-end'
                render={renderResult}
                trigger="click"
                zIndex={105}
                onShow={() => {
                    if (Array.isArray(ref)) {
                        ref.filter((item) => {
                            if (item?.current) {
                                item?.current?.classList?.add(cxSongOptions("showMenu"));
                                item?.current?.classList?.add(cxSong("showMenu"));
                            }
                        })
                    }

                }}
                onHide={() => {
                    if (Array.isArray(ref)) {
                        ref.filter((item) => {
                            if (item?.current) {
                                if (item?.current?.classList?.contains(cxSongOptions("showMenu"))) {
                                    item?.current?.classList?.remove(cxSongOptions("showMenu"));
                                }
                                if (item?.current?.classList?.contains(cxSong("showMenu"))) {
                                    item?.current?.classList?.remove(cxSong("showMenu"));
                                }
                            }
                        })
                    }
                }
                }
            >
                {children}
            </Tippy >
        </>
        );
    }
)

MenuSongOptions.propTypes = {
    children: PropTypes.node.isRequired,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    valueMenu: PropTypes.object,
    placement: PropTypes.string
};

export default MenuSongOptions;
