import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

class NewAppointmentDialog extends Component {
  handleDialogClose = () => {
    // send close state back to parent: AppointmentTable
    this.props.close(false);
  }

  handleNew = () => {
    // send close state back to parent: AppointmentTable
    this.props.close(false);
  };

  render() {
    return (
      <Dialog
        open              = { this.props.open }
        onClose           = { this.handleDialogClose }
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Make new appointment</DialogTitle>
        <DialogContent>
          <DialogContentText id = "alert-dialog-description">
            To make new appointment, please enter your information here.
          </DialogContentText>
          <TextField
            autoFocus
            variant       = "outlined"
            margin        = "normal"
            id            = "name"
            label         = "Email Address"
            type          = "email"
            fullWidth
          />
          <TextField
            autoFocus
            variant       = "outlined"
            margin        = "normal"
            id            = "name"
            label         = "Name"
            fullWidth
          />
          <TextField
            autoFocus
            variant       = "outlined"
            margin        = "normal"
            id            = "name"
            label         = "Date"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick = { this.handleNew } color = "primary" align = "right">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditAppointmentDialog;
