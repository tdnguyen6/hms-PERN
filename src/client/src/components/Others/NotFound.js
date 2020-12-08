import React from 'react';
import {Link} from 'react-router-dom';
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const NotFound = (props) => {
    const {classes} = props;
    return (
        <Container className={classes.page_404}>
            <Grid container direction="column">
                <Grid item>
                    <Typography className={classes.four_zero_four_bg}>
                        <Typography className={classes.four_zero_four}  align="center" color='secondary'>
                            404
                        </Typography>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.constant_box_404} align="center">
                        <h3 style={{whiteSpace: 'noWrap'}}>
                            🎉 Congratulation 🎉 <br/>
                            You broke the page
                        </h3>

                        <p>This page supposed to be a secret 😟</p>
                        <p>Don't try to hack us you alien 👽</p>

                        <Button variant="outlined" color="secondary">
                            <Link className={classes.link_404} to='/'>Go to Home</Link>
                        </Button>

                    </Typography>
                </Grid>
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
            fontSize: '100px',
            fontFamily: '"Arvo", serif'
        },

        four_zero_four_bg: {
            backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
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
(NotFound);
