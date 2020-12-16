import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import LoadingDialog from "../containers/Dialog/OtherDialog/LoadingDialog";
import {resetPassword, verifyJWT} from "../components/API/PasswordRecovery";
import Footer from "../containers/Others/Footer";
import Main from "../containers/Others/Main";

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class ResetPassword extends Component {
    state = {
        button: {
            open: false,
            error: ''
        },
        password: {
            value: '',
            reenter: {
                hasError: false,
                error: ''
            }
        },
        mess: '',
        email: '',
        messOnly: false,
        loading: false
    };

    async componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has("token")) this.props.history.push("/");
        else {
            try {
                this.setState({loading: true});
                const data = await verifyJWT(urlParams.get("token"));
                this.setState({
                    email: data.email,
                    mess: `Enter new password`
                })
            } catch (e) {
                let mess;
                if (e === "Token Has Expired") {
                    mess =
                        <>
                            It seems like your token has expired after 10 minutes. Please go back to <span> </span>
                            <Link to='/forgetPassword'>
                                forget password page
                            </Link>
                            <span> </span> to request a new email with a valid token.
                        </>
                } else {
                    mess = `Error: ${e}`;
                }
                this.setState({
                    mess: mess,
                    messOnly: true
                })
            } finally {
                this.setState({loading: false});
            }
        }
    }

    handleReenterPassword = (event) => {
        const password = this.state.password;

        if (event.target.value !== password.value) {
            password.reenter = {
                hasError: true,
                error: "Reentered password does not match"
            };
        } else {
            password.reenter = {
                hasError: false,
                error: ''
            };
        }
        this.setState({password: password})
    };

    handleEnterPassword = (event) => {
        const password = this.state.password;
        password.value = event.target.value;
        this.setState({password: password})
    };

    handleDialogClose = () => {
        this.setState({
            button: {
                open: false,
                error: ''
            }
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const dialogStatus = {
            dialogMessage: '',
            dialogHasError: false
        };

        if (this.state.password.reenter.hasError) {
            dialogStatus.dialogHasError = true;
            dialogStatus.dialogMessage = this.state.password.reenter.error;
        }

        this.setState({
            button: {
                open: dialogStatus.dialogHasError,
                error: dialogStatus.dialogMessage
            }
        });

        if (!dialogStatus.dialogHasError) {
            try {
                await this.setState({loading: true});
                await resetPassword(this.state.email, this.state.password.value);
                this.setState({
                    messOnly: true,
                    mess:
                        <>
                            You have successfully changed your password. <br/>
                            <Typography component="p" variant="body1" align="center">
                                Click <span> </span>
                                <Link to='/login'>
                                    here
                                </Link>
                                <span> </span> to login
                            </Typography>
                        </>
                });
            } catch (e) {
                console.log(e);
            } finally {
                await this.setState({loading: false});
            }
        }
    };

    render() {
        const {classes} = this.props;

        return (
            <>
                <Main>
                    <Container maxWidth="xs">
                        <CssBaseline/>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5" gutterBottom>
                                Password Recovery
                            </Typography>
                            {
                                this.state.messOnly
                                    ?
                                    <Typography component="p" variant="body1" align="justify">
                                        {this.state.mess}
                                    </Typography>
                                    :
                                    <>
                                        <Typography component="p" variant="subtitle2">
                                            {this.state.mess}
                                        </Typography>
                                        <form className={classes.form} onSubmit={this.handleSubmit}>
                                            <Grid container spacing={2}>
                                                {/* Email Input */}
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        label="New Password"
                                                        type="password"
                                                        value={this.state.password.value}
                                                        onChange={this.handleEnterPassword}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                {/* Email Input */}
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        label="Reenter New Password"
                                                        type="password"
                                                        onChange={this.handleReenterPassword}
                                                        error={this.state.password.reenter.hasError}
                                                        helperText={this.state.password.reenter.error}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Button
                                                className={classes.submit}
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                type="submit"
                                            >
                                                Submit
                                            </Button>
                                            <Dialog
                                                open={this.state.button.open}
                                                onClose={this.handleDialogClose}
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        {this.state.button.error}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={this.handleDialogClose} color="primary">
                                                        Got it!
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </form>
                                    </>

                            }

                        </div>
                        <LoadingDialog open={this.state.loading}/>
                    </Container>
                </Main>
                <Footer/>
            </>
        );
    };
}

export default withStyles(style, {withTheme: true})(ResetPassword);
