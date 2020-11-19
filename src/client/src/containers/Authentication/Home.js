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
import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';
import { Link as RouteLink }              from 'react-router-dom';
import AppBar                             from '@material-ui/core/AppBar';
import Card                               from '@material-ui/core/Card';
import CardActions                        from '@material-ui/core/CardActions';
import CardContent                        from '@material-ui/core/CardContent';
import CardHeader                         from '@material-ui/core/CardHeader';
import StarIcon                           from '@material-ui/icons/StarBorder';
import Toolbar                            from '@material-ui/core/Toolbar';
import Container                          from '@material-ui/core/Container';

const style = (theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    }
  }
});

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position = "static" color = "primary" elevation = {0} className = { classes.appBar }>
          <Toolbar className = { classes.toolbar }>
            <Typography variant = "h6" color = "inherit" noWrap className = { classes.toolbarTitle }>
              IU Hospital
            </Typography>
            <Button href      = "/login"
                    color     = "inherit"
                    className = { classes.link }>
                    Login</Button>
            <Button href      = "/register"
                    color     = "inherit"
                    className = { classes.link }>
                    Register</Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container maxWidth = "sm" component = "main" className = { classes.heroContent }>
          <Typography component = "h1" variant = "h3" align = "center" color = "textPrimary" gutterBottom>
            Treatment in the best hospital of Vietnam
          </Typography>
          <Typography component = "p" variant = "h6" align = "center" color = "textSecondary">
            some text here about the system
          </Typography>
        </Container>
        <Container maxWidth = "xs" component = "main">
        <Grid container>
          <Grid item xs>
            <Link component = { RouteLink } to = "/login">
              <Typography variant = "body1" align = "center">Book now!</Typography>
            </Link>
          </Grid>
          <Grid item xs>
            <Link component = { RouteLink } to = "/register">
              <Typography variant = "body1" align = "center">I'm new here!</Typography>
            </Link>
          </Grid>
        </Grid>
        </Container>
        {/* End hero unit */}
      </React.Fragment>
    );
  }
}

export default withStyles(style, { withTheme: true })(Home);
