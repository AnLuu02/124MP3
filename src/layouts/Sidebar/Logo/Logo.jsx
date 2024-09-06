
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import default_avatar from "../../../assets/images/default_avatar.png";
import styles from "./Logo.module.scss";

const cx = classNames.bind(styles);

function Logo({ notMobile = false }) {
    const isShowSidebar = useSelector(state => state.mobile.isShowSidebar);
    return (<>
        <NavLink to="/">
            <div className={cx("logo", notMobile || isShowSidebar ? "" : "mobile")}>
                <span>124</span>
                <span>M</span>
                <span>p</span>
                <span>3</span>

            </div>
            {
                !notMobile && !isShowSidebar
                    ?
                    <div className={cx("logo_mobile")}>
                        <img src={default_avatar} />
                    </div>
                    : ""
            }
        </NavLink>
    </>);
}

Logo.propTypes = {
    notMobile: PropTypes.bool
}

export default Logo;