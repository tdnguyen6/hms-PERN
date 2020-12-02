import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Tooltip, LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {Link as RouteLink} from "react-router-dom";

// Generate Sales Data
function createData(time, Practitioners) {
    return { time, Practitioners };
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

export default function Practitioner() {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>
                Practitioners
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
                            Practitioners
                        </Label>
                    </YAxis>
                    <Tooltip />
                    <Line type = "monotone" dataKey = "Practitioners" stroke = {theme.palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
            <div>
                <Link component = { RouteLink } to = "/admin/practitioner">
                    View more
                </Link>
            </div>
        </React.Fragment>
    );
}