import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { handleHideModal } from "../../store/ModalReducer/modalReducer";
import styles from "./ModalShowLyricSong.module.scss";
const cx = classNames.bind(styles);

function ModalShowLyricSong({ objData }) {
    const dispatch = useDispatch();
    const onHideModalLyricsSong = () => {
        dispatch(handleHideModal());
    }

    function splitTextByCapitalLetters(text) {
        const regex = /([A-Z][^A-Z]*)/g;
        const matches = text.match(regex);
        if (!matches) return [];
        return matches.map(part => part.trim()).filter(part => part.length > 0);
    }


    const result = splitTextByCapitalLetters(objData?.lyrics);
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h2>Lời bài hát</h2>
            </div>
            <div className={cx("content")}>
                {
                    result?.map((item, index) => {
                        return (
                            index != 0 && index % 4 == 0 ? <><i key={index}>{item}</i><br /><br /></> : <><i key={index}>{item}</i><br /></>
                        )
                    })
                }
            </div>
            <div className={cx("footer")}>
                <div className={cx("contributeLyrics")}>Đóng góp lời bài hát</div>
                <button onClick={onHideModalLyricsSong}>Đóng</button>
            </div>
        </div >
    )
}

ModalShowLyricSong.PropTypes = {
    objData: PropTypes.object
}
export default ModalShowLyricSong;