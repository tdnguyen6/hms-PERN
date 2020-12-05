import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Tooltip, LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {Link as RouteLink} from "react-router-dom";

// Generate Sales Data
function createData(time, Patients) {
    return { time, Patients };
}

const data = [
    createData('00:00', 350),
    createData('03:00', 400),
    createData('06:00', 550),
    createData('09:00', 1050),
    createData('12:00', 1150),
    createData('15:00', 2350),
    createData('18:00', 1850),
    createData('21:00', 850),
    createData('24:00', undefined),
];

export default function Patient() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>
                Patients
            </Typography>
            <ResponsiveContainer>
                <LineChart
                    data = {data}
                    margin = {{ top: 16, right: 16, bottom: 0, left: 24 }}>
                    <XAxis dataKey = "time" stroke = { theme.palette.text.secondary } />
                    <YAxis stroke = { theme.palette.text.secondary }>
                        <Label
                            angle = {270}
                            position = "left"
                            style = {{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Patients
                        </Label>
                    </YAxis>
                    <Tooltip />
                    <Line type = "monotone" dataKey = "Patients" stroke = {theme.palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}