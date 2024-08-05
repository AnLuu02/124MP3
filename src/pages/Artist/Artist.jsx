import { faPlay, faShuffle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import SongFull from "../../components/SongFull/SongFull";
import { handleShowModal } from "../../components/store/ModalReducer/modalReducer";
import styles from "./Artist.module.scss";
const cx = classNames.bind(styles);

function Artist() {
    const dispatch = useDispatch();

    const str = `Thanh Tùng bắt đầu sự nghiệp chơi nhạc từ cấp ba với nghệ danh M-TP và được biết đến với "Cơn Mưa Ngang Qua". Năm 2012, anh đậu thủ khoa Nhạc viện TPHCM và ký hợp đồng với Văn Production, đổi nghệ danh sang Sơn Tùng M-TP. Từ 2013 đến 2015, anh có nhiều bản hit như "Em Của Ngày Hôm Qua", "Nắng Ấm Xa Dần"... Năm 2015, anh rời khỏi công ty cũ và gia nhập WePro`;


    function lenghtDes(des) {
        return des?.split("")?.length;
    }
    function renderDesArtist(des) {
        if (lenghtDes(des) > 350) {
            return des + "...";
        }
        return des;
    }
    const showAllDes = () => {
        dispatch(handleShowModal("SHOW_ALL_DESCRIPTION_ARTIST"));
    }
    return (
        <div className={cx("view_artist")}>
            <div className={cx("header_view_artist")}>
                {/*rgba(41, 21, 71, 0.8)*/}
                <div className={cx("content_header")}>
                    <div className={cx("left_view_header")}>
                        <img src="../../../public/images/son_tung_mtp.jpg" alt="" className={cx("avatar_artist")} />
                    </div>
                    <div className={cx("right_view_header")}>
                        <div className={cx("name_artist_profile")}>
                            <h1>Sơn Tùng - MTP</h1>
                            <div className={cx("icon_play")}>
                                <FontAwesomeIcon icon={faPlay} className={cx("icon")} />
                            </div>
                        </div>
                        <div className={cx("other_artist")}>
                            <div className={cx("care_artist")}>
                                <div style={{ marginRight: "4px" }}>19.952</div>
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
                                <SongFull key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3" }} showIdSong={false} showTimeUpLoad={false} />
                                <SongFull key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3" }} showIdSong={false} showTimeUpLoad={false} />
                                <SongFull key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3" }} showIdSong={false} showTimeUpLoad={false} />
                                <SongFull key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3" }} showIdSong={false} showTimeUpLoad={false} />
                                <SongFull key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3" }} showIdSong={false} showTimeUpLoad={false} />
                                <SongFull key={1} classNames={cx("custom")} songId={1} indexSong={1} dataSong={{ src: "123.mp3" }} showIdSong={false} showTimeUpLoad={false} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <div className={cx("top_music", "artist_other")}>
                <div className={cx("title")}>
                    Bạn Có Thể Thích
                </div>

                <ul className={cx("list_artist_other")}>
                    <li>
                        <div className={cx("content")}>
                            <img src="../../../public/images/son_tung_mtp.jpg" alt="" />
                            <div className={cx("hover_playlist")}>
                                <div className={cx("circleIcon")}> <FontAwesomeIcon icon={faShuffle} className={cx("icon")} /></div>
                            </div>
                        </div>
                        <div className={cx("name_artist")}>Sơn Tùng M-TP</div>
                        <div className={cx("care_artist")} >
                            <div className={cx("quantityCare")}>527</div>
                            <div> quan tâm</div>
                        </div>
                        <div className={cx("follow_artist")} >
                            <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
                            <div>QUAN TÂM</div>
                        </div>
                    </li>


                </ul >
            </div >


            <div className={cx("top_music", "about_artist")} >
                <div className={cx("title")}>
                    Về Sơn Tùng - MTP
                </div>
                <ul className={cx("main_list")}>
                    <li>
                        <img src="../../../public/images/son_tung_mtp.jpg" alt="" />
                    </li>
                    <li>
                        <div className={cx("des")}>
                            <div>
                                {renderDesArtist(str)}
                                <i className={cx("moreDes")} onClick={showAllDes}>{true && "Xem thêm"}</i>
                            </div>
                        </div>
                        <div className={cx("des_other")}>
                            <ul className={cx("sub_list")}>
                                <li>
                                    <div className={cx("quantity")}>7.845</div>
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