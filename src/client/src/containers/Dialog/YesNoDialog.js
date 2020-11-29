import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

class YesNoDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false);
    }

    handleYes = () => {
        // send close state back to parent: AppointmentTable
        this.props.disease(true);
        this.props.close(false);
    };

    handleNo = () => {
        // send close state back to parent: AppointmentTable
        this.props.disease(false);
        this.props.close(false);
    };

    render() {
        return (
            <Dialog
                open              = { this.props.open }
                onClose           = { this.handleDialogClose }
                aria-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogContentText id = "alert-dialog-description">
                        { this.props.content }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick = { this.handleYes } color = "primary" align = "right">
                        Yes
                    </Button>
                    <Button onClick = { this.handleNo } color = "primary" align = "right">
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default YesNoDialog;
