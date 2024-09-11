import { faEllipsis, faMusic, faPause, faPlay, faPlus, faRotateLeft, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import album_default from "../../assets/images/album_default.png";
import default_avatar from "../../assets/images/default_avatar.png";
import { db } from "../../components/FireBase/firebaseConfig";
import LoadingText from "../../components/Loader1/LoadingText";
import AudioRun from "../../components/SongItem/AudioRun/AudioRun";
import RenderArtist from "../../components/SongItem/RenderArtist/RenderArtist";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import { setListSong } from "../../components/store/listSongReducer";
import { setSong } from "../../components/store/songReducer";

import { pauseSong, playSong } from "../../components/store/songReducer";
import useFetch from "../../Custom hooks/useFetch";
import formatNumberToString from "../../utils/formatNumberToString";
import { notifyError, notifySuccess } from "../../utils/toastifyMessage";
import styles from "./DetailSong.module.scss";
const cx = classNames.bind(styles);

function DetailSong() {
    const [songHint, setSongHint] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [allowSetNamePlaylist, setAllowSetNamePlaylist] = useState(false);

    const user = useSelector(state => state.user.user);
    const song = useSelector(state => state.song.song);
    const isPlay = useSelector(state => state.song.isPlay);
    const indexSong = useSelector(state => state.song.indexSong);
    const listSong = useSelector(state => state.listSong.listSong);
    const params = useParams();
    const { pathname } = useLocation();
    const disPatch = useDispatch();
    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);
    useEffect(() => {
        get(`musics?top=5`)
            .then((data) => {
                setSongHint(data)
            })
            .catch((error) => console.log("Goi API không này.", error));
    }, [songs?.length == 0]);


    useEffect(() => {
        if (pathname.includes("playlist")) {
            const getAllById = async () => {
                const playlistId = params?.filter;
                setLoading(true);
                if (user?.uid && playlistId) {
                    try {
                        const docRef = doc(db, 'playlistCollection', playlistId);
                        const docSnapshot = await getDoc(docRef);

                        let documents = [];

                        if (docSnapshot.exists() && docSnapshot.data().userId === user.uid) {
                            documents.push({ id: docSnapshot.id, ...docSnapshot.data() });
                        }
                        setPlaylists(documents);
                        setSongs(documents?.[0]?.Song)
                    } catch (e) {
                        console.error('Error getting documents:', e);
                    } finally {
                        setLoading(false);
                    }
                } else {
                    setLoading(false);
                }
            };

            getAllById();
        }
        else {
            let p = params.filter;
            console.log(p);

            let query = `musics`
            if (p == "noi-bat") {
                query += `?top=20`;
            }
            else if (p == "thinh-hanh") {
                query += `?topStart=21&topEnd=40`;
            }
            else {
                query += `?name=${p}`;
            }
            get(query)
                .then((data) => {
                    setSongs(data)
                    disPatch(setListSong(data))
                    setLoading(false);
                })
                .catch((error) => console.log("Goi API không này.", error));
        }
    }, [pathname]);

    const handleSong = useCallback((song) => {
        if (!isPlay) {
            let temp = song;

            if (!temp.id) {
                disPatch(setListSong(songs))
                disPatch(playSong({ song: { ...listSong?.[0] }, indexSong: 0 }));
            }
            else {
                disPatch(playSong({ song: temp, indexSong: 0 }));

            }
        } else {
            disPatch(pauseSong(song));
        }
    }, [isPlay, indexSong, disPatch]);


    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp?.seconds * 1000);

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('vi-VN', options);
    };
    const updateDocument = async (docId, updatedData) => {
        try {
            const docRef = doc(db, 'playlistCollection', docId);

            await updateDoc(docRef, updatedData);
            notifySuccess({ message: "Cập nhật tên playlist thành công." });

        } catch (error) {
            console.error('Có lỗi xảy ra khi cập nhật tài liệu:', error);
            notifyError({ message: "Có lỗi xảy ra khi cập nhật tài liệu." });
        }
    }

    const handleClickRename = () => {
        if (!allowSetNamePlaylist) {
            setAllowSetNamePlaylist(true);
            notifySuccess({ message: "Bắt đầu đổi tên" });
        }
    }
    const handleClickSaveName = (e) => {
        setAllowSetNamePlaylist(false);
        updateDocument(playlists?.[0]?.id, { namePlaylist: e.target.textContent });
    }
    return (
        <>
            <div className={cx("playSong")} >
                <div className={cx("layoutLeft")}>
                    <div className={cx("boxAudio")}>
                        <img src={
                            pathname.includes("playlist") ? album_default : song?.thumbnailUrl ? song?.thumbnailUrl : songs?.[0]?.thumbnailUrl
                        } alt="" />
                        <div className={cx("boxControls")} onClick={() => handleSong(song)}>
                            <div className={cx("border1")}>
                                {isPlay ? <AudioRun isPlay={isPlay} songId={song?.id} currentSongId={song?.id} /> : <FontAwesomeIcon icon={faPlay} className={cx("icon", !isPlay ? "active" : "")} />}

                            </div>
                        </div>
                    </div>
                    <div className={cx("nameSong")} >
                        {
                            (pathname.includes("playlist") && playlists?.[0]?.namePlaylist)
                                ?
                                <div contentEditable onBlur={handleClickSaveName} onClick={handleClickRename}>{playlists?.[0]?.namePlaylist} </div>
                                :
                                song?.name
                                    ?
                                    song?.name
                                    :
                                    songs?.[0]?.name
                                        ?
                                        songs?.[0]?.name
                                        :
                                        <Skeleton className={cx("skeleton")} width="60%" />

                        }
                        {playlists?.[0]?.namePlaylist && allowSetNamePlaylist && <FontAwesomeIcon icon={faCheck} className={cx("icon")} onClick={handleClickSaveName} />}
                    </div>

                    <div className={cx("releaseDate")} >
                        {playlists?.[0]?.timestamp
                            ?
                            `Cập nhật: ${formatTimestamp(playlists?.[0]?.timestamp)}`
                            :
                            song?.releaseDate
                                ?
                                `Cập nhật: ${song?.releaseDate}`
                                :
                                songs?.[0]?.releaseDate
                                    ?
                                    `Cập nhật: ${songs?.[0]?.releaseDate}`
                                    :
                                    <Skeleton className={cx("skeleton")} width="50%" />
                        }
                    </div>
                    <div className={cx("artist")}>
                        {
                            song?.name
                                ?
                                <RenderArtist dataArtist={song?.artists} />
                                :
                                songs?.[0]?.name
                                    ?
                                    <RenderArtist dataArtist={songs?.[0]?.artists} />
                                    :
                                    user.displayName
                                        ?
                                        user.displayName
                                        :
                                        <Skeleton className={cx("skeleton")} />
                        }
                    </div>
                    <div className={cx("loveSong")}>
                        {
                            song?.name
                                ?
                                `${formatNumberToString(song.like_count)} lượt yêu thích`
                                :
                                songs?.[0]?.name
                                    ?
                                    `${formatNumberToString(songs?.[0]?.like_count)} lượt yêu thích`
                                    :
                                    ""
                        }
                    </div>


                    <div className={cx("infoSong")}>
                    </div>

                    <div className={cx("controls")}
                        style={{ display: pathname.includes("playlist") ? "none" : "" }}
                    >
                        <button className={cx("btnPlay", !isPlay ? "active" : "")} onClick={() => handleSong(song)}>
                            <FontAwesomeIcon icon={faPlay} className={cx("icon")} />TIẾP TỤC PHÁT
                        </button>
                        <button className={cx("btnPause", isPlay ? "active" : "")} onClick={() => handleSong(song)}>
                            <FontAwesomeIcon icon={faPause} className={cx("icon")} />TẠM DỪNG
                        </button>
                    </div>

                    <div className={cx("anotherChoice")}>
                        {pathname.includes("playlist")
                            ?
                            <div className={cx("boxIcon")}>
                                <FontAwesomeIcon icon={faEllipsis} className={cx("icon")} />
                            </div>
                            :
                            <>
                                <div className={cx("boxIcon")} style={{ marginRight: 10 }}>
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
                                </div>
                                <div className={cx("boxIcon")}>
                                    <FontAwesomeIcon icon={faPlus} className={cx("icon")} />
                                </div>
                            </>
                        }

                    </div>
                </div>


                <div className={cx("layoutRight")}>
                    {loading ? <div className={cx("loader")}><LoadingText /></div>
                        :
                        songs?.length > 0 ? (
                            <>
                                <div className={cx("")} >
                                    <div className={cx("titleHeaderMusic")}>
                                        <div>
                                            <div className={cx("icon")} >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M6.5 2.75C6.08579 2.75 5.75 3.08579 5.75 3.5C5.75 3.91421 6.08579 4.25 6.5 4.25H17.5C17.9142 4.25 18.25 3.91421 18.25 3.5C18.25 3.08579 17.9142 2.75 17.5 2.75H6.5ZM3 9.5C3 7.42893 4.67893 5.75 6.75 5.75H17.25C19.3211 5.75 21 7.42893 21 9.5V17.5C21 19.5711 19.3211 21.25 17.25 21.25H6.75C4.67893 21.25 3 19.5711 3 17.5V9.5ZM6.75 7.25C5.50736 7.25 4.5 8.25736 4.5 9.5V17.5C4.5 18.7426 5.50736 19.75 6.75 19.75H17.25C18.4926 19.75 19.5 18.7426 19.5 17.5V9.5C19.5 8.25736 18.4926 7.25 17.25 7.25H6.75ZM13.666 8.87596C13.4359 8.72253 13.14 8.70823 12.8961 8.83874C12.6522 8.96926 12.5 9.2234 12.5 9.5V13.0499C12.125 12.8581 11.7001 12.75 11.25 12.75C9.73122 12.75 8.5 13.9812 8.5 15.5C8.5 17.0188 9.73122 18.25 11.25 18.25C12.6911 18.25 13.8733 17.1415 13.9905 15.7307C13.9967 15.6916 14 15.6515 14 15.6107V15.5V10.9014L15.084 11.624C15.4286 11.8538 15.8943 11.7607 16.124 11.416C16.3538 11.0714 16.2607 10.6057 15.916 10.376L13.666 8.87596ZM12.5 15.5C12.5 14.8096 11.9404 14.25 11.25 14.25C10.5596 14.25 10 14.8096 10 15.5C10 16.1904 10.5596 16.75 11.25 16.75C11.9404 16.75 12.5 16.1904 12.5 15.5Z"
                                                        fillOpacity="0.8">

                                                    </path>
                                                </svg>
                                            </div>
                                            BÀI HÁT
                                        </div>
                                        <div>THỜI GIAN</div>
                                    </div>
                                    <hr className={cx("line1")} />
                                    <ul className={cx("music")}>
                                        {
                                            songs?.map((item, index) => (
                                                <SongOptions
                                                    key={item?.id}
                                                    songId={item?.id}
                                                    indexSong={index}
                                                    dataSong={item}
                                                    showIdSong={false}
                                                />
                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className={cx("infoAlbum")}>
                                    <h3>Thông tin</h3>
                                    <div className={cx("subInfo")}>
                                        <div className={cx('left')}>
                                            <h4>Số bài hát</h4>
                                            <h4>Ngày phát hành </h4>
                                            <h4>Cung cấp bởi</h4>
                                        </div>
                                        <div className={cx('right')}>
                                            <h4>{songs?.length ?? 1}</h4>
                                            <h4>{
                                                playlists?.[0]?.timestamp
                                                    ?
                                                    formatTimestamp(playlists?.[0]?.timestamp)
                                                    :
                                                    song?.releaseDate
                                                        ?
                                                        song?.releaseDate
                                                        :
                                                        songs?.[0]?.releaseDate
                                                            ?
                                                            songs?.[0]?.releaseDate
                                                            :
                                                            <Skeleton className={cx("skeleton")
                                                            }
                                                            />}</h4>
                                            <h4>{playlists?.[0]?.namePlaylist ?? "124Mp3 Media"}</h4>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) :
                            <>
                                <div className={cx("noSong")}>
                                    <div><FontAwesomeIcon icon={faMusic} className={cx("icon")} /></div>
                                    <div>Không có bài hát trong playlist của bạn</div>
                                </div>
                                <hr className={cx("line1")} />
                                <div className={cx("titleHint")}>
                                    <div>Gợi ý cho bạn</div>
                                    <div>
                                        <FontAwesomeIcon icon={faRotateLeft} className={cx("icon")} />
                                        <div>Làm mới</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 14, padding: "0 0 15px", color: "rgba(255,255,255,.4)" }}>Dựa trên tiêu đề của playlist này</div>
                                <ul className={cx("music")}>
                                    {
                                        Array.isArray(songHint) && songHint?.map((item, index) => (
                                            <SongOptions
                                                key={item?.id}
                                                songId={item?.id}
                                                indexSong={index}
                                                dataSong={item}
                                                showIdSong={false}
                                            />
                                        ))
                                    }
                                </ul>
                            </>
                    }


                </div >
            </div >
            <div className={cx("playSong", "mobile")} >
                <div className={cx("layoutLeft")}>
                    <div className={cx("header")}>
                        <img src={default_avatar} />
                        <div className={cx("infoSong")}>
                            <h3>Yêu em thật đấy</h3>
                            <p>Đinh Tùng Huy, ACV</p>
                            <div className={cx("subInfo")}>
                                <div>
                                    <FontAwesomeIcon icon={faPlay} className={cx("icon")} />
                                    33.2M
                                </div>
                                <div>
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
                                    1.9M
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("downLoad")}>Tải làm nhạc chờ</div>
                    <div className={cx("controls")}>
                        <div>
                            <FontAwesomeIcon icon={faPlay} className={cx("icon")} />
                        </div>
                        <div className={cx("btn")}>
                            <button className={cx("btnPlay", "active")}>
                                <div>
                                    <FontAwesomeIcon icon={faPlay} className={cx("icon")} style={{ display: "none" }} />
                                    <FontAwesomeIcon icon={faPause} className={cx("icon")} />
                                </div>00:00
                            </button>
                        </div>
                        <div>
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
                        </div>
                    </div>

                    <div className={cx("infoArtist")}>
                        <div>
                            <img src={default_avatar} />
                        </div>
                        <div className={cx("info")}>
                            <h3>Đinh Tùng Huy</h3>
                            <p>101.7k người theo dõi</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
                        </div>
                    </div>
                    <hr className={cx('line')} />
                    <div className={cx("lyric")}>
                        <h4>Lời bài hát: Yêu Thật Đấy</h4>
                        <p>Đóng góp bởi mp3</p>
                        <div className={cx("lyricContent")}>
                            Anh muốn hỏi em một câu nữa thôi<br />
                            Thật lòng em đi, trong em anh là gì<br />
                            Câu trả lời anh nhận lại, trong giây phút chia hai<br />
                            Vậy là bấy lâu nay, anh là người thế vai<br /><br />

                            Anh muốn hỏi thêm một câu nữa thôi<br />
                            Là chia tay anh, em đến với người mới<br />
                            Hay chỉ là quay ngược lại nơi em đã buông ra<br />
                            Nơi mà em giá như chưa từng phải ghé qua.<br /><br />

                            Đk:<br />
                            Anh yêu em thật đấy yêu hết cuộc đời này<br />
                            Nhưng anh nhận lấy đau thương và đổi thay<br />
                            Cố chấp nhận hết, nén đau thương anh đợi<br />
                            Chỉ mong em thương anh một chút thôi<br /><br />

                            Nếu em đi thì xin cho anh theo với<br />
                            Anh muốn bên em đến hết tận cuộc đời<br />
                            Đến nơi đâu bình yên đây bàn tay anh đưa lối<br />
                            Có khó không em, hay đã thương ai rồi<br />
                            Em biết không em - Anh yêu em thật đấy<br /><br />

                        </div>
                    </div>
                </div>


                <div className={cx("layoutRight")}>
                    <div className={cx("infoAlbum")}>
                        <h3>Thông tin</h3>
                        <div className={cx("subInfo")}>
                            <div className={cx('left')}>
                                <h4>Album</h4>
                                <h4>Ngày phát hành </h4>
                                <h4>Cung cấp bởi</h4>
                            </div>
                            <div className={cx('right')}>
                                <h4>Tình yêu và cuộc sống</h4>
                                <h4>30/08/2024</h4>
                                <h4>Universal Music Group</h4>
                            </div>
                        </div>
                    </div>
                    <div className={cx("boxHintMusic")} >
                        <h3 className={cx("titleHintMusic")}>Có thể bạn quan tâm</h3>
                        <ul className={cx("music")}>
                            {[1, 2].map((item, index) => {
                                return <SongOptions key={index + 1} songId={index} indexSong={index} dataSong={{ src: "" }} isRank showIdSong={false} />
                            }
                            )}
                        </ul>
                        <ul className={cx("music", "mobile")}>
                            {[1, 2].map((item, index) => {
                                return <SongOptions key={index + 1} songId={index} indexSong={index} dataSong={{ src: "" }} showIdSong={false} isOptions={false} />
                            }
                            )}
                        </ul>
                    </div>

                </div>
            </div >
        </>

    )
}
export default DetailSong