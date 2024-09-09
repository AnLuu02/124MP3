import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WidgetAlbum from "../../../../components/WidgetAlbum/WidgetAlbum";
import useFetch from "../../../../Custom hooks/useFetch";
import styles from "./ArtistsLayout.module.scss";
const cx = classNames.bind(styles);

export default function ArtistsLayout() {
    const [artists, setArtists] = useState([{}, {}, {}, {}, {}]);
    const [loadingArtists, setLoadingArtists] = useState(true);
    const location = useLocation();

    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setArtists([{}, {}, {}, {}, {}]);
        setLoadingArtists(true)
        get(`search?q=${searchParams.get('q')}&limit=10`)
            .then((data) => {
                if (data && data.artists.length > 0) {
                    setArtists(data.artists)
                    setLoadingArtists(false)
                }
            })
            .catch(e => {
                setLoadingArtists(true)
                console.log(e)
            })

    }, [location.search]);


    return (
        <div className={cx("searchBody")}>
            <div className={cx("widget", "songResult")}>
                <div className={cx("title")}>
                    <h3>Nghệ sĩ/OA</h3>
                </div>
                <div className={cx("listSong")}>
                    <WidgetAlbum loading={loadingArtists} data={artists} artistWidget={true} />
                </div>
            </div>
        </div>
    )
}