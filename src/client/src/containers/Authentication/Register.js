
import React, { Component }               from 'react';

import { BrowserRouter, Route, Switch }   from 'react-router-dom';
import { Link as RouteLink }              from 'react-router-dom';

import Avatar                             from '@material-ui/core/Avatar';
import Button                             from '@material-ui/core/Button';
import CssBaseline                        from '@material-ui/core/CssBaseline';
import TextField                          from '@material-ui/core/TextField';
import FormControlLabel                   from '@material-ui/core/FormControlLabel';
import Checkbox                           from '@material-ui/core/Checkbox';
import Link                               from '@material-ui/core/Link';
import Paper                              from '@material-ui/core/Paper';
import Box                                from '@material-ui/core/Box';
import Grid                               from '@material-ui/core/Grid';
import Typography                         from '@material-ui/core/Typography';
import { withStyles }                     from '@material-ui/core/styles';
import Container                          from '@material-ui/core/Container';
import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

import LockOutlinedIcon                   from '@material-ui/icons/LockOutlined';

import { validate }                       from '../../components/Services/Validate';

// API -----------------------------------
import { checkEmailExist }                from '../../components/API/CheckEmailExist';
import { register }                       from '../../components/API/Register';
import MenuItem from "@material-ui/core/MenuItem";
import {login} from "../../components/API/Login";
import ErrorDialog from "../Dialog/ErrorDialog";
import LoadingDialog from "../Dialog/LoadingDialog";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/*
can't use hooks because this is a component.
so we can't useStyles API from Material UI
use withStyles instead.
*/
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

class Register extends Component {
  state = {
    name: {
      value: '',
      hasError: false,
      error: ''
    },
    gender: {
      value: ''
    },
    email: {
      value: '',
      hasError: false,
      exist: false,
      error: ''
    },
    phone: {
      value: '',
      hasError: false,
      exist: false,
      error: ''
    },
    SSN: {
      value: '',
      hasError: false,
      error: ''
    },
    DOB: {
      value: new Date()
    },
    password: {
      value: ''
    },
    confirmedPassword: {
      value: '',
      hasError: false,
      error: ''
    },
    registerStatus: false,
    errorDialog: false,
    errorMessage: '',
    loading: false
  };
  handleNameInput = (event) => {
    let validateStatus = validate("name", event.target.value);
    this.setState({
      name: {
          value: event.target.value,
          hasError: validateStatus.name,
          error: (validateStatus.name) ? 'Are you a daughter of Elon Musk?' : ''
        }
    });
  };
  handleGenderInput = (event) => {
    this.setState({
      gender: {
        value: event.target.value
      }
    });
  };
  handleEmailInput = (event) => {
    let validateStatus = validate("email", event.target.value);
    // check email exist.
    this.setState({
      email: {
          value: event.target.value,
          hasError: validateStatus.email,
          error: (validateStatus.email) ? 'Invalid email address' : ''
        }
    });
  };
  handlePhoneInput = (event) => {
    let validateStatus = validate("phone", event.target.value);
    this.setState({
      phone: {
          value: event.target.value,
          hasError: validateStatus.phone,
          error: (validateStatus.phone) ? 'Must have 10 numbers' : ''
        }
    });
  };
  handleSSNInput = async (event) => {
    let validateStatus = validate("ssn", event.target.value);
    await this.setState({
      SSN: {
        value: event.target.value,
        hasError: validateStatus.ssn,
        error: (validateStatus.ssn) ? '5 numbers and no character' : ''
      }
    })
  };
  handleDOBInput = async (date) => {
    await this.setState({
      DOB: {
        value: date
      }
    })
  };
  handlePasswordInput = (event) => {
    this.setState({
      password: {
          value: event.target.value
        }
    });
  };
  handleConfirmedPasswordInput = (event) => {
    let passwordStatus = (event.target.value === this.state.password.value);
    this.setState({
      confirmedPassword: {
          value: event.target.value,
          hasError: !passwordStatus,
          error: (!passwordStatus) ? 'Password doesn\'t match.' : ''
        }
    });
  };

  handleDialogClose = async (close, type) => {
    if (type === "error") {
      await this.setState({
        errorDialog: close
      });
    }
  }

  handleSubmit = async () => {
    const dialogStatus = {
      dialogMessage: '',
      dialogError: false
    };

    try {
      await this.setState({ loading: true });
      let res = await checkEmailExist(this.state.email.value);
      if (res != null) {
        await this.setState({
          email: {
            exist: true
          }
        })
      }
    } finally {
      await this.setState({ loading: false });
    }

    if (this.state.name.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'The given name is invalid. Name must not contain numbers and special characters.';
    } else if (this.state.email.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'The given email is invalid. Please input the valid email';
    } else if (this.state.email.exist) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'This email is registered. Please change email or recover password.';
    } else if (this.state.phone.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'Phone number is invalid. Phone number must contain 10 numbers.';
    } else if (this.state.SSN.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'The social security number is wrong. Please try again.'
    } else if (this.state.confirmedPassword.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'Please confirm the password again. Confirmed password should be the same with password.';
    }
    await this.setState({
      errorDialog: dialogStatus.dialogHasError,
      errorMessage: dialogStatus.dialogMessage
    });

