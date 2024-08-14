import { faClose, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import image_1 from "../../../../public/images/1.jpg";
import styles from "./AlbumItem.module.scss";
const cx = classNames.bind(styles);

function AlbumItem() {
    return (
        <>
            <li className={cx("widgetItem")} >
                <div className={cx("content")}>
                    <img src={image_1} alt="" />
                    <div className={cx("hoverWidgetItem")}>
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faClose} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faHeart} />
                    </div>
                </div>
                <div className={cx("title")} style={{ margin: "4 0 2 0" }}>Top 100 bài nhạc trẻ hay nhất mọi thời đời Việt Nam
                    siêu cấp vip pr</div>
                <div className={cx("author")}>MONO, Jack - J97, Phát Huy, T4</div>
            </li>
        </>
    );
}
AlbumItem.propTypes = {
    songTest: object,
    songId: PropTypes.string.isRequired,

};
export default AlbumItem;