import React, {Component} from 'react';

import clsx from 'clsx';

import {withStyles} from '@material-ui/core/styles';
import {AppBar, Button, Divider, Drawer, Grid, IconButton, List, Toolbar, Typography} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import SidebarFunction from './SidebarFunction';
import { Redirect } from 'react-router-dom';
import {delCookie} from "../../helper";

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
            width: theme.spacing(9)
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
        barOpen: false,
        redirect: null
    }

    handleDrawer = () => {
        this.setState({
            barOpen: !this.state.barOpen
        });
    };

    handleLogout = () => {
        delCookie('connect.sid');
        this.setState({
            redirect: "/"
        });
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
                        <Button
                            color = "inherit"
                            onClick = {this.handleLogout}>Log out</Button>
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
            </React.Fragment>
        );
    }
}

export default withStyles(style, {withTheme: true})(DrawerAppBar);
