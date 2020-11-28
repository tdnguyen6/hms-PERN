import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';
/*
Children of NewAppointmentDialog.
In NewAppointmentDialog, when user click disease textfield, this dialog is triggered.
This query all symptoms (API1) and displays as list of checkbox,
This also request disease prediction after sending all checked symptoms (API2)
 */
class SymptomsDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
    }

    render() {
        return (
            <Dialog
                open              = { this.props.open }
                onClose           = { this.handleDialogClose }
                aria-describedby  = "alert-dialog-description">
                <DialogContent>
                    <DialogTitle id="form-dialog-title">Error</DialogTitle>
                    <DialogContentText id = "alert-dialog-description">
                        Hello Hello
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick = { this.handleDialogClose } color = "primary">
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default SymptomsDialog;
