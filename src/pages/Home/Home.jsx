import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import banner from "../../../public/images/banner.d40c4ec4.png";
import Loader4Doc from "../../components/Loader1/Loader4Doc";
import WidgetAlbum from "../../components/WidgetAlbum/WidgetAlbum";
import useFetch from "../../Custom hooks/useFetch";
import styles from "./Home.module.scss";
const cx = classNames.bind(styles);

function Home() {
    const [showBanner, setShowBanner] = useState(false);
    const [topSong, setTopSong] = useState([]);
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


    const { get, loading } = useFetch("http://localhost:3000/api/");

    useEffect(() => {
        get("musics?top=5")
            .then(data => setTopSong(data))
            .catch(err => console.log(err))
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

                    <NavLink to={"/album"}>Hiện tất cả</NavLink>
                </div>
                {loading ? <Loader4Doc /> : <WidgetAlbum data={topSong} />}
                <WidgetAlbum />
            </div>
            <div className={cx("widget2", "widget")}>
                <div className={cx("title")}>
                    Thịnh hành
                    <NavLink to={"/album"}>Hiện tất cả</NavLink>

                </div>
                <WidgetAlbum />

            </div>
        </div>
    </>);
}

export default Home;