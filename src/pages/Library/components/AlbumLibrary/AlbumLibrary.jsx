import classNames from "classnames/bind";
import styles from "./AlbumLibrary.module.scss";
const cx = classNames.bind(styles);
function AlbumLibrary() {
    return (
        <div className={cx("listSong", "albumLibrary")} >
            <div className={cx("empty")}>
                <img src="../../../../../public/images/empty-album-dark.png" />
                <div className={cx("text")}>Chưa có album trong thư viện cá nhân
                </div>
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

export default AlbumLibrary;