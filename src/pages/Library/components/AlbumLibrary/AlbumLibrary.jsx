import classNames from "classnames/bind";
import empty_album_dark from "../../../../assets/images/empty-album-dark.png";
import styles from "./AlbumLibrary.module.scss";
const cx = classNames.bind(styles);
function AlbumLibrary() {
    return (
        <div className={cx("listSong", "albumLibrary")} >
            <div className={cx("empty")}>
                <img src={empty_album_dark} />
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