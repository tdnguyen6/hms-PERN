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

import AppointmentTable from '../../Table/AppointmentTable';
import PractitionerTable from '../../Table/PractitionerTable';
import PatientTable from '../../Table/PatientTable';
import DrawerAppBar from '../../Others/DrawerAppBar';
const style = (theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 680
  }
});

class AdminDashboard extends Component {
  state = {
    view: ''
  }

  getViewFromDrawerAppBar = (viewFromDrawerAppBar) => {
    this.setState({ view: viewFromDrawerAppBar });
  }
  render() {
    const { classes } = this.props;

    return (
      <div className = { classes.root }>
        <CssBaseline />
        <DrawerAppBar type = "admin" view = { this.getViewFromDrawerAppBar } />
        <main className = { classes.content }>
          <div className = { classes.appBarSpacer } />
          <Container maxWidth = "lg" className = { classes.container }>
            <Grid container spacing = {3}>
              <Grid item xs = {12}>
                <Paper className = { classes.paper }>
                  <AppointmentTable />
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
