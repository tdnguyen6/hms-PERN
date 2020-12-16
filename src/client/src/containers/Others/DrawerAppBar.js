import React, {Component} from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import {AppBar, Button, Divider, Drawer, Grid, IconButton, List, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SidebarFunction from './SidebarFunction';
import {Link, Redirect} from 'react-router-dom';
import { delCookie } from "../../components/Services/Cookie";
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import {logout} from "../../components/API/Logout";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SymptomsDialog from "../Dialog/OtherDialog/SymptomsDialog";
import DiseaseDialog from "../Dialog/OtherDialog/DiseaseDialog";
import {allSymptom} from "../../components/API/AllSymptom";
import ChangePasswordDialog from "../Dialog/OtherDialog/ChangePasswordDialog";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const style = (theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 240,
        minHeight: '100%',
        height: '100vh',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7)
        }
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    toolbar: {
        // padding: '1rem 3rem' // keep right padding when drawer closed
        flexWrap: 'wrap'
    },
    menuButton: {
        // marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },

});

class DrawerAppBar extends Component {
    state = {
        anchorEl: null,
        barOpen: false,
        redirect: null,
        loading: false,
        symptomList: [],
        symptomsDialog: false,
        diseaseList: [],
        diseaseDialog: false,
        changePasswordDialog: false
    }

    handleDrawer = () => {
        this.setState({
            barOpen: !this.state.barOpen
        });
    };
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

    handleChangePassword = async () => {
        await this.setState({
            changePasswordDialog: true
        });
    };
    handleLogout = async () => {
        delCookie('connect.sid');
        try {
            this.setState({loading: true});
            await logout();
        } finally {
            this.setState({loading: false});
        }
        this.setState({
            redirect: "/login"
        });
    }
    handleDiseasePredict = async () => {
        await this.getAllSymptom();
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
        } else if (type === 'changePassword') {
            await this.setState({
                changePasswordDialog: close
            });
        }
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
        if (this.state.redirect) return <Redirect to = "/" />
        return (
            <React.Fragment>
                <AppBar position="absolute" className={clsx(classes.appBar, this.state.barOpen && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawer}
                            className={clsx(classes.menuButton, this.state.barOpen && classes.menuButtonHidden)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography component = "h1" variant = "h6" color = "inherit" noWrap
                                    className = {classes.title} display = 'inline'>
                            Dashboard
                        </Typography>
                        <Button color = "inherit" className = { classes.link }
                                onClick = { this.handleMenuClick }>
                            <MoreHorizIcon />
                        </Button>
                        <Menu
                            keepMounted
                            id              = "simple-menu"
                            anchorEl        = { this.state.anchorEl }
                            open            = { Boolean(this.state.anchorEl) }
                            onClose         = { this.handleMenuClose }>
                            <MenuItem onClick = { this.handleDiseasePredict }>
                                <ListItemIcon>
                                    <AssignmentIndIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Predict Disease</Typography>
                            </MenuItem>
                            <Divider variant = 'inset' />
                                <Link to='/account' style={{ textDecoration: 'none', color: 'initial' }}>
                                    <MenuItem>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" />
                                        </ListItemIcon>
                                            <Typography variant="inherit">My Account</Typography>
                                    </MenuItem>
                                    <Divider variant = 'inset' />
                                </Link>
                            <MenuItem onClick = { this.handleChangePassword }>
                                <ListItemIcon>
                                    <VpnKeyIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Change Password</Typography>
                            </MenuItem>
                            <Divider variant = 'inset' />
                            <MenuItem onClick = { this.handleLogout }>
                                <ListItemIcon>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{paper: clsx(classes.drawerPaper, !this.state.barOpen && classes.drawerPaperClose)}}
                    open={this.state.barOpen}>
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>{<SidebarFunction type={this.props.type}/>}</List>
                </Drawer>
                <SymptomsDialog open = { this.state.symptomsDialog }
                                close = { this.handleDialogClose }
                                loading = { this.handleLoading }
                                symptom = { this.state.symptomList }
                                disease = { this.getDisease } />
                <DiseaseDialog open = { this.state.diseaseDialog }
                               close = { this.handleDialogClose }
                               diseaseList = { this.state.diseaseList } />
                <ChangePasswordDialog open = { this.state.changePasswordDialog }
                                      close = { this.handleDialogClose } />
                <LoadingDialog open = {this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default withStyles(style, {withTheme: true})(DrawerAppBar);
