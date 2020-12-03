import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import Grid                               from "@material-ui/core/Grid";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from "@material-ui/core/IconButton";
import DiseaseInfoDialog from "../InfoDialog/DiseaseInfoDialog";
import PractitionerInfoDialog from "../InfoDialog/PractitionerInfoDialog";

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

class EditAppointmentDialog extends Component {
  state = {
    date: this.props.date,
    time: this.props.time,
    diseaseInfoDialog: false,
    practitionerInfoDialog: false,
  }

  handleDialogClose = () => {
    // send close state back to parent: AppointmentTable
    this.props.close(false, "editAppointment");
  }
  handleSubDialogClose = async (close, type) => {
    if (type === "diseaseInfo") {
      await this.setState({
        diseaseInfoDialog: close
      });
    } else if (type === "practitionerInfo") {
      await this.setState({
        practitionerInfoDialog: close
      });
    }
  }
  handleSave = () => {
    // send close state back to parent: AppointmentTable
    this.handleDialogClose();
  };
  handleDelete = () => {
    // send close state back to parent: AppointmentTable
    this.handleDialogClose();
  };

  handleDateChange = async (event) => {
    await this.setState({
      date: event.target.value
    })
  }
  handleTimeChange = async (event) => {
    await this.setState({
      time: event.target.value
    })
  }

  handleDiseaseInfoClick = async () => {
    await this.setState({
      diseaseInfoDialog: true
    });
  }
  handlePractitionerInfoClick = async () => {
    await this.setState({
      practitionerInfoDialog: true
    });
  }

  render() {
    return (
        <React.Fragment>
          <Dialog
              open              = { this.props.open }
              onClose           = { this.handleDialogClose }
              aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Appointment Information</DialogTitle>
            <DialogContent>
              <Grid container>
                {/* Dialog Content */}
                <Grid item xs = {12}>
                  <DialogContentText id = "alert-dialog-description">
                    To edit information of this appointment, please enter or choose new information below.
                    There are some read only information you can not change.
                  </DialogContentText>
                </Grid>
                {/* Disease */}
                <Grid item xs = {12}>
                  <TextField
                      autoFocus
                      fullWidth
                      variant       = "outlined"
                      margin        = "normal"
                      id            = "disease"
                      label         = "Disease"
                      value         = { this.props.disease }
                      InputProps    = {{ readOnly: true, endAdornment:
                            <IconButton aria-label="information">
                              <InfoOutlinedIcon onClick = { this.handleDiseaseInfoClick } />
                            </IconButton> }}
                  />
                </Grid>
                {/* Practitioner */}
                <Grid item xs = {12}>
                  <TextField
                      autoFocus
                      fullWidth
                      variant       = "outlined"
                      margin        = "normal"
                      id            = "practitioner"
                      label         = "Practitioner"
                      value         = { this.props.practitioner }
                      InputProps    = {{ readOnly: true, endAdornment:
                            <IconButton aria-label="information">
                              <InfoOutlinedIcon onClick = { this.handlePractitionerInfoClick } />
                            </IconButton> }}
                  />
                </Grid>
                {/* Room */}
                <Grid item xs = {12}>
                  <TextField
                      autoFocus
                      fullWidth
                      variant       = "outlined"
                      margin        = "normal"
                      id            = "room"
                      label         = "Room"
                      InputProps    = {{ readOnly: true, }}
                      value         = { this.props.room }
                  />
                </Grid>
                {/* Date */}
                <Grid item xs = {12}>
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
                </Grid>
                {/* Time */}
                <Grid item xs = {12}>
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
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick = { this.handleSave } color = "primary" align = "right">
                Save
              </Button>
              <Button onClick = { this.handleDelete } color = "primary" align = "left">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <DiseaseInfoDialog open = { this.state.diseaseInfoDialog }
                             close = { this.handleSubDialogClose }
                             data = { this.props.disease }/>
          <PractitionerInfoDialog open = { this.state.practitionerInfoDialog }
                             close = { this.handleSubDialogClose }
                             data = { this.props.practitioner }/>
        </React.Fragment>

    );
  }
}

export default EditAppointmentDialog;
