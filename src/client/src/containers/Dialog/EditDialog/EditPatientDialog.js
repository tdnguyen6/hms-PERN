import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import {deletePractitioner} from "../../../components/API/DeletePractitioner";
import { deletePatient } from '../../../components/API/DeletePatient';

class EditPatientDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: PractitionerTable
        this.props.close(false, "editPatient");
    }

    handleSave = () => {
        this.handleDialogClose();
    };
    handleDelete = async () => {
        try {
            await this.setState({ loading: true });
            let res = await deletePatient(this.props.id);
            console.log(res);
        } finally {
            await this.setState({ loading: false });
        }
        this.handleDialogClose();
    };

    render() {
        return (
            <React.Fragment>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleDialogClose}
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Patient Information</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            {/* Dialog Content */}
                            <Grid item xs = {12}>
                                <DialogContentText id="alert-dialog-description">
                                    To edit information of this patient, please enter new information below.
                                    There are some read only information you can not change.
                                </DialogContentText>
                            </Grid>
                            {/* Name */}
                            <Grid item xs = {12} sm = {9}>
                                <TextField
                                    required fullWidth autoFocus
                                    autoComplete            = "name"
                                    name                    = "Name"
                                    variant                 = "outlined"
                                    id                      = "Name"
                                    label                   = "Name"
                                    value                   = { this.props.name }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* Gender */}
                            <Grid item xs = {12} sm = {3}>
                                <TextField
                                    required fullWidth autoFocus
                                    autoComplete            = "Gender"
                                    name                    = "Gender"
                                    variant                 = "outlined"
                                    id                      = "Gender"
                                    label                   = "Sex"
                                    value                   = {this.props.sex}
                                    InputProps              = {{readOnly: true}}/>
                            </Grid>
                            {/* Email */}
                            <Grid item xs = {12} sm = {6}>
                                <TextField
                                    required fullWidth autoFocus
                                    variant                 = "outlined"
                                    id                      = "email"
                                    label                   = "Email Address"
                                    name                    = "email"
                                    autoComplete            = "email"
                                    value                   = { this.props.email }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* Phone */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth autoFocus
                                    variant                 = "outlined"
                                    id                      = "phone"
                                    label                   = "Phone Number"
                                    name                    = "phone"
                                    autoComplete            = "phone"
                                    value                   = { this.props.phone }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* DOB */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth autoFocus
                                    autoComplete            = "dob"
                                    name                    = "DOB"
                                    variant                 = "outlined"
                                    id                      = "DOB"
                                    label                   = "Date of Birth"
                                    value                   = { this.props.dob }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* SSN */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required fullWidth autoFocus
                                    autoComplete            = "ssn"
                                    name                    = "SSN"
                                    variant                 = "outlined"
                                    id                      = "SSN"
                                    label                   = "Social Security No."
                                    value                   = { this.props.ssn }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = {this.handleDelete} color = "primary" align = "left">
                            Delete
                        </Button>
                        <Button onClick = {this.handleSave} color = "primary" align = "right">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

export default EditPatientDialog;