    try {
      // loading
      await this.setState({ loading: true });
      let res = await register(this.state.name.value,
                                this.state.email.value,
                                this.state.password.value,
                                this.state.phone.value,
                                this.state.gender.value,
                                this.state.SSN.value,
                                this.state.DOB.value);
      if (res) this.props.history.push('/login');
      else {
        // this.setState({
        //   errorDialog: true,
        //   errorMessage: 'Something wrong happened. Please try again.'
        // });
        console.log('error');
      }
    } finally {
      await this.setState({ loading: false });
    }
  };

  render() {
    const { classes } = this.props;

    return (
        <React.Fragment>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className = {classes.paper}>
              <Avatar className = {classes.avatar}><LockOutlinedIcon /></Avatar>
              <Typography component = "h1" variant = "h5">Sign up</Typography>
              <form className = {classes.form}>
                <Grid container spacing = {2}>
                  {/* Name Input */}
                  <Grid item xs = {12} sm = {9}>
                    <TextField
                        autoComplete  = "name"
                        name          = "Name"
                        variant       = "outlined"
                        required
                        fullWidth
                        id            = "Name"
                        label         = "Name"
                        autoFocus
                        value         = { this.state.name.value }
                        error         = { this.state.name.hasError }
                        helperText    = { this.state.name.error }
                        onChange      = { this.handleNameInput }
                    />
                  </Grid>
                  {/* Gender Input */}
                  <Grid item xs = {12} sm = {3}>
                    <TextField
                        required fullWidth autoFocus select
                        autoComplete  = "Gender"
                        name          = "Gender"
                        variant       = "outlined"
                        id            = "Gender"
                        label         = "Sex"
                        value         = { this.state.gender.value }
                        onChange      = { this.handleGenderInput }>
                      <MenuItem key = "M" value = "male">M</MenuItem>
                      <MenuItem key = "F" value = "female">F</MenuItem>
                    </TextField>
                  </Grid>
                  {/* SSN Input */}
                  <Grid item xs = {12} sm = {6}>
                    <TextField
                        autoComplete  = "ssn"
                        name          = "SSN"
                        variant       = "outlined"
                        required
                        fullWidth
                        id            = "SSN"
                        label         = "SSN"
                        autoFocus
                        value         = { this.state.SSN.value }
                        error         = { this.state.SSN.hasError }
                        helperText    = { this.state.SSN.error }
                        onChange      = { this.handleSSNInput }
                    />
                  </Grid>
                  {/* DOB Input */}
                  <Grid item xs = {12} sm = {6}>
                    <MuiPickersUtilsProvider utils = {DateFnsUtils}>
                      <KeyboardDatePicker
                          disableFuture
                          variant               = "inline"
                          inputVariant          = "outlined"
                          label                 = "Date of Birth"
                          format                = "dd/MM/yyyy"
                          openTo                = "year"
                          views                 = {["year", "month", "date"]}
                          value                 = { this.state.DOB.value }
                          InputAdornmentProps   = {{ position: "end" }}
                          onChange              = { this.handleDOBInput }/>
                    </MuiPickersUtilsProvider>
                  </Grid>
                  {/* Email Input */}
                  <Grid item xs = {12} sm = {6}>
                    <TextField
                        variant       = "outlined"
                        required
                        fullWidth
                        id            = "email"
                        label         = "Email Address"
                        name          = "email"
                        autoComplete  = "email"
                        value         = { this.state.email.value }
                        error         = { this.state.email.hasError }
                        helperText    = { this.state.email.error }
                        onChange      = { this.handleEmailInput }
                    />
                  </Grid>
                  {/* Phone Input */}
                  <Grid item xs = {12} sm = {6}>
                    <TextField
                        variant       = "outlined"
                        required
                        fullWidth
                        id            = "phone"
                        label         = "Phone Number"
                        name          = "phone"
                        autoComplete  = "phone"
                        value         = { this.state.phone.value }
                        error         = { this.state.phone.hasError }
                        helperText    = { this.state.phone.error }
                        onChange      = { this.handlePhoneInput }
                    />
                  </Grid>
                  {/* Password Input */}
                  <Grid item xs = {12}>
                    <TextField
                        variant       = "outlined"
                        required
                        fullWidth
                        name          = "password"
                        label         = "Password"
                        type          = "password"
                        id            = "password"
                        autoComplete  = "current-password"
                        value         = { this.state.password.value }
                        error         = { this.state.password.hasError }
                        helperText    = { this.state.password.error }
                        onChange      = { this.handlePasswordInput }
                    />
                  </Grid>
                  {/* ConfirmedPassword Input */}
                  <Grid item xs = {12}>
                    <TextField
                        variant       = "outlined"
                        required
                        fullWidth
                        name          = "confirmedPassword"
                        label         = "Confirmed Password Again"
                        type          = "password"
                        id            = "ConfirmedPassword"
                        autoComplete  = "current-password"
                        value         = { this.state.confirmedPassword.value }
                        error         = { this.state.confirmedPassword.hasError }
                        helperText    = { this.state.confirmedPassword.error }
                        onChange      = { this.handleConfirmedPasswordInput }
                    />
                  </Grid>
                </Grid>
                <Button
                    className         = { classes.submit }
                    fullWidth
                    variant           = "contained"
                    color             = "primary"
                    onClick           = { this.handleSubmit }
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link component = { RouteLink } to = '/login'>
                      <Typography variant = "body2" align = "right">
                        Already have an account? Sign in
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          <ErrorDialog open = { this.state.errorDialog }
                       close = { this.handleDialogClose }
                       error = { this.state.errorMessage } />
          <LoadingDialog open = { this.state.loading } />
        </React.Fragment>
    );
  };
}

export default withStyles(style, { withTheme: true })(Register);
