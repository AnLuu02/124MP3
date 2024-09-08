import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useCallback, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useFetch from "../../Custom hooks/useFetch";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import { setListSong } from "../../components/store/listSongReducer";
import { playSong } from "../../components/store/songReducer";
import styles from "./BXH.module.scss";

const cx = classNames.bind(styles);
function BXH() {
    const [songBXH, setSongBXH] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
    const dispatch = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    const { get, loading } = useFetch(import.meta.env.VITE_API_BASE_URL);

    useLayoutEffect(() => {
        get("musics?limit=12")
            .then((data) => {
                setSongBXH(data);
                dispatch(setListSong(data));
            })
            .catch((error) => console.log("Could not load products", error));
    }, []);


    const handleRandomSong = useCallback(() => {
        const randomSong = Math.floor(Math.random() * listSong.length);
        dispatch(playSong({ song: listSong[randomSong], indexSong: randomSong }));
    }, [listSong, dispatch])

    return (<>
        <div className={cx("bxh")} id={cx("bxh")}>
            <h1 onCopy={e => e.preventDefault()} className={cx("header")}>
                BXH Nhạc Mới
                <FontAwesomeIcon icon={faPlay} id={cx("randomSong")} onClick={handleRandomSong} />
            </h1>
            <div className={cx("header", "mobile")}>
                <h2>Nhạc mới phát hành</h2>
                <div className={cx("btn")}>
                    <FontAwesomeIcon icon={faPlay} onClick={handleRandomSong} />
                    <NavLink to={`/album`}>
                        <button className={cx("btnLogin")}>Phát tất cả</button>
                    </NavLink>
                </div>

            </div>
            <div className={cx("listSong")}>
                <ul className={cx("music")}>
                    {
                        Array.isArray(songBXH) && songBXH?.map((song, index) => {
                            return <SongOptions key={song.id} songId={song.id} indexSong={index} dataSong={song} isRank={true} loading={loading} />
                        })
                    }
                </ul>

            </div>
        </div>
    </>);
}

export default BXH;