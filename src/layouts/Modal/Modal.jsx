import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleHideModal } from "../../components/store/ModalReducer/modalReducer";
import styles from "./Modal.module.scss";
const cx = classNames.bind(styles);
export default function Modal({ children }) {
    const dispatch = useDispatch();
    const show = useSelector(state => state.modal.isShow);

    const onHideModal = e => {
        if (e.target === e.currentTarget) {
            dispatch(handleHideModal());
        }
    }
    useEffect(() => {
        if (show) {
            document.body.classList.add('active-modal');
        }
        else {
            document.body.classList.remove('active-modal');
        }
    })

    return (
        show && <div className={cx("wrapper")} onClick={onHideModal}>
            {children}
        </div >
    )
}
Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isShow: PropTypes.bool,
    onHide: PropTypes.func,
    onComfirm: PropTypes.func,
    setShow: PropTypes.func
}