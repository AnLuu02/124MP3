import classNames from "classnames/bind";
import { useOutletContext } from "react-router-dom";
import SongFull from "../../../../components/SongFull/SongFull";
import styles from "./AlbumNewRelease.module.scss";
const cx = classNames.bind(styles);
function AlbumNewRelease() {
    const listSong = useOutletContext();
    return (
        <ul id={cx("data_library")} className={cx("music")}>
            {listSong.map((song, index) => {
                return <SongFull key={song.id} songId={song.id} indexSong={index} dataSong={song} />
            })}
        </ul>
    );
}
export default AlbumNewRelease;