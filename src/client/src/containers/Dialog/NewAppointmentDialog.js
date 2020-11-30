import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";

const dateAvailable = [
  'Aug 18',
  'Aug 20',
  'Sep 19',
  'Oct 17'
];
const timeAvailable = [
  '18:00',
  '17:00',
  '7:00',
  '13:00'
];

class NewAppointmentDialog extends Component {
  state = {
    disease: this.props.disease,
    practitioner: '',
    date: '',
    time: '',
  };

  handleDialogClose = () => {
    // send close state back to parent: AppointmentTable
    this.props.close(false, "newAppointment");
  }
  handleSave = () => {
    // send close state back to parent: AppointmentTable
    this.props.appointment(this.state.appointment);
    this.handleDialogClose();
  };

  handleDateChange = (event) => {
    this.setState({
      date: event.target.value
    })
  }
  handleTimeChange = (event) => {
    this.setState({
      time: event.target.value
    })
  }

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
          {/* Disease */}
          <TextField
              autoFocus
              fullWidth
              variant       = "outlined"
              margin        = "normal"
              id            = "disease"
              label         = "Disease"
              value         = { this.state.disease }
          />
          {/* Practitioner */}
          <TextField
              autoFocus
              fullWidth
              variant       = "outlined"
              margin        = "normal"
              id            = "practitioner"
              label         = "Practitioner"
              value         = { this.state.practitioner }
          />
          {/* Date */}
          <TextField
              autoFocus
              fullWidth
              select
              variant       = "outlined"
              margin        = "normal"
              id            = "date"
              label         = "Date"
              value         = { this.state.date }
              onChange      = { this.handleDateChange }>{
            dateAvailable.map((option) => (
                <MenuItem key = { option } value = { option }>
                  { option }
                </MenuItem>
            ))}
          </TextField>
          {/* Time */}
          <TextField
              autoFocus
              fullWidth
              select
              variant       = "outlined"
              margin        = "normal"
              id            = "time"
              label         = "Time"
              value         = { this.state.time }
              onChange      = { this.handleTimeChange }>{
              timeAvailable.map((option) => (
                  <MenuItem key = { option } value = { option }>
                    { option }
                  </MenuItem>
              ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick = { this.handleSave } color = "primary" align = "right">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewAppointmentDialog;



