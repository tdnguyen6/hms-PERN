import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import {covid} from "../../components/API/Covid";

class Covid extends Component {
    async componentDidMount() {
        console.log(await covid());
    }
    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Appointments
                </Typography>
                <Typography component="p" variant="h3">
                    1285
                </Typography>
                <Typography color="textSecondary">
                    was made.
                </Typography>
            </React.Fragment>
        );
    }
}

export default Covid;