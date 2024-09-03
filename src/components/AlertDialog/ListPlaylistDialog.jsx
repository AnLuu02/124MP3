import { faAdd, faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { blue } from '@mui/material/colors';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { notifyError, notifySuccess } from '../../utils/toastifyMessage';
import { db } from '../FireBase/firebaseConfig';


function ListPlaylistDialog({ open, onHandleItem, onAddPlaylist, onClose, dataPlaylist, dataSong }) {

    const handleAddSongToPlaylist = async (docId, dataSong) => {
        try {
            const docRef = doc(db, 'playlistCollection', docId);
            // Cập nhật tài liệu bằng cách thêm trường mới
            await updateDoc(docRef, {
                Song: arrayUnion({
                    ...dataSong
                })
            });
            notifySuccess({ message: "Tạo playlist thành công!" });

        } catch (error) {
            console.error('Error adding/updating field: ', error);
            notifyError({ message: "Tạo playlist thất bại!" });
        }
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Danh sách</DialogTitle>
            <List sx={{ pt: 0 }}>
                {dataPlaylist?.map((item) => (
                    <ListItem disableGutters key={item?.id} onClick={() => handleAddSongToPlaylist(item?.id, dataSong)}>
                        <ListItemButton onClick={() => onHandleItem(item?.id)}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <FontAwesomeIcon icon={faMusic} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item?.namePlaylist ?? "Loding..."} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={onAddPlaylist}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FontAwesomeIcon icon={faAdd} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Tạo playlist" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

ListPlaylistDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    onHandleItem: PropTypes.func,
    onAddPlaylist: PropTypes.func,
    dataSong: PropTypes.object,
    dataPlaylist: PropTypes.array

};

const memoListPlaylistDialog = memo(ListPlaylistDialog);
memoListPlaylistDialog.displayName = 'ListPlaylistDialog';

export default ListPlaylistDialog;