import Logo from "./Logo/Logo";
import Nav from "../../components/Nav/Nav";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx("wrapper")}>
            <Logo />
            <Nav />
        </div>
    );
}

export default Sidebar;