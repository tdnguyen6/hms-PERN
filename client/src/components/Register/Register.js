import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
    }
  };

  handleNameInput = (event) => {
    const regexp = /^[A-Za-z]+$/;
    const checkingResult = {
      hasError: regexp.exec(event.target.value),
      error: ''
    };
    if (checkingResult.hasError !== null) {
      checkingResult.hasError = false;
      checkingResult.error = '';
    } else {
      checkingResult.hasError = true;
      checkingResult.error = 'are you a daughter of Elon Musk?';
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
      checkingResult.error = 'invalid email address';
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
      checkingResult.error = 'must have 10 numbers';
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
      checkingResult.error = 'password doesn\'t match.';
    }
    this.setState({
      confirmedPassword: {
        value: event.target.value,
        hasError: checkingResult.hasError,
        error: checkingResult.error
      }
    });
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
              {/*
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
              */}
            </Grid>
            <Button className = {classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
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
