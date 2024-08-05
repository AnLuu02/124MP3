import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { handleShowModal } from "../../../../components/store/ModalReducer/modalReducer";
import PlaylistItem from "./AlbumItem/PlaylistItem";
import styles from "./Playlist.module.scss";
const cx = classNames.bind(styles);
export default function Playlist() {
    // const [show, setShow] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const onShowModal = () => {
        dispatch(handleShowModal("CREATE_PLAYLIST"));
    }
    function formatPathname() {
        if (location.pathname.endsWith("/")) {
            return location.pathname.slice(0, -1);
        }
        return location.pathname;
    }

    // const { get } = useFetch(
    //     "http://localhost:8080/API_Servlet/api/"
    // );



    return (
        <div className={cx("myMusicPlaylist")}>
            <div className={cx("header")}>
                <h2>Playlist</h2>
                <ul className={cx("nav")}>
                    <NavLink to="" className={cx("navItem", { "active": formatPathname(location.pathname).endsWith('/playlist') })}>TẤT CẢ</NavLink>
                    <NavLink to={location.pathname.includes("owner") ? location.pathname : "owner"} className={cx("navItem", { "active": formatPathname(location.pathname).includes('/owner') })} >CỦA TÔI</NavLink>
                </ul>
                <hr />
            </div>
            <div className={cx("body")}>
                <ul className={cx("listPlaylist")}>
                    <div className={cx("createPlaylist")} onClick={onShowModal}>
                        <div className={cx("iconMain")}><FontAwesomeIcon className={cx("icon")} icon={faPlus} /></div>
                        <div className={cx("text")}>Tạo playlist mới</div>
                    </div>
                    <PlaylistItem />
                    <PlaylistItem />
                    <PlaylistItem />
                    <PlaylistItem />
                    <PlaylistItem />
                </ul>
            </div>
        </div>

    )
}

// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import * as React from 'react';

// export default function AlertDialog() {
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <React.Fragment>
//             <Button variant="outlined" onClick={handleClickOpen}>
//                 Open alert dialog
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="alert-dialog-title"
//                 aria-describedby="alert-dialog-description"
//             >
//                 <DialogTitle id="alert-dialog-title">
//                     {"Use Google's location service?"}
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                         Let Google help apps determine location. This means sending anonymous
//                         location data to Google, even when no apps are running.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Disagree</Button>
//                     <Button onClick={handleClose} autoFocus>
//                         Agree
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </React.Fragment>
//     );
// }
