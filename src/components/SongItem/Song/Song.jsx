import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import { useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import 'tippy.js/dist/tippy.css';
import avatar_default from "../../../../public/images/avata_default.jpg";
import { playSong } from "../../../components/store/songReducer";
import MenuSongOptions from "../../Popper/MenuSongOptions/MenuSongOptions";
import AudioRun from "../AudioRun/AudioRun";
import RenderArtist from "../RenderArtist/RenderArtist";
import styles from "./Song.module.scss";
const cx = classNames.bind(styles);

function Song({ songId, indexSong, dataSong, classNames }) {
    const [valueMenu, setValueMenu] = useState({});
    const dispatch = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef();
    const refSong = useRef();

    const handleMusic = s => {
        dispatch(playSong({ song: s, indexSong: indexSong }));
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
            >
                <div className={cx("contentSong")}>
                    <div className={cx("thumbnailSong")}>
                        {/* <img src={dataSong.thumbnailUrl ?? avatar_default} alt="" /> */}
                        <LazyLoadImage
                            src={dataSong.thumbnailUrl ?? avatar_default}
                            alt=""
                            effect="blur"
                            className={cx("imgSong")}
                        />
                        <div
                            className={
                                cx(
                                    "playSong",
                                    isPlay && songId == song.id ? "active" : "pause"
                                )
                            }
                            onClick={() => handleMusic(dataSong)} >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faPlay} />
                        </div>
                        <AudioRun isPlay={isPlay} songId={songId} currentSongId={song.id} />
                    </div>
                    <div className={cx("desSong")}>
                        <div className={cx("nameSong")}>{dataSong.name}</div>
                        <RenderArtist dataArtist={dataSong.artist} />
                        <div className={cx("timeUpLoad")}>{dataSong?.release} </div>
                    </div>
                    <div className={cx("boxOption")} ref={refBoxOptions}>
                        <MenuSongOptions valueMenu={valueMenu} ref={[refBoxOptions, refSong]}>
                            <div
                                className={cx("options")}
                                onClick={handleClickShowMenu}
                            >
                                <FontAwesomeIcon className={cx("iconSong")} icon={faEllipsis} />
                            </div>
                        </MenuSongOptions>
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
    classNames: PropTypes.string
};

export default Song;