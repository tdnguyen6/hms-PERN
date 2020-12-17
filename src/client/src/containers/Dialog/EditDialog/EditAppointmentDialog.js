import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from "@material-ui/core/IconButton";
import PractitionerInfoDialog from "../InfoDialog/PractitionerInfoDialog";
import {deleteAppointment} from "../../../components/API/DeleteAppointment";
import {availableTimeByPractitioner} from "../../../components/API/AvailableTimeByPractitioner";
import LoadingDialog from "../OtherDialog/LoadingDialog";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {editAppointment} from "../../../components/API/EditAppointment";

class EditAppointmentDialog extends Component {
    state = {
        date: new Date(this.props.appointment.date[2],
            this.props.appointment.date[1] - 1,
            this.props.appointment.date[0], 0, 0, 0),
        timeList: [this.props.appointment.time],
        time: this.props.appointment.time,
        log: this.props.appointment.log,
        prescription: this.props.appointment.prescription,
        nextAppointment: {
            period: this.props.appointment.next_appointment_period,
            service: this.props.appointment.next_appointment_service,
            price: this.props.appointment.next_appointment_service_price,
        },
        diseaseInfoDialog: false,
        userInfoDialog: false,
        userInfo: null,
        loading: false
    }

    async componentDidMount() {
        try {
            await this.setState({loading: true});
            const res = await availableTimeByPractitioner(this.props.appointment.practitioner.id, this.state.date);
            await this.setState({
                timeList: res.concat(this.state.time).sort()
            });
        } finally {
            await this.setState({loading: false});
        }
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
        } else if (type === "userInfo") {
            await this.setState({
                userInfoDialog: close
            });
        }
    }
    handleSave = async () => {
        await editAppointment(this.props.appointment.id, this.state.date, this.state.time);
        await this.setState({
            date: new Date(this.props.appointment.date[2],
                this.props.appointment.date[1] - 1,
                this.props.appointment.date[0], 0, 0, 0),
            timeList: [this.props.appointment.time],
            time: this.props.appointment.time,
            diseaseInfoDialog: false,
            practitionerInfoDialog: false,
            loading: false
        })
        // send close state back to parent: AppointmentTable
        this.handleDialogClose();
    };
    handleDelete = async () => {
        await deleteAppointment(this.props.appointment.id);
        this.handleDialogClose();
    };

    handleDateChange = async (date) => {
        await this.setState({
            date: date
        });
        try {
            await this.setState({loading: true});
            const res = await availableTimeByPractitioner(this.props.appointment.practitioner.id, this.state.date);
            await this.setState({
                timeList: res
            });
        } finally {
            await this.setState({loading: false});
        }
    }
    handleTimeChange = async (event) => {
        await this.setState({
            time: event.target.value
        })
    }

    handleUserInfoClick = async (user) => {
        await this.setState({
            userInfoDialog: true,
            userInfo: user
        });
    }

    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Appointment Information</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            {/* Dialog Content */}
                            <Grid item xs={12}>
                                <DialogContentText id="alert-dialog-description">
                                    To edit information of this appointment, please enter or choose new information
                                    below.
                                    There are some read only information you can not change.
                                </DialogContentText>
                            </Grid>
                            {/* Medical Service */}
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus fullWidth
                                    variant="outlined"
                                    id="medical_service"
                                    label="Medical Service"
                                    value={this.props.appointment.medical_service}
                                    InputProps={{readOnly: true}}/>
                            </Grid>
                            {/* Practitioner */}
                            {
                                (this.props.user !== 'practitioner') &&
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus fullWidth
                                        variant="outlined"
                                        id="practitioner"
                                        label="Practitioner"
                                        value={this.props.appointment.practitioner.name}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment:
                                                <IconButton aria-label="information">
                                                    <InfoOutlinedIcon
                                                        onClick={() => this.handleUserInfoClick('practitioner')}/>
                                                </IconButton>
                                        }}
                                    />
                                </Grid>
                            }
                            {/* Patient */}
                            {
                                (this.props.user !== 'patient') &&
                                <Grid item xs={6}>
                                    <TextField
                                        autoFocus fullWidth
                                        variant="outlined"
                                        id="patient"
                                        label="Patient"
                                        value={this.props.appointment.patient.name}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment:
                                                <IconButton aria-label="information">
                                                    <InfoOutlinedIcon
                                                        onClick={() => this.handleUserInfoClick('patient')}/>
                                                </IconButton>
                                        }}
                                    />
                                </Grid>
                            }
                            {/* Date */}
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        fullWidth autoFocus
                                        disablePast = { this.props.appointment.status !== 'done' }
                                        readOnly    = { this.props.appointment.status === 'done' }
                                        error       = { this.props.appointment.status === 'done' && false }
                                        helperText  = { null }
                                        variant="dialog"
                                        inputVariant="outlined"
                                        label="Date of appointment"
                                        format="dd/MM/yyyy"
                                        value={this.state.date}
                                        onChange={this.handleDateChange}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {/* Time */}
                            <Grid item xs={6}>
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
                            { (this.props.appointment.status === 'done' || this.props.user === 'practitioner') &&
                                <React.Fragment>
                                    {/* Notes and Prescription */}
                                    <Grid item xs={12}>
                                        <DialogContentText id="alert-dialog-description">
                                            Appointment note and prescription from practitioner
                                        </DialogContentText>
                                    </Grid>
                                    {/* Notes */}
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus fullWidth multiline
                                            rowsMax = {4}
                                            variant="outlined"
                                            id="log"
                                            label="Log"
                                            value={this.state.log}
                                            InputProps={{readOnly: this.props.appointment.status === 'done'}}/>
                                    </Grid>
                                    {/* Prescription */}
                                    <Grid item xs={12}>
                                        <TextField
                                            autoFocus fullWidth multiline
                                            rowsMax = {4}
                                            variant="outlined"
                                            id="prescription"
                                            label="Prescription"
                                            value={this.state.prescription}
                                            InputProps={{readOnly: this.props.appointment.status === 'done'}}/>
                                    </Grid>
                                    {/* Next appointment */}
                                    <Grid item xs={12}>
                                        <DialogContentText id="alert-dialog-description">
                                            Next appointment information
                                        </DialogContentText>
                                    </Grid>
                                    {/* Period */}
                                    <Grid item xs={3}>
                                        <TextField
                                            autoFocus fullWidth
                                            variant="outlined"
                                            id="next_appointment_period"
                                            label="Period"
                                            value={this.state.nextAppointment.period}
                                            InputProps={{readOnly: this.props.appointment.status === 'done'}}/>
                                    </Grid>
                                    {/* Service */}
                                    <Grid item xs={6}>
                                        <TextField
                                            autoFocus fullWidth
                                            variant="outlined"
                                            id="next_appointment_service"
                                            label="Service"
                                            value={this.state.nextAppointment.service}
                                            InputProps={{readOnly: this.props.appointment.status === 'done'}}/>
                                    </Grid>
                                    {/* Price */}
                                    <Grid item xs={3}>
                                        <TextField
                                            autoFocus fullWidth
                                            variant="outlined"
                                            id="next_appointment_price"
                                            label="Price"
                                            value={this.state.nextAppointment.price}
                                            InputProps={{readOnly: true}}/>
                                    </Grid>
                                </React.Fragment>
                            }
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDelete} color="primary" align="left">
                            Delete
                        </Button>
                        <Button onClick={this.handleSave} color="primary" align="right">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <PractitionerInfoDialog open={this.state.userInfoDialog}
                                        close={this.handleSubDialogClose}
                                        data={(this.state.userInfo === 'patient') ? this.props.appointment.patient : this.props.appointment.practitioner}
                                        user={this.state.userInfo}/>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>

        );
    }
}

export default EditAppointmentDialog;
