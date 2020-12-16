import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {validate} from '../components/Services/Validate';
import LoadingDialog from "../containers/Dialog/OtherDialog/LoadingDialog";
import {sendResetPasswordLink} from "../components/API/PasswordRecovery";
import ErrorDialog from "../containers/Dialog/OtherDialog/ErrorDialog";

const style = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class ForgetPassword extends Component {
    state = {
        email: {
            value: '',
            hasError: false,
            error: ''
        },
        errorDialog: false,
        errorMessage: '',
        done: false,
        loading: false
    };

    handleEmailInput = (event) => {
        const fail = validate("email", this.state.email.value);

        this.setState({
            email: {
                value: event ? event.target.value : this.state.email.value,
                hasError: fail.email,
                error: fail.email ? 'Invalid email address' : ''
            }
        });
    };

    handleDialogClose = async (close, type) => {
        if (type === "error") {
            await this.setState({
                errorDialog: close,
                errorMessage: ''
            });
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const dialogStatus = {
            dialogMessage: '',
            dialogHasError: false
        };

        if (this.state.email.hasError) {
            dialogStatus.dialogHasError = true;
            dialogStatus.dialogMessage = 'The given email is invalid. Please input the valid email';
        }

        this.setState({
                dialogHasError: dialogStatus.dialogHasError,
                dialogMessage: dialogStatus.dialogMessage
        });

        if (!dialogStatus.dialogHasError) {
            this.setState({ done: true });
            try {
                await this.setState({ loading: true });
                await sendResetPasswordLink(this.state.email.value);
            } catch (error) {
                console.log(error);
            } finally {
                await this.setState({ loading: false });
            }
        }
    };

    backToForm = (event) => {
        event.preventDefault();
        this.setState({ done: false });
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Container maxWidth="xs">
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                        <Typography component="h1" variant="h5" gutterBottom>
                            Password Recovery
                        </Typography>
                        { this.state.done
                            ?
                            <Typography component="p" variant="body1" align="justify">
                                You should soonly receive an email containing a link to reset password.
                                If you have not received an email, it may not be a registered one.
                                Click <span> </span>
                                <Link href = "" onClick = { this.backToForm }>here</Link>
                                <span> </span> to enter another one.
                            </Typography>
                            : <div>
                                <Typography component="p" variant="subtitle2">
                                    Enter your email address to receive reset password link
                                </Typography>
                                <form className={classes.form} onSubmit={this.handleSubmit}>
                                    <Grid container spacing={2}>
                                        {/* Email Input */}
                                        <Grid item xs={12}>
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
                                                onChange={this.handleEmailInput}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        className={classes.submit}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit">
                                        Submit
                                    </Button>
                                </form>
                            </div>
                        }
                    </div>
                </Container>
                <LoadingDialog open = { this.state.loading }/>
                <ErrorDialog open = { this.state.errorDialog }
                             close = { this.handleDialogClose }
                             error = { this.state.errorMessage }/>
            </React.Fragment>
        );
    };
}

export default withStyles(style, {withTheme: true})(ForgetPassword);
