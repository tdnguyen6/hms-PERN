import React, {Component} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link as RouteLink} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import DefaultAppBar from "../Others/AppBar";

const style = (theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        }
    }
});

class Home extends Component {
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <DefaultAppBar />
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                    <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                        Treatment in the best hospital of Vietnam
                    </Typography>
                    <Typography component="p" variant="h6" align="center" color="textSecondary">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur assumenda
                        beatae cum dicta dignissimos doloremque doloribus eum exercitationem facilis fuga mollitia
                        neque numquam odio officiis pariatur placeat provident quo rem, rerum sint tempore, veniam
                        vitae. Alias corporis enim iure officia omnis optio perferendis perspiciatis, reiciendis
                        velit veniam. Atque ipsam iusto necessitatibus omnis quasi similique veniam voluptatem.
                        Atque doloribus ducimus est nam omnis quae quo ut? Animi deleniti ex expedita hic laboriosam
                        modi officia, optio repellat reprehenderit sapiente. Atque consequatur cum dolore doloremque
                        ducimus eius nemo obcaecati, quaerat soluta voluptatum?
                    </Typography>
                </Container>
                <Container maxWidth="xs" component="main">
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouteLink} to="/login">
                                <Typography variant="body1" align="center">Book now!</Typography>
                            </Link>
                        </Grid>
                        <Grid item xs>
                            <Link component={RouteLink} to="/register">
                                <Typography variant="body1" align="center">I'm new here!</Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }
}

export default withStyles(style, {withTheme: true})(Home);
