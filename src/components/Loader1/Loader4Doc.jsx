import classNames from "classnames/bind";
import styles from "./Loader4Doc.module.scss";
const cx = classNames.bind(styles);

export default function Loader4Doc() {
    return (
        <div className={cx("doc_container")}>
            <span className={cx("doc")}></span>
            <span className={cx("doc")}></span>
            <span className={cx("doc")}></span>
            <span className={cx("doc")}></span>
        </div>
    );
}
