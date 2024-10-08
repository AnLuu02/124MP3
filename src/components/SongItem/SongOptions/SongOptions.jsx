import { faCaretDown, faCaretUp, faEllipsis, faMusic, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import { memo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import default_avatar from "../../../assets/images/default_avatar.png";
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
    isRank = false,
    loading = false
}) {
    const [valueMenu, setValueMenu] = useState({});
    const dispatch = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef()
    const refSong = useRef()
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
            {loading ?
                <li key={songId} ref={refSong} className={cx("song", classNames,)}>

                    <div className={cx("contentSong", "skeleton")}>
                        <div className={cx("thumbnailSong")}>
                            <div className={cx("skeleton_image")}>
                                <Skeleton variant="rectangular" animation="wave" sx={{ bgcolor: 'grey.600' }} />
                            </div>
                        </div>
                        <div className={cx("desSong")}>
                            <Skeleton animation="wave" sx={{ bgcolor: 'grey.600' }} width={"80%"} />
                            <Skeleton animation="wave" width="60%" sx={{ bgcolor: 'grey.600' }} />
                        </div>
                        <div className={cx("skeleton1")}>
                            <Skeleton animation="wave" sx={{ bgcolor: 'grey.600' }} width={"40%"} />
                        </div>
                        <div className={cx("skeleton2")}>
                            <Skeleton animation="wave" sx={{ bgcolor: 'grey.600' }} height={"100%"} />
                            <Skeleton animation="wave" sx={{ bgcolor: 'grey.600' }} height={"100%"} />
                            <Skeleton animation="wave" sx={{ bgcolor: 'grey.600' }} height={"100%"} />
                        </div>
                    </div>
                </li>
                : <li
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
                    {isRank &&
                        <> <div className={cx('rank')}>
                            <div className={cx('indexRank')} data-index={indexSong + 1}>{indexSong + 1}</div>
                        </div>
                            <div className={cx('stateRank')}>
                                {
                                    indexSong % 2 === 0 ?
                                        <FontAwesomeIcon className={cx("iconSong", "up")} icon={faCaretUp} />
                                        :
                                        <FontAwesomeIcon className={cx("iconSong", "down")} icon={faCaretDown} />
                                }

                            </div>
                        </>
                    }
                    <div className={cx("contentSong")}>
                        <div className={cx("thumbnailSong")}>
                            <LazyLoadImage
                                src={dataSong?.thumbnailUrl ?? default_avatar}
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
                            <div className={cx("nameSong")}>{dataSong?.name || "Chúng ta của hiện tại"}</div>
                            <RenderArtist dataArtist={dataSong?.artists} />
                        </div>
                        {showTimeUpLoad && <div className={cx("timeUpLoad")}>  {dataSong?.releaseDate} </div>}
                        <div className={cx("durationSong")}>{dataSong?.duration || "03:42"}</div>
                    </div>
                    <div className={cx("boxOption")} ref={refBoxOptions}>
                        <div className={cx("contentOption")}>
                            <div className={cx("addLibrary")} >
                                {/* <FontAwesomeIcon className={cx("iconSong")} icon={faHeart} /> */}
                                <div className={cx("iconSong")}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        height="20px"
                                        viewBox="0 -960 960 960"
                                        width="20px"
                                        fill="#e8eaed">
                                        <path
                                            d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                    </svg>
                                </div>
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
                </li>}
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
    loading: PropTypes.bool

};

const memoSongOptions = memo(SongOptions);
memoSongOptions.displayName = 'SongOptions';

export default SongOptions;