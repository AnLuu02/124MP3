import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Song from "../../components/SongItem/Song/Song";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import WidgetAlbum from "../../components/WidgetAlbum/WidgetAlbum";
import { formatPathname } from "../../utils/formatPatnameFunction";
import CustomizedMenus from "./Mobile/Menu";
import styles from "./SearchResult.module.scss";
const cx = classNames.bind(styles);
function SearchResult() {
    // const [SearchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setQuery(searchParams.get('q'));
    }, [location.search]);


    return (<>
        <div className={cx("searchResult")}>
            <div className={cx("searchHeader")}>
                <h2>Kết Quả</h2>
                <ul className={cx("navSearch", "mobile")}>
                    <NavLink to={`/tim-kiem/tat-ca?q=${query}`} className={cx("navItem", formatPathname(location.pathname).includes("/tim-kiem/tat-ca") ? "active" : "")}>
                        TẤT CẢ
                    </NavLink>
                    <NavLink to={`/tim-kiem/bai-hat?q=${query}`} className={cx("navItem", formatPathname(location.pathname).includes("/tim-kiem/bai-hat") ? "active" : "")}>
                        BÀI HÁT
                    </NavLink>
                    <NavLink to={`/tim-kiem/playlist?q=${query}`} className={cx("navItem", formatPathname(location.pathname).includes("/tim-kiem/playlist") ? "active" : "")}>
                        PLAYLIST/ALBUM
                    </NavLink>
                    <NavLink to={`/tim-kiem/artist?q=${query}`} className={cx("navItem", formatPathname(location.pathname).includes("/tim-kiem/artist") ? "active" : "")}>
                        NGHỆ SĨ/OA
                    </NavLink>
                    <NavLink to={`/tim-kiem/video?q=${query}`} className={cx("navItem", formatPathname(location.pathname).includes("/tim-kiem/video") ? "active" : "")}>
                        MV
                    </NavLink>
                </ul>
                <div className={cx("menuMobile")}>
                    <CustomizedMenus />
                </div>
            </div>
            <p className={cx("keySearchValue")}>Từ khóa "{query}"</p>

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
    </>);
}

export default SearchResult;