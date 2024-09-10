import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { handleHideModal } from "../../store/ModalReducer/modalReducer";
import styles from "./ModalShowDescriptionArtist.module.scss";
const cx = classNames.bind(styles);

function ModalShowDescriptionArtist({ objData }) {
    const dispatch = useDispatch();
    const onHideModal = () => {
        dispatch(handleHideModal());
    }
    return (
        <div className={cx("show_about_artist")}>
            <span className={cx("close_nav_left")} onClick={onHideModal}>
                <FontAwesomeIcon icon={faClose} className={cx("icon")} />
            </span>
            <div className={cx("top_content")}>
                <img src={objData?.profileImage} alt="" />
                <div className={cx("name_artist")}>{objData?.name}</div>
            </div>
            <div className={cx("all_des")} >
                <p>
                    {objData?.biography}
                </p>
            </div>
        </div >
    )
}

ModalShowDescriptionArtist.PropTypes = {
    objData: PropTypes.object
}
export default ModalShowDescriptionArtist;

