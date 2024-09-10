import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from "@mui/material";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AudioRun from "../../SongItem/AudioRun/AudioRun";
import RenderArtist from "../../SongItem/RenderArtist/RenderArtist";
import { playSong } from "../../store/songReducer";
import styles from "./AlbumItem.module.scss";
const cx = classNames.bind(styles);

function AlbumItem({ data, indexSong, isAlbum, q, loading, classNames }) {

    const dispatch = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const navigate = useNavigate();

    const handlePlay = (e) => {
        e.stopPropagation();
        dispatch(playSong({ song: data, indexSong: indexSong }));
    };

    const handleNavigate = () => {
        navigate(`/album/${q}`);
    };

    return (
        <li className={cx("widgetItem", classNames)}>
            <div className={cx("content", (isPlay || song.name) && data?.id == song.id ? "active" : "")} onClick={() => !loading && handleNavigate()}>
                {
                    loading
                        ?
                        <div className={cx("skeleton_thumbnail")}>
                            <Skeleton variant="rectangular" animation="wave" sx={{ bgcolor: 'grey.700' }} width="100%" height="100%" />
                        </div>
                        :
                        <>
                            <div className={cx("thumbnail")}>
                                <LazyLoadImage
                                    src={data?.thumbnailUrl}
                                    alt=""
                                    effect="blur"
                                    className={cx("imgSong")}
                                />
                            </div>
                            <div className={cx("hoverWidgetItem")}>
                                {/* <FontAwesomeIcon className={cx("iconWidget")} icon={faHeart} /> */}
                                <Tippy content="Thêm vào thư viện">
                                    <div className={cx("iconWidget")} onClick={e => e.stopPropagation()}>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#e8eaed">
                                            <path
                                                d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                                        </svg>
                                    </div>
                                </Tippy>
                                <div className={cx("border")} id="border" onClick={handlePlay}>
                                    {isPlay && data?.id == song.id ? <AudioRun isPlay={isPlay} songId={data?.id} currentSongId={song?.id} /> : <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} />}
                                </div>
                                <Tippy content="Khác">
                                    <div onClick={e => e.stopPropagation()} >
                                        <FontAwesomeIcon className={cx("iconWidget")} icon={faEllipsis} />
                                    </div>
                                </Tippy>
                            </div>
                        </>
                }
            </div>
            <div className={cx("title")} style={{ margin: "4 0 2 0" }}>
                {
                    loading
                        ?
                        <Skeleton variant="text" animation="wave" sx={{ bgcolor: 'grey.700' }} width="90%" height={24} />
                        :
                        data?.name
                }
            </div>
            {loading ? <Skeleton variant="text" animation="wave" sx={{ bgcolor: 'grey.700' }} width="70%" /> : <RenderArtist dataArtist={data?.artists} />}

        </li>
    );
}

AlbumItem.propTypes = {
    data: PropTypes.object,
    indexSong: PropTypes.number,
    isAlbum: PropTypes.bool,
    q: PropTypes.string,
    loading: PropTypes.bool,
    classNames: PropTypes.string
};

export default AlbumItem;
