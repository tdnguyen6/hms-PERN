
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
    email: {
      value: '',
      hasError: false,
      error: ''
    },
    phone: {
      value: '',
      hasError: false,
      error: ''
    },
    password: {
      value: '',
      hasError: false,
      error: ''
    },
    confirmedPassword: {
      value: '',
      hasError: false,
      error: ''
    },
    button: {
      open: false,
      error: ''
    }
  };

  handleNameInput = (event) => {
    const regexp = /^[a-zA-ZàáâãèéêìíòóôõùúýÀÁÂÈÉÊÌÍÒÓÔÙÚÝ ]+$/u;
    const checkingResult = {
      hasError: regexp.exec(event.target.value),
      error: ''
    };
    if (checkingResult.hasError !== null) {
      checkingResult.hasError = false;
      checkingResult.error = '';
    } else {
      checkingResult.hasError = true;
      checkingResult.error = 'Are you a daughter of Elon Musk?';
    }
    this.setState({
      name: {
          value: event.target.value,
          hasError: checkingResult.hasError,
          error: checkingResult.error
        }
    });
  };

  handleEmailInput = (event) => {
    const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const checkingResult = {
      hasError: regexp.exec(event.target.value),
      error: ''
    };
    if (checkingResult.hasError !== null) {
      checkingResult.hasError = false;
      checkingResult.error = '';
    } else {
      checkingResult.hasError = true;
      checkingResult.error = 'Invalid email address';
    }
    this.setState({
      email: {
          value: event.target.value,
          hasError: checkingResult.hasError,
          error: checkingResult.error
        }
    });
  };

  handlePhoneInput = (event) => {
    const regexp = /^\d{10}$/;
    const checkingResult = {
      hasError: regexp.exec(event.target.value),
      error: ''
    };
    if (checkingResult.hasError !== null) {
      checkingResult.hasError = false;
      checkingResult.error = '';
    } else {
      checkingResult.hasError = true;
      checkingResult.error = 'Must have 10 numbers';
    }
    this.setState({
      phone: {
          value: event.target.value,
          hasError: checkingResult.hasError,
          error: checkingResult.error
        }
    });
  }

  handlePasswordInput = (event) => {
    this.setState({
      password: {
          value: event.target.value,
          hasError: false,
          error: ''
        }
    });
  };

  handleConfirmedPasswordInput = (event) => {
    const checkingResult = {
      hasError: false,
      error: ''
    };
    if (event.target.value === this.state.password.value) {
      checkingResult.hasError = false;
      checkingResult.error = '';
    } else {
      checkingResult.hasError = true;
      checkingResult.error = 'Password doesn\'t match.';
    }
    this.setState({
      confirmedPassword: {
          value: event.target.value,
          hasError: checkingResult.hasError,
          error: checkingResult.error
        }
    });
  };

  handleDialogClose = () => {
    this.setState({
      button: {
        open: false,
        error: ''
      }
    })
  }

  handleSubmit = () => {
    const dialogStatus = {
      dialogMessage: '',
      dialogHasError: false
    };

    if (this.state.name.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'The given name is invalid. Name must not contain numbers and special characters.';
    } else if (this.state.email.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'The given email is invalid. Please input the valid email';
    } else if (this.state.phone.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'Phone number is invalid. Phone number must contain 10 numbers.';
    } else if (this.state.confirmedPassword.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'Please confirm the password again. Confirmed password should be the same with password.';
    }
    this.setState({
      button: {
        open: dialogStatus.dialogHasError,
        error: dialogStatus.dialogMessage
      }
    });
    if (!dialogStatus.dialogHasError) {
      this.props.history.push("/login");
    }
    //else {}
  };

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className = {classes.paper}>
          <Avatar className = {classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component = "h1" variant = "h5">
            Sign up
          </Typography>
          <form className = {classes.form}>
            <Grid container spacing = {2}>
              {/* Name Input */}
              <Grid item xs = {12}>
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
                  label         = "ConfirmedPassword"
                  type          = "password"
                  id            = "Confirmed Password Again"
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
            <Dialog
              open              = { this.state.button.open }
              onClose           = { this.handleDialogClose }
              aria-describedby  = "alert-dialog-description"
            >
              <DialogContent>
                <DialogContentText id = "alert-dialog-description">
                  { this.state.button.error }
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick = { this.handleDialogClose } color = "primary">
                  Got it!
                </Button>
              </DialogActions>
            </Dialog>
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
    );
  };
}

export default withStyles(style, { withTheme: true })(Register);
