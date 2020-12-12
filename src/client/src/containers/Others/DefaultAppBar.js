import React, {Component} from 'react';

import clsx from 'clsx';

import {withStyles} from '@material-ui/core/styles';
import {AppBar, Button, Divider, Drawer, Grid, IconButton, List, Toolbar, Typography} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import SidebarFunction from './SidebarFunction';
import {Link as RouteLink, Redirect} from 'react-router-dom';
import { delCookie } from "../../components/Services/Cookie";
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import {logout} from "../../components/API/Logout";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SymptomsDialog from "../Dialog/OtherDialog/SymptomsDialog";
import DiseaseDialog from "../Dialog/OtherDialog/DiseaseDialog";
import {allSymptom} from "../../components/API/AllSymptom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import HowToRegIcon from '@material-ui/icons/HowToReg';

const style = (theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
        textDecoration: 'none'
    },
    link: {
        margin: theme.spacing(1, 1.5),
    }
});

class DefaultAppBar extends Component {
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
                <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
                    <Toolbar className = {classes.toolbar}>
                        <Typography variant = "h6" color = "inherit" noWrap className = {classes.toolbarTitle}
                            component = { RouteLink } to = "/">
                            IU Hospital
                        </Typography>
                        <Button color = "inherit" className = { classes.link }
                                startIcon = {<ArrowDropDownCircleIcon />}
                                onClick = { this.handleMenuClick }>
                            Click here!
                        </Button>
                        <Menu
                            id              = "simple-menu"
                            anchorEl        = { this.state.anchorEl }
                            keepMounted
                            open            = { Boolean(this.state.anchorEl) }
                            onClose         = { this.handleMenuClose }>
                            <MenuItem component = { RouteLink } to = '/login'>
                                <ListItemIcon>
                                    <LockOpenIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Login</Typography>
                            </MenuItem>
                            <MenuItem component = { RouteLink } to = '/register'>
                                <ListItemIcon>
                                    <HowToRegIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Register</Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick = { this.handleDiseasePredict }>
                                <ListItemIcon>
                                    <AssignmentIndIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Predict Disease</Typography>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <SymptomsDialog open = { this.state.symptomsDialog }
                                close = { this.handleDialogClose }
                                loading = { this.handleLoading }
                                symptom = { this.state.symptomList }
                                disease = { this.getDisease } />
                <DiseaseDialog open = { this.state.diseaseDialog }
                               close = { this.handleDialogClose }
                               diseaseList = { this.state.diseaseList } />
                <LoadingDialog open = {this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default withStyles(style, {withTheme: true})(DefaultAppBar);
