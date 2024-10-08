import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBan, faHeadphones, faIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from "@tippyjs/react/headless";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import default_avatar from '../../../assets/images/default_avatar.png';
import formatNumberToString from "../../../utils/formatNumberToString";
import RenderArtist from "../../SongItem/RenderArtist/RenderArtist";
import { handleShowModal } from "../../store/ModalReducer/modalReducer";
import styles from './MenuSongOptions.module.scss';
const cx = classNames.bind(styles);

function HeaderMenuSongOptions({ valueMenu }) {

    const dispatch = useDispatch();
    const onShowModalLyricsSong = () => {
        dispatch(handleShowModal("SHOW_LYRICS_SONG", valueMenu));
    }
    const renderInfoOwnSong = (attrs) => (
        <div className={cx('menu-list', 'custom')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <div className={cx("menu")}>
                    <div className={cx("info")}>
                        <div className={cx("lineInfo")}>
                            <span>NGHỆ SĨ</span>
                            <span>
                                <RenderArtist dataArtist={valueMenu?.artists} classNames={"customInfoSongMenuHeader"} />
                            </span>
                        </div>
                        <div className={cx("lineInfo")}>
                            <span>ALBUM</span>
                            <span>{valueMenu?.name}</span>
                        </div>
                        <div className={cx("lineInfo")}>
                            <span>SÁNG TÁC</span>
                            <span>
                                <RenderArtist dataArtist={valueMenu?.artists} role={"Tác giả"} classNames={"customInfoSongMenuHeader"} />
                            </span>
                        </div>
                        <div className={cx("lineInfo")}>
                            <span>THỂ LOẠI</span>
                            <span>{valueMenu?.genre}</span>
                        </div>
                        <div className={cx("lineInfo")}>
                            <span>CUNG CẤP BỞI</span>
                            <span>124Mp3 Media</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
    return (

        <Tippy
            interactive
            render={renderInfoOwnSong}
            placement="left-end"
            offset={[10, 0]}
        >
            <header className={cx('header')}>
                <div className={cx("song-info")}>
                    <img src={valueMenu?.thumbnailUrl ?? default_avatar} />
                    <div className={cx("song-content")}>
                        <div className={cx("song-name")}>
                            {valueMenu && valueMenu?.name}
                        </div>

                        <div className={cx("des-song")}>
                            <div className={cx("like-song")}>
                                <FontAwesomeIcon className={cx("icon")} icon={faHeart} />
                                <span>{valueMenu?.like_count ? formatNumberToString(valueMenu?.like_count) : "900"}</span>

                            </div>
                            <div className={cx("like-song")}>
                                <FontAwesomeIcon className={cx("icon")} icon={faHeadphones} />
                                <span>{valueMenu?.listens ? formatNumberToString(valueMenu?.listens) : "900"}</span>

                            </div>
                        </div>
                    </div>

                </div>
                <nav className={cx("nav")}>
                    <div className={cx("nav-item")} onClick={onShowModalLyricsSong}>
                        <FontAwesomeIcon className={cx("icon")} icon={faIcons} />
                        <span>Lời bài hát</span>
                    </div>
                    <div className={cx("nav-item")}>
                        <FontAwesomeIcon className={cx("icon")} icon={faBan} />
                        <span>Chặn</span>
                    </div>
                </nav>
            </header >
        </Tippy>
    );
}

HeaderMenuSongOptions.propTypes = {
    valueMenu: PropTypes.object
};

export default HeaderMenuSongOptions;
