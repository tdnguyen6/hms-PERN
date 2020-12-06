import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EditPatientDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
    }

    handleSave = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
    };
    handleDelete = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
    };

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="name"
                        label="Name"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        variant="outlined"
                        margin="normal"
                        id="name"
                        label="Date"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary" align="right">
                        Save
                    </Button>
                    <Button onClick={this.handleDelete} color="primary" align="left">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditPatientDialog;
