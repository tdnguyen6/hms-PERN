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
        // height: 640,
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

const Account = props => {
    const {classes} = props;

    const [user, setUser] = useState(null);
    const [name, setName] = useState({
        value: '',
        hasError: false,
        error: ''
    });
    const [gender, setGender] = useState();
    const [email, setEmail] = useState({
        value: '',
        hasError: false,
        error: ''
    });
    const [phone, setPhone] = useState({
        value: '',
        hasError: false,
        error: ''
    });
    const [avatar, setAvatar] = useState();
    const [message, setMessage] = useState({
        title: '',
        body: ''
    });
    const [messageDialog, setMessageDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentAccountInfo, setCurrentAccountInfo] = useState({});

    useEffect(() => {
        (async () => {
            try {
                await setLoading(true);
                const res = await AccountAPI.get();
                await setGender(res.gender);
                await setAvatar(res.avatar);

                name.value = res.name;
                await setName({...name});

                email.value = res.email;
                await setEmail({...email});

                phone.value = res.phone;
                await setPhone({...phone});
                await setCurrentAccountInfo(res);
            } finally {
                await setLoading(false);
            }
        })()
    }, []);

    const handleSave = async event => {
        let error = false, errorMess = '';
        try {
            await setLoading(true);
            const newAccountInfo = {
                avatar: avatar,
                name: name.value,
                gender: gender,
                email: email.value,
                phone: phone.value,
            }

            const filteredObj = Object.keys(currentAccountInfo)
                .reduce(
                    (newObj, key) => {
                        if (currentAccountInfo[key] !== newAccountInfo[key])
                            newObj[key] = newAccountInfo[key];
                        return newObj;
                    }, {}
                );

            if (Object.keys(filteredObj).length) {
                let emailExist = false, phoneExist = false;

                if (filteredObj.hasOwnProperty('email'))
                    emailExist = await checkEmailExist(filteredObj.email);
                if (filteredObj.hasOwnProperty('phone'))
                    phoneExist = await checkPhoneExist(filteredObj.phone);

                if (name.hasError) {
                    error = true;
                    errorMess = 'The given name is invalid. Name must not contain numbers and special characters.';
                } else if (email.hasError) {
                    error = true;
                    errorMess = 'The given email is invalid. Please input the valid email';
                } else if (phone.hasError) {
                    error = true;
                    errorMess = 'Phone number is invalid. Phone number must contain 10 numbers.';
                } else if (emailExist) {
                    error = true;
                    errorMess = 'This email is registered. Please change email or recover password.';
                } else if (phoneExist) {
                    error = true;
                    errorMess = 'This phone number is registered. Please use another phone number';
                }

                if (error) {
                    message.title = 'Error!'
                    message.body = errorMess;
                } else {

                    const res = await AccountAPI.update(filteredObj);
                    if (res === 0) {
                        message.title = 'Success';
                        message.body = 'Account Info successfully saved';
                        setCurrentAccountInfo(newAccountInfo);
                    }
                    if (res === -1) {
                        message.title = 'Failed';
                        message.body = 'Account Info failed to save';
                    }
                }
            } else {
                message.title = 'Hey';
                message.body = `Don't you notice that nothing have changed?`;
            }
        } finally {
            await setLoading(false);
            await setMessage({...message});
            await setMessageDialog(true);
        }
    }

    const handleDialogClose = async (close, type) => {
        if (type === "error") {
            setMessageDialog(close);
        }
    }

    const handleNameChange = async event => {
        let validateStatus = validate("name", event.target.value);
        name.value = event.target.value;
        name.hasError = validateStatus.name;
        name.error = (validateStatus.name) ? 'Are you a daughter of Elon Musk?' : ''
        await setName({...name});
    };

    const handleGenderChange = async event => {
        await setGender(event.target.value);
    };

    const handleEmailChange = async event => {
        let validateStatus = validate("email", event.target.value);
        email.value = event.target.value;
        email.hasError = validateStatus.email;
        email.error = (validateStatus.email) ? 'Invalid email address' : ''
        await setEmail({...email});
    };

    const handlePhoneChange = async event => {
        let validateStatus = validate("phone", event.target.value);
        phone.value = event.target.value;
        phone.hasError = validateStatus.phone;
        phone.error = (validateStatus.phone) ? 'Must have 10 numbers' : ''
        await setPhone({...phone});
    };

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
                                    <Typography component="h1" variant="h5" gutterBottom>Account Info</Typography>
                                    <Avatar src={avatar}/>
                                    <form className={classes.form}>
                                        <Grid container spacing={2}>
                                            {/* Name Input */}
                                            <Grid item xs={12} sm={9}>
                                                <TextField
                                                    autoComplete="name"
                                                    name="Name"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="Name"
                                                    label="Name"
                                                    autoFocus
                                                    value={name.value}
                                                    error={name.hasError}
                                                    helperText={name.error}
                                                    onChange={handleNameChange}
                                                />
                                            </Grid>
                                            {/* Gender Input */}
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    required fullWidth autoFocus select
                                                    autoComplete="Gender"
                                                    name="Gender"
                                                    variant="outlined"
                                                    id="Gender"
                                                    label="Sex"
                                                    value={gender || ''}
                                                    onChange={handleGenderChange}
                                                >
                                                    <MenuItem key="M" value="male">M</MenuItem>
                                                    <MenuItem key="F" value="female">F</MenuItem>
                                                </TextField>
                                            </Grid>
                                            {/* Email Input */}
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    autoComplete="email"
                                                    value={email.value}
                                                    error={email.hasError}
                                                    helperText={email.error}
                                                    onChange={handleEmailChange}
                                                />
                                            </Grid>
                                            {/* Phone Input */}
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="phone"
                                                    label="Phone Number"
                                                    name="phone"
                                                    autoComplete="phone"
                                                    value={phone.value}
                                                    error={phone.hasError}
                                                    helperText={phone.error}
                                                    onChange={handlePhoneChange}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            className={classes.submit}
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSave}>
                                            Save
                                        </Button>
                                    </form>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
            <GeneralInfoDialog open={messageDialog}
                               close={handleDialogClose}
                               title={message.title}
                               error={message.body}/>
            <LoadingDialog open={loading}/>
        </AuthContainer>
    );
};

export default withStyles(style)(Account);