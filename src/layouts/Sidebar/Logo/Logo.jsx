
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

function Logo() {
    return (<>
        <NavLink to="/">
            <div className={cx("logo")}>
                <span>124</span>
                <span>M</span>
                <span>p</span>
                <span>3</span>

            </div>
        </NavLink>
    </>);
}

export default Logo;