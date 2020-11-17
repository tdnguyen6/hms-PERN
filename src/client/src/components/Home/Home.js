// import React, { Component }               from 'react';
// import Avatar                             from '@material-ui/core/Avatar';
// import Button                             from '@material-ui/core/Button';
// import CssBaseline                        from '@material-ui/core/CssBaseline';
// import TextField                          from '@material-ui/core/TextField';
// import FormControlLabel                   from '@material-ui/core/FormControlLabel';
// import Checkbox                           from '@material-ui/core/Checkbox';
// import Link                               from '@material-ui/core/Link';
// import Paper                              from '@material-ui/core/Paper';
// import Box                                from '@material-ui/core/Box';
// import Grid                               from '@material-ui/core/Grid';
// import LockOutlinedIcon                   from '@material-ui/icons/LockOutlined';
// import Typography                         from '@material-ui/core/Typography';
// import { withStyles }                     from '@material-ui/core/styles';
// import Dialog                             from '@material-ui/core/Dialog';
// import DialogActions                      from '@material-ui/core/DialogActions';
// import DialogContent                      from '@material-ui/core/DialogContent';
// import DialogContentText                  from '@material-ui/core/DialogContentText';
// import DialogTitle                        from '@material-ui/core/DialogTitle';
// import { BrowserRouter, Route, Switch }   from 'react-router-dom';
// import { Link as RouteLink }              from 'react-router-dom';
//
// const style = (theme) => ({
//   root: {
//     height: '100vh'
//   },
//   image: {
//     backgroundImage: 'url(https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2980&q=80)',
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//       theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center'
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center'
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: '100%',
//     marginTop: theme.spacing(1)
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2)
//   }
// });
//
// class Home extends Component {
//   render() {
//     const { classes } = this.props;
//
//     return (
//       <>
//       <Button
//         className         = { classes.submit }
//         fullWidth
//         variant           = "contained"
//         color             = "primary"
//         onClick           = { this.handleSubmit }
//         component         = { RouteLink }
//         to                = "/login"
//       >
//         Login
//       </Button>
//       <Button
//         className         = { classes.submit }
//         fullWidth
//         variant           = "contained"
//         color             = "primary"
//         onClick           = { this.handleSubmit }
//         component         = { RouteLink }
//         to                = "/register"
//       >
//         Register
//       </Button>
//       </>
//     );
//   }
// }
//
// export default withStyles(style, { withTheme: true })(Home);

import React, { Component }               from 'react';
import Avatar                             from '@material-ui/core/Avatar';
import Button                             from '@material-ui/core/Button';
import CssBaseline                        from '@material-ui/core/CssBaseline';
import TextField                          from '@material-ui/core/TextField';
import FormControlLabel                   from '@material-ui/core/FormControlLabel';
import Checkbox                           from '@material-ui/core/Checkbox';
import Link                               from '@material-ui/core/Link';
import Paper                              from '@material-ui/core/Paper';
import Box                                from '@material-ui/core/Box';
import Grid                               from '@material-ui/core/Grid';
import LockOutlinedIcon                   from '@material-ui/icons/LockOutlined';
import Typography                         from '@material-ui/core/Typography';
import { withStyles }                     from '@material-ui/core/styles';
import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';
import { Link as RouteLink }              from 'react-router-dom';
import AppBar                             from '@material-ui/core/AppBar';
import Card                               from '@material-ui/core/Card';
import CardActions                        from '@material-ui/core/CardActions';
import CardContent                        from '@material-ui/core/CardContent';
import CardHeader                         from '@material-ui/core/CardHeader';
import StarIcon                           from '@material-ui/icons/StarBorder';
import Toolbar                            from '@material-ui/core/Toolbar';
import Container                          from '@material-ui/core/Container';

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

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '15',
    description: [
      '20 users included',
      '10 GB of storage',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];

class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              Company name
            </Typography>
            <Button href      = "/login"
                    color     = "primary"
                    variant   = "outlined"
                    className = {classes.link}>
                    Login</Button>
            <Button href      = "/register"
                    color     = "primary"
                    variant   = "outlined"
                    className = { classes.link }>
                    Register</Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" component="p">
            Quickly build an effective pricing table for your potential customers with this layout.
            It&apos;s built with default Material-UI components with little customization.
          </Typography>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(style, { withTheme: true })(Home);
