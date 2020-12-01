import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

class ErrorDialog extends Component {
  handleDialogClose = () => {
    // send close state back to parent: AppointmentTable
    this.props.close(false, "error");
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
            { this.props.error }
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

export default ErrorDialog;
