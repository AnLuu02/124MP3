import classNames from "classnames/bind";
import styles from "./Favorite.module.scss";
const cx = classNames.bind(styles);
function Favorite() {
    return (
        <div className={cx("listSong", "favorite")} >
            <div className={cx("empty")}>
                <img src="../../../../../public/images/empty-fav-song-dark.png" />
                <div className={cx("text")}>Chưa có bài hát yêu thích trong thư viện cá nhân
                </div>
                <button>KHÁM PHÁ NGAY</button>
            </div>
            {/* <div className={cx("listSongRender")}>
            <div className={cx("titleHeaderMusic")}>
                <div>BÀI HÁT</div>
                <div>PHÁT HÀNH</div>

                <div>THỜI GIAN</div>
            </div>
            <ul className={cx("music")}>

            </ul>
        </div> */}
        </div>
    );
}

export default Favorite;