import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import default_avatar from "../../../public/images/default_avatar.png";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import { handleShowModal } from "../../components/store/ModalReducer/modalReducer";
import AlbumItemCircle from "../../components/WidgetAlbum/AlbumItemCircle/AlbumItemCircle";
import useFetch from "../../Custom hooks/useFetch";
import styles from "./Artist.module.scss";
const cx = classNames.bind(styles);

function Artist() {
    const dispatch = useDispatch();
    const [artist, setArtist] = useState({});
    const [songOwner, setSongOwner] = useState([]);
    const [artistSuggest, setArtistSuggest] = useState([]);


    const song = useSelector(state => state.song.song);



    let params = useParams();

    const { get } = useFetch(import.meta.env.VITE_API_URL);

    useEffect(() => {
        get(`artist?name=${params.artist}`)
            .then((data) => {
                if (data) {
                    setArtist(data[0]);
                }

            })
            .catch((error) => console.log("Goi API không được.", error));

    }, [params.artist])

    useEffect(() => {
        get(`artist?limit=10`)
            .then((data) => {
                if (data) {
                    setArtistSuggest(data);
                }
            })
            .catch((error) => console.log("Goi API không được.", error));

    }, [])
    useEffect(() => {
        get(`musics?artistId=${artist?.id}`)
            .then((data) => {
                if (data) {
                    setSongOwner(data);
                }
            })
            .catch((error) => console.log("Goi API không được.", error));

    }, [params.artist, artist?.id])



    function renderDesArtist(des) {
        if (des?.split("")?.length > 350) {
            const temp = des?.split("")?.slice(0, 350)?.join("");
            return temp + "...";
        }
        return des;
    }
    const showAllDes = () => {
        dispatch(handleShowModal("MODAL_SHOW_ALL_DESCRIPTION_ARTIST", artist));
    }
    return (
        <div className={cx("view_artist", song.name ? "hasBottomMusicFixed" : "")}>
            <div className={cx("header_view_artist")}>
                {/*rgba(41, 21, 71, 0.8)*/}
                <div className={cx("content_header")}>
                    <div className={cx("left_view_header")}>
                        <img src={artist?.profileImage ?? default_avatar} alt="" className={cx("avatar_artist")} />
                    </div>
                    <div className={cx("right_view_header")}>
                        <div className={cx("name_artist_profile")}>
                            <h1>{artist?.name} </h1>
                        </div>
                        <div className={cx("more_info_artist")}>
                            <div className={cx("care_artist")}>
                                <div style={{ marginRight: "4px" }}>{artist?.followers || "19.952"}</div>
                                người quan tâm
                            </div>
                            <button className={cx("follow_artist")}>
                                <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
                                QUAN TÂM
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("content_view_artist")}>
                <div className={cx("song_artist")}>
                    {/* <div className={cx("new_song_artist")}>
                        <h2 className={cx("title")}>Mới Phát Hành</h2>
                        <div className={cx("content_new_song")}>
                            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/7/c/d/c7cd466614cd89b9db048804dad367a4.jpg" alt="" />
                            <div className={cx("sub_content")}>
                                <span className={cx("single")}>Single</span>
                                <div className={cx("name_song")}>
                                    Rơi Vào Hoàng Hôn
                                </div>
                                <span className={cx("name_artist")}>Thái Đinh</span>
                                <span>31/07/2023</span>
                            </div>
                        </div>
                    </div> */}
                    <div className={cx("hot_song_artist")}>
                        <span className={cx("title")}> Bài Hát Nổi Bật</span>
                        <div className={cx("listSong")}>
                            <ul className={cx("music")}>
                                {
                                    songOwner?.length > 0 ? songOwner?.map((song, index) => {
                                        return <SongOptions key={song?.id} classNames={cx("custom")} songId={song?.id} indexSong={index} dataSong={song} showIdSong={false} showTimeUpLoad={false} />
                                    }) : ""
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className={cx("artist_other")}>
                <div className={cx("title")}>
                    Bạn Có Thể Thích
                </div>

                <ul className={cx("list_artist_other")}>
                    {artistSuggest.length > 0
                        ?
                        artistSuggest.map((item) => {
                            return (
                                <AlbumItemCircle key={item?.id} data={item} />
                            )
                        })


                        :
                        "Đang cập nhật"
                    }

                </ul >
            </div >


            <div className={cx("top_music", "about_artist")} >
                <div className={cx("title")}>
                    Về {artist.name}
                </div>
                <ul className={cx("main_list")}>
                    <li>
                        <img src={artist.profileImage ?? default_avatar} alt="" />
                    </li>
                    <li>
                        <div className={cx("des")}>
                            <div>
                                {renderDesArtist(artist.biography)}
                                {artist?.biography?.length > 350 ? <i className={cx("moreDes")} onClick={showAllDes}>Xem thêm</i> : "Không có thông tin."}
                            </div>
                        </div>
                        <div className={cx("des_other")}>
                            <ul className={cx("sub_list")}>
                                <li>
                                    <div className={cx("quantity")}>{artist.followers}</div>
                                    <div className={cx("category")}>Người quan tâm</div>
                                </li>
                                <li>
                                    <div className={cx("quantity")}>3</div>
                                    <div className={cx("category")}>Giải thưởng</div>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div >
    );
}

export default Artist;