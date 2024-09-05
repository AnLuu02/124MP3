
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';
import AlbumItem from "./AlbumItem/AlbumItem";
import AlbumItemCircle from "./AlbumItemCircle/AlbumItemCircle";
import styles from "./WidgetAlbum.module.scss";

const cx = classNames.bind(styles);

function WidgetAlbum({ data, q, artistWidget }) {
    return (
        <ul className={cx("listWidget")} >
            {!artistWidget
                ?
                Array.isArray(data) && data?.map((a, index) => {
                    return <AlbumItem data={a} key={a?.id} indexSong={index} q={q} />
                })
                :
                Array.isArray(data) && data?.map((a) => {
                    return <AlbumItemCircle data={a} key={a?.id} />
                })
            }
        </ul>

    );
}
WidgetAlbum.propTypes = {
    data: PropTypes.array,
    q: PropTypes.string,
    artistWidget: PropTypes.bool
}

export default WidgetAlbum;