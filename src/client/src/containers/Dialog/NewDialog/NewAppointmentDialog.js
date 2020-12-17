import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from "@material-ui/core/MenuItem";
import {availableTimeByPractitioner} from "../../../components/API/AvailableTimeByPractitioner";
import Grid from "@material-ui/core/Grid";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {authorizedUser} from "../../../components/API/Authenticated";
import {allPatient} from "../../../components/API/AllPatient";
import {createAppointment} from "../../../components/API/CreateAppointment";
import {practitionerByMedicalService} from "../../../components/API/PractitionerByMedicalService";
import {allMedicalServices} from "../../../components/API/AllMedicalServices";

class NewAppointmentDialog extends Component {
    state = {
        medical_services: [],
        medical_serviceID: null,
        patientList: [],
        patient: null,
        practitionerList: [],
        practitioner: null,
        dateList: [],
        date: new Date(),
        timeList: [],
        time: null,
    };

    async componentDidMount() {
        try {
            await this.setState({loading: true});
            const user = await authorizedUser();
            if (user) {
                if (user.role === 'admin') {
                    const patient = await allPatient();
                    await this.setState({
                        patientList: patient
                    });
                } else if (user.role === 'patient') {
                    await this.setState({
                        patient: user.patientID
                    });
                }
            }
            await this.setState({
                medical_services: await allMedicalServices()
            })
        } finally {
            await this.setState({loading: false});
        }
    }

    handleDialogClose = async () => {
        await this.setState({
            medical_service: null,
            patientList: [],
            patient: null,
            practitionerList: [],
            practitioner: null,
            dateList: [],
            date: new Date(),
            timeList: [],
            time: null,
        })
        // send close state back to parent: AppointmentTable
        this.props.close(false, "newAppointment");
    }
    handleSave = async () => {
        let appointment = {
            medical_serviceID: this.state.medical_serviceID,
            practitionerID: this.state.practitioner,
            patientID: this.state.patient,
            date: this.state.date,
            time: this.state.time,
        }

        try {
            await this.props.loading(true);
            console.log('loading');
            await createAppointment(appointment);
        } finally {
            await this.props.loading(false);
            console.log('loaded');
        }
        await this.handleDialogClose();
    };
    handlePatientChange = async (event) => {
        await this.setState({
            patient: event.target.value
        });
    }
    handleMedicalServiceChange = async (event) => {
        await this.setState({
            medical_serviceID: event.target.value
        });
        try {
            await this.props.loading(true);
            console.log('loading');
            let res = await practitionerByMedicalService(this.state.medical_serviceID);
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
                open={this.props.open}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Make new appointment</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {/* Dialog Content */}
                        <Grid item xs={12}>
                            <DialogContentText id="alert-dialog-description">
                                To make new appointment, please enter your information here.
                            </DialogContentText>
                        </Grid>
                        {
                            (this.props.user === 'admin') &&
                            /* Patient */
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus fullWidth select
                                    variant="outlined"
                                    id="patient"
                                    label="Patient"
                                    value={this.state.patient}
                                    onChange={this.handlePatientChange}>{
                                    this.state.patientList.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        }
                        {/* medical_service */}
                        <Grid item xs={12}>
                            <TextField
                                autoFocus fullWidth select
                                variant="outlined"
                                id="medical_service"
                                label="Medical Service"
                                value={this.state.medical_serviceID}
                                onChange={this.handleMedicalServiceChange}>{
                                this.state.medical_services.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name.charAt(0).toUpperCase() + option.name.slice(1)} - {option.price}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {/* Practitioner */}
                        <Grid item xs={12}>
                            <TextField
                                autoFocus fullWidth select
                                variant="outlined"
                                id="practitioner"
                                label="Practitioner"
                                value={this.state.practitioner}
                                onChange={this.handlePractitionerChange}>{
                                this.state.practitionerList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {/* Date */}
                        <Grid item xs={12}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disablePast fullWidth autoFocus
                                    variant="inline"
                                    inputVariant="outlined"
                                    label="Date of appointment"
                                    format="dd/MM/yyyy"
                                    value={this.state.date}
                                    onChange={this.handleDateChange}/>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* Time */}
                        <Grid item xs={12}>
                            <TextField
                                autoFocus fullWidth select
                                variant="outlined"
                                id="time"
                                label="Time"
                                value={this.state.time}
                                onChange={this.handleTimeChange}>{
                                this.state.timeList.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSave} color="primary" align="right">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default NewAppointmentDialog;



