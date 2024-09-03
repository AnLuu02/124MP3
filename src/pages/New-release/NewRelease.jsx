import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import useFetch from "../../Custom hooks/useFetch";
import Loader4Doc from "../../components/Loader1/Loader4Doc";
import { setListSong } from "../../components/store/listSongReducer";
import { formatPathname } from "../../utils/formatPatnameFunction";
import styles from "./NewRelease.module.scss";
const cx = classNames.bind(styles);


//url : controller/action/params
function NewRelease() {
    const location = useLocation();
    const params = useParams();
    function currentCategory(pathname) {
        if (pathname) {
            let arrPathName = pathname.split("/").filter(item => item !== "");
            if (arrPathName[1]) {
                return arrPathName[1];
            }
            else if (arrPathName[0]) {
                return "song";
            }

        }
    }


    const dispath = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    const { get, loading } = useFetch(
        "http://localhost:3000/api/"
    );

    useEffect(() => {
        let query = `musics?limit=9`;
        if (params.filter) {
            query += `&nation=${params.filter && params.filter != "all" ? params.filter : ""}`;
        }
        get(query)
            .then((data) => {
                dispath(setListSong(data));
            })
            .catch((error) => console.log("Could not load products", error));
    }, [params.filter]);

    return (<>
        <div className={cx("release")} id={cx("release")}>
            <h1 className={cx("title")}>
                MỚI PHÁT HÀNH
                <FontAwesomeIcon className={cx("iconRelease")} icon={faPlay} id={cx("allPlaymusic")} />
            </h1>

            <ul className={cx("navLibrary")}>

                {/* <NavLink to={location.pathname.includes("song") ? location.pathname : "song"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/song') })}>BÀI HÁT</NavLink> */}
                {/* <NavLink to={location.pathname.includes("album") ? location.pathname : "album"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/album') })} >ALBUM</NavLink> */}
                {/* <NavLink to={location.pathname.includes("mv") ? location.pathname : "mv"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/mv') })}>MV</NavLink> */}
                <NavLink to={location.pathname.includes("song") ? location.pathname : "song"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/song') || formatPathname(location.pathname).endsWith('/new-release') })}>BÀI HÁT</NavLink>
                <NavLink to={location.pathname.includes("album") ? location.pathname : "album"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/album') })} >ALBUM</NavLink>
                <NavLink to={location.pathname.includes("mv") ? location.pathname : "mv"} className={cx("navCategory", { "active": formatPathname(location.pathname).includes('/mv') })}>MV</NavLink>

                <hr className={cx("line")}></hr>
            </ul>
            <ul className={cx("subNavLibrary")}>

                {/* <NavLink to={`${currentCategory(location.pathname)}/all`} className={cx("navCountryItem", { "active": formatPathname(location.pathname) === `/new-release/${currentCategory(location.pathname)}` || formatPathname(location.pathname).includes(`/new-release/${currentCategory(location.pathname)}/all`) })} id={cx("All")}>TẤT CẢ</NavLink> */}
                {/* <NavLink to={`${currentCategory(location.pathname)}/vpop`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes("/vpop") })} id={cx("VN")}>Việt Nam</NavLink> */}
                {/* <NavLink to={`${currentCategory(location.pathname)}/usuk`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes("/usuk") })} id={cx("TG")}>Âu Mỹ</NavLink> */}
                {/* <NavLink to={`${currentCategory(location.pathname)}/kpop`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes("/kpop") })} id={cx("TG")}>Hàn Quốc</NavLink> */}

                <NavLink to={`${currentCategory(location.pathname)}/all`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).endsWith('/new-release') || formatPathname(location.pathname) === `/new-release/${currentCategory(location.pathname)}` || formatPathname(location.pathname).includes(`/new-release/${currentCategory(location.pathname)}/all`) })}>TẤT CẢ</NavLink>
                <NavLink to={`${currentCategory(location.pathname)}/vpop`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes("/vpop") })} >Việt Nam</NavLink>
                <NavLink to={`${currentCategory(location.pathname)}/usuk`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes("/usuk") })} >Âu Mỹ</NavLink>
                <NavLink to={`${currentCategory(location.pathname)}/kpop`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes("/kpop") })} >Hàn Quốc</NavLink>

            </ul>
            <div className={cx("listSong")} id={cx("listSongRelease")}>
                {
                    loading
                        ?
                        <Loader4Doc />
                        :
                        <div className={cx("listSongRender")}>
                            <div className={cx("titleHeaderMusic")}>
                                <div>BÀI HÁT</div>
                                <div>PHÁT HÀNH</div>
                                <div>THỜI GIAN</div>
                            </div>
                            <Outlet context={listSong} />
                        </div>
                }
            </div>
        </div >
    </>);
}

export default NewRelease;