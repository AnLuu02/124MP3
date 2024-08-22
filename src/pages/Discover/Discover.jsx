import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import 'tippy.js/dist/tippy.css';
import img_slide1 from "../../../public/images/1.jpg";
import img_slide2 from "../../../public/images/2.jpg";
import img_slide3 from "../../../public/images/3.jpg";
import useFetch from "../../Custom hooks/useFetch";
import Loader4Doc from "../../components/Loader1/Loader4Doc";
import WidgetAlbum from "../../components/WidgetAlbum/WidgetAlbum";
import { setListSong } from "../../components/store/listSongReducer";
import styles from "./Discover.module.scss";
const cx = classNames.bind(styles);

function Discover() {
    const location = useLocation();
    const params = useParams();
    const defaultParamsDiscover = {
        "vietnam": "vpop",
        "thegioi": "notVpop",
        "all": "",
    }

    const dispath = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    // const user = useSelector(state => state.user.user);
    const { get, loading } = useFetch(
        "http://localhost:8080/API_Servlet/api/"
    );

    useEffect(() => {
        get(`music/discover/${defaultParamsDiscover[params.filter] ?? "all"}`)
            .then((data) => {
                dispath(setListSong(data));
                console.log(data)
            })
            .catch((error) => console.log("Goi API không thành công.", error));
    }, [params.filter]);



    const formatPathname = useCallback(() => {
        console.log("call back call" + location.pathname);
        if (location.pathname.endsWith("/")) {
            return location.pathname.slice(0, -1);
        }
        return location.pathname;
    }, [location.pathname])

    return (<>
        <div id={cx("discover")}>
            <div className={cx("all-slides")}>
                <div className={cx("single-slide")} data-order="2">
                    <img src={img_slide3} alt="1" />
                </div>
                <div className={cx("single-slide")} data-order="3">
                    <img src={img_slide2} alt="2" />
                </div>
                <div className={cx("single-slide")} data-order="1">
                    <img src={img_slide1} alt="3" />
                </div>
            </div>
            <div className={cx("newSong", "listSong")}>
                <div className={cx("title1")}>
                    Mới phát hành
                </div>
                <ul className={cx("navCountry")}>
                    <div>
                        <NavLink to="" className={cx("navCountryItem", { "active": formatPathname() === '/discover' || formatPathname() === "/discover/all" })} id={cx("All")}>TẤT CẢ</NavLink>
                        <NavLink to="vietnam" className={cx("navCountryItem", { "active": formatPathname() === '/discover/vietnam' })} id={cx("VN")}>VIỆT NAM</NavLink>
                        <NavLink to="thegioi" className={cx("navCountryItem", { "active": formatPathname() === '/discover/thegioi' })} id={cx("TG")}>THẾ GIỚI</NavLink>
                    </div>
                    <li className={cx("showAll")} id={cx("showAll")}>
                        <NavLink to="/new-release/song/all" >
                            Tất cả
                            <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: "5px" }} />
                        </NavLink>

                    </li>
                </ul>
                {loading ? <Loader4Doc /> : <Outlet context={listSong} />}

            </div >
            <div className={cx("topSong")} id={cx("outStanding")}>
                <div className={cx("title")}> Nổi bật</div>
                <WidgetAlbum />
            </div>

            <div className={cx("topSong")} id={cx("vn_music")}>
                <div className={cx("title")}>
                    Nhạc Việt Nam
                </div>
                <WidgetAlbum />
            </div>

            <div className={cx("topSong")} id={cx("asia_music")}>
                <div className={cx("title")}>
                    Nhạc Châu Á
                </div>
                <WidgetAlbum />
            </div>

            <div className={cx("topSong")} id={cx("uk_music")}>
                <div className={cx("title")}>
                    Nhạc Âu Mỹ
                </div>
                <WidgetAlbum />
            </div>
        </div >
    </>);
}

export default Discover;