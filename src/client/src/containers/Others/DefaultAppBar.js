import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Button, Divider, Toolbar, Typography} from '@material-ui/core';
import {Link as RouteLink} from 'react-router-dom';
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SymptomsDialog from "../Dialog/OtherDialog/SymptomsDialog";
import DiseaseDialog from "../Dialog/OtherDialog/DiseaseDialog";
import {allSymptom} from "../../components/API/AllSymptom";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
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
        try {
            this.setState({loading: true});
            await this.getAllSymptom();
            await this.setState({
                symptomsDialog: true
            });
        } finally {
            this.setState({loading: false});
        }
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
    };

    getAllSymptom = async () => {
        await allSymptom().then(data => {
            this.setState({
                symptomList: data
            });
        });
    };
    getDisease = async (disease) => {
        await this.setState({
            diseaseList: disease,
            diseaseDialog: true
        });
    };

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
                            <MenuItem component = { RouteLink } to = '/'>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Home</Typography>
                            </MenuItem>
                            <Divider variant = 'inset' />
                            <MenuItem component = { RouteLink } to = '/login'>
                                <ListItemIcon>
                                    <LockOpenIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Login</Typography>
                            </MenuItem>
                            <Divider variant = 'inset' />
                            <MenuItem component = { RouteLink } to = '/register'>
                                <ListItemIcon>
                                    <HowToRegIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Register</Typography>
                            </MenuItem>
                            <Divider variant = 'inset' />
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
