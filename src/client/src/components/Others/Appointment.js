import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Link as RouteLink} from "react-router-dom";

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Appointment() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>
                Appointments
            </Typography>
            <Typography component = "p" variant = "h3">
                1285
            </Typography>
            <Typography color = "textSecondary" className = { classes.depositContext }>
                was made.
            </Typography>
            <div>
                <Link component = { RouteLink } to = "/admin/appointment">
                    View more
                </Link>
            </div>
        </React.Fragment>
    );
}