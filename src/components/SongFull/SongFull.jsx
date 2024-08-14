import { faEllipsis, faHeart, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar_default from "../../../public/images/avata_default.jpg";
import AudioRun from "../AudioRun/AudioRun";
import Menu from "../Popper/Menu/Menu";
import { playSong } from "../store/songReducer";
import styles from "./SongFull.module.scss";
const cx = classNames.bind(styles);

function SongFull({ songId, indexSong, dataSong, classNames = {}, showIdSong = true, showTimeUpLoad = true }) {
    const [valueMenu, setValueMenu] = useState({});
    const dispath = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef()
    const refSong = useRef()

    const handleMusic = s => {
        dispath(playSong({ song: s, indexSong: indexSong }));
    }
    const handleClickShowMenu = () => {
        setValueMenu({
            ...dataSong
        })
    }
    return (
        <>
            <li
                key={songId}
                ref={refSong}
                className={
                    cx(
                        "song",
                        classNames,
                        ((isPlay && songId == song.id) || songId == song.id) ? "active" : ""
                    )
                }
                onDoubleClick={() => handleMusic(dataSong)}
            >
                {showIdSong &&
                    <div className={cx('idSong')}>
                        <FontAwesomeIcon className={cx("iconSong")} icon={faMusic} />
                    </div>}
                <div className={cx("contentSong")}>
                    <div className={cx("imageSong")}>
                        <img src={avatar_default} alt="" />
                        <div
                            className={
                                cx(
                                    "playSong",
                                    ((isPlay && songId == song.id) || songId == song.id) ? "active" : ""
                                )
                            }
                            onClick={() => handleMusic(dataSong)}
                        >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faPlay} />
                        </div>
                        <AudioRun isPlay={isPlay} songId={songId} currentSongId={song.id} />
                    </div>
                    <div className={cx("desSong")}>
                        <div className={cx("nameSong")}>{dataSong.name || "Chúng ta của hiện tại"}</div>
                        <div className={cx("nameArtist")} >{dataSong.artist || "Sơn Tùng - MTP"}</div>
                    </div>
                    {showTimeUpLoad && <div className={cx("timeUpLoad")}>  Hôm nay </div>}
                    <div className={cx("durationSong")}>{dataSong.time || "03:42"}</div>
                </div>
                <div className={cx("boxOption")} ref={refBoxOptions}>
                    <div className={cx("contentOption")}>
                        <div className={cx("addLibrary")} >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faHeart} />
                        </div>
                        <Menu valueMenu={valueMenu} ref={[refBoxOptions, refSong]}>
                            <div
                                className={cx("options")}
                                onClick={handleClickShowMenu}>
                                <FontAwesomeIcon className={cx("iconSong")} icon={faEllipsis} />
                            </div>
                        </Menu>
                    </div>
                </div>
            </li>
        </>
    );
}
SongFull.propTypes = {
    dataSong: object,
    songId: PropTypes.number.isRequired,
    indexSong: PropTypes.number.isRequired,
    classNames: object,
    showIdSong: PropTypes.bool,
    showTimeUpLoad: PropTypes.bool

};

export default SongFull;