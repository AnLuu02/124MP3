import { faEllipsis, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { memo, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import default_avatar from "../../../assets/images/default_avatar.png";
import MenuSongOptions from "../../../components/Popper/MenuSongOptions/MenuSongOptions";
import AudioRun from "../../../components/SongItem/AudioRun/AudioRun";
import RenderArtist from "../../../components/SongItem/RenderArtist/RenderArtist";
import { playSong } from "../../../components/store/songReducer";
import styles from "./WidgetHot.module.scss";
const cx = classNames.bind(styles);

function WidgetHot({
    songId,
    indexSong,
    dataSong,
    classNames,
    isArtist
}) {
    const [valueMenu, setValueMenu] = useState({});
    const dispatch = useDispatch();
    const isPlay = useSelector(state => state.song.isPlay);
    const song = useSelector(state => state.song.song);
    const refBoxOptions = useRef()
    const refSong = useRef()
    const handleMusic = s => {
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
                className={cx("widget", classNames)}
            >
                <div className={cx("contentSong")}>
                    <div className={cx("thumbnailSong", "isArtist", isArtist ? "isArtist" : "")} >
                        <LazyLoadImage
                            src={dataSong?.thumbnailUrl ?? default_avatar}
                            alt=""
                            effect="blur"
                            className={cx("imgSong")}
                        />
                        <div
                            className={
                                cx(
                                    "playSong",
                                    (isPlay && songId == song.id) ? "active" : "pause"
                                )
                            }
                            onClick={() => handleMusic(dataSong)}
                        >
                            <FontAwesomeIcon className={cx("iconSong")} icon={faPlay} />
                        </div>
                        <AudioRun isPlay={isPlay} songId={songId} currentSongId={song?.id} />
                    </div>
                    <div className={cx("desSong")}>
                        <div className={cx("type")}>Nghệ sĩ</div>
                        <div className={cx("name")}>{dataSong?.name || "Chúng ta của hiện tại"}</div>
                        <RenderArtist dataArtist={dataSong?.artists} />
                        <div className={cx("custom")}>129 quan tâm</div>

                    </div>
                </div>
                <div className={cx("boxOption")} ref={refBoxOptions}>
                    <div className={cx("contentOption")}>
                        <div className={cx("addLibrary")} >
                            <div className={cx("iconSong")}>
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
                        <MenuSongOptions valueMenu={valueMenu} ref={[refBoxOptions, refSong]}>
                            <div
                                className={cx("options")}
                                onClick={handleClickShowMenu}>
                                <FontAwesomeIcon className={cx("iconSong")} icon={faEllipsis} />
                            </div>
                        </MenuSongOptions>
                    </div>
                </div>
            </li>
        </>
    );
}
WidgetHot.propTypes = {
    dataSong: PropTypes.object,
    songId: PropTypes.number.isRequired,
    indexSong: PropTypes.number.isRequired,
    classNames: PropTypes.string,

};

const memoWidgetHot = memo(WidgetHot);
memoWidgetHot.displayName = 'WidgetHot';

export default WidgetHot;