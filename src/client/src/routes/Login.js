import React, {Component} from 'react';
import {Link as RouteLink} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {validate} from '../components/Services/Validate';
import {login} from "../components/API/Login";
import ErrorDialog from '../containers/Dialog/OtherDialog/ErrorDialog';
import LoadingDialog from "../containers/Dialog/OtherDialog/LoadingDialog";
import withStyles from "@material-ui/core/styles/withStyles";
import {authorizedUser} from "../components/API/Authenticated";
import DefaultAppBar from "../containers/Others/DefaultAppBar";

const style = (theme) => ({
    root: {
        height: '100%',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2980&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});
class Login extends Component {
    state = {
        email: {
            value: '',
            hasError: false,
        },
        password: {
            value: '',
        },
        rememberMe: true,
        errorDialog: false,
        errorMessage: '',
        loginStatus: false,
        loading: false
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });
            const user = await authorizedUser();
            if (user) {
                this.props.history.push(`/${user.role}`);
            }
        } finally {
            this.setState({ loading: false });
        }

        if (localStorage.email && localStorage.email !== '') {
            this.setState({
                email: {
                    value: localStorage.email
                }
            });
        }
    }

    handleDialogClose = async (close, type) => {
        if (type === 'error') {
            await this.setState({
                errorDialog: close
            })
        }
    }
    handleEmailInput = (event) => {
        let match = validate("email", event.target.value);
        this.setState({
            email: {
                value: event.target.value,
                hasError: match.email,
                error: match.email ? 'Invalid email address' : ''
            }
        });
    };
    handlePasswordInput = (event) => {
        this.setState({
            password: {
                value: event.target.value,
            }
        });
    };
    handleRememberMe = (event) => {
        this.setState({
            rememberMe: event.target.checked
        });
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        const {email, password, rememberMe} = this.state;
        if (email.hasError) {
            this.setState({
                errorDialog: true,
                errorMessage: 'Invalid email address'
            });
        }

        if (!email.hasError) {
            if (rememberMe && email.value !== '') {
                localStorage.email = email.value;
            } else {
                localStorage.removeItem('email');
            }

            try {
                await this.setState({ loading: true });
                await login(this.state.email.value, this.state.password.value);
                const user = await authorizedUser();
                if (user) {
                    this.props.history.push(`/${user.role}`);
                } else {
                    this.setState({
                        errorDialog: true,
                        errorMessage: 'Email address/Password is incorrect. Please try again.'
                    });
                }
            } finally {
                await this.setState({loading: false});
            }
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <DefaultAppBar />
                <Grid container className = {classes.root}>
                    <CssBaseline/>
                    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className = {classes.paper}>
                            <Avatar className={classes.avatar}><LockOutlinedIcon/></Avatar>
                            <Typography component="h1" variant="h5"> Login </Typography>
                            <form className={classes.form} onSubmit={this.handleSubmit}>
                                <Grid container spacing={2}>
                                    {/* Name Input */}
                                    <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                autoComplete="email"
                                                required
                                                fullWidth
                                                value={this.state.email.value}
                                                error={this.state.email.hasError}
                                                onChange={this.handleEmailInput}
                                            />
                                        </Grid>
                                    {/* Password Input */}
                                    <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                id="password"
                                                label="Password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                required
                                                fullWidth
                                                value={this.state.password.value}
                                                onChange={this.handlePasswordInput} />
                                    </Grid>
                                </Grid>
                                {/* Remember Me */}
                                <FormControlLabel
                                    control = {<Checkbox color="primary" checked={this.state.rememberMe}/>}
                                    label = "Remember me"
                                    onChange = {this.handleRememberMe}/>
                                <Button
                                     fullWidth
                                     variant="contained"
                                     color="primary"
                                     type="submit"
                                     className={classes.submit}>Login
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link component={RouteLink} to="/forgetPassword">
                                                <Typography variant="body2" align="left">Forgot password</Typography>
                                            </Link>
                                    </Grid>
                                    <Grid item xs>
                                        <Link component={RouteLink} to="/register">
                                                <Typography variant="body2" align="right">Don't have an
                                                    account?</Typography>
                                            </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </Grid>
                </Grid>
                <ErrorDialog open={this.state.errorDialog}
                             close={this.handleDialogClose}
                             error={this.state.errorMessage}/>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    };
}

export default withStyles(style, {withTheme: true})(Login);
