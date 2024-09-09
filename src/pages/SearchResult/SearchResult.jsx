import { faArtstation } from "@fortawesome/free-brands-svg-icons";
import { faBars, faCompactDisc, faIcons } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { formatPathname } from "../../utils/formatPatnameFunction";
import CustomizedMenus from "./Mobile/Menu";
import styles from "./SearchResult.module.scss";
const cx = classNames.bind(styles);


const dataMenuMobile = [
    {
        iconSVG: <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3"
                width="7.57895"
                height="7.57895"
                rx="1.89474"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="1.5">

            </rect>
            <rect x="13.4211" y="3"
                width="7.57895"
                height="7.57895"
                rx="3.78947"
                stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5">

            </rect>
            <path
                d="M7.02442 20.7272C6.89558 20.7751 6.68337 20.7751 6.55453 20.7272C5.45558 20.3321 3 18.6835 3 15.8893C3 14.6558 3.94358 13.6579 5.10695 13.6579C5.79663 13.6579 6.40674 14.0092 6.78947 14.552C7.17221 14.0092 7.78611 13.6579 8.472 13.6579C9.63537 13.6579 10.5789 14.6558 10.5789 15.8893C10.5789 18.6835 8.12337 20.3321 7.02442 20.7272Z"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round">

            </path>
            <path
                d="M14.3684 13.7475L14.3684 20.6735C14.3684 20.819 14.5256 20.9102 14.6519 20.838L20.7121 17.375C20.8394 17.3023 20.8394 17.1188 20.7121 17.046L14.6519 13.583C14.5256 13.5109 14.3684 13.6021 14.3684 13.7475Z"
                stroke="currentColor"
                strokeOpacity="0.8"
                strokeWidth="1.5">

            </path>
        </svg>,
        title: "Tất cả"
    },
    {
        iconSVG: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 2.75C6.08579 2.75 5.75 3.08579 5.75 3.5C5.75 3.91421 6.08579 4.25 6.5 4.25H17.5C17.9142 4.25 18.25 3.91421 18.25 3.5C18.25 3.08579 17.9142 2.75 17.5 2.75H6.5ZM3 9.5C3 7.42893 4.67893 5.75 6.75 5.75H17.25C19.3211 5.75 21 7.42893 21 9.5V17.5C21 19.5711 19.3211 21.25 17.25 21.25H6.75C4.67893 21.25 3 19.5711 3 17.5V9.5ZM6.75 7.25C5.50736 7.25 4.5 8.25736 4.5 9.5V17.5C4.5 18.7426 5.50736 19.75 6.75 19.75H17.25C18.4926 19.75 19.5 18.7426 19.5 17.5V9.5C19.5 8.25736 18.4926 7.25 17.25 7.25H6.75ZM13.666 8.87596C13.4359 8.72253 13.14 8.70823 12.8961 8.83874C12.6522 8.96926 12.5 9.2234 12.5 9.5V13.0499C12.125 12.8581 11.7001 12.75 11.25 12.75C9.73122 12.75 8.5 13.9812 8.5 15.5C8.5 17.0188 9.73122 18.25 11.25 18.25C12.6911 18.25 13.8733 17.1415 13.9905 15.7307C13.9967 15.6916 14 15.6515 14 15.6107V15.5V10.9014L15.084 11.624C15.4286 11.8538 15.8943 11.7607 16.124 11.416C16.3538 11.0714 16.2607 10.6057 15.916 10.376L13.666 8.87596ZM12.5 15.5C12.5 14.8096 11.9404 14.25 11.25 14.25C10.5596 14.25 10 14.8096 10 15.5C10 16.1904 10.5596 16.75 11.25 16.75C11.9404 16.75 12.5 16.1904 12.5 15.5Z"
                fillOpacity="0.8">

            </path>
        </svg>,
        title: "Bài hát"
    },
    {
        icon: faCompactDisc,
        title: "PLAYPLIST"
    },
    {
        icon: faArtstation,

        title: "  NGHỆ SĨ"

    },
    {
        icon: faIcons,
        title: "MV"
    }
]

function SearchResult() {
    // const [SearchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    // const [value, setValue] = useState([]);
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
                    <CustomizedMenus dataMenu={dataMenuMobile} mainIcon={faBars} />
                </div>
            </div>
            <p className={cx("keySearchValue")}>Từ khóa "{query}"</p>
            <Outlet />
        </div>
    </>);
}

export default SearchResult;