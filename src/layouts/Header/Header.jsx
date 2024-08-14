/* eslint-disable react-hooks/exhaustive-deps */
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faArrowRight, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import default_avatar from "../../../public/images/default_avatar.png";
import MenuHeader from "../../components/Popper/MenuHeader/MenuHeader";
import MenuInfo from "../../components/Popper/MenuInfo/MenuInfo";
import Search from "../Search/Search";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);
function Header() {
    const [showBackgroundHeader, setShowBackgroundHeader] = useState(false);
    const [historyPrevPage, setHistoryPrevPage] = useState([]);
    const [historyNextPage, setHistoryNextPage] = useState([]);

    const location = useLocation();

    const user = useSelector(state => state.user.user);
    const isLoggedIn = useSelector(state => state.user.isLogin);
    useEffect(() => {
        let temp = Array.from(new Set([...historyPrevPage, location.pathname]));
        setHistoryPrevPage(temp);
    }, [location.pathname])

    function handleResizeWindow() {
        if (this.scrollY > 0) {
            setShowBackgroundHeader(true);
        }
        else {
            setShowBackgroundHeader(false);

        }

    }

    useEffect(() => {
        window.addEventListener("scroll", handleResizeWindow);
        return () => {
            window.removeEventListener("scroll", handleResizeWindow);
        }
    })

    function handleBackPage() {
        if (historyPrevPage.length > 1) {
            let temp = historyPrevPage.slice(-1);
            setHistoryPrevPage(historyPrevPage.slice(0, historyPrevPage.length - 1))
            setHistoryNextPage([...historyNextPage, temp[0]]);
            window.history.back();
        }
    }
    function handleNextPage() {
        if (historyNextPage.length > 0) {
            let temp = historyNextPage.slice(-1);
            setHistoryNextPage(historyNextPage.slice(0, historyNextPage.length - 1))
            setHistoryPrevPage([...historyPrevPage, temp[0]]);
            window.history.forward();
        }
    }



    return (
        <header className={cx(showBackgroundHeader ? "active" : "")}>
            <div className={cx("navHeader")}>
                <div>
                    <FontAwesomeIcon className={cx("icon", historyPrevPage.length > 1 ? "active" : "")} icon={faArrowLeft} onClick={handleBackPage} />
                </div>
                <div>
                    <FontAwesomeIcon className={cx("icon", historyNextPage.length > 0 ? "active" : "")} icon={faArrowRight} onClick={handleNextPage} />
                </div>
            </div>

            <Search />

            <div className={cx("user")}>
                <div className={cx("rightHeader")}>
                    <div className={cx("update_user", "downloadWindows")}>
                        Nâng cấp tài khoản
                    </div>
                    <div className={cx("downloadWindows")}>
                        <FontAwesomeIcon className={cx("subIcon")} icon={faWindows} />
                        Tải bản Windows
                    </div>
                    <MenuHeader valueMenu={{}} ref={[null, null]}>
                        <Tippy
                            content="Cài đặt"
                        >
                            <div className={cx("icon", "settings")}>
                                <div><FontAwesomeIcon icon={faGear} /> </div>
                            </div>
                        </Tippy>
                    </MenuHeader>
                    <MenuInfo valueMenu={{}} ref={[null, null]}>
                        <Tippy content="Thông tin">
                            <div className={cx("icon", "profile")}>
                                <div>
                                    {isLoggedIn ?
                                        <img src={user?.photoURL || default_avatar} />
                                        :
                                        <FontAwesomeIcon icon={faUser} />
                                    }
                                </div>
                            </div>
                        </Tippy>
                    </MenuInfo>
                </div>
            </div >
        </header >
    );
}

export default Header;