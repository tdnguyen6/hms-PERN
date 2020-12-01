import React, { Component }                     from 'react';

import Button                                   from '@material-ui/core/Button';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

class DiseaseInfoDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false, "diseaseInfo");
    }

    render() {
        return (
            <Dialog
                open              = { this.props.open }
                onClose           = { this.handleDialogClose }
                aria-describedby  = "alert-dialog-description">
                <DialogContent>
                    <DialogTitle id="form-dialog-title">{ this.props.data }</DialogTitle>
                    <DialogContentText id = "alert-dialog-description">
                        { this.props.data }
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

export default DiseaseInfoDialog;
