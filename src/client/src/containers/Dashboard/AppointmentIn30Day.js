import React, {Component} from 'react';
import {Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Typography from "@material-ui/core/Typography";
import {numberOfAppointmentByHour} from "../../components/API/NumberOfAppointmentByHour";
import {numberOfAppointmentIn30Days} from "../../components/API/NumberOfAppointmentIn30Days";

class AppointmentIn30Day extends Component {
    state = {
        data: [],
    }
    async componentDidMount() {
        let res = await numberOfAppointmentIn30Days();
        res.forEach((data => {
            data.date = data.date
            data.number = +data.count;
        }));
        res.reverse();
        this.setState({ data: res });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Appointments in the last 30 days
                </Typography>
                <ResponsiveContainer>
                    <LineChart
                        data={this.state.data}
                        margin={{top: 16, right: 16, bottom: 0, left: 24}}>
                        <XAxis dataKey="date" color="secondary"/>
                        <YAxis color="secondary">
                            <Label
                                angle={270}
                                position="left"
                                style={{textAnchor: 'middle', color: "primary"}}>
                                Appointments
                            </Label>
                        </YAxis>
                        <Tooltip/>
                        <Line type="monotone" dataKey="number" color="secondary"/>
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}

export default AppointmentIn30Day;