
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import 'tippy.js/dist/tippy.css';
import AlbumItem from "./AlbumItem/AlbumItem";
import AlbumItemCircle from "./AlbumItemCircle/AlbumItemCircle";
import styles from "./WidgetAlbum.module.scss";

const cx = classNames.bind(styles);

function WidgetAlbum({ data, q, artistWidget, loading }) {
    const [dataSong, setDataSong] = useState([{}, {}, {}, {}, {}]);
    useEffect(() => {
        if (data.length > 0) {
            setDataSong(data)
        }
    }, [data])
    return (
        <ul key={q} className={cx("listWidget")} >
            {!artistWidget
                ?
                Array.isArray(dataSong) && dataSong?.map((a, index) => {
                    return <AlbumItem data={a} key={a?.id || index} indexSong={index} q={q} loading={loading} />
                })
                :
                Array.isArray(dataSong) && dataSong?.map((a, index) => {
                    return <AlbumItemCircle data={a} key={a?.id || index} loading={loading} />
                })
            }
        </ul>

    );
}
WidgetAlbum.propTypes = {
    data: PropTypes.array,
    q: PropTypes.string,
    artistWidget: PropTypes.bool,
    loading: PropTypes.bool
}

export default WidgetAlbum;