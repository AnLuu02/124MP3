import { faShuffle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from "./AlbumItemCircle.module.scss";
const cx = classNames.bind(styles);

function AlbumItemCircle({ data }) {
    return (
        <>
            <li key={data?.id} className={cx("widgetItemCircle")}>
                <div className={cx("content")}>
                    <img src={data?.profileImage} alt="" />
                    <div className={cx("hover_playlist")}>
                        <div className={cx("circleIcon")}> <FontAwesomeIcon icon={faShuffle} className={cx("icon")} /></div>
                    </div>
                </div>
                <NavLink to={`/artist/${data?.name}`} style={{ color: 'unset' }}>
                    <div className={cx("name_artist")}>{data?.name}</div>
                </NavLink>
                <div className={cx("care_artist")} >
                    <div className={cx("quantityCare")}>{data?.followers}</div>
                    <div> quan tâm</div>
                </div>
                <div className={cx("follow_artist")} >
                    <FontAwesomeIcon icon={faUserPlus} className={cx("icon")} />
                    <div>QUAN TÂM</div>
                </div>
            </li>
        </>
    );
}
AlbumItemCircle.propTypes = {
    data: PropTypes.object,
};
export default AlbumItemCircle;