import React, { Component }   from 'react';
import Avatar                 from '@material-ui/core/Avatar';
import Button                 from '@material-ui/core/Button';
import CssBaseline            from '@material-ui/core/CssBaseline';
import TextField              from '@material-ui/core/TextField';
import FormControlLabel       from '@material-ui/core/FormControlLabel';
import Checkbox               from '@material-ui/core/Checkbox';
import Link                   from '@material-ui/core/Link';
import Paper                  from '@material-ui/core/Paper';
import Box                    from '@material-ui/core/Box';
import Grid                   from '@material-ui/core/Grid';
import LockOutlinedIcon       from '@material-ui/icons/LockOutlined';
import Typography             from '@material-ui/core/Typography';
import { withStyles }         from '@material-ui/core/styles';

const style = (theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
      error: ''
    },
    password: {
      value: '',
      hasError: false,
      error: ''
    }
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

  handlePasswordInput = (event) => {
    this.setState({
      password: {
        value: event.target.value,
        hasError: false,
        error: ''
      }
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container component = "main" className = {classes.root}>
        <CssBaseline />
        <Grid item xs = {false} sm = {4} md = {7} className = {classes.image} />
        <Grid item xs = {12} sm = {8} md = {5} component = {Paper} elevation = {6} square>
          <div className = { classes.paper }>
            <Avatar className = { classes.avatar }>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component = "h1" variant = "h5"> Sign in </Typography>
            <form className = { classes.form }>
              <TextField
                variant       = "outlined"
                margin        = "normal"
                id            = "email"
                label         = "Email Address"
                name          = "email"
                autoComplete  = "email"
                autoFocus
                required
                fullWidth
                value         = { this.state.email.value }
                error         = { this.state.email.hasError }
                helperText    = { this.state.email.error }
                onChange      = { this.handleEmailInput }
              />
              <TextField
                variant       = "outlined"
                margin        = "normal"
                name          = "password"
                label         = "Password"
                type          = "password"
                id            = "password"
                autoComplete  = "current-password"
                required
                fullWidth
                value         = { this.state.password.value }
                error         = { this.state.password.hasError }
                helperText    = { this.state.password.error }
                onChange      = { this.handlePasswordInput }
              />
              <FormControlLabel
                control       = {
                  <Checkbox value = "remember" color = "primary" />
                }
                label         = "Remember me"
              />
              <Button
                type          = "submit"
                fullWidth
                variant       = "contained"
                color         = "primary"
                className     = { classes.submit }> Sign In </Button>
              <Grid container>
                <Grid item xs>
                  <Link href = "#">
                    <Typography variant = "body2" align = "left">Forgot password</Typography>
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href = "#">
                    <Typography variant = "body2" align = "right">Don't have an account?</Typography>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  };
}

export default withStyles(style, { withTheme: true })(Login);
