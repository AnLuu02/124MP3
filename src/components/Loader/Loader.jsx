import classNames from "classnames/bind";
import styles from "./Loader.module.scss";
const cx = classNames.bind(styles);

export default function Loader() {
    return (
        <svg
            className={cx("spinner")}
            width="65px"
            height="65px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                className={cx("path")}
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
            ></circle>
        </svg>
    );
}
