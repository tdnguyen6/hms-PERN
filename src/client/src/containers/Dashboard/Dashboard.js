import React, {Component} from 'react';
import clsx from "clsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AppointmentIn30Day from "./AppointmentIn30Day";
import Appointment from "./Appointment";
import AppointmentByHour from "./AppointmentByHour";
import Covid from "./Covid";
import {authorizedUser} from "../../components/API/Authenticated";

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 260,
    },
});

class Dashboard extends Component {
    state = {
        user: null
    }

    async componentDidMount() {
        const user = await authorizedUser();
        if (user) {
            await this.setState({
                user: user.role
            });
        }
    }
    render() {
        const {classes} = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* AppointmentByHour */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                { this.state.user === 'admin' ? <AppointmentByHour /> : <Covid /> }
                            </Paper>
                        </Grid>
                        {/* Appointment */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Appointment />
                            </Paper>
                        </Grid>
                        {/* AppointmentIn30Day */}
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                { this.state.user === 'admin' ? <AppointmentIn30Day /> : <AppointmentByHour /> }
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        );
    }
}

export default withStyles(styles)(Dashboard);