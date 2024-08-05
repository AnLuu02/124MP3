import classNames from "classnames/bind";
import { useEffect } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { formatPathname } from "../../../../utils/formatPatnameFunction";
import Favorite from "./Favorite/Favorite";
import styles from "./SongLibrary.module.scss";
import Upload from "./Upload/Upload";
const cx = classNames.bind(styles);
function SongLibrary() {
    const location = useLocation();
    const params = useParams();
    useEffect(() => {
        console.log(params.filter)
    }, [params])





    return (
        <>
            <ul className={cx("subNavLibrary")}>
                <NavLink to={`song/favorite`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).endsWith("/song") || formatPathname(location.pathname).endsWith("/library") || formatPathname(location.pathname).includes(`/song/favorite`) })}>Yêu thích</NavLink>
                <NavLink to={`song/upload`} className={cx("navCountryItem", { "active": formatPathname(location.pathname).includes(`/song/upload`) })} >Đã tải lên</NavLink>

            </ul>
            {
                params.filter === "favorite" || params.filter === undefined ? <Favorite /> : <Upload />
            }
        </>
    );
}

export default SongLibrary;