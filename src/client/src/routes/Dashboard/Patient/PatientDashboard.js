import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AppointmentTable from '../../../containers/Table/AppointmentTable';
import DrawerAppBar from '../../../containers/Others/DrawerAppBar';
import Dashboard from "../../../components/Others/Dashboard";
import {authorizedUser} from "../../../components/API/Authenticated";
import AuthContainer from "../../../containers/Authentication/AuthContainer";

const style = (theme) => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
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
        height: 640
    }
});

class PatientDashboard extends Component {
    async isPatient() {
        const user = await authorizedUser();
        if (user && user.role === 'patient') {
            return Promise.resolve();
        }
        return Promise.reject();
    }

    render() {
        const {classes} = this.props;
        return (
            <AuthContainer authorize={this.isPatient}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <DrawerAppBar type="patient"/>
                    <div className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Route exact path="/patient" exact component={Dashboard}/>
                                        <Route exact path="/patient/dashboard" exact component={Dashboard}/>
                                        <Route path="/patient/appointment" exact component={AppointmentTable}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
            </AuthContainer>
        );
    }
}

export default withStyles(style, {withTheme: true})(PatientDashboard);
