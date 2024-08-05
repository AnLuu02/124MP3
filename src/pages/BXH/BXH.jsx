import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../Custom hooks/useFetch";
import SongFull from "../../components/SongFull/SongFull";
import { setListSong } from "../../components/store/listSongReducer";
import { playSong } from "../../components/store/songReducer";
import styles from "./BXH.module.scss";

const cx = classNames.bind(styles);
function BXH() {
    const dispath = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    const { get } = useFetch(
        "http://localhost:8080/API_Servlet/api/"
    );

    useEffect(() => {
        get("music/discover")
            .then((data) => {
                dispath(setListSong(data));
            })
            .catch((error) => console.log("Could not load products", error));
    }, []);


    const handleRandomSong = () => {
        const randomSong = Math.floor(Math.random() * listSong.length);
        dispath(playSong({ song: listSong[randomSong], indexSong: randomSong }));
    }

    return (<>
        <div className={cx("bxh")} id={cx("bxh")}>
            <h1 className={cx("header")}>
                BXH Nhạc Mới
                <FontAwesomeIcon icon={faPlay} id={cx("randomSong")} onClick={handleRandomSong} />
            </h1>
            <div className={cx("listSong")}>
                <ul className={cx("music")}>
                    {listSong.length <= 0
                        ?
                        <li>Không có bài hát nào</li>
                        :
                        listSong.map((song, index) => {
                            return <SongFull key={song.id} songId={song.id} indexSong={index} dataSong={song} />
                        })
                    }
                </ul>
            </div>
        </div>
    </>);
}

export default BXH;