import classNames from "classnames/bind";
import styles from "./Upload.module.scss";
const cx = classNames.bind(styles);
function Upload() {
    return (
        <div className={cx("listSong", "upload")} >
            <div className={cx("empty")}>
                <img src="../../../../../public/images/empty-upload-dark.png" />
                <div className={cx("text")}>Chưa có bài hát tải lên trong thư viện cá nhân
                </div>
                <button>TẢI LÊN NGAY</button>
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

export default Upload;