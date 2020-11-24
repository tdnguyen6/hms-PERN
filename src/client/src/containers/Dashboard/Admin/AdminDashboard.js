import React, { Component }                     from 'react';
import { BrowserRouter, Route, Switch }         from 'react-router-dom';
import { Link as RouteLink }                    from 'react-router-dom';

import clsx                                     from 'clsx';

import { withStyles }                           from '@material-ui/core/styles';
import CssBaseline                              from '@material-ui/core/CssBaseline';
import Drawer                                   from '@material-ui/core/Drawer';
import Box                                      from '@material-ui/core/Box';
import AppBar                                   from '@material-ui/core/AppBar';
import Toolbar                                  from '@material-ui/core/Toolbar';
import List                                     from '@material-ui/core/List';
import Typography                               from '@material-ui/core/Typography';
import Divider                                  from '@material-ui/core/Divider';
import IconButton                               from '@material-ui/core/IconButton';
import Badge                                    from '@material-ui/core/Badge';
import Container                                from '@material-ui/core/Container';
import Grid                                     from '@material-ui/core/Grid';
import Paper                                    from '@material-ui/core/Paper';
import Link                                     from '@material-ui/core/Link';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import MenuIcon                                 from '@material-ui/icons/Menu';
import ChevronLeftIcon                          from '@material-ui/icons/ChevronLeft';

import PatientAppointmentTable from '../../Table/PatientAppointmentTable';
import PractitionerAppointmentTable from '../../Table/PractitionerAppointmentTable';

import { AdminSidebar } from '../../../components/Services/Sidebar';

const style = (theme) => ({
  root: {
    display: 'flex'
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 640
  }
});

class AdminDashboard extends Component {
  state = {
    sidebar: {
      open: true
    }
  };

  handleDrawer = () => {
    this.setState({
      sidebar: {
        open: !this.state.sidebar.open
      }
    });
  };

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className = { classes.root }>
        <CssBaseline />
        <AppBar position = "absolute" className = { clsx(classes.appBar, this.state.sidebar.open && classes.appBarShift) }>
          <Toolbar className = { classes.toolbar }>
            <IconButton
              edge        = "start"
              color       = "inherit"
              aria-label  = "open drawer"
              onClick     = { this.handleDrawer }
              className   = { clsx(classes.menuButton, this.state.sidebar.open && classes.menuButtonHidden) }
            >
              <MenuIcon />
            </IconButton>
            <Typography component = "h1" variant = "h6" color = "inherit" noWrap className = { classes.title }>
              Dashboard
            </Typography>
            {/*
            <IconButton color = "inherit">
              <Badge badgeContent = {4} color = "secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant = "permanent"
          classes = { { paper: clsx(classes.drawerPaper, !this.state.sidebar.open && classes.drawerPaperClose) } }
          open    = { this.state.sidebar.open }>
          <div className = { classes.toolbarIcon}>
            <IconButton onClick = { this.handleDrawer }>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{AdminSidebar}</List>
        </Drawer>
        <main className = { classes.content }>
          <div className = { classes.appBarSpacer } />
          <Container maxWidth = "lg" className = { classes.container }>
            <Grid container spacing = {3}>
              <Grid item xs = {12}>
                <Paper className = { classes.paper }>
                  <PractitionerAppointmentTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(AdminDashboard);
