import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import footer_bg from "../../../../public/images/footer_bg.png";
import styles from "./WidgetItemHome.module.scss";
const cx = classNames.bind(styles);

function WidgetItemHome() {
    return (
        <li className={cx("song")}>
            <div className={cx("content_home")}>
                <img src={footer_bg} alt="" />
                <div className={cx("name")}>Hello</div>
                <div className={cx("des")}>aaaaaaaaaaaaaaaaaaaaaaa
                </div>
            </div>
            <div><FontAwesomeIcon icon={faPlay} /></div>
        </li>

    );
}

export default WidgetItemHome;