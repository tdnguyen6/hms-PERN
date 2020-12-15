import React, {Component} from 'react';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";

const style = (theme) => ({
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    }
});

class PractitionerInfoDialog extends Component {
    handleDialogClose = () => {
        // send close state back to parent: AppointmentTable
        this.props.close(false, "userInfo");
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleDialogClose}
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogTitle id="form-dialog-title">
                        {/* ADD @material-ui/avatar HERE */}
                        <Grid container   direction="column"
                              alignItems="center"
                              justify="center">
                            <Avatar className = {classes.avatar} src = {this.props.data.avatar}>
                                M
                            </Avatar>
                        </Grid>
                    </DialogTitle>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing = {2}>
                            {/* Name */}
                            <Grid item xs = {12} sm = {9}>
                                <TextField
                                    fullWidth autoFocus
                                    autoComplete            = "name"
                                    name                    = "Name"
                                    variant                 = "outlined"
                                    id                      = "Name"
                                    label                   = "Name"
                                    value                   = { this.props.data.name }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* Gender */}
                            <Grid item xs = {12} sm = {3}>
                                <TextField
                                    fullWidth autoFocus
                                    autoComplete            = "Gender"
                                    name                    = "Gender"
                                    variant                 = "outlined"
                                    id                      = "Gender"
                                    label                   = "Sex"
                                    value                   = {this.props.data.gender}
                                    InputProps              = {{readOnly: true}}/>
                            </Grid>
                            {/* Email */}
                            <Grid item xs = {12} sm = {6}>
                                <TextField
                                    fullWidth autoFocus
                                    variant                 = "outlined"
                                    id                      = "email"
                                    label                   = "Email Address"
                                    name                    = "email"
                                    autoComplete            = "email"
                                    value                   = { this.props.data.email }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* Phone */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth autoFocus
                                    variant                 = "outlined"
                                    id                      = "phone"
                                    label                   = "Phone Number"
                                    name                    = "phone"
                                    autoComplete            = "phone"
                                    value                   = { this.props.data.phone }
                                    InputProps              = {{ readOnly: true }}/>
                            </Grid>
                            {/* DOB */}
                            {
                                (this.props.user === 'patient') &&
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth autoFocus
                                        autoComplete            = "dob"
                                        name                    = "DOB"
                                        variant                 = "outlined"
                                        id                      = "DOB"
                                        label                   = "Date of Birth"
                                        value                   = { this.props.data.dob.toLocaleDateString('en-GB') }
                                        InputProps              = {{ readOnly: true }}/>
                                </Grid>
                            }
                            {/* SSN */}
                            {
                                (this.props.user === 'patient') &&
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth autoFocus
                                        autoComplete            = "ssn"
                                        name                    = "SSN"
                                        variant                 = "outlined"
                                        id                      = "SSN"
                                        label                   = "Social Security No."
                                        value                   = { this.props.data.ssn }
                                        InputProps              = {{ readOnly: true }}/>
                                </Grid>
                            }
                            {/* Specialty */}
                            {
                                (this.props.user === 'practitioner') &&
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        fullWidth autoFocus
                                        autoComplete            = "specialty"
                                        name                    = "Specialty"
                                        variant                 = "outlined"
                                        id                      = "specialty"
                                        label                   = "Specialty"
                                        value                   = { this.props.data.specialty }
                                        InputProps              = {{ readOnly: true }}/>
                                </Grid>
                            }
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        Got it!
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default withStyles(style)(PractitionerInfoDialog);