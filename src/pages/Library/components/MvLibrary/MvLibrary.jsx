import classNames from "classnames/bind";
import empty_mv_dark from "../../../../assets/images/empty-mv-dark.png";
import styles from "./MvLibrary.module.scss";
const cx = classNames.bind(styles);
function MvLibrary() {
    return (
        <div className={cx("listSong", "mvLibrary")} >
            <div className={cx("empty")}>
                <img src={empty_mv_dark} />
                <div className={cx("text")}>Chưa có MV nào trong thư viện cá nhân

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

export default MvLibrary;