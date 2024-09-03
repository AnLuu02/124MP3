import classNames from "classnames/bind";
import { useOutletContext } from "react-router-dom";
import SongOptions from "../../../../components/SongItem/SongOptions/SongOptions";
import styles from "./AlbumNewRelease.module.scss";
const cx = classNames.bind(styles);
function AlbumNewRelease() {
    const listSong = useOutletContext();
    return (
        <ul id={cx("data_library")} className={cx("music")}>
            {listSong.map((song, index) => {
                return <SongOptions key={song.id} songId={song.id} indexSong={index} dataSong={song} showIdSong={false} />
            })}
        </ul>
    );
}
export default AlbumNewRelease;