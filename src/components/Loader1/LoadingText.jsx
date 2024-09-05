import classNames from "classnames/bind";
import styles from "./Loader4Doc.module.scss";
const cx = classNames.bind(styles);

export default function LoadingText() {
    return (
        <div className={cx("loadingText")}>
            <span>L</span>
            <span>o</span>
            <span>a</span>
            <span>d</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>.</span>
            <span>.</span>
            <span>.</span>
        </div>
    );
}
