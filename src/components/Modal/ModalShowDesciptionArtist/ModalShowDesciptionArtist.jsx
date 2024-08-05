import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { handleHideModal } from "../../store/ModalReducer/modalReducer";
import styles from "./ModalShowDesciptionArtist.module.scss";
const cx = classNames.bind(styles);

export default function ModalShowDesciptionArtist() {
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
                <img src="../../../../public/images/son_tung_mtp.jpg" alt="" />
                <div className={cx("name_artist")}>Sơn Tùng - MTP</div>
            </div>
            <div className={cx("all_des")} >
                <p>
                    Thanh Tùng bắt đầu chơi nhạc từ cấp ba với nghệ danh M-TP và được biết đến với "Cơn Mưa Ngang Qua".
                    Năm 2012, anh đậu thủ khoa Nhạc viện TPHCM và ký hợp đồng với Văn Production, đổi nghệ danh sang Sơn Tùng M-TP.
                    Từ 2013 đến 2015, anh có nhiều bản hit như "Em Của Ngày Hôm Qua", "Nắng Ấm Xa Dần"...
                    Năm 2015, anh rời khỏi công ty cũ và gia nhập WePro, tổ chức minishow đầu tiên "M-TP and Friends".
                    Năm 2017, anh rời khỏi WePro để thành lập M-TP Entertainment, ra mắt "Lạc Trôi" và "Nơi Này Có Anh". Anh ra mắt album đầu tay "m-tp M-TP".
                    Năm 2018 anh ra mắt "Chạy Ngay Đi" và "Hãy Trao Cho Anh" năm 2019. Cả hai bài hát đều trở thành hit. Đặc biệt "Hãy Trao Cho Anh" kết hợp với Snopp Dogg đã đưa tên tuổi anh ra thế giới.
                </p>
            </div>
        </div >
    )
}