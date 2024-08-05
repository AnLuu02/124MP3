import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import styles from "./AudioRun.module.scss";
const cx = classNames.bind(styles);


function AudioRun({ isPlay, songId, currentSongId }) {
    return (
        <div className={cx("runAudio", (isPlay && songId == currentSongId) ? "active" : "")} >
            <div><span></span><span></span><span></span><span></span></div>
        </div>
    );
}
AudioRun.propTypes = {
    isPlay: PropTypes.bool.isRequired,
    songId: PropTypes.number.isRequired,
    currentSongId: PropTypes.number.isRequired
}
export default AudioRun;