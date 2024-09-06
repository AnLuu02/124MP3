import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useFetch from "../../Custom hooks/useFetch";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import { setListSong } from "../../components/store/listSongReducer";
import { playSong } from "../../components/store/songReducer";
import styles from "./Mp3Chart.module.scss";

const cx = classNames.bind(styles);
function Mp3Chart() {
    const dispatch = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        get("musics?limit=12")
            .then((data) => {
                dispatch(setListSong(data));
            })
            .catch((error) => console.log("Could not load products", error));
    }, []);


    const handleRandomSong = useCallback(() => {
        const randomSong = Math.floor(Math.random() * listSong.length);
        dispatch(playSong({ song: listSong[randomSong], indexSong: randomSong }));
    }, [listSong, dispatch])
    const chartConfig = {
        type: 'bar',
        title: {
            text: 'Biểu Đồ Cột Ví Dụ',
            adjustLayout: true
        },
        subtitle: {
            text: 'Dữ liệu giả định',
            adjustLayout: true
        },
        plot: {
            tooltip: {
                text: '%v'
            }
        },
        scaleX: {
            labels: ['A', 'B', 'C', 'D', 'E']
        },
        scaleY: {
            values: '0:100:10'
        },
        series: [
            {
                values: [20, 40, 60, 80, 100]
            }
        ]
    };

    const song = useSelector(state => state.song.song);
    return (<>
        <div className={cx("mp3Chart")} id={cx("mp3Chart")}>
            <div onCopy={e => e.preventDefault()} className={cx("title")}>
                <h3>#mp3chart</h3>
                <div className={cx("randomSong")} > <FontAwesomeIcon icon={faPlay} className={cx("icon")} onClick={handleRandomSong} /></div>
            </div>


            <div className={cx("mp3Chart_chart")}>
                <h1>Biểu Đồ Với ZingChart</h1>
            </div>

            <div className={cx("title", "mobile")}>
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
                    {listSong.length <= 0
                        ?
                        <li>Không có bài hát nào</li>
                        :
                        listSong.map((song, index) => {
                            return <SongOptions key={song.id} songId={song.id} indexSong={index} dataSong={song} isRank={true} />
                        })
                    }
                </ul>

            </div>
        </div>
    </>);
}

export default Mp3Chart;