import { faBackwardStep, faCompactDisc, faEllipsis, faForwardStep, faHeadphones, faMicrophone, faPause, faPlay, faRepeat, faShuffle, faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import default_avatar from "../../assets/images/default_avatar.png";
import { db } from "../../components/FireBase/firebaseConfig";
import MenuSongOptions from "../../components/Popper/MenuSongOptions/MenuSongOptions";
import AudioRun from "../../components/SongItem/AudioRun/AudioRun";
import RenderArtist from "../../components/SongItem/RenderArtist/RenderArtist";
import { changeVolume, minuteTimeSong, nextSong, pauseSong, playSong, prevSong, randomSong, repeatSong, secondTimeSong, timeProgress, timeUpdateSong } from "../../components/store/songReducer";
import { notifyError, notifySuccess } from "../../utils/toastifyMessage";
import styles from "./Footer.module.scss";
const cx = classNames.bind(styles);

function Footer() {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [zoomOut, setZoomOut] = useState(false);
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
    const user = useSelector(state => state.user.user)
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

    const handleGetPlaylist = () => {
        const getAllPlaylist = async () => {
            if (user?.uid) {
                const q = query(collection(db, 'playlistCollection'), where('userId', '==', user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    const documents = [];
                    querySnapshot.forEach((doc) => {
                        documents.push({ id: doc.id, ...doc.data() });
                    });
                    setPlaylists(documents);
                    notifySuccess({ message: "Lấy danh sách playlist thành công!" });
                } catch (e) {
                    console.error('Error getting documents:', e);
                } finally {
                    setLoading(false);
                }
            } else {
                notifyError({ message: "Đăng nhập để tiếp tục!" });
            }
        };

        getAllPlaylist();
    }

    const handleZoom = () => {
        setZoomOut(!zoomOut);
    }

    return (
        <>
            <footer className={cx("footer")}>
                <span>Copyright © 2023<a href="https://www.facebook.com/anluu099/"> Design and Code By An.</a> Tham khảo thoải mái 😄 </span>
            </footer>

            <div className={cx("musicFixed", isPlay || song.id ? "active" : "", zoomOut ? "zoomOut" : "")} >
                <div className={cx("leftMusicFixed")}>
                    <NavLink to={`/album/noi-bat`}>
                        <div className={cx("imgMusicFixed", isPlay && zoomOut ? "zoomOut" : "")}>
                            <img src={song.thumbnailUrl ?? default_avatar} alt="" />
                            {isPlay && zoomOut && <AudioRun isPlay={isPlay} songId={song.id} currentSongId={song.id} />}
                        </div>
                    </NavLink>
                    <div className={cx("desMusicFixed")}>
                        <div className={cx("nameMusicFixed")}><a>{song.name}</a></div>
                        <RenderArtist classNames={cx("nameArtistFixed")} dataArtist={song.artist} />

                    </div>
                    <div className={cx("AnotherChoiceFixed")}>
                        <div className={cx("icon")}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 -960 960 960"
                                width="20px"
                                fill="#e8eaed">
                                <path
                                    d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                            </svg>
                        </div>
                        {/* <CustomizedMenus mainIcon={faHeart} /> */}
                        <MenuSongOptions valueMenu={song} ref={[null, null]} placement={"top-end"}>
                            <div className={cx("icon")} >
                                <FontAwesomeIcon className={cx("iconFixed")} icon={faEllipsis} />

                            </div>
                        </MenuSongOptions>
                        {/* <div className={cx("icon")} >
                            <FontAwesomeIcon className={cx("iconFixed")} icon={faEllipsis} />

                        </div> */}
                        <div className={cx("iconZoomIn", { "active": !zoomOut })} onClick={handleZoom}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-240h80v104l124-124 56 56-124 124h104v80H120Zm480 0v-80h104L580-324l56-56 124 124v-104h80v240H600ZM324-580 200-704v104h-80v-240h240v80H256l124 124-56 56Zm312 0-56-56 124-124H600v-80h240v240h-80v-104L636-580Z" /></svg>
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
                    <div className={cx("iconZoomOut")} onClick={handleZoom}>
                        {/* <FontAwesomeIcon className={cx("iconFixed")} icon={faExpand} /> */}
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m156-100-56-56 124-124H120v-80h240v240h-80v-104L156-100Zm648 0L680-224v104h-80v-240h240v80H736l124 124-56 56ZM120-600v-80h104L100-804l56-56 124 124v-104h80v240H120Zm480 0v-240h80v104l124-124 56 56-124 124h104v80H600Z" /></svg>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;