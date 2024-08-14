import { faClose, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import album_default from "../../../../../../public/images/album_default.png";
import styles from "./PlaylistItem.module.scss";
const cx = classNames.bind(styles);

function PlaylistItem() {
    return (
        <>
            <li className={cx("playlistItem")} >
                <div className={cx("content")}>
                    <div className={cx("hoverWidgetItem")}>
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faClose} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faHeart} />
                    </div>
                    <img src={album_default} alt="" />
                </div>
                <div className={cx("title")} style={{ margin: "4 0 2 0" }}>aaaaaaaaaaaaaaaaaaaaaaa
                    siêu cấp vip pr</div>
                <div className={cx("author")}>An</div>
            </li>
        </>
    );
}
PlaylistItem.propTypes = {
    songTest: object,
    songId: PropTypes.string.isRequired,

};
export default PlaylistItem;