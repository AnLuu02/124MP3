import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Song from "../../../../components/SongItem/Song/Song";
import styles from "./SongDiscover.module.scss";
const cx = classNames.bind(styles);
function SongDiscover() {
    const listSong = useOutletContext().listSong;
    const loading = useOutletContext().loading;
    const [dataSong, setDataSong] = useState([{ id: 159226325 }, { id: 1596223251 }, { id: 159631255 }, { id: 15963251 }, { id: 1596325858 }, { id: 15963253333 }, { id: 15963254447 }, { id: 1596325669 }, { id: 1596325114785 }]);
    useEffect(() => {
        if (listSong?.length > 0) {
            setDataSong(listSong)
        }
    }, [listSong])
    return (
        <div className={cx("listSong")}>
            {
                <ul className={cx("music", "listSongRender")}>
                    {dataSong.map((song, index) => {
                        return <Song key={song.id} classNames={cx("custom")} songId={song.id} indexSong={index} dataSong={song} loading={loading} />
                    })}
                </ul >
            }

        </div>
    );
}
export default SongDiscover;