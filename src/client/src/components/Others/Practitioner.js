import React, {Component} from 'react';
import {Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Typography from "@material-ui/core/Typography";

// Generate Sales Data
function createData(time, Practitioners) {
    return {time, Practitioners};
}

const data = [
    createData('00:00', 15),
    createData('03:00', 15),
    createData('06:00', 50),
    createData('09:00', 180),
    createData('12:00', 200),
    createData('15:00', 170),
    createData('18:00', 80),
    createData('21:00', 40),
    createData('24:00', undefined),
];

class Practitioner extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    Practitioners
                </Typography>
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{top: 16, right: 16, bottom: 0, left: 24}}>
                        <XAxis dataKey="time" color="secondary"/>
                        <YAxis color="secondary">
                            <Label
                                angle={270}
                                position="left"
                                style={{textAnchor: 'middle', color: "primary"}}
                            >
                                Practitioners
                            </Label>
                        </YAxis>
                        <Tooltip/>
                        <Line type="monotone" dataKey="Practitioners" color="secondary"/>
                    </LineChart>
                </ResponsiveContainer>
            </React.Fragment>
        );
    }
}

export default Practitioner;