import { faCaretDown, faCaretUp, faEllipsis, faHeart, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import { memo, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import avatar_default from "../../../../public/images/avata_default.jpg";
import MenuSongOptions from "../../Popper/MenuSongOptions/MenuSongOptions";
import { playSong } from "../../store/songReducer";
import AudioRun from "../AudioRun/AudioRun";
import RenderArtist from "../RenderArtist/RenderArtist";
import styles from "./SongOptions.module.scss";
const cx = classNames.bind(styles);

function SongOptions({
    songId,
    indexSong,
    dataSong,
    classNames,
    showIdSong = true,
    showTimeUpLoad = true,
    isRank = false
}) {
    const [valueMenu, setValueMenu] = useState({});
    const dispatch = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef()
    const refSong = useRef()
    useEffect(() => {
        console.log(dataSong.artist)
    }, [])

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
                {showIdSong &&
                    <div className={cx('idSong')}>
                        <FontAwesomeIcon className={cx("iconSong")} icon={faMusic} />
                    </div>}
                {isRank && <div className={cx('rank')}>
                    <div className={cx('indexRank')} data-index={indexSong + 1}>{indexSong + 1}</div>
                    <div className={cx('stateRank')}>
                        {
                            indexSong % 2 === 0 ?
                                <FontAwesomeIcon className={cx("iconSong", "up")} icon={faCaretUp} />
                                :
                                <FontAwesomeIcon className={cx("iconSong", "down")} icon={faCaretDown} />
                        }

                    </div>
                </div>}
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
                                    (isPlay && songId == song.id) ? "active" : "pause"
                                )
                            }
                            onClick={() => handleMusic(dataSong)}
                        >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faPlay} />
                        </div>
                        <AudioRun isPlay={isPlay} songId={songId} currentSongId={song?.id} />
                    </div>
                    <div className={cx("desSong")}>
                        <div className={cx("nameSong")}>{dataSong.name || "Chúng ta của hiện tại"}</div>
                        <RenderArtist dataArtist={dataSong.artist} />
                    </div>
                    {showTimeUpLoad && <div className={cx("timeUpLoad")}>  {dataSong?.releaseDate} </div>}
                    <div className={cx("durationSong")}>{dataSong.duration || "03:42"}</div>
                </div>
                <div className={cx("boxOption")} ref={refBoxOptions}>
                    <div className={cx("contentOption")}>
                        <div className={cx("addLibrary")} >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faHeart} />
                        </div>
                        <MenuSongOptions valueMenu={valueMenu} ref={[refBoxOptions, refSong]}>
                            <div
                                className={cx("options")}
                                onClick={handleClickShowMenu}>
                                <FontAwesomeIcon className={cx("iconSong")} icon={faEllipsis} />
                            </div>
                        </MenuSongOptions>
                    </div>
                </div>
            </li>
        </>
    );
}
SongOptions.propTypes = {
    dataSong: object,
    songId: PropTypes.number.isRequired,
    indexSong: PropTypes.number.isRequired,
    classNames: PropTypes.string,
    showIdSong: PropTypes.bool,
    showTimeUpLoad: PropTypes.bool,
    isRank: PropTypes.bool,

};

const memoSongOptions = memo(SongOptions);
memoSongOptions.displayName = 'SongOptions';

export default SongOptions;