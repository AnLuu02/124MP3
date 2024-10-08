import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Skeleton } from "@mui/material";
import classNames from "classnames/bind";
import PropTypes, { object } from 'prop-types';
import { memo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import 'tippy.js/dist/tippy.css';
import default_avatar from "../../../assets/images/default_avatar.png";
import { playSong } from "../../../components/store/songReducer";
import MenuSongOptions from "../../Popper/MenuSongOptions/MenuSongOptions";
import AudioRun from "../AudioRun/AudioRun";
import RenderArtist from "../RenderArtist/RenderArtist";
import styles from "./Song.module.scss";
const cx = classNames.bind(styles);

function Song({ songId, indexSong, dataSong, classNames, loading }) {
    const [valueMenu, setValueMenu] = useState({});
    const dispatch = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef();
    const refSong = useRef();

    const handleSong = s => {
        dispatch(playSong({ song: s, indexSong: indexSong }));
    }

    const handleClickShowMenu = () => {
        setValueMenu({
            ...dataSong
        })
    }
    return (
        <>
            <li
                key={songId}
                ref={refSong}
                className={
                    cx(
                        "song",
                        classNames,
                        ((isPlay && songId == song.id) || songId == song.id) ? "active" : ""
                    )
                }
            >
                <div className={cx("contentSong")}>
                    <div className={cx("thumbnailSong")}>
                        {
                            loading ?
                                <div className={cx("skeleton_image")}>
                                    <Skeleton variant="rectangular" animation="wave" sx={{ bgcolor: 'grey.600' }} />
                                </div>
                                :
                                <>
                                    <LazyLoadImage
                                        src={dataSong.thumbnailUrl ?? default_avatar}
                                        alt=""
                                        effect="blur"
                                        className={cx("imgSong")}
                                    />
                                    <div
                                        className={
                                            cx(
                                                "playSong",
                                                isPlay && songId == song.id ? "active" : "pause"
                                            )
                                        }
                                        onClick={() => handleSong(dataSong)} >
                                        <FontAwesomeIcon className={cx("iconSong")} icon={faPlay} />
                                    </div>
                                    <AudioRun isPlay={isPlay} songId={songId} currentSongId={song.id} />
                                </>
                        }

                    </div>
                    <div className={cx("desSong")}>
                        {
                            loading ?
                                <>
                                    <Skeleton animation="wave" sx={{ bgcolor: 'grey.600' }} />
                                    <Skeleton animation="wave" width="60%" sx={{ bgcolor: 'grey.600' }} />
                                    <Skeleton animation="wave" width="60%" sx={{ bgcolor: 'grey.600' }} />

                                </>
                                : <>
                                    <div className={cx("nameSong")}>{dataSong.name}</div>
                                    <RenderArtist dataArtist={dataSong.artists} />
                                    <div className={cx("timeUpLoad")}>{dataSong?.releaseDate} </div>
                                </>
                        }
                    </div>
                    {
                        !loading && <div className={cx("boxOption")} ref={refBoxOptions}>
                            <MenuSongOptions valueMenu={valueMenu} ref={[refBoxOptions, refSong]}>
                                <div
                                    className={cx("options")}
                                    onClick={handleClickShowMenu}
                                >
                                    <FontAwesomeIcon className={cx("iconSong")} icon={faEllipsis} />
                                </div>
                            </MenuSongOptions>
                        </div>
                    }
                </div>
            </li >
        </>
    );
}
Song.propTypes = {
    dataSong: object,
    songId: PropTypes.number.isRequired,
    indexSong: PropTypes.number.isRequired,
    classNames: PropTypes.string,
    loading: PropTypes.bool
};

const memoSong = memo(Song);
memoSong.displayName = 'Song';

export default memoSong;