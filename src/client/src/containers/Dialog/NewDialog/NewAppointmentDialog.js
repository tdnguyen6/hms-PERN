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
import {allMedicalService} from "../../../components/API/AllMedicalService";
import {login} from "../../../components/API/Login";
import PaymentDialog from "../OtherDialog/PaymentDialog";
import LoadingDialog from "../OtherDialog/LoadingDialog";
import {priceByMedicalService} from "../../../components/API/PriceByMedicalService";
import ErrorDialog from "../OtherDialog/ErrorDialog";
import {checkAppointmentExist} from "../../../components/API/CheckAppointmentExist";
import {capitalFirstChar} from "../../../components/Services/CapitalFirstChar";

class NewAppointmentDialog extends Component {
    state = {
        medicalServiceList: [],
        medicalServiceID: null,
        patientList: [],
        patientID: null,
        practitionerList: [],
        practitionerID: null,
        dateList: [],
        date: new Date(),
        timeList: [],
        time: null,
        paymentDialog: false,
        price: null,
        loading: false,
        appointmentDetail: {
            medicalServiceID: null,
            practitionerID: null,
            patientID: null,
            date: new Date(),
            time: null,
        },
        error: {
            errorDialog: false,
            errorMessage: null
        }
    };

    async componentDidMount() {
        try {
            await this.setState({loading: true});
            const user = await authorizedUser();
            if (user) {
                if (user.role !== 'patient') {
                    const patient = await allPatient();
                    await this.setState({
                        patientList: patient
                    });
                }

                if (user.role === 'patient') {
                    await this.setState({
                        patientID: user.patientID
                    });
                } else if (user.role === 'practitioner') {
                    await this.setState({
                        practitionerID: user.practitionerID
                    });
                }
            }
            await this.setState({
                medicalServiceList: await allMedicalService()
            })
        } finally {
            await this.setState({loading: false});
        }
    }

    handleSubDialogClose = async (close, type) => {
        if (type === 'error') {
            await this.setState({
                error: {
                    open: close,
                    message: null
                }
            });
        } else if (type === 'payment') {
            await this.setState({ paymentDialog: close });
            await this.handleDialogClose();
        }
    }
    handleDialogClose = async () => {
        await this.setState({
            medicalServiceID: null,
            practitionerList: [],
            dateList: [],
            date: new Date(),
            timeList: [],
            time: null,
        });
        this.props.close(false, "newAppointment");
    }
    handleSave = async () => {
        let hasAnotherAppointment;
        let user;
        try {
            await this.setState({loading: true});
            user = await authorizedUser();
            hasAnotherAppointment = await checkAppointmentExist(this.state.patientID, this.state.date, this.state.time);
        } finally {
            await this.setState({loading: false});
        }

        if (hasAnotherAppointment) {
            await this.setState({
                error: {
                    errorDialog: true,
                    errorMessage: 'Another appointment is booked in this period.'
                }
            });
        } else if (this.state.medicalServiceID === null || this.state.practitionerID === null || this.state.patientID === null || this.state.time === null) {
            await this.setState({
                error: {
                    errorDialog: true,
                    errorMessage: 'Information missing. Please fill in all information.'
                }
            });
        } else if (user.role === 'admin') {
            await this.setState({
                appointmentDetail: {
                    medicalServiceID: this.state.medicalServiceID,
                    practitionerID: this.state.practitionerID,
                    patientID: this.state.patientID,
                    date: this.state.date,
                    time: this.state.time,
                }
            });
            await createAppointment(this.state.appointmentDetail);
            await this.handleDialogClose();
        } else {
                await this.setState({
                    appointmentDetail: {
                        medicalServiceID: this.state.medicalServiceID,
                        practitionerID: this.state.practitionerID,
                        patientID: this.state.patientID,
                        date: this.state.date,
                        time: this.state.time,
                    },
                    price: await priceByMedicalService(this.state.medicalServiceID),
                    paymentDialog: true
                });
        }
    };
    handlePatientChange = async (event) => {
        await this.setState({
            patientID: event.target.value
        });
    }
    handleMedicalServiceChange = async (event) => {
        await this.setState({
            medicalServiceID: event.target.value,
            practitionerID: null,
            date: new Date(),
            time: null
        });
        try {
            await this.props.loading(true);
            let res = await practitionerByMedicalService(this.state.medicalServiceID);
            await this.setState({
                practitionerList: res
            });
            console.log(this.state.practitionerList);
        } finally {
            await this.props.loading(false);
        }
    }
    handlePractitionerChange = async (event) => {
        await this.setState({
            practitionerID: event.target.value,
            date: new Date(),
            time: null
        });
    }
    handleDateChange = async (date) => {
        await this.setState({
            date: date,
            time: null,
        });
        try {
            await this.props.loading(true);
            let res = await availableTimeByPractitioner(this.state.practitionerID, this.state.date);
            await this.setState({
                timeList: res
            });
        } finally {
            await this.props.loading(false);
        }
    }
    handleTimeChange = async (event) => {
        await this.setState({
            time: event.target.value
        });
    }

  render() {
    return (
        <React.Fragment>
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
                        {/* Medical service */}
                        <Grid item xs={(this.props.user === 'admin') ? 12 : 6}>
                            <TextField
                                autoFocus fullWidth select
                                variant="outlined"
                                id="medical_service"
                                label="Medical Service"
                                value={this.state.medicalServiceID}
                                onChange={this.handleMedicalServiceChange}>{
                                this.state.medicalServiceList.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        {`${capitalFirstChar(option.name)} - ${option.price}`}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        {/* AppointmentIn30Day */}
                        { (this.props.user !== 'patient') &&
                        <Grid item xs = {6}>
                            <TextField
                                autoFocus fullWidth select
                                variant       = "outlined"
                                id            = "patient"
                                label         = "Patient"
                                value         = { this.state.patientID }
                                onChange      = { this.handlePatientChange }>{
                                this.state.patientList.map((option) => (
                                    <MenuItem key = { option.id } value = { option.id }>
                                        { option.name }
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        }
                        {/* Practitioner */}
                        { (this.props.user !== 'practitioner') &&
                        <Grid item xs = {6}>
                            <TextField
                                autoFocus fullWidth select
                                variant       = "outlined"
                                id            = "practitioner"
                                label         = "Practitioner"
                                value         = { this.state.practitionerID }
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
                        <Grid item xs = {6}>
                            <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                                <KeyboardDatePicker
                                    disabled = { !this.state.medicalServiceID || !this.state.practitionerID }
                                    disablePast fullWidth autoFocus
                                    variant               = "dialog"
                                    inputVariant          = "outlined"
                                    label                 = "Date of appointment"
                                    format                = "dd/MM/yyyy"
                                    value                 = { this.state.date }
                                    onChange              = { this.handleDateChange }/>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        {/* Time */}
                        <Grid item xs = {6}>
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
            <PaymentDialog open = { this.state.paymentDialog }
                           close = { this.handleSubDialogClose }
                           appointment = { this.state.appointmentDetail }
                           price = {this.state.price} />
            <ErrorDialog open = { this.state.error.errorDialog }
                         close = { this.handleSubDialogClose }
                         error = { this.state.error.errorMessage } />
            <LoadingDialog open={this.state.loading}/>
        </React.Fragment>
    );
  }
}

export default NewAppointmentDialog;



