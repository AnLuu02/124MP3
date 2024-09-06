import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from "@mui/material";
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
                                <FontAwesomeIcon className={cx("iconWidget")} icon={faHeart} />
                                <div className={cx("border")} id="border" onClick={handlePlay}>
                                    {isPlay && data?.id == song.id ? <AudioRun isPlay={isPlay} songId={data?.id} currentSongId={song?.id} /> : <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} />}
                                </div>
                                <FontAwesomeIcon className={cx("iconWidget")} icon={faEllipsis} />
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
            {loading ? <Skeleton variant="text" animation="wave" sx={{ bgcolor: 'grey.700' }} width="70%" /> : <RenderArtist dataArtist={data?.artist} />}

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
