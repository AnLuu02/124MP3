import classNames from "classnames/bind";
import { useOutletContext } from "react-router-dom";
import Song from "../../../../components/SongItem/Song/Song";
import SongSkeleton from "../Skeleton/SongSkeleton";
import styles from "./SongDiscover.module.scss";
const cx = classNames.bind(styles);
function SongDiscover() {
    const listSong = useOutletContext().listSong;
    const loading = useOutletContext().loading;
    return (
        <div className={cx("listSong")}>
            {
                loading
                    ?
                    <SongSkeleton />
                    :
                    <ul className={cx("music", "listSongRender")}>
                        {listSong.map((song, index) => {
                            return <Song key={song.id} classNames={cx("custom")} songId={song.id} indexSong={index} dataSong={song} />
                        })}
                    </ul >
            }

        </div>
    );
}
export default SongDiscover;