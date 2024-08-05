
import classNames from "classnames/bind";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

function Logo() {
    return (<>
        <div className={cx("logo")}>
            <span>124</span>
            <span>M</span>
            <span>p</span>
            <span>3</span>

        </div>
    </>);
}

export default Logo;