import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import AppointmentTable from '../../../containers/Table/AppointmentTable';
import PractitionerTable from '../../../containers/Table/PractitionerTable';
import PatientTable from '../../../containers/Table/PatientTable';
import DrawerAppBar from '../../../containers/Others/DrawerAppBar';
import Dashboard from "../../../containers/Dashboard/Dashboard";
import {authorizedUser} from "../../../components/API/Authenticated";
import AuthContainer from "../../../containers/Authentication/AuthContainer";
import MedicalServiceTable from "../../../containers/Table/MedicalServiceTable";

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

class AdminDashboard extends Component {
    async isAdmin() {
        const user = await authorizedUser();
        if (user && user.role === 'admin') {
            return Promise.resolve();
        }
        return Promise.reject();
    }

    render() {
        const {classes} = this.props;
        return (
            <AuthContainer authorize={this.isAdmin}>
                <div className={classes.root}>
                    <CssBaseline/>
                    <DrawerAppBar type="admin"/>
                    <div className={classes.content}>
                        <div className={classes.appBarSpacer}/>
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Route exact path="/admin" component={Dashboard}/>
                                        <Route exact path="/admin/dashboard" component={Dashboard}/>
                                        <Route exact path="/admin/appointment" component={AppointmentTable}/>
                                        <Route exact path="/admin/practitioner" component={PractitionerTable}/>
                                        <Route exact path="/admin/patient" component={PatientTable}/>
                                        <Route exact path="/admin/medicalService" component = { MedicalServiceTable } />
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

export default withStyles(style, {withTheme: true})(AdminDashboard);
