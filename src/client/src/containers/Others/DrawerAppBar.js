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

import SidebarFunction from './SidebarFunction';

const style = (theme) => ({
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
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
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

});

class DrawerAppBar extends Component {
  state = {
    barOpen: false
  }

  handleDrawer = () => {
    this.setState({
      barOpen: !this.state.barOpen
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position = "absolute" className = { clsx(classes.appBar, this.state.barOpen && classes.appBarShift) }>
          <Toolbar className = { classes.toolbar }>
            <IconButton
              edge        = "start"
              color       = "inherit"
              aria-label  = "open drawer"
              onClick     = { this.handleDrawer }
              className   = { clsx(classes.menuButton, this.state.barOpen && classes.menuButtonHidden) }
            >
              <MenuIcon />
            </IconButton>
            <Typography component = "h1" variant = "h6" color = "inherit" noWrap className = { classes.title }>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant = "permanent"
          classes = { { paper: clsx(classes.drawerPaper, !this.state.barOpen && classes.drawerPaperClose) } }
          open    = { this.state.barOpen }>
          <div className = { classes.toolbarIcon}>
            <IconButton onClick = { this.handleDrawer }>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{
            <SidebarFunction type = { this.props.type } />
          }</List>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default withStyles(style, { withTheme: true })(DrawerAppBar);
