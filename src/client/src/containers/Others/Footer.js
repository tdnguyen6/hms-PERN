import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import {Grid, Link} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

export default withStyles({
    root: {
        backgroundColor: "#2b252d",
        color: "#fffbfb",
        whiteSpace: "nowrap",
        fontWeight: "bold",
        flex: 0
    },
    item: {
        padding: "1rem 10rem",
    }
})
(function Footer(props) {
    const content = [
        <>
            <Grid item style={{marginRight: "1rem"}}>Fork me on</Grid>
            <Grid item>
                <Link target="_blank" color="inherit" href="https://github.com/tidunguyen/hms-PERN">
                    <GitHubIcon/>
                </Link>
            </Grid>
        </>,
        <>Copyright &copy; 2020</>,
        "International University - VNUHCM"
    ]

    const {classes} = props;
    return (
        <Grid component="footer" container justify="space-evenly" alignItems="center" xs={12} className={classes.root}>
            {
                content.map(c =>
                    <Grid item container className={classes.item} alignItems="center" xs={4} wrap="nowrap"
                          justify="center">
                        {c}
                    </Grid>
                )
            }
        </Grid>
    );
});