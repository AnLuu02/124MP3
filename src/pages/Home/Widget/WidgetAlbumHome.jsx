
import classNames from "classnames/bind";
import 'tippy.js/dist/tippy.css';
import WidgetItemHome from "../WidgetItem/WidgetItemHome";
import styles from "./WidgetAlbumHome.module.scss";

const cx = classNames.bind(styles);

function WidgetAlbumHome() {
    return (
        <ul className={cx("music")}>
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
            <WidgetItemHome />
        </ul>

    );
}
// WidgetAlbum.prototype = {
//     data: PropTypes.object
// }

export default WidgetAlbumHome;