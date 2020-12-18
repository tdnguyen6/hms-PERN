import React, {useEffect, useState} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import AccountAPI from '../components/API/Account';
import AuthContainer from "../containers/Authentication/AuthContainer";
import {authorizedUser} from "../components/API/Authenticated";
import DrawerAppBar from "../containers/Others/DrawerAppBar";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import LoadingDialog from "../containers/Dialog/OtherDialog/LoadingDialog";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import GeneralInfoDialog from "../containers/Dialog/InfoDialog/GeneralInfoDialog";
import {validate} from "../components/Services/Validate";
import {checkEmailExist} from "../components/API/CheckEmailExist";
import {checkPhoneExist} from '../components/API/checkPhoneExist';
import PatientTable from "../containers/Table/PatientTable";
import MedicalServiceTable from "../containers/Table/MedicalServiceTable";

const style = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        overflow: 'auto'
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 640,
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
    },
    form: {
        width: '100%',
        maxWidth: '500px',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

const MedicalServices = props => {
    const {classes} = props;

    const [user, setUser] = useState(null);
    // const [name, setName] = useState({
    //     value: '',
    //     hasError: false,
    //     error: ''
    // });

    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             await setLoading(true);
    //
    //         } finally {
    //             await setLoading(false);
    //         }
    //     })()
    // }, []);

    const loggedIn = async () => {
        const fetchedUser = await authorizedUser();
        await setUser(fetchedUser);
        if (fetchedUser) {
            return Promise.resolve();
        }
        return Promise.reject();
    }

    return (
        <AuthContainer authorize={loggedIn}>
            <div className={classes.root}>
                <CssBaseline/>
                <DrawerAppBar type={user ? user.role : ''}/>
                <div className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <MedicalServiceTable/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            {/*<LoadingDialog open={loading}/>*/}
        </AuthContainer>
    );
};

export default withStyles(style)(MedicalServices);