import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./Home.module.scss";
import WidgetAlbumHome from "./Widget/WidgetAlbumHome";
const cx = classNames.bind(styles);

function Home() {
    return (<>
        <div className={cx("home")} id={cx("home")}>
            <div className={cx("banner")} id={cx("bannerHome")}>
                <img src="../../../public/images/banner.d40c4ec4.png" alt="" className={cx("aim")} />
                <div className={cx("content")}>
                    <h2 className={cx("aim")} style={{ fontWeight: "bold", lineHeight: 1.8 }}>Âm nhạc <br /> <span style={{ fontSize: 30, fontWeight: "500" }}>Một loại ngôn ngữ hài hòa</span></h2>
                    <p className={cx("aim")}>Thêm chút đường cà phê có ngọt? <br />Thêm chút tình mình có thuộc về nhau?</p>
                    <div className={cx("navHome aim")} id={cx("navHomeContent")}>
                        <button><NavLink className={cx("btn")} to={"/bxh"}>Nghe nhạc</NavLink></button>
                        <button><NavLink className={cx("btn")} to={"/library"}>Xem Playlist</NavLink></button>
                    </div>
                </div>
            </div>
            <div className={cx("widget1", "widget")}>
                <div className={cx("title")}>
                    Nổi bật
                    <a href="#">Hiện tất cả</a>
                </div>
                <WidgetAlbumHome />
            </div>
            <div className={cx("widget2", "widget")}>
                <div className={cx("title")}>
                    Thịnh hành
                    <a href="#">Hiện tất cả</a>

                </div>
                <WidgetAlbumHome />
            </div>
        </div>
    </>);
}

export default Home;