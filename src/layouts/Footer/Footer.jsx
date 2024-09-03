import { faBackwardStep, faCompactDisc, faForwardStep, faHeadphones, faHeart, faIcons, faMicrophone, faPause, faPlay, faPlus, faRepeat, faShuffle, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import avatar_default from "../../../public/images/avata_default.jpg";
import RenderArtist from "../../components/SongItem/RenderArtist/RenderArtist";
import { changeVolume, minuteTimeSong, nextSong, pauseSong, playSong, prevSong, randomSong, repeatSong, secondTimeSong, timeProgress, timeUpdateSong } from "../../components/store/songReducer";
import CustomizedMenus from "../../pages/SearchResult/Mobile/Menu";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

function Footer() {
    const progressRef = useRef();
    const progressColorRef = useRef();
    const progressColorVolumeRef = useRef();
    const runTimeSongRef = useRef();
    const totalTimeSongRef = useRef();

    const disPatch = useDispatch();
    const listSong = useSelector(state => state.listSong.listSong);
    const song = useSelector(state => state.song.song)
    const indexSong = useSelector(state => state.song.indexSong)
    const isPlay = useSelector(state => state.song.isPlay)
    const isRepeat = useSelector(state => state.song.isRepeat)
    const isRandom = useSelector(state => state.song.isRandom)
    const currentTimeSong = useSelector(state => state.song.currentTimeSong)
    const currentVolume = useSelector(state => state.song.volume)
    const timeProgressSong = useSelector(timeProgress);
    const secondTimeSongCur = useSelector(secondTimeSong);
    const minuteTimeSongCur = useSelector(minuteTimeSong);

    useEffect(() => {
        if (progressRef.current) {
            progressRef.current.value = timeProgressSong;
        }
        if (runTimeSongRef.current) {
            runTimeSongRef.current.textContent = `${minuteTimeSongCur}:${secondTimeSongCur}`;
        }
        if (progressColorRef.current) {
            progressColorRef.current.style.right = `${100 - timeProgressSong}%`;
        }
    }, [currentTimeSong, minuteTimeSongCur, secondTimeSongCur, timeProgressSong]);


    const handleSong = useCallback((song) => {
        if (!isPlay) {
            disPatch(playSong({ song: song, indexSong: indexSong }));
        } else {
            disPatch(pauseSong(song));
        }
    }, [isPlay, indexSong, disPatch]);


    const handleChangeTimeSong = useCallback((e) => {
        if (currentTimeSong.current && currentTimeSong.current.duration) {
            const seekTime = (currentTimeSong.current.duration / 100) * Number(e.target.value);
            disPatch(timeUpdateSong({ currentTime: seekTime.toFixed(0), durationTime: currentTimeSong.current.duration }));
        }
    }, [currentTimeSong, disPatch]);


    const handleChangeVolumeSong = useCallback((e) => {
        let volumeVal = e.target.value / 100;
        disPatch(changeVolume(volumeVal));
        progressColorVolumeRef.current.style.right = (1 - volumeVal) * 100 + '%';
    }, [disPatch]);

    const handleNextSong = useCallback(() => {
        let currentIndex = indexSong + 1;
        if (listSong.length && currentIndex > listSong.length - 1) {
            currentIndex = 0;
        }
        disPatch(nextSong({ song: listSong[currentIndex], indexSong: currentIndex }));
    }, [indexSong, listSong, disPatch]);

    const handlePrevSong = useCallback(() => {
        let currentIndex = indexSong - 1;
        if (listSong.length && currentIndex < 0) {
            currentIndex = listSong.length - 1;
        }
        disPatch(prevSong({ song: listSong[currentIndex], indexSong: currentIndex }));
    }, [indexSong, listSong, disPatch]);

    const handleRepeatSong = useCallback(() => {
        disPatch(repeatSong(!isRepeat));
    }, [isRepeat, disPatch]);

    const handleRandomSong = useCallback(() => {
        disPatch(randomSong(!isRandom));
    }, [isRandom, disPatch]);

    const handleOnVolumeSong = useCallback(() => {
        disPatch(changeVolume(0));
        let volumeVal = 0;
        progressColorVolumeRef.current.style.right = (1 - volumeVal) * 100 + '%';
    }, [disPatch]);


    const handleOffVolumeSong = useCallback(() => {
        disPatch(changeVolume(0.5));
        let volumeVal = 0.5;
        progressColorVolumeRef.current.style.right = (1 - volumeVal) * 100 + '%';
    }, [disPatch]);

    const handleDetailsSong = useCallback((song) => {

    })
    return (
        <>
            <footer className={cx("footer")}>
                <span>Copyright © 2023<a href="https://www.facebook.com/anluu099/"> Design and Code By An.</a> Tham khảo thoải mái 😄 </span>
            </footer>

            <div className={cx("musicFixed", isPlay || song.id ? "active" : "")}>
                <div className={cx("leftMusicFixed")}>
                    <NavLink to={`/album`}>
                        <img src={song.thumbnailUrl ?? avatar_default} alt="" onClick={() => handleDetailsSong(song)} />
                    </NavLink>
                    <div className={cx("desMusicFixed")}>
                        <div className={cx("nameMusicFixed")}><a>{song.name}</a></div>
                        <RenderArtist dataArtist={song.artist} />

                    </div>
                    <div className={cx("AnotherChoiceFixed")}>
                        <CustomizedMenus />
                        <div className={cx("addLibrary")} id={cx("addLibrary")}>
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faHeart} />
                        </div>
                        <div className={cx("addPlaylist")} id={cx("addPlaylist")}>
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faPlus} />
                        </div>
                    </div>

                </div>
                <div className={cx("centerMusicFixed")}>
                    <ul className={cx("navMusicFixed")}>
                        <li className={cx("randomMusic", isRandom ? "active" : "")} onClick={() => handleRandomSong()}>
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faShuffle} />
                        </li>
                        <li className={cx("prevMusic")} onClick={() => handlePrevSong(indexSong)}>
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faBackwardStep} />

                        </li>
                        <li className={cx("controlsMusic")} onClick={() => handleSong(song)}>
                            <FontAwesomeIcon className={cx("iconFixed", !isPlay ? "active" : "")} icon={faPlay} />
                            <FontAwesomeIcon icon={faPause} className={cx("iconFixed", isPlay ? "active" : "")} />

                        </li>
                        <li className={cx("nextMusic")} onClick={() => handleNextSong(indexSong)}>
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faForwardStep} />
                        </li>
                        <li className={cx("repeatMusic", isRepeat ? "active" : "")} onClick={handleRepeatSong}>
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faRepeat} />
                        </li>
                    </ul>

                    <div className={cx("sliderMusic")}>
                        <div className={cx("runTime")} ref={runTimeSongRef}>00:00</div>
                        <div className={cx("slider")}>
                            <input onChange={handleChangeTimeSong} ref={progressRef} id={cx("progress")} className={cx("progress")} type="range" value={0} step="1" min="0" max="100" />
                            <div className={cx("progressColor")} ref={progressColorRef}></div>
                        </div>
                        <div className={cx("sumTime")} ref={totalTimeSongRef}>{song?.duration}</div>
                    </div>
                </div>

                <div className={cx("rightMusicFixed")}>
                    <FontAwesomeIcon className={cx("iconFixed")} icon={faCompactDisc} />

                    <FontAwesomeIcon className={cx("iconFixed")} icon={faHeadphones} />

                    <FontAwesomeIcon className={cx("iconFixed")} icon={faMicrophone} />
                    <div className={cx("volumeMusic")} >
                        <FontAwesomeIcon icon={faVolumeHigh} onClick={handleOnVolumeSong} className={cx("iconFixed", "high", currentVolume > 0 ? "active" : "")} />
                        <FontAwesomeIcon icon={faVolumeMute} onClick={handleOffVolumeSong} className={cx("iconFixed", "mute", currentVolume <= 0 ? "active" : "")} />

                        <div className={cx("sliderMusic")}>
                            <div className={cx("slider")}>
                                <input id={cx("volumn")} onChange={handleChangeVolumeSong} className={cx("progress")} type="range" value={50} min="0" max="100" />
                                <div ref={progressColorVolumeRef} className={cx("progressColor")}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("line")}></div>
                    <div className={cx("btn_run_listPlaymusic")}>
                        <FontAwesomeIcon className={cx("iconFixed")} icon={faIcons} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;