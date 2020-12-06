import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";

import {validate} from '../../../components/Services/Validate';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {checkEmailExist} from "../../../components/API/CheckEmailExist";

class NewPractitionerDialog extends Component {
    state = {
        name: {
            value: '',
            hasError: false,
            error: ''
        },
        sex: {
            value: ''
        },
        ssn: {
            value: '',
            hasError: false,
            error: ''
        },
        dob: {
            value: new Date()
        },
        email: {
            value: '',
            hasError: false,
            error: '',
            exist: ''
        },
        phone: {
            value: '',
            hasError: false,
            error: ''
        },
        speciality: {
            value: ''
        },
        errorDialog: false,
        errorMessage: '',
    };

    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false, "newPractitioner");
    }
    handleSave = async () => {
        const errorStatus = {
            error: false,
            message: ''
        };

        try {
            await this.props.loading(true);
            let res = await checkEmailExist(this.state.email.value);
            if (res != null) {
                await this.setState({
                    email: {
                        exist: true
                    }
                })
            }
        } finally {
            await this.props.loading(false);
        }

        if (this.state.name.hasError) {
            errorStatus.error = true;
            errorStatus.message = 'The given name is invalid. Name must not contain numbers and special characters.';
        } else if (this.state.email.hasError) {
            errorStatus.error = true;
            errorStatus.message = 'The given email is invalid. Please input the valid email';
        } else if (this.state.email.exist) {
            errorStatus.error = true;
            errorStatus.message = 'This email is registered. Please change email or recover password.';
        } else if (this.state.phone.hasError) {
            errorStatus.error = true;
            errorStatus.message = 'Phone number is invalid. Phone number must contain 10 numbers.';
        } else if (this.state.ssn.hasError) {
            errorStatus.error = true;
            errorStatus.message = 'The social security number is wrong. Please try again.';
        } else if (this.state.name.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Name is required';
        } else if (this.state.email.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Email is required';
        } else if (this.state.phone.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Phone is required';
        } else if (this.state.ssn.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'SSN is required';
        } else if (this.state.sex.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Sex is required';
        } else if (this.state.speciality.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Speciality is required';
        }

        if (errorStatus.error) await this.props.error(errorStatus);
        else this.handleDialogClose();
    };
    handleNameChange = async (event) => {
        let validateStatus = validate("name", event.target.value);
        await this.setState({
            name: {
                value: event.target.value,
                hasError: validateStatus.name,
                error: (validateStatus.name) ? 'Name must not contain number' : ''
            }
        });
    }
    handleGenderChange = async (event) => {
        await this.setState({
            sex: {
                value: event.target.value
            }
        });
    }
    handleSSNChange = async (event) => {
        let validateStatus = validate("ssn", event.target.value);
        await this.setState({
            ssn: {
                value: event.target.value,
                hasError: validateStatus.ssn,
                error: (validateStatus.ssn) ? 'Must have only 5 number' : ''
            }
        });
    }
    handleDOBChange = async (date) => {
        await this.setState({
            dob: {
                value: date
            }
        })
    }
    handleEmailChange = async (event) => {
        let validateStatus = validate("email", event.target.value);
        await this.setState({
            email: {
                value: event.target.value,
                hasError: validateStatus.email,
                error: (validateStatus.email) ? 'Email invalid' : ''
            }
        })
    }
    handlePhoneChange = async (event) => {
        let validateStatus = validate("phone", event.target.value);
        await this.setState({
            phone: {
                value: event.target.value,
                hasError: validateStatus.phone,
                error: (validateStatus.phone) ? 'Must have only 10 numbers' : ''
            }
        });
    }
    handleSpecialityChange = async (event) => {
        await this.setState({
            speciality: {
                value: event.target.value
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add new practitioner</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            {/* Dialog Content */}
                            <Grid item xs={12}>
                                <DialogContentText id="alert-dialog-description">
                                    To add new practitioner, please enter new information below.
                                    Password will be automatically generated based on social security number.
                                </DialogContentText>
                            </Grid>
                            {/* Name */}
                            <Grid item xs={12} sm={9}>
                                <TextField
                                    required fullWidth autoFocus
                                    autoComplete="name"
                                    name="Name"
                                    variant="outlined"
                                    id="Name"
                                    label="Name"
                                    value={this.state.name.value}
                                    error={this.state.name.hasError}
                                    helperText={this.state.name.error}
                                    onChange={this.handleNameChange}/>
                            </Grid>
                            {/* Gender */}
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required fullWidth autoFocus select
                                    autoComplete="Gender"
                                    name="Gender"
                                    variant="outlined"
                                    id="Gender"
                                    label="Sex"
                                    value={this.state.sex.value}
                                    onChange={this.handleGenderChange}>
                                    <MenuItem key="M" value="male">M</MenuItem>
                                    <MenuItem key="F" value="female">F</MenuItem>
                                </TextField>
                            </Grid>
                            {/* SSN */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="ssn"
                                    name="SSN"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="SSN"
                                    label="SSN"
                                    autoFocus
                                    value={this.state.ssn.value}
                                    error={this.state.ssn.hasError}
                                    helperText={this.state.ssn.error}
                                    onChange={this.handleSSNChange}/>
                            </Grid>
                            {/* DOB */}
                            <Grid item xs={12} sm={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableFuture required fullWidth autoFocus
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Date of Birth"
                                        format="dd/MM/yyyy"
                                        openTo="year"
                                        views={["year", "month", "date"]}
                                        value={this.state.dob.value}
                                        InputAdornmentProps={{position: "end"}}
                                        onChange={this.handleDOBChange}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            {/* Email */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email.value}
                                    error={this.state.email.hasError}
                                    helperText={this.state.email.error}
                                    onChange={this.handleEmailChange}/>
                            </Grid>
                            {/* Phone */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    value={this.state.phone.value}
                                    error={this.state.phone.hasError}
                                    helperText={this.state.phone.error}
                                    onChange={this.handlePhoneChange}/>
                            </Grid>
                            {/* Speciality */}
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required fullWidth autoFocus
                                    autoComplete="speciality"
                                    name="Speciality"
                                    variant="outlined"
                                    id="speciality"
                                    label="Speciality"
                                    value={this.state.speciality.value}
                                    onChange={this.handleSpecialityChange}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleSave} color="primary" align="right">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>

            </React.Fragment>
        );
    }
}

export default NewPractitionerDialog;



