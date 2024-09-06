import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Song from "../../../../components/SongItem/Song/Song";
import SongOptions from "../../../../components/SongItem/SongOptions/SongOptions";
import WidgetAlbum from "../../../../components/WidgetAlbum/WidgetAlbum";
import styles from "./HeardRecently.module.scss";
const cx = classNames.bind(styles);
export default function HeardRecently() {
    // const [SearchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const location = useLocation();

    function formatPathname() {
        if (location.pathname.endsWith("/")) {
            return location.pathname.slice(0, -1);
        }
        return location.pathname;
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setQuery(searchParams.get('q'));
    }, [location.search]);

    // const { get }  = useFetch(import.meta.env.VITE_API_BASE_URL);
    return (
        <div className={cx("myMusicHeardRecently")}>
            <div className={cx("searchHeader")}>
                <h2>Phát gần đây</h2>
                <ul className={cx("navSearch")}>
                    <NavLink to={location.pathname.includes("song") ? location.pathname : "song"} className={cx("navItem", { "active": formatPathname(location.pathname).includes('/song') })}>BÀI HÁT</NavLink>
                    <NavLink to={location.pathname.includes("album") ? location.pathname : "playlist"} className={cx("navItem", { "active": formatPathname(location.pathname).includes('/playlist') || formatPathname(location.pathname).endsWith('/history') })} >PLAYLIST</NavLink>
                    <NavLink to={location.pathname.includes("mv") ? location.pathname : "mv"} className={cx("navItem", { "active": formatPathname(location.pathname).includes('/mv') })}>MV</NavLink>
                    <NavLink to={location.pathname.includes("radio") ? location.pathname : "radio"} className={cx("navItem", { "active": formatPathname(location.pathname).includes('/radio') })}>RADIO</NavLink>
                </ul>
                <hr />
            </div>
            <div className={cx("searchBody")}>
                <div className={cx("widget", "hotSong")}>
                    <h3>Nổi bật </h3>
                    <ul className={cx("music", "list_music")} >
                        <Song key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                        <Song key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                        <Song key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                    </ul>
                </div>

                <div className={cx("widget", "songResult")}>
                    <h3>Bài hát</h3>
                    <div className={cx("listSong")}>
                        <ul className={cx("music")}>
                            <SongOptions key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                            <SongOptions key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                            <SongOptions key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                            <SongOptions key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3", name: "456" }} />
                        </ul>
                    </div>
                </div>

                <div className={cx("widget", "playlist")}>
                    <h3>Playlist/Album</h3>
                    <WidgetAlbum />
                </div>
                <div className={cx("widget", "mv", "playlist")}>
                    <h3>MV</h3>
                    <WidgetAlbum />
                </div>
            </div>
        </div>
    )
}