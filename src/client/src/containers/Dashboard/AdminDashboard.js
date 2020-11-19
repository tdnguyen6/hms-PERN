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

import MenuIcon                                 from '@material-ui/icons/Menu';
import ChevronLeftIcon                          from '@material-ui/icons/ChevronLeft';

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
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
});

class PractitionerDashboard extends Component {
  state = {
    open: true
  };

  handleDrawer = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
      <div className = { classes.root }>
        <CssBaseline />
        <AppBar position = "absolute" className = { clsx(classes.appBar, this.state.open && classes.appBarShift) }>
          <Toolbar className = { classes.toolbar }>
            <IconButton
              edge        = "start"
              color       = "inherit"
              aria-label  = "open drawer"
              onClick     = { this.handleDrawer }
              className   = { clsx(classes.menuButton, this.state.open && classes.menuButtonHidden) }
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
          classes = { {paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose) }}
          open    = { this.state.open }>
          <div className = { classes.toolbarIcon} >
            <IconButton onClick = { this.handleDrawer }>
              <ChevronLeftIcon />
            </IconButton>
          </div>

        </Drawer>
        <main className = { classes.content }>
          <div className = { classes.appBarSpacer } />
          <Container maxWidth = "lg" className = { classes.container }>
            <Grid container spacing = {3}>

            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(PractitionerDashboard);
