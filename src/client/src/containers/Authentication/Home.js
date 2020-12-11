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
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SettingsIcon from '@material-ui/icons/Settings';
import {allDisease} from "../../components/API/AllDisease";
import {allSymptom} from "../../components/API/AllSymptom";
import SymptomsDialog from "../Dialog/OtherDialog/SymptomsDialog";
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import DiseaseDialog from "../Dialog/OtherDialog/DiseaseDialog";

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
    state = {
        anchorEl: null,
        symptomList: [],
        symptomsDialog: false,
        loading: false,
        diseaseList: [],
        diseaseDialog: false
    }
    async componentDidMount() {
        /** code for 404 redirect to overcome React BrowserRouter limitation **/
        if (sessionStorage.getItem("redirect") !== null) {
            this.props.history.push(sessionStorage.redirect);
            sessionStorage.removeItem("redirect");
        }
        /*********************************************************/
        this.getAllSymptom().then().catch();
    }

    handleMenuClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    };
    handleLogin = () => {
        this.props.history.push('/login');
    }
    handleRegister = () => {
        this.props.history.push('/register');
    }
    handleDiseasePredict = async () => {
        await this.setState({
            symptomsDialog: true
        });
    }
    handleDialogClose = async (close, type) => {
        if (type === "symptoms") {
            await this.setState({
                symptomsDialog: close
            });
        } else if (type === 'disease') {
            await this.setState({
                diseaseDialog: close
            });
        }
    }

    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    }

    getAllSymptom = async () => {
        await allSymptom().then(data => {
            this.setState({
                symptomList: data
            })
        })
    }
    getDisease = async (disease) => {
        await this.setState({
            diseaseList: disease,
            diseaseDialog: true
        });
        console.log(disease);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
                    <Toolbar className = {classes.toolbar}>
                        <Typography variant = "h6" color = "inherit" noWrap className = {classes.toolbarTitle}>
                            IU Hospital
                        </Typography>
                        <Button color = "inherit" className = { classes.link }  startIcon = {<SettingsIcon />}
                                onClick = { this.handleMenuClick }>
                            Click here!
                        </Button>
                        <Menu
                            id              = "simple-menu"
                            anchorEl        = { this.state.anchorEl }
                            keepMounted
                            open            = { Boolean(this.state.anchorEl) }
                            onClose         = { this.handleMenuClose }>
                            <MenuItem onClick = { this.handleLogin }>Login</MenuItem>
                            <MenuItem onClick = { this.handleRegister }>Register</MenuItem>
                            <MenuItem onClick = { this.handleDiseasePredict }>Predict Disease</MenuItem>
                        </Menu>
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
                <SymptomsDialog open = { this.state.symptomsDialog }
                                close = { this.handleDialogClose }
                                loading = { this.handleLoading }
                                symptom = { this.state.symptomList }
                                disease = { this.getDisease } />
                <DiseaseDialog open = { this.state.diseaseDialog }
                               close = { this.handleDialogClose }
                               diseaseList = { this.state.diseaseList } />
                <LoadingDialog open = { this.state.loading } />
            </React.Fragment>
        );
    }
}

export default withStyles(style, {withTheme: true})(Home);
