import React, {Component} from 'react';
import clsx from "clsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Patient from "./Patient";
import Appointment from "./Appointment";
import AppointmentByHour from "./AppointmentByHour";
import Covid from "./Covid";

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
                                <AppointmentByHour />
                            </Paper>
                        </Grid>
                        {/* Appointment */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Appointment/>
                            </Paper>
                        </Grid>
                        {/* Patient */}
                        <Grid item xs={12}>
                            <Paper className={fixedHeightPaper}>
                                <Patient/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        );
    }
}

export default withStyles(styles)(Dashboard);