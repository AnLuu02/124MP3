import { faClose, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { deleteDoc, doc } from "firebase/firestore";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import album_default from "../../../../../assets/images/album_default.png";
import AlertDialog from '../../../../../components/AlertDialog/AlertDialog';
import { db } from "../../../../../components/FireBase/firebaseConfig";
import { notifyError, notifySuccess } from "../../../../../utils/toastifyMessage";
import styles from "./PlaylistItem.module.scss";

const cx = classNames.bind(styles);



function PlaylistItem({ playlist }) {
    const user = useSelector(state => state.user.user);
    const [showDialog, setShowDialog] = useState(false);

    const deleteData = async (docId) => {
        const docRef = doc(db, 'playlistCollection', docId);
        try {
            await deleteDoc(docRef);
            notifySuccess({ message: "Delete success!" });
        } catch (e) {
            console.error('Error deleting document: ', e);
            notifyError({ message: "Delete failed!" });
        }
    };

    // const handleGetPlaylistById = async () => {
    //     try {
    //         // Tham chiếu đến tài liệu trong Firestore
    //         const docRef = doc(db, 'playlistCollection', playlist?.id);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //             setDocumentData(docSnap.data());
    //         } else {
    //             setError('No such document!');
    //         }
    //     } catch (err) {
    //         setError('Error fetching document: ' + err.message);
    //     }
    // };

    const navigate = useNavigate();
    const handleDeletePlaylist = (e) => {
        e.stopPropagation();
        setShowDialog(true);
    };
    const handleClickPlaylist = () => {
        navigate(`/playlist/${playlist?.id}`);
    }
    const handleClickIconPlayPlaylist = (e) => {
        e.stopPropagation();
    }
    return (
        <>
            <li className={cx("playlistItem")} >
                <div className={cx("content")} onClick={handleClickPlaylist}>
                    <div className={cx("hoverWidgetItem")}>
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faClose} onClick={handleDeletePlaylist} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} onClick={handleClickIconPlayPlaylist} />
                        {/* <FontAwesomeIcon className={cx("iconWidget")} icon={faHeart} /> */}
                        <div className={cx("iconWidget")}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                height="26px"
                                viewBox="0 -960 960 960"
                                width="26px"
                                fill="#e8eaed">
                                <path
                                    d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                            </svg>
                        </div>
                    </div>
                    <img src={album_default} alt="" />
                </div>
                <div className={cx("title")} style={{ margin: "4 0 2 0" }}>{playlist?.namePlaylist ?? "asdasdasdasddddddddddddddddddddddddddddddd"}</div>
                <div className={cx("author")}>{user?.displayName}</div>
            </li>
            <AlertDialog
                key={playlist?.id}
                content={{ title: "Delete", description: "Are you sure to delete this playlist?" }}
                open={showDialog}
                onClose={() => setShowDialog(false)}
                onHandle={() => {
                    deleteData(playlist?.id);
                    setShowDialog(false);
                }} />
        </>
    );
}
PlaylistItem.propTypes = {
    playlist: PropTypes.object,

};
export default PlaylistItem;