import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/Nav/Nav";
import { setStateSidebar } from "../../components/store/mobileReducer";
import Logo from "./Logo/Logo";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);
function Sidebar() {
    const dispatch = useDispatch();
    const isShowSidebar = useSelector(state => state.mobile.isShowSidebar);

    const handleHideSidebar = () => {
        dispatch(setStateSidebar(false));
    }

    return (
        <>
            <div className={cx("wrapper", isShowSidebar ? "active" : "")}>
                <Logo />
                <Nav />
            </div>
            <div className={cx("overlay", isShowSidebar ? "active" : "")} onClick={handleHideSidebar}></div>
        </>
    );
}

export default Sidebar;