import { faClose, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from "classnames/bind";
import { deleteDoc, doc } from "firebase/firestore";
import PropTypes from 'prop-types';
import { useState } from "react";
import { useSelector } from "react-redux";
import album_default from "../../../../../../public/images/album_default.png";
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
    return (
        <>
            <li className={cx("playlistItem")} >
                <div className={cx("content")}>
                    <div className={cx("hoverWidgetItem")}>
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faClose} onClick={() => setShowDialog(true)} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faPlay} />
                        <FontAwesomeIcon className={cx("iconWidget")} icon={faHeart} />
                    </div>
                    <img src={album_default} alt="" />
                </div>
                <div className={cx("title")} style={{ margin: "4 0 2 0" }}>{playlist?.namePlaylist ?? "asdasdasdasddddddddddddddddddddddddddddddd"}</div>
                <div className={cx("author")}>{user?.displayName}</div>
            </li>
            <AlertDialog
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