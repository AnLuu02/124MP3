import { faDiscord, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCirclePlay, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight, faCode, faLink, faPlus, faShare, faTowerBroadcast, faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import PropTypes from 'prop-types';
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import create_playlist_SVG from '../../../assets/images/create_playlist_SVG.svg';
import add_playlist from "../../../assets/images/SVG/playlist_add.svg";
import { notifyError, notifySuccess, notifyWarning } from "../../../utils/toastifyMessage";
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
    function MenuSongOptions({ children, valueMenu, placement = "auto-end" }, ref) {
        const [inputValue, setInputValue] = useState("");
        const [playlists, setPlaylists] = useState([]);
        const [playlistsConst, setPlaylistsConst] = useState([]);

        const [loading, setLoading] = useState(true);
        const [error, serError] = useState(null);
        const dispatch = useDispatch();
        const user = useSelector(state => state.user.user);


        const getAllPlaylist = async () => {
            console.log("Callll");

            if (user?.uid) {
                const q = query(collection(db, 'playlistCollection'), where('userId', '==', user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    const documents = [];
                    querySnapshot.forEach((doc) => {
                        documents.push({ id: doc.id, ...doc.data() });
                    });
                    setPlaylists(documents);
                    setPlaylistsConst(documents);
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


        // const handleAddSongToPlaylist = async (docId, dataSong) => {
        //     try {
        //         const docRef = doc(db, 'playlistCollection', docId);
        //         // Cập nhật tài liệu bằng cách thêm trường mới
        //         await updateDoc(docRef, {
        //             Song: arrayUnion({
        //                 ...dataSong
        //             })
        //         });
        //         notifySuccess({ message: "Thêm bài hát thành công!" });

        //     } catch (error) {
        //         console.error('Error adding/updating field: ', error);
        //         notifyError({ message: "Đã có lỗi xảy ra!" });
        //     }
        // };

        const handleAddSongToPlaylist = async (e, docId, dataSong) => {
            const targetElement = e.target;

            targetElement.style.pointerEvents = "none";

            setTimeout(() => {
                targetElement.style.pointerEvents = "auto";
            }, 1500);
            try {
                const docRef = doc(db, 'playlistCollection', docId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const playlistData = docSnap.data();
                    const existingSongs = playlistData.Song || [];

                    const songExists = existingSongs.some(song => song.id === dataSong.id);

                    if (songExists) {
                        notifyWarning({ message: "Bài hát đã tồn tại trong playlist!" });
                    } else {
                        await updateDoc(docRef, {
                            Song: arrayUnion(dataSong)
                        });
                        notifySuccess({ message: "Thêm bài hát thành công!" });
                    }
                } else {
                    notifyError({ message: "Playlist không tồn tại!" });
                }
            } catch (error) {
                console.error('Error adding/updating field: ', error);
                notifyError({ message: "Đã có lỗi xảy ra!" });
            }
        };
        const handleGetPlaylist = () => {
            getAllPlaylist();

        }
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
        useEffect(() => {
            setPlaylists(playlistsConst.filter(item => item.namePlaylist.includes(inputValue)))
        }, [inputValue])
        const renderAddPlaylist = (attrs) => (
            <div className={cx('menu-list', 'customAddPlaylist')} tabIndex="-1" {...attrs}>
                <div className={cx('wrapper', 'menu-popper')}>
                    <div className={cx("searchBox")}>
                        <input type="text" placeholder="Tìm playlist" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <div className={cx("menu")}>
                        <div className={cx("menu-item", "createPlaylist")} onClick={onShow}>
                            <div className={cx("icon")}>
                                <img src={create_playlist_SVG} />
                            </div>
                            <span>Tạo playlist mới</span>
                        </div>
                        <ul className={cx("listPlaylist")}>
                            {loading
                                ?
                                <div className={cx("loadingText")}>Loading...</div>
                                :
                                Array.isArray(playlists) && playlists.length > 0
                                    ?
                                    playlists.map((item, index) => (
                                        <li key={index} className={cx("itemPlaylist")} onClick={(e) => handleAddSongToPlaylist(e, item.id, valueMenu)}>
                                            <div className={cx("icon")}>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    height="24px"
                                                    viewBox="0 -960 960 960"
                                                    width="24px"
                                                    fill="#e8eaed">
                                                    <path d="M400-240q50 0 85-35t35-85v-280h120v-80H460v256q-14-8-29-12t-31-4q-50 0-85 35t-35 85q0 50 35 85t85 35Zm80 160q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                                </svg>
                                            </div>
                                            <div className={cx("title")}>{item?.namePlaylist}</div>
                                            <img src={add_playlist} />
                                        </li>
                                    ))
                                    :
                                    <div className={cx("loadingText")}>Danh sách rỗng</div>
                            }
                        </ul>

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
                            onShow={handleGetPlaylist}
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
                placement={placement}
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
    children: PropTypes.node,
    items: PropTypes.array,
    hideOnClick: PropTypes.bool,
    valueMenu: PropTypes.object,
    placement: PropTypes.string
};

export default MenuSongOptions;
