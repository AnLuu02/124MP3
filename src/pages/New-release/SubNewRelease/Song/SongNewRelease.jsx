import classNames from "classnames/bind";
import { useOutletContext } from "react-router-dom";
import SongOptions from "../../../../components/SongItem/SongOptions/SongOptions";
import styles from "./SongNewRelease.module.scss";
const cx = classNames.bind(styles);
function SongNewRelease() {
    const listSong = useOutletContext();
    return (
        <ul id={cx("dataRelease")} className={cx("music")}>
            {listSong.map((song, index) => {
                return <SongOptions key={song.id} songId={song.id} indexSong={index} dataSong={song} showIdSong={false} />
            })}
        </ul>
    );
}
export default SongNewRelease;