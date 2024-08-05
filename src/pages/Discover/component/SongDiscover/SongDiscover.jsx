import classNames from "classnames/bind";
import { useOutletContext } from "react-router-dom";
import Song from "../../../../components/Song/Song";
import styles from "./SongDiscover.module.scss";
const cx = classNames.bind(styles);
function SongDiscover() {
    const listSong = useOutletContext();
    return (
        <div className={cx("listSong")}>
            <ul className={cx("music", "listSongRender")}>
                {listSong.map((song, index) => {
                    return <Song key={song.id} classNames={cx("custom")} songId={song.id} indexSong={index} dataSong={song} />
                })}
            </ul >
        </div>
    );
}
export default SongDiscover;