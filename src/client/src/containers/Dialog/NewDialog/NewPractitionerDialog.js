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
import {createPractitioner} from "../../../components/API/CreatePractitioner";
import {checkPhoneExist} from "../../../components/API/checkPhoneExist";

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
        email: {
            value: '',
            hasError: false,
            error: '',
            exist: false
        },
        phone: {
            value: '',
            hasError: false,
            error: ''
        },
        specialty: {
            value: ''
        },
        errorDialog: false,
        errorMessage: '',
    };

    handleDialogClose = async () => {
        // send close state back to parent: AppointmentTable
        await this.setState({
            name: {
                value: '',
                hasError: false,
                error: ''
            },
            sex: {
                value: ''
            },
            email: {
                value: '',
                hasError: false,
                error: '',
                exist: false
            },
            phone: {
                value: '',
                hasError: false,
                error: '',
                exist: false
            },
            specialty: {
                value: ''
            },
            errorDialog: false,
            errorMessage: '',
        });
        this.props.close(false, "newPractitioner");
    }
    handleSave = async () => {
        try {
            await this.props.loading(true);

            const email = this.state.email;
            const phone = this.state.phone;

            email.exist = await checkEmailExist(this.state.email.value);
            phone.exist = await checkPhoneExist(this.state.phone.value);

            await this.setState({
                email: {...email},
                phone: {...phone}
            });

            let errorStatus = this.getError();

            if (errorStatus.error) await this.props.error(errorStatus);
            else {
                let practitioner = {
                    name: this.state.name.value,
                    email: this.state.email.value,
                    phone: this.state.phone.value,
                    gender: this.state.sex.value,
                    password: '',
                    id: '',
                    specialty: this.state.specialty.value
                }
                await createPractitioner(practitioner);
                await this.handleDialogClose();
            }
        } finally {
            await this.props.loading(false);
        }
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
    handleSpecialtyChange = async (event) => {
        await this.setState({
            specialty: {
                value: event.target.value
            }
        })
    }

    getError = () => {
        const errorStatus = {
            error: false,
            message: ''
        };

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
        } else if (this.state.name.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Name is required';
        } else if (this.state.email.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Email is required';
        } else if (this.state.phone.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Phone is required';
        } else if (this.state.phone.exist) {
            errorStatus.error = true;
            errorStatus.message = 'This phone number is registered. Please use another phone number';
        } else if (this.state.sex.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Sex is required';
        } else if (this.state.specialty.value === '') {
            errorStatus.error = true;
            errorStatus.message = 'Speciality is required';
        }

        return errorStatus;
    }

    render() {
        return (
            <React.Fragment>
                <Dialog
                    open = {this.props.open}
                    onClose = {this.handleDialogClose}
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
                                    required fullWidth select
                                    autoComplete            = "specialty"
                                    name                    = "Specialty"
                                    variant                 = "outlined"
                                    id                      = "specialty"
                                    label                   = "Specialty"
                                    value                   = {this.state.specialty.value}
                                    onChange                = {this.handleSpecialtyChange}> {
                                        this.props.specialty.map((option) => (
                                            <MenuItem key = { option.id } value = { option.id }>
                                                { option.name.charAt(0).toUpperCase() + option.name.slice(1) }
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
            </React.Fragment>
        );
    }
}

export default NewPractitionerDialog;



