import withStyles from "@material-ui/core/styles/withStyles";
import {Box} from "@material-ui/core";
import React from "react";

export default withStyles({
    root: {
        flex: 1,
    }
})
(function Main(props) {
    const {classes, children} = props;
    return (
        <Box component="main" className={classes.root}>
            {children}
        </Box>
    );
});