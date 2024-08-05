import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'tippy.js/dist/tippy.css';
import AudioRun from "../AudioRun/AudioRun";
import Menu from "../Popper/Menu/Menu";
import { playSong } from "../store/songReducer";
import styles from "./Song.module.scss";
const cx = classNames.bind(styles);

function Song({ songId, indexSong, dataSong, classNames = {} }) {
    const [valueMenu, setValueMenu] = useState({});
    const dispath = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef();
    const refSong = useRef();

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
                <div className={cx("contentSong")}>
                    <div className={cx("imageSong")}>
                        <img src="../../../public/images/avata_default.jpg" alt="" />
                        <div
                            className={
                                cx(
                                    "playSong",
                                    ((isPlay && songId == song.id) || songId == song.id) ? "active" : ""
                                )
                            }
                            // onDoubleClick={() => handleMusic(dataSong)}
                            onClick={() => handleMusic(dataSong)} >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faPlay} />
                        </div>
                        <AudioRun isPlay={isPlay} songId={songId} currentSongId={song.id} />
                    </div>
                    <div className={cx("desSong")}>
                        <div className={cx("nameSong")}>{dataSong.name}</div>
                        <div className={cx("nameArtist")} >{dataSong.artist}</div>
                        <div className={cx("timeUpLoad")}>23-01-2002</div>
                    </div>
                    <div className={cx("boxOption")} ref={refBoxOptions}>
                        <Menu valueMenu={valueMenu} ref={[refBoxOptions, refSong]}>
                            <div
                                className={cx("options")}
                                onClick={handleClickShowMenu}
                            >
                                <FontAwesomeIcon className={cx("iconSong")} icon={faEllipsis} />
                            </div>
                        </Menu>
                    </div>
                </div>
            </li >
        </>
    );
}
Song.propTypes = {
    dataSong: object,
    songId: PropTypes.number.isRequired,
    indexSong: PropTypes.number.isRequired,
    classNames: PropTypes.object
};

export default Song;