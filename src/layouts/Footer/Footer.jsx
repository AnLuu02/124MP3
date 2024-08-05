import { faBackwardStep, faCompactDisc, faForwardStep, faHeadphones, faHeart, faIcons, faMicrophone, faPause, faPlay, faPlus, faRepeat, faShuffle, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeVolume, minuteTimeSong, nextSong, pauseSong, playSong, prevSong, randomSong, repeatSong, secondTimeSong, timeProgress, timeUpdateSong } from "../../components/store/songReducer";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

function Footer() {
    const progressRef = useRef();
    const progressColorRef = useRef();
    const progressColorVolumeRef = useRef();
    const runTimeSongRef = useRef();
    const totalTimeSongRef = useRef();

    const disPath = useDispatch();
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

    const handleSong = song => {
        if (!isPlay) {
            disPath(playSong({ song: song, indexSong: indexSong }));
        }
        else {
            disPath(pauseSong(song));

        }
    }
    useEffect(() => {
        progressRef.current.value = timeProgressSong;
        runTimeSongRef.current.textContent = `${minuteTimeSongCur}:${secondTimeSongCur}`;
        progressColorRef.current.style.right = 100 - timeProgressSong + '%';
    }, [currentTimeSong, minuteTimeSongCur, secondTimeSongCur, timeProgressSong]);

    const handleChangeTimeSong = e => {
        if (currentTimeSong.currentTime) {
            const seekTime = (currentTimeSong.duration / 100) * Number(e.target.value);
            disPath(timeUpdateSong({ currentTime: seekTime.toFixed(0), durationTime: currentTimeSong.duration }))

        }
    }
    const handleChangeVolumeSong = e => {
        let volumeVal = (e.target.value) / 100;
        disPath(changeVolume(volumeVal));
        progressColorVolumeRef.current.style.right = (1 - volumeVal) * 100 + '%'
    }

    const handleNextSong = (index) => {
        let currentIndex = index;
        currentIndex = currentIndex + 1;

        if (listSong.length && currentIndex > listSong.length - 1) {
            currentIndex = 0;
        }
        disPath(nextSong({ song: listSong[currentIndex], indexSong: currentIndex }));

    }
    const handlePrevSong = (index) => {
        let currentIndex = index;
        currentIndex = currentIndex - 1;
        if (listSong.length && currentIndex < 0) {
            currentIndex = listSong.length - 1;
        }
        disPath(prevSong({ song: listSong[currentIndex], indexSong: currentIndex }));

    }
    const handleRepeatSong = () => {
        disPath(repeatSong(!isRepeat));
    }
    const handleRandomSong = () => {
        disPath(randomSong(!isRandom));
    }
    const handleOnVolumeSong = () => {
        disPath(changeVolume(0));
        let volumeVal = 0;
        progressColorVolumeRef.current.style.right = (1 - volumeVal) * 100 + '%'

    }
    const handleOffVolumeSong = () => {
        disPath(changeVolume(0.5));
        let volumeVal = 0.5;
        progressColorVolumeRef.current.style.right = (1 - volumeVal) * 100 + '%'

    }


    return (
        <>
            <footer className={cx("footer")}>
                <span>Copyright © 2023<a href="https://www.facebook.com/anluu099/"> Design and Code By An.</a> Tham khảo thoải mái 😄 </span>
            </footer>

            <div className={cx("musicFixed", isPlay || song.id ? "active" : "")}>
                <div className={cx("leftMusicFixed")}>
                    <img src="../../../public/images/1.jpg" alt="" />
                    <div className={cx("desMusicFixed")}>
                        <div className={cx("nameMusicFixed")}><a>{song.name}</a></div>
                        <div id={cx("nameArtist")} >{song.artist}</div>

                    </div>
                    <div className={cx("AnotherChoiceFixed")}>
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
                        <div className={cx("sumTime")} ref={totalTimeSongRef}>{song.time}</div>
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