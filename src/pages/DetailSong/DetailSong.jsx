import { faHeart, faPause, faPlay, faPlus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar_default from "../../../public/images/avata_default.jpg";
import RenderArtist from "../../components/SongItem/RenderArtist/RenderArtist";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import { pauseSong, playSong } from "../../components/store/songReducer";
import useFetch from "../../Custom hooks/useFetch";
import styles from "./DetailSong.module.scss";
const cx = classNames.bind(styles);

function DetailSong() {
    const [songOwner, setSongOwner] = useState([]);
    const song = useSelector(state => state.song.song);
    const isPlay = useSelector(state => state.song.isPlay);
    const indexSong = useSelector(state => state.song.indexSong);
    const disPatch = useDispatch();
    const { get, loading } = useFetch(
        "http://localhost:3000/api/"
    )
    useEffect(() => {
        get(`musics?artist=${song?.artist}`)
            .then((data) => {
                setSongOwner(data)
            })
            .catch((error) => console.log("Goi API không này.", error));
    }, [song?.id]);

    const handleSong = useCallback((song) => {
        if (!isPlay) {
            disPatch(playSong({ song: song, indexSong: indexSong }));
        } else {
            disPatch(pauseSong(song));
        }
    }, [isPlay, indexSong, disPatch]);
    return (
        <>
            <div className={cx("playSong")} >
                <div className={cx("layoutLeft")}>
                    <div className={cx("boxAudio")}>
                        <img src={song?.thumbnailUrl ?? avatar_default} alt="" />
                        <div className={cx("boxControls")} onClick={() => handleSong(song)}>
                            <div className={cx("border1")}>
                                <FontAwesomeIcon icon={faPlay} className={cx("icon", !isPlay ? "active" : "")} />
                                <div className={cx("runAudio", isPlay ? "active" : "")} >
                                    <div><b></b><b></b><b></b><b></b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx("nameSong")}>{song?.name ?? "Xin chào Việt Nam"}</div>

                    <div className={cx("releaseDate")}>Cập nhật: {song?.releaseDate ?? "23-12-2023"}</div>
                    <div className={cx("artist")}><RenderArtist dataArtist={song?.artist} /></div>
                    <div className={cx("loveSong")}>247k lượt yêu thích</div>


                    <div className={cx("infoSong")}>
                    </div>

                    <div className={cx("controls")}>
                        <button className={cx("btnPlay", !isPlay ? "active" : "")} onClick={() => handleSong(song)}>
                            <FontAwesomeIcon icon={faPlay} className={cx("icon")} />TIẾP TỤC PHÁT
                        </button>
                        <button className={cx("btnPause", isPlay ? "active" : "")} onClick={() => handleSong(song)}>
                            <FontAwesomeIcon icon={faPause} className={cx("icon")} />TẠM DỪNG
                        </button>
                    </div>

                    <div className={cx("anotherChoice")}>
                        <div className={cx("boxIcon")} style={{ marginRight: 10 }}>
                            <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
                        </div>
                        <div className={cx("boxIcon")}>
                            <FontAwesomeIcon icon={faPlus} className={cx("icon")} />
                        </div>
                    </div>
                </div>


                <div className={cx("layoutRight")}>
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
                            {[1, 2].map((item, index) => {
                                return <SongOptions key={index + 1} songId={index + 1} indexSong={index + 1} dataSong={{ src: "" }} isRank showIdSong={false} />
                            }
                            )}
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
                                <h4>2</h4>
                                <h4>30/08/2024</h4>
                                <h4>Universal Music Group</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className={cx("playSong", "mobile")} >
                <div className={cx("layoutLeft")}>
                    <div className={cx("header")}>
                        <img src={avatar_default} />
                        <div className={cx("infoSong")}>
                            <h3>Yêu em thật đấy</h3>
                            <p>Đinh Tùng Huy, ACV</p>
                            <div className={cx("subInfo")}>
                                <div>
                                    <FontAwesomeIcon icon={faPlay} className={cx("icon")} />
                                    33.2M
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
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
                            <FontAwesomeIcon icon={faHeart} className={cx("icon")} />
                        </div>
                    </div>

                    <div className={cx("infoArtist")}>
                        <div>
                            <img src={avatar_default} />
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