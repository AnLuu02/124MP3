import { faClose, faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import image_1 from "../../../../public/images/1.jpg";
import RenderArtist from "../../SongItem/RenderArtist/RenderArtist";
import styles from "./AlbumItem.module.scss";
const cx = classNames.bind(styles);

function AlbumItem({ data }) {
    return (
        <>
            <li className={cx("widgetItem")} >
                <div className={cx("content")}>
                    <img src={data?.thumbnailUrl ?? image_1} alt="" />
                    <div className={cx("hoverWidgetItem")}>
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faClose} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faEllipsis} />
                    </div>
                </div>
                <div className={cx("title")} style={{ margin: "4 0 2 0" }}>{data?.name ?? "Top 100 bài nhạc trẻ hay nhất mọi thời đại"}</div>
                <RenderArtist dataArtist={data?.artist} />
            </li>
        </>
    );
}
AlbumItem.propTypes = {
    data: PropTypes.object,

};
export default AlbumItem;