import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { memo } from 'react';

function AlertDialog({ content, open, onClose, onHandle }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {content?.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content?.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Không</Button>
                <Button onClick={onHandle} autoFocus>
                    Có
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AlertDialog.propTypes = {
    content: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onHandle: PropTypes.func
}

const memoAlertDialog = memo(AlertDialog);
memoAlertDialog.displayName = 'AlertDialog';
export default memoAlertDialog;