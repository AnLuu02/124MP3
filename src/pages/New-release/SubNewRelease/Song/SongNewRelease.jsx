import classNames from "classnames/bind";
import { useOutletContext } from "react-router-dom";
import SongFull from "../../../../components/SongFull/SongFull";
import styles from "./SongNewRelease.module.scss";
const cx = classNames.bind(styles);
function SongNewRelease() {
    const listSong = useOutletContext();
    return (
        <ul id={cx("dataRelease")} className={cx("music")}>
            {listSong.map((song, index) => {
                return <SongFull key={song.id} songId={song.id} indexSong={index} dataSong={song} />
            })}
        </ul>
    );
}
export default SongNewRelease;