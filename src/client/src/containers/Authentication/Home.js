import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {Link as RouteLink} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Footer from "../Others/Footer";
import Main from "../Others/Main";

const style = (theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
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
    async componentDidMount() {
        /** code for 404 redirect to overcome React BrowserRouter limitation **/
        if (sessionStorage.getItem("redirect") !== null) {
            this.props.history.push(sessionStorage.redirect);
            sessionStorage.removeItem("redirect");
        }
        /*********************************************************/
    }

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
                    <Toolbar className = {classes.toolbar}>
                        <Typography variant = "h6" color = "inherit" noWrap className = {classes.toolbarTitle}>
                            IU Hospital
                        </Typography>
                        <Button component = { RouteLink }
                                to = "/login"
                                color = "inherit"
                                className = { classes.link }>Login</Button>
                        <Button component = { RouteLink }
                                to = "/register"
                                color = "inherit"
                                className = { classes.link }>Register</Button>
                    </Toolbar>
                </AppBar>
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
