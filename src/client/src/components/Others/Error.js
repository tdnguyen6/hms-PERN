import React from 'react';
import {Link as RouteLink, Link} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Error = (props) => {
    const {classes} = props;
    return (
        <Container maxWidth = "sm">
            <Grid container direction="column" spacing = {2}>
                <Grid item>
                    <Typography className={classes.four_zero_four_bg}></Typography>
                        <Typography component = "h1" variant = "h5" align = "center">
                            { props.code } <br/> { props.mess }
                        </Typography>
                </Grid>
                <Grid item>
                    <Typography align = "center">
                        Hi, I'm Cat the Detective. Don't you dare hack my website!
                    </Typography>
                </Grid>
                    <Button component = { RouteLink }
                            to = "/"
                            variant = "text"
                            color = "primary">Go Home</Button>
            </Grid>
        </Container>
    );
}

export default withStyles(
    {
        page_404: {
            margin: '30px auto',
            background: '#fff'
        },

        four_zero_four: {
            fontSize: '50px',
            fontFamily: '"Arvo", serif'
        },

        four_zero_four_bg: {
            backgroundImage: 'url(https://im4.ezgif.com/tmp/ezgif-4-f89390835a1b.gif)',
            backgroundRepeat: 'no-repeat',
            height: '400px',
            backgroundPosition: 'center',
            // margin: '0 20px'
        },

        link_404: {
            color: 'inherit',
            textDecoration: 'none'
        },

        constant_box_404: {
            margin: '-50px 20px 50px 20px',
            fontFamily: '"Arvo", serif'
        }
    }
)
(Error);
