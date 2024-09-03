
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';
import AlbumItem from "./AlbumItem/AlbumItem";
import styles from "./WidgetAlbum.module.scss";

const cx = classNames.bind(styles);

function WidgetAlbum({ data }) {
    return (
        <ul className={cx("listWidget")} >
            {data?.map(a => {
                return <AlbumItem data={a} key={a?.id} />
            })}
        </ul>

    );
}
WidgetAlbum.propTypes = {
    data: PropTypes.array
}

export default WidgetAlbum;