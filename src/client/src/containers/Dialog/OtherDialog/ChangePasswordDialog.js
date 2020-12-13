import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import ErrorDialog from "./ErrorDialog";
import LoadingDialog from "./LoadingDialog";
import {changePassword} from "../../../components/API/ChangePassword";

class ChangePasswordDialog extends Component {
    state = {
        password: {
            value: null
        },
        confirmedPassword: {
            value: null,
            hasError: false,
            error: null
        },
        errorDialog: false,
        errorMessage: null,
        loading: false
    }

    handleDialogClose = () => {
        this.props.close(false, 'changePassword');
    }
    handleSubDialogClose = async () => {
        await this.setState({ errorDialog: false });
    }
    handleSave = async () => {
        const dialogStatus = {
            dialogMessage: '',
            dialogHasError: false
        };

        if (this.state.confirmedPassword.hasError) {
            dialogStatus.dialogHasError = true;
            dialogStatus.dialogMessage = 'Please confirm the password again. Confirmed password should be the same with password.';
        }

        await this.setState({
            errorDialog: dialogStatus.dialogHasError,
            errorMessage: dialogStatus.dialogMessage
        });

        if (!dialogStatus.dialogHasError) {
            try {
                await this.setState( { loading: true });
                await changePassword(this.state.password.value);
            } finally {
                await this.setState({ loading: false });
            }
        }
        this.handleDialogClose();
    }

    handlePasswordInput = async (event) => {
        await this.setState({ password: { value: event.target.value } });
    }
    handleConfirmedPasswordInput = async (event) => {
        let passwordStatus = (event.target.value === this.state.password.value);
        this.setState({
            confirmedPassword: {
                value: event.target.value,
                hasError: !passwordStatus,
                error: (!passwordStatus) ? 'Password doesn\'t match.' : ''
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Dialog open = { this.props.open } onClose=  { this.handleDialogClose }
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                    <DialogContent>
                        <Grid container spacing = {2}>
                            <Grid item xs = {12}>
                                <DialogContentText>
                                    To change password, please input new password below.
                                </DialogContentText>
                            </Grid>
                            {/* Password Input */}
                            <Grid item xs={12}>
                                <TextField
                                    required fullWidth
                                    variant="outlined"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    value={this.state.password.value}
                                    onChange={this.handlePasswordInput}/>
                            </Grid>
                            {/* ConfirmedPassword Input */}
                            <Grid item xs={12}>
                                <TextField
                                    required fullWidth
                                    variant="outlined"
                                    name="confirmedPassword"
                                    label="Confirmed Password Again"
                                    type="password"
                                    id="confirmedPassword"
                                    value={this.state.confirmedPassword.value}
                                    error={this.state.confirmedPassword.hasError}
                                    helperText={this.state.confirmedPassword.error}
                                    onChange={this.handleConfirmedPasswordInput}/>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick = { this.handleSave } color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
                <ErrorDialog open={this.state.errorDialog}
                             close={this.handleSubDialogClose}
                             error={this.state.errorMessage}/>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default ChangePasswordDialog;