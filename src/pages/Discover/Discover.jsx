import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import { useInView } from 'react-intersection-observer';
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
    // const [songOutstanding, setSongOutstanding] = useState([]);
    const [songVN, setSongVN] = useState([]);
    const [songAsian, setSongAsian] = useState([]);
    const [songUsuk, setSongUsuk] = useState([]);
    const [artists, setArtists] = useState([]);

    // const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [loading3, setLoading3] = useState(true);
    const [loading4, setLoading4] = useState(true);
    const [loading5, setLoading5] = useState(true);
    const [loading6, setLoading6] = useState(true);


    const location = useLocation();
    const params = useParams();
    const refOther1 = useRef();
    const refOther2 = useRef();
    const refOther3 = useRef();

    const defaultParamsDiscover = {
        "vietnam": "vpop",
        "thegioi": "notVpop",
        "all": "",
    }
    const dispatch = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);

    const { ref: refArtist, inView: inViewArtist } = useInView({ triggerOnce: true });
    // const { ref: refSongOutstanding, inView: inViewSongOutStanding } = useInView({ triggerOnce: true });
    const { ref: refVn, inView: inViewVN } = useInView({ triggerOnce: true });
    const { ref: refAsian, inView: inViewAsian } = useInView({ triggerOnce: true });
    const { ref: refUsuk, inView: inViewUsuk } = useInView({ triggerOnce: true });
    useEffect(() => {
        // if (inViewSongOutStanding) {
        //     console.log("inViewSongOutStanding");
        //     get("musics?top=5")
        //         .then(data => {
        //             setLoading1(false)
        //             setSongOutstanding(data)
        //         })
        //         .catch(err => {
        //             setLoading1(true)
        //             console.log(err)
        //         })
        // }
        if (inViewVN) {
            get("musics?nation=vpop")
                .then(data => { setLoading2(false); setSongVN(data) })
                .catch(err => { setLoading2(true); console.log(err) });
        }
        if (inViewAsian) {
            get("musics?nation=notUsuk")
                .then(data => { setLoading3(false); setSongAsian(data) })
                .catch(err => { setLoading3(true); console.log(err) });

        }
        if (inViewUsuk) {
            get("musics?nation=usuk")
                .then(data => { setLoading4(false); setSongUsuk(data) })
                .catch(err => { setLoading4(true); console.log(err) });
        }
        if (inViewArtist) {
            get("artist?limit=5")
                .then(data => {
                    setArtists(data)
                    setLoading5(false)
                })
                .catch(err => {
                    setLoading5(true)
                    console.log(err)
                })
        }
    }, [inViewArtist, inViewVN, inViewAsian, inViewUsuk]);

    useEffect(() => {
        let query = `musics?limit=9`;
        if (params.filter) {
            query += `&nation=${defaultParamsDiscover[params.filter]}`;
        }
        get(query)
            .then((data) => {
                setLoading6(false);
                dispatch(setListSong(data));
                console.log(data);

            })
            .catch((error) => { setLoading6(true); console.log(error) });
    }, [params.filter]);

    useEffect(() => {

        let array = [1, 2, 3];

        const interval = setInterval(() => {
            const firstElement = array.shift();
            array.push(firstElement);
            const secondElement = array.shift();
            array.unshift(secondElement);
            if (refOther1.current && refOther2.current && refOther3.current) {
                refOther1.current.dataset.order = array[0];
                refOther2.current.dataset.order = array[1];
                refOther3.current.dataset.order = array[2];
            }
        }, 5000)
        return () => clearInterval(interval);
    });


    const formatPathname = () => {
        return location.pathname.endsWith("/") ? location.pathname.slice(0, -1) : location.pathname;
    };

    return (<>
        <div className={cx("discover")}>
            <div className={cx("all-slides")}>
                <div className={cx("single-slide")} data-order="3" ref={refOther3}>
                    <img src={img_slide3} alt="1" />
                </div>
                <div className={cx("single-slide")} data-order="2" ref={refOther2}>
                    <img src={img_slide2} alt="2" />
                </div>
                <div className={cx("single-slide")} data-order="1" ref={refOther1}>
                    <img src={img_slide1} alt="3" />
                </div>
            </div>
            <div className={cx("newSong", "listSong")}>
                <div className={cx("title1")}>
                    Mới phát hành
                </div>
                <ul className={cx("navCountry")}>
                    <div>
                        <NavLink to="" className={cx("navCountryItem", { "active": formatPathname() === '/discover' || formatPathname() === "/discover/all" })} >TẤT CẢ</NavLink>
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
                <Outlet context={{ listSong, loading: loading6 }} />
                <div className={cx("showAll_mobile")}>
                    <NavLink to="/new-release/song/all" >
                        <Button sx={{ color: "white" }} variant="outlined">
                            Hiện tất cả
                        </Button>
                    </NavLink>
                </div>


            </div >
            {/* <div className={cx("topSong")} id={cx("outStanding")} ref={refSongOutstanding}>
                <div className={cx("title")}> Nổi bật</div>
                <WidgetAlbum data={songOutstanding} loading={loading1} />
            </div> */}

            <div className={cx("topSong")} ref={refVn}>
                <div className={cx("title")}>
                    Nhạc Việt Nam
                </div>
                <WidgetAlbum data={songVN} loading={loading2} />
            </div>

            <div className={cx("topSong")} ref={refAsian}>
                <div className={cx("title")}>
                    Nhạc Châu Á
                </div>
                <WidgetAlbum data={songAsian} loading={loading3} />
            </div>

            <div className={cx("topSong")} ref={refUsuk}>
                <div className={cx("title")}>
                    Nhạc Âu Mỹ
                </div>
                <WidgetAlbum data={songUsuk} loading={loading4} />
            </div>
            <div className={cx("topSong")} ref={refArtist}>
                <div className={cx("title")}>
                    Ca sĩ/ Nhạc sĩ
                </div>
            </div>
            <WidgetAlbum artistWidget={true} data={artists} loading={loading5} />
        </div >
    </>);
}

export default Discover;