import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faBan, faHeadphones, faIcons } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from "@tippyjs/react/headless";
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import avatar_default from '../../../../public/images/avata_default.jpg';
import styles from './MenuSongOptions.module.scss';
const cx = classNames.bind(styles);

function HeaderMenuSongOptions({ valueMenu }) {
    const renderInfoOwnSong = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('wrapper', 'menu-popper')}>
                <div className={cx("menu")}>
                    <div className={cx("menu-item")}>
                        <span>Facebook</span>
                    </div>
                    <div className={cx("menu-item")}>
                        <span>Discord</span>
                    </div>
                    <div className={cx("menu-item")}>
                        <span>Zalo</span>
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
                    <img src={valueMenu.thumbnailUrl ?? avatar_default} />
                    <div className={cx("song-content")}>
                        <div className={cx("song-name")}>
                            {valueMenu && valueMenu.name}
                        </div>

                        <div className={cx("des-song")}>
                            <div className={cx("like-song")}>
                                <FontAwesomeIcon className={cx("icon")} icon={faHeart} />
                                <span>900</span>

                            </div>
                            <div className={cx("like-song")}>
                                <FontAwesomeIcon className={cx("icon")} icon={faHeadphones} />
                                <span>11k</span>

                            </div>
                        </div>
                    </div>

                </div>
                <nav className={cx("nav")}>
                    <div className={cx("nav-item")}>
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
