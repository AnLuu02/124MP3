
import classNames from "classnames/bind";
import 'tippy.js/dist/tippy.css';
import AlbumItem from "./AlbumItem/AlbumItem";
import styles from "./WidgetAlbum.module.scss";

const cx = classNames.bind(styles);

function WidgetAlbum() {
    return (
        <ul className={cx("listWidget")} >
            {/* {data.map((item, index) => <AlbumItem key={index} songTest={item} />)} */}
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
            <AlbumItem />
        </ul>

    );
}
// WidgetAlbum.prototype = {
//     data: PropTypes.object
// }

export default WidgetAlbum;