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
import {allDisease} from "../../../components/API/AllDisease";
import {practitionerByDisease} from "../../../components/API/PractitionerByDisease";
import {availableTimeByPractitioner} from "../../../components/API/AvailableTimeByPractitioner";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import authorizedUser from "../../../components/API/Authenticated";
import {allPatient} from "../../../components/API/AllPatient";

class NewAppointmentDialog extends Component {
  state = {
    disease: '',
    patientList: [],
    patient: '',
    practitionerList: [],
    practitioner: '',
    dateList: [],
    date: new Date(),
    timeList: [],
    time: '',
    user: ''
  };

  async componentDidMount() {
    try {
      await this.setState({ loading: true });
      const user = await authorizedUser();
      if (user) {
        await this.setState({
          user: user.role
        });
        if (user.role === 'admin') {
          const patient = await allPatient();
          await this.setState({
            patientList: patient
          });
        }
      }
    } finally {
      await this.setState({ loading: false });
    }
  }

  handleDialogClose = async () => {
    await this.setState({
      disease: '',
      patientList: [],
      patient: '',
      practitionerList: [],
      practitioner: '',
      dateList: [],
      date: new Date(),
      timeList: [],
      time: '',
      user: ''
    })
    // send close state back to parent: AppointmentTable
    this.props.close(false, "newAppointment");
  }
  handleSave = async () => {
    // send close state back to parent: AppointmentTable
    this.props.appointment(this.state);
    await this.handleDialogClose();
  };
  handlePatientChange = async (event) => {
    await this.setState({
      patient: event.target.value
    });
  }
  handleDiseaseChange = async (event) => {
    await this.setState({
      disease: event.target.value
    });
    try {
      await this.props.loading(true);
      console.log('loading');
      let res = await practitionerByDisease(this.state.disease);
      await this.setState({
        practitionerList: res
      });
      console.log(this.state.practitionerList);
    } finally {
      await this.props.loading(false);
      console.log('loaded');
    }
  }
  handlePractitionerChange = async (event) => {
    await this.setState({
      practitioner: event.target.value
    });
  }
  handleDateChange = async (date) => {
    await this.setState({
      date: date
    });
    try {
      await this.props.loading(true);
      console.log("loading");
      let res = await availableTimeByPractitioner(this.state.practitioner, this.state.date);
      console.log(res);
      await this.setState({
        timeList: res
      });
    } finally {
      await this.props.loading(false);
      console.log("loaded");
    }
  }
  handleTimeChange = async (event) => {
    await this.setState({
      time: event.target.value
    });
  }

  render() {
    return (
      <Dialog
        open              = { this.props.open }
        onClose           = { this.handleDialogClose }
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Make new appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing = {2}>
            {/* Dialog Content */}
            <Grid item xs = {12}>
              <DialogContentText id = "alert-dialog-description">
                To make new appointment, please enter your information here.
              </DialogContentText>
            </Grid>
            {
              (this.state.user === 'admin') &&
              /* Patient */
              <Grid item xs = {12}>
                <TextField
                    autoFocus fullWidth select
                    variant       = "outlined"
                    id            = "disease"
                    label         = "Disease"
                    value         = { this.state.patient }
                    onChange      = { this.handlePatientChange }>{
                      this.state.patientList.map((option) => (
                          <MenuItem key = { option.id } value = { option.id }>
                            { option.name }
                          </MenuItem>
                      ))}
                </TextField>
              </Grid>
            }
            {/* Disease */}
            <Grid item xs = {12}>
              <TextField
                  autoFocus fullWidth select
                  variant       = "outlined"
                  id            = "disease"
                  label         = "Disease"
                  value         = { this.state.disease }
                  onChange      = { this.handleDiseaseChange }>{
                this.props.disease.map((option) => (
                    <MenuItem key = { option.id } value = { option.id }>
                      { option.name.charAt(0).toUpperCase() + option.name.slice(1) }
                    </MenuItem>
                ))}
              </TextField>
            </Grid>
            {
              (this.state.user === 'admin' || this.state.user === 'patient') &&
              /* Practitioner */
              <Grid item xs = {12}>
                <TextField
                    autoFocus fullWidth select
                    variant       = "outlined"
                    id            = "practitioner"
                    label         = "Practitioner"
                    value         = { this.state.practitioner }
                    onChange      = { this.handlePractitionerChange }>{
                  this.state.practitionerList.map((option) => (
                      <MenuItem key = { option.id } value = { option.id }>
                        { option.name }
                      </MenuItem>
                  ))}
                </TextField>
              </Grid>
            }
            {/* Date */}
            <Grid item xs = {12}>
              <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                <KeyboardDatePicker
                    disablePast fullWidth autoFocus
                    variant               = "inline"
                    inputVariant          = "outlined"
                    label                 = "Date of appointment"
                    format                = "dd/MM/yyyy"
                    value                 = { this.state.date }
                    onChange              = { this.handleDateChange }/>
              </MuiPickersUtilsProvider>
            </Grid>
            {/* Time */}
            <Grid item xs = {12}>
              <TextField
                  autoFocus fullWidth select
                  variant       = "outlined"
                  id            = "time"
                  label         = "Time"
                  value         = { this.state.time }
                  onChange      = { this.handleTimeChange }>{
                this.state.timeList.map((option) => (
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
        </DialogActions>
      </Dialog>
    );
  }
}

export default NewAppointmentDialog;



