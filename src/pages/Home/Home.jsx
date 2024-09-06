import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import banner from "../../assets/images/banner.d40c4ec4.png";
import WidgetAlbum from "../../components/WidgetAlbum/WidgetAlbum";
import useFetch from "../../Custom hooks/useFetch";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
    const [showBanner, setShowBanner] = useState(false);
    const [outStandingSong, setOutStandingSong] = useState([]);
    const [trendingSong, setTrendingSong] = useState([]);
    const [loadingOutStandingSong, setLoadingOutStandingSong] = useState(true);
    const [loadingTrendingSong, setLoadingTrendingSong] = useState(true);

    const { pathname } = useLocation();
    useEffect(() => {
        const handleResizeWindow = () => {
            setShowBanner(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleResizeWindow);
        return () => {
            window.removeEventListener("scroll", handleResizeWindow);
        }
    }, [showBanner, pathname])


    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);

    useEffect(() => {
        get("musics?top=5")
            .then(data => {
                setLoadingOutStandingSong(false)
                setOutStandingSong(data)
            })
            .catch(err => {
                console.log(err)
                setLoadingOutStandingSong(true)
            })
        get("musics?topStart=21&topEnd=25")
            .then(data => {
                setTrendingSong(data)
                setLoadingTrendingSong(false)
            })
            .catch(err => {
                console.log(err)
                setLoadingTrendingSong(true)
            })
    }, [])

    return (<>
        <div className={cx("home")} id={cx("home")}>
            <div className={cx("banner")} id={cx("bannerHome")}>
                <img src={banner} alt="" className={cx(!showBanner ? "aim" : "")} />
                <div className={cx("content")}>
                    <h2 className={cx(!showBanner ? "aim" : "")} style={{ fontWeight: "bold", lineHeight: 1.8 }}>Âm nhạc <br /> <span>Một loại ngôn ngữ hài hòa</span></h2>
                    <p className={cx(!showBanner ? "aim" : "")}>Thêm chút đường cà phê có ngọt? <br />Thêm chút tình mình có thuộc về nhau?</p>
                    <div className={cx("navHome", !showBanner ? "aim" : "")} id={cx("navHomeContent")}>
                        <button><NavLink className={cx("btn")} to={"/bxh"}>Nghe nhạc</NavLink></button>
                        <button><NavLink className={cx("btn")} to={"/library"}>Xem Playlist</NavLink></button>
                    </div>
                </div>
            </div>
            <div className={cx("widget1", "widget")}>
                <div className={cx("title")}>
                    Nổi bật
                    {/* <NavLink to={"/album/noi-bat"}>Hiện tất cả</NavLink> */}
                </div>
                <WidgetAlbum data={outStandingSong} q={"noi-bat"} loading={loadingOutStandingSong} />
            </div>
            <div className={cx("widget2", "widget")}>
                <div className={cx("title")}>
                    Thịnh hành
                    {/* <NavLink to={"/album/thinh-hanh"}>Hiện tất cả</NavLink> */}
                </div>
                <WidgetAlbum data={trendingSong} q={"thinh-hanh"} loading={loadingTrendingSong} />


            </div>
        </div>
    </>);
}

export default Home;