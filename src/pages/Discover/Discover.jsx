import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import 'tippy.js/dist/tippy.css';
import useFetch from "../../Custom hooks/useFetch";
import img_slide1 from "../../assets/images/1.jpg";
import img_slide2 from "../../assets/images/2.jpg";
import img_slide3 from "../../assets/images/3.jpg";
import WidgetAlbum from "../../components/WidgetAlbum/WidgetAlbum";
import { setListSong } from "../../components/store/listSongReducer";
import styles from "./Discover.module.scss";
const cx = classNames.bind(styles);

function Discover() {
    const [songOutstanding, setSongOutstanding] = useState([]);
    const [songVN, setSongVN] = useState([]);
    const [songAsean, setSongAsean] = useState([]);
    const [songUsuk, setSongUsuk] = useState([]);
    const [artists, setArtists] = useState([]);
    const location = useLocation();
    const params = useParams();
    const refOrther1 = useRef();
    const refOrther2 = useRef();
    const refOrther3 = useRef();

    const defaultParamsDiscover = {
        "vietnam": "vpop",
        "thegioi": "notVpop",
        "all": "",
    }

    const dispatch = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    // const user = useSelector(state => state.user.user);
    const { get, loading } = useFetch(import.meta.env.VITE_API_BASE_URL);

    useEffect(() => {
        let query = `musics?limit=9`;
        if (params.filter) {
            query += `&nation=${defaultParamsDiscover[params.filter]}`;
        }
        get(query)
            .then((data) => {
                dispatch(setListSong(data));
            })
            .catch((error) => console.log("Goi API không thành công.", error));
    }, [params.filter]);

    useEffect(() => {
        get("musics?top=5")
            .then(data => setSongOutstanding(data))
            .catch(err => console.log(err))
        // get("musics?nation=vpop")
        //     .then(data => setSongVN(data))
        //     .catch(err => console.log(err))
        // get("musics?nation=notUsuk")
        //     .then(data => setSongAsean(data))
        //     .catch(err => console.log(err))
        // get("musics?nation=usuk")
        //     .then(data => setSongUsuk(data))
        //     .catch(err => console.log(err))
        get("artist?limit=5")
            .then(data => setArtists(data))
            .catch(err => console.log(err))
        get("musics?limit=20")
            .then(data => {
                if (data && Array.isArray(data)) {
                    setSongVN(data.filter(song => song.nation === "vpop"));
                    setSongAsean(data.filter(song => song.nation !== "usuk"));
                    setSongUsuk(data.filter(song => song.nation === "usuk"));
                }
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {

        let array = [1, 2, 3];

        const interval = setInterval(() => {
            const firstElement = array.shift();
            array.push(firstElement);
            const secondElement = array.shift();
            array.unshift(secondElement);
            if (refOrther1.current && refOrther2.current && refOrther3.current) {
                refOrther1.current.dataset.order = array[0];
                refOrther2.current.dataset.order = array[1];
                refOrther3.current.dataset.order = array[2];
            }
        }, 5000)
        return () => clearInterval(interval);
    });


    const formatPathname = () => {
        return location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname;
    };

    return (<>
        <div id={cx("discover")}>
            <div className={cx("all-slides")}>
                <div className={cx("single-slide")} data-order="3" ref={refOrther3}>
                    <img src={img_slide3} alt="1" />
                </div>
                <div className={cx("single-slide")} data-order="2" ref={refOrther2}>
                    <img src={img_slide2} alt="2" />
                </div>
                <div className={cx("single-slide")} data-order="1" ref={refOrther1}>
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
                    <li className={cx("showAll", "mobile")} id={cx("showAll")}>
                        <NavLink to="/new-release/song/all" >
                            Tất cả
                            <FontAwesomeIcon icon={faAngleRight} style={{ marginLeft: "5px" }} />
                        </NavLink>

                    </li>
                </ul>
                {/* {loading ? <Loader4Doc /> : <Outlet context={listSong} />} */}
                <Outlet context={{ listSong, loading }} />

                <div className={cx("showAll_mobile")}>
                    <NavLink to="/new-release/song/all" >
                        <Button sx={{ color: "white" }} variant="outlined">
                            Hiện tất cả
                        </Button>
                    </NavLink>
                </div>


            </div >
            <div className={cx("topSong")} id={cx("outStanding")}>
                <div className={cx("title")}> Nổi bật</div>
                <WidgetAlbum data={songOutstanding} loading={loading} />
            </div>

            <div className={cx("topSong")} id={cx("vn_music")}>
                <div className={cx("title")}>
                    Nhạc Việt Nam
                </div>
                <WidgetAlbum data={songVN} loading={loading} />
            </div>

            <div className={cx("topSong")} id={cx("asia_music")}>
                <div className={cx("title")}>
                    Nhạc Châu Á
                </div>
                <WidgetAlbum data={songAsean} loading={loading} />
            </div>

            <div className={cx("topSong")} id={cx("uk_music")}>
                <div className={cx("title")}>
                    Nhạc Âu Mỹ
                </div>
                <WidgetAlbum data={songUsuk} loading={loading} />
            </div>
            <div className={cx("topSong")} id={cx("uk_music")}>
                <div className={cx("title")}>
                    Ca sĩ/ Nhạc sĩ
                </div>
            </div>
            <WidgetAlbum artistWidget={true} data={artists} loading={loading} />
        </div >
    </>);
}

export default Discover;