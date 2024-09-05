import { faAngleRight, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { db } from "../../components/FireBase/firebaseConfig";
import LoadingText from "../../components/Loader1/LoadingText";
import { handleShowModal } from "../../components/store/ModalReducer/modalReducer";
import styles from "./Library.module.scss";
import PlaylistItem from "./pages/Playlist/AlbumItem/PlaylistItem";
const cx = classNames.bind(styles);

function Library() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const onShowModal = () => {
        dispatch(handleShowModal("CREATE_PLAYLIST"));
    }
    const location = useLocation();
    if (location.pathname.includes("/history")
        || location.pathname.includes("/playlist")) {
        return <Outlet />
    }
    function formatPathname() {
        if (location.pathname.endsWith("/")) {
            return location.pathname.slice(0, -1);
        }
        return location.pathname;
    }


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
                    setError(e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        getAllPlaylist();
    });

    return (<>
        <div className={cx("library")}>
            <h1 className={cx("headerLibraryH1")}>
                THƯ VIỆN
                <FontAwesomeIcon className={cx("iconLibrary")} icon={faPlay} />
            </h1>
            {/* <ul className={cx("music", "artistLibraryCared")}>
            </ul> */}
            <ul className={cx("navCountry")}>
                <h2 className={cx("headerLibraryH2")}>
                    <div>PLAYLIST</div>
                    <Tippy allowHTML content={<div style={{ fontSize: 10 }}>Tạo playlist mới</div>} arrow={true} >
                        <div className={cx("boxIconLibrary")} onClick={onShowModal}>
                            <FontAwesomeIcon className={cx("iconLibrary")} icon={faPlus} />
                        </div>
                    </Tippy>
                </h2>
                <li className={cx("showAll")} >
                    <NavLink to="/library/playlist" >
                        Tất cả
                        <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: "5px" }} />
                    </NavLink>

                </li>
            </ul>
            <ul className={cx("listPlaylist")}>
                {
                    loading ? <LoadingText /> : error ? <div>Error: {error.message}<LoadingText /></div>
                        : playlists.map((playlist) => {
                            return <PlaylistItem key={playlist.id} playlist={playlist} />
                        })}
            </ul>
            <ul className={cx("navLibrary")}>
                <NavLink to={location.pathname.includes("song") ? location.pathname : "song"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/song') || formatPathname(location.pathname).endsWith('/library') })}>BÀI HÁT</NavLink>
                <NavLink to={location.pathname.includes("album") ? location.pathname : "album"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/album') })} >ALBUM</NavLink>
                <NavLink to={location.pathname.includes("mv") ? location.pathname : "mv"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/mv') })}>MV</NavLink>
                <hr className={cx("line")}></hr>

            </ul>
            <Outlet />
        </div >

    </>
    );
}

export default Library;