import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SongOptions from "../../../../components/SongItem/SongOptions/SongOptions";
import useFetch from "../../../../Custom hooks/useFetch";
import styles from "./SongLayout.module.scss";
const cx = classNames.bind(styles);

export default function SongLayout() {
    const [songs, setSongs] = useState([{}, {}, {}, {}, {}, {}, {}]);
    const [loadingSongs, setLoadingSongs] = useState(true);


    const location = useLocation();

    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setLoadingSongs(true)
        setSongs([{}, {}, {}, {}, {}, {}, {}]);
        get(`search?q=${searchParams.get('q')}&limit=12`)
            .then((data) => {
                // setValue(data)   
                if (data && data.musics.length > 0) {
                    setSongs(data.musics)
                    setLoadingSongs(false)
                }
            })
            .catch(e => {
                setLoadingSongs(true)
                console.log(e)
            })
    }, [location.search]);


    return (
        <div className={cx("searchBody")}>
            <div className={cx("widget", "songResult")}>
                <div className={cx("title")}>
                    <h3>Bài hát</h3>
                </div>
                <div className={cx("listSong")}>
                    <ul className={cx("music")}>
                        {
                            Array.isArray(songs) && songs?.map((item, index) => {
                                return <SongOptions key={item.id} classNames={cx("custom")} songId={item.id} indexSong={index} dataSong={item} loading={loadingSongs} />
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}