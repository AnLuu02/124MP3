import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SongOptions from "../../../../components/SongItem/SongOptions/SongOptions";
import WidgetAlbum from "../../../../components/WidgetAlbum/WidgetAlbum";
import useFetch from "../../../../Custom hooks/useFetch";
import WidgetHot from "../../ArtistWidget/WidgetHot";
import styles from "./All.module.scss";

const cx = classNames.bind(styles);

export default function All() {
    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([{}, {}, {}, {}]);
    const [loadingSongs, setLoadingSongs] = useState(true);

    const [artists, setArtists] = useState([{}, {}, {}, {}]);
    const [loadingArtists, setLoadingArtists] = useState(true);


    const location = useLocation();

    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setQuery(searchParams.get('q'));
        setLoadingSongs(true)
        setLoadingArtists(true)
        setSongs([{}, {}, {}, {}]);
        get(`search?q=${searchParams.get('q')}&limit=4`)
            .then((data) => {
                // setValue(data)   
                if (data && data.musics.length > 0) {
                    setSongs(data.musics)
                    setLoadingSongs(false)
                }
                if (data && data.artists.length > 0) {

                    setArtists(data.artists)
                    setLoadingArtists(false)
                }
            })
            .catch(e => {
                setLoadingSongs(true)
                setLoadingArtists(true)
                console.log(e)
            })

    }, [location.search]);


    return (
        <div className={cx("searchBody")}>
            <div className={cx("widget", "hotSong")}>
                <h3>Nổi bật </h3>
                <ul className={cx("music", "list_music")} >
                    {
                        Array.isArray(artists) && artists.length > 0
                        &&
                        <WidgetHot
                            data={artists[0]}
                            q={query}
                            loading={loadingArtists}
                            isArtist={true}
                        />
                    }



                    {/* <WidgetHot loading={true} /> */}
                    {/* <WidgetHot loading={true} /> */}
                    {/* <WidgetHot loading={true} /> */}



                </ul>
            </div>

            <div className={cx("widget", "songResult")}>
                <div className={cx("title")}>
                    <h3>Bài hát</h3>
                    <NavLink to={`/tim-kiem/bai-hat?q=${query}`} className={cx("seeAll")}>Xem thêm</NavLink>
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

            <div className={cx("widget", "playlist")}>
                <h3>Playlist/Album</h3>
                <WidgetAlbum loading={true} />
            </div>
            <div className={cx("widget", "mv", "playlist")}>
                <h3>MV</h3>
                <WidgetAlbum loading={true} />
            </div>
        </div>
    )
}