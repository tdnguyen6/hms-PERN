import React, { Component }               from 'react';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';
import { Link as RouteLink }              from 'react-router-dom';

import axios                              from 'axios';

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
import LockOutlinedIcon                   from '@material-ui/icons/LockOutlined';
import Typography                         from '@material-ui/core/Typography';
import { withStyles }                     from '@material-ui/core/styles';
import Container                          from '@material-ui/core/Container';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

import { validate }                       from '../../components/Services/Validate';

// API -----------------------------------
import { checkEmailExist }                from '../../components/API/CheckEmailExist';
import { login }                          from "../../components/API/Login";

import ErrorDialog                        from '../Dialog/ErrorDialog';

const style = (theme) => ({
  root: {
    height: '100vh'
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
      error: ''
    },
    password: {
      value: '',
    },
    errorDialog: false,
    loginStatus: false
  };

  // login = async (username, password) => {
  //   let data = {
  //     email: username,
  //     password: password
  //   }
  //   let res = await axios.post('http://localhost:3001/user/login', data);
  //   console.log(res);
  // }

  handleEmailInput = (event) => {
    let validateStatus = validate("email", event.target.value);
    this.setState({
      email: {
          value: event.target.value,
          hasError: validateStatus.email,
          error: (validateStatus.email) ? 'Invalid email address' : ''
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
  handleDialogClose = () => {
      this.setState({
        button: {
          open: false,
          error: ''
        }
      })
  };
  handleSubmit = async () => {
      if (this.state.email.hasError) {
        this.setState({
          errorDialog: true
        });
      }

      // let res = axios.post('http://localhost:3001/user/login', {
      //   email: this.state.email.value,
      //   password: this.state.password.value
      // }).then(res => this.setState({
      //   loginStatus: res.data.loginStatus
      // }));
      //
      // console.log(this.state.loginStatus);
      let api_res = await login(this.state.email.value, this.state.password.value);
      console.log(api_res);

      // this.setState({
      //             loginStatus: api_res['loginStatus'];
      //           }));
      //
      // console.log(this.state.loginStatus);
      // this.setState(
      //   loginStatus: api.response
      // )
        // this.props.history.push("/loginTest");
      // if (this.state.loginStatus) this.props.history.push("/dashboard");
      };

  getOpenStateOfErrorDialog = (openState) => {
    this.setState({
      errorDialog: openState
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
            <Typography component = "h1" variant = "h5"> Login </Typography>
            <form className = { classes.form }>
              <TextField
                variant       = "outlined"
                margin        = "normal"
                id            = "email"
                label         = "Email Address"
                name          = "email"
                autoComplete  = "email"
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
                id            = "password"
                label         = "Password"
                name          = "password"
                type          = "password"
                autoComplete  = "current-password"
                required
                fullWidth
                value         = { this.state.password.value }
                onChange      = { this.handlePasswordInput }
              />
              <FormControlLabel
                control       = {
                  <Checkbox value = "remember" color = "primary" />
                }
                label         = "Remember me"
              />
              <Button
                fullWidth
                variant       = "contained"
                color         = "primary"
                className     = { classes.submit }
                onClick       = { this.handleSubmit }>
                Login
              </Button>
              <ErrorDialog open = { this.state.errorDialog }
                           close = { this.getOpenStateOfErrorDialog }
                           error = { this.state.email.error } />
              <Grid container>
                <Grid item xs>
                  <Link component = { RouteLink } to = "/forgetPassword">
                    <Typography variant = "body2" align = "left">Forgot password</Typography>
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link component = { RouteLink } to = "/register">
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
