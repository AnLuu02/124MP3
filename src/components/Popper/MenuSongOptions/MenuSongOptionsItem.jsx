import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListPlaylistDialog from '../../AlertDialog/ListPlaylistDialog';
import { db } from '../../FireBase/firebaseConfig';
import { handleShowModal } from '../../store/ModalReducer/modalReducer';
import styles from './MenuSongOptions.module.scss';

const cx = classNames.bind(styles);

function MenuSongOptionsItem({ item, dataSong }) {
    const [showDialogListPlaylist, setShowDialogListPlaylist] = useState(false)
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const onShowModalAddPlaylist = () => {
        dispatch(handleShowModal("CREATE_PLAYLIST"));
    }

    const onShowDialog = () => {
        setShowDialogListPlaylist(true)
    }
    useEffect(() => {
        const getAllPlaylist = async () => {
            if (user?.uid) {
                const q = query(collection(db, 'playlistCollection'), where('userId', '==', user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    const documents = [];
                    querySnapshot.forEach((doc) => {
                        documents.push({ id: doc.id, ...doc.data() });
                    });
                    setPlaylists(documents);
                } catch (e) {
                    console.error('Error getting documents:', e);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        getAllPlaylist();
    }, [showDialogListPlaylist]);
    return (
        <>
            <div className={cx("menu-item")} onClick={onShowDialog}>
                {item?.leftIcon && <FontAwesomeIcon className={cx("icon")} icon={item?.leftIcon} />}
                <span>{item?.title}</span>
                {item?.rightIcon && <FontAwesomeIcon className={cx("icon", "icon_sub_menu")} icon={item?.rightIcon} />}
            </div>
            <ListPlaylistDialog
                open={showDialogListPlaylist}
                onClose={() => setShowDialogListPlaylist(false)}
                dataPlaylist={loading ? ["Loading..."] : playlists}
                dataSong={dataSong}
                onHandleItem={
                    id => {
                        console.log(id)
                    }
                }
                onAddPlaylist={onShowModalAddPlaylist}
            />
        </>
    );
}

MenuSongOptionsItem.propTypes = {
    item: PropTypes.object.isRequired,
    dataSong: PropTypes.object.isRequired,

};

export default MenuSongOptionsItem;
