import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {numberOfAppointment} from "../../components/API/NumberOfAppointment";
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";

class Appointment extends Component {
    state = {
        numberOfAppointments: null,
        loading: true
    }
    async componentDidMount() {
        await this.setState({
            numberOfAppointments: await numberOfAppointment(),
            loading: false
        });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Appointments
                </Typography>
                <Typography component="p" variant="h3">
                    { this.state.numberOfAppointments }
                </Typography>
                <Typography color="textSecondary">
                    was made.
                </Typography>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default Appointment;