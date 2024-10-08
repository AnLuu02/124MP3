import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import default_avatar from "../../assets/images/default_avatar.png";
import SongOptions from "../../components/SongItem/SongOptions/SongOptions";
import { handleShowModal } from "../../components/store/ModalReducer/modalReducer";
import WidgetAlbum from "../../components/WidgetAlbum/WidgetAlbum";
import useFetch from "../../Custom hooks/useFetch";
import styles from "./Artist.module.scss";
const cx = classNames.bind(styles);

function Artist() {
    const [artist, setArtist] = useState({});
    const [songOwner, setSongOwner] = useState([{}, {}, {}, {}]);
    const [artistSuggest, setArtistSuggest] = useState([]);
    const [loadingArtist, setLoadingArtist] = useState(true);
    const [loadingSongOwner, setLoadingSongOwner] = useState(true);
    const [loadingArtistSuggest, setLoadingArtistSuggest] = useState(true);
    const dispatch = useDispatch();
    const song = useSelector(state => state.song.song);
    let params = useParams();

    const { get } = useFetch(import.meta.env.VITE_API_BASE_URL);

    useEffect(() => {
        setArtist({})
        setArtistSuggest([])
        setSongOwner([{}, {}, {}, {}])
        setLoadingArtist(true)
        setLoadingArtistSuggest(true)
        setLoadingSongOwner(true)
        const fetchDataArtist = async () => {
            let artist = await get(`artist?name=${params.artist}`);
            if (artist) {
                setLoadingArtist(false)
                setArtist(artist[0]);
                let songOwner = await get(`musics?artistId=${artist[0].id}`);
                if (songOwner) {
                    setLoadingSongOwner(false)
                    setSongOwner(songOwner);
                }
            }
        }

        fetchDataArtist();
    }, [params.artist])

    useEffect(() => {

        let nameArtist = params.artist;
        get(`artist?limit=10&except=${nameArtist}`)
            .then((data) => {
                if (data) {
                    setLoadingArtistSuggest(false)
                    setArtistSuggest(data);
                }
            })
            .catch((error) => {
                setLoadingArtistSuggest(true)
                console.log("Goi API không được.", error)
            });

    }, [params.artist])
    function renderDesArtist(des) {
        if (des?.split("")?.length > 350) {
            const temp = des?.split("")?.slice(0, 350)?.join("");
            return temp + "...";
        }
        return des;
    }
    const showAllDes = () => {
        dispatch(handleShowModal("SHOW_ALL_DESCRIPTION_ARTIST", artist));
    }

    return (
        <div className={cx("view_artist", song.name ? "hasBottomMusicFixed" : "")}>
            <div className={cx("header_view_artist")}>
                <div className={cx("content_header")}>
                    <div className={cx("left_view_header")}>
                        {loadingArtist
                            ?
                            <Skeleton variant="circular" animation="wave" sx={{ bgcolor: 'grey.600' }} width="100%" height="100%" />
                            :
                            <LazyLoadImage
                                src={artist?.profileImage}
                                alt="avatar"
                                effect="blur"
                                className={cx("avatar_artist_profile")}
                            />
                        }
                    </div>
                    <div className={cx("right_view_header")}>
                        {loadingArtist
                            ?
                            <div className={cx("skeleton_name")}>
                                <Skeleton variant="text" animation="wave" sx={{ bgcolor: 'grey.600' }} width="100%" height="100%" />
                            </div>
                            :
                            <div className={cx("name_artist_profile")}>
                                <h1>{artist?.name} </h1>
                            </div>
                        }
                        <div className={cx("more_info_artist")}>
                            <div className={cx("care_artist")}>
                                {loadingArtist
                                    ?
                                    <Skeleton variant="text" animation="wave" sx={{ bgcolor: 'grey.600' }} width="100%" height="100%" />
                                    :
                                    <><div style={{ marginRight: "4px" }}>{artist?.followers || "19.952"}</div>
                                        người quan tâm</>
                                }
                            </div>

                            {loadingArtist
                                ?
                                <Skeleton variant="text" animation="wave" sx={{ bgcolor: 'grey.600' }} width="20%" height="100%" />
                                :
                                <button className={cx("follow_artist")}>
                                    <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
                                    QUAN TÂM
                                </button>
                            }


                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("content_view_artist")}>
                <div className={cx("song_artist")}>
                    <div className={cx("new_song_artist")}>
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
                    </div>
                    <div className={cx("hot_song_artist")}>
                        <span className={cx("title")}> Bài Hát Nổi Bật</span>
                        <div className={cx("listSong")}>
                            <ul className={cx("music")}>
                                {
                                    Array.isArray(songOwner) ? songOwner?.map((song, index) => {
                                        return <SongOptions key={song?.id} classNames={cx("custom")} songId={song?.id} indexSong={index} dataSong={song} showIdSong={false} showTimeUpLoad={false} loading={loadingSongOwner} />
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
                    {
                        <WidgetAlbum data={artistSuggest} q={"gợi-ý-nghệ-sĩ"} artistWidget={true} loading={loadingArtistSuggest} />
                    }
                </ul >
            </div >
            <div className={cx("top_music", "about_artist")} >
                <div className={cx("title")}>
                    Về {artist?.name}
                </div>
                <ul className={cx("main_list")}>
                    <li>
                        <img src={artist?.profileImage ?? default_avatar} alt="" />
                    </li>
                    <li>
                        <div className={cx("des")}>
                            <div>
                                {renderDesArtist(artist?.biography)}
                                {artist?.biography?.length > 350 ? <i className={cx("moreDes")} onClick={showAllDes}>Xem thêm</i> : "Không có thông tin."}
                            </div>
                        </div>
                        <div className={cx("des_other")}>
                            <ul className={cx("sub_list")}>
                                <li>
                                    <div className={cx("quantity")}>{artist?.followers}</div>
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