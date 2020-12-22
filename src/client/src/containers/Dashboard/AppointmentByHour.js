import React, {Component} from 'react';
import {Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Typography from "@material-ui/core/Typography";
import {numberOfAppointmentByHour} from "../../components/API/NumberOfAppointmentByHour";

class AppointmentByHour extends Component {
    state = {
        data: [],
    }
    async componentDidMount() {
        let res = await numberOfAppointmentByHour();
        res.forEach((data => {
            data.time = `${data.time}:00`
            data.number = +data.number;
        }))
        this.setState({ data: res });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Number of Appointments per Hour
                </Typography>
                <ResponsiveContainer>
                    <LineChart
                        data={this.state.data}
                        margin={{top: 16, right: 16, bottom: 0, left: 24}}>
                        <XAxis dataKey="time" color="secondary"/>
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

export default AppointmentByHour;