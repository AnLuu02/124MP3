import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import styles from "./AudioRun.module.scss";
const cx = classNames.bind(styles);


function AudioRun({ isPlay, songId, currentSongId }) {
    return (
        <div className={cx("runAudio", (isPlay && songId == currentSongId) ? "active" : "")} >
            <div><b></b><b></b><b></b><b></b></div>
        </div>
    );
}
AudioRun.propTypes = {
    isPlay: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
    currentSongId: PropTypes.number
}
export default AudioRun;