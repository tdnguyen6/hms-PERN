import React, { Component }               from 'react';
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
import { BrowserRouter, Route, Switch }   from 'react-router-dom';
import { Link as RouteLink }              from 'react-router-dom';

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

class ForgetPassword extends Component {
  state = {
    email: {
      value: '',
      hasError: false,
      error: ''
    },
    button: {
      open: false,
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

    if (this.state.email.hasError) {
      dialogStatus.dialogHasError = true;
      dialogStatus.dialogMessage = 'The given email is invalid. Please input the valid email';
    }

    this.setState({
      button: {
        open: dialogStatus.dialogHasError,
        error: dialogStatus.dialogMessage
      }
    });

    if (!dialogStatus.dialogHasError) {
      this.props.history.push("/");
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
            Password Recovery
          </Typography>
          <Typography component = "p" variant = "p">
            some text here
          </Typography>
          <form className = {classes.form}>
            <Grid container spacing = {2}>
              {/* Email Input */}
              <Grid item xs = {12}>
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
            </Grid>
            <Button
              className         = { classes.submit }
              fullWidth
              variant           = "contained"
              color             = "primary"
              onClick           = { this.handleSubmit }
            >
              Submit
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
          </form>
        </div>
      </Container>
    );
  };
}

export default withStyles(style, { withTheme: true })(ForgetPassword);
