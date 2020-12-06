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
    componentDidMount() {
        if (sessionStorage.getItem("redirect") !== null) {
            this.props.history.push(sessionStorage.redirect);
            sessionStorage.removeItem("redirect");
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <>
                <Main>
                    <CssBaseline/>
                    <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
                        <Toolbar className={classes.toolbar}>
                            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                                IU Hospital
                            </Typography>
                            <Button component={RouteLink}
                                    to="/login"
                                    color="inherit"
                                    className={classes.link}>Login</Button>
                            <Button component={RouteLink}
                                    to="/register"
                                    color="inherit"
                                    className={classes.link}>Register</Button>
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
                            ducimus eius nemo obcaecati, quaerat soluta voluptatum? Accusantium adipisci aperiam,
                            asperiores atque aut consequatur culpa dolore dolorem dolorum esse eum excepturi fugit harum
                            impedit ipsam iste libero minima mollitia nam necessitatibus nesciunt nisi odit officiis
                            omnis optio placeat praesentium, quasi qui quidem quis quod reiciendis rem sunt ullam veniam
                            veritatis voluptatem! Animi assumenda beatae consectetur, culpa cumque doloribus, ducimus
                            explicabo fuga fugit id in inventore ipsam iste minus quae quaerat quasi soluta totam ullam,
                            veniam vero voluptate voluptatibus! Amet deserunt dolorem vero? Ab alias atque debitis
                            molestiae nemo nulla, officiis voluptate. Ad adipisci animi asperiores aut, culpa debitis
                            fugiat id laborum magnam nam, nisi officiis provident rem reprehenderit similique totam
                            voluptatibus? Alias animi atque consequuntur cupiditate dignissimos enim eveniet, ex facilis
                            fuga fugiat inventore laborum, natus nihil placeat praesentium similique tempore. Dicta
                            impedit ipsa repellat veritatis? Fugit nemo nihil recusandae rem sed. A ad aut dolor et
                            explicabo mollitia optio provident temporibus? A aliquam autem consequatur cupiditate,
                            dolores eos fugiat fugit ipsam, labore laboriosam nulla quo suscipit? Adipisci debitis fugit
                            inventore ipsam labore optio quam saepe sint veritatis, voluptates. Architecto at
                            consectetur dignissimos dolor eaque earum, eos exercitationem expedita harum id illo laborum
                            maxime modi nihil odio provident recusandae similique sint temporibus ut. Alias atque culpa
                            dolor dolore dolores doloribus, eaque facere illum incidunt ipsam, iusto magni maxime minus
                            neque non numquam officia perferendis possimus, quas quod unde veniam voluptatibus. Corporis
                            cupiditate deserunt eaque et fugit impedit laudantium maxime nostrum officiis quod rem rerum
                            saepe sit soluta, tempore tenetur voluptas voluptatum? Accusantium, animi at autem
                            cupiditate distinctio dolores earum eligendi enim eos eum hic maiores porro quae soluta sunt
                            velit voluptate. Accusamus aspernatur, atque dignissimos eligendi enim, excepturi maxime
                            nesciunt odio placeat quo saepe tempora, vero. Consequatur ipsa officia optio tempora. Cum
                            cumque earum eos impedit iste maiores obcaecati omnis quae quas temporibus? Autem
                            consequatur eius ipsum laudantium molestias quisquam ratione tempore, tenetur! Adipisci
                            aperiam, aspernatur cum cupiditate dolorem exercitationem fuga hic inventore ipsum iure
                            laudantium minima nihil perspiciatis possimus quam qui quibusdam quisquam? Commodi eos nihil
                            sequi sunt vero! At atque dolor eius iusto laboriosam laborum minima officiis repellat
                            tenetur velit? Eveniet facilis minus perspiciatis quia, recusandae rem sint voluptates. Ad
                            aspernatur, assumenda at debitis iste, maiores modi molestiae necessitatibus nemo nulla
                            obcaecati odio odit officiis quibusdam quisquam sint veritatis. Asperiores blanditiis cumque
                            delectus laudantium maiores optio quam quo tempora voluptate voluptatibus! A ab accusamus
                            adipisci cumque doloribus et eum eveniet explicabo maxime nam obcaecati officiis provident
                            quos, similique, temporibus. Alias at blanditiis, delectus earum enim error, facilis fugit
                            maxime minus numquam omnis perferendis porro praesentium, provident quisquam repudiandae sed
                            sequi tempore. Ab animi atque beatae cumque dignissimos doloremque doloribus earum, iste
                            laudantium nihil, nostrum odio perspiciatis rem repellat suscipit velit veritatis vitae
                            voluptatem? Aliquam error fugit itaque laboriosam libero reprehenderit suscipit! Alias
                            asperiores aspernatur consectetur culpa delectus, deserunt dicta dolor dolores ea earum eos
                            eveniet laboriosam laborum libero modi natus nobis nostrum numquam odio omnis perspiciatis
                            porro quam quo repudiandae suscipit ut vero? Expedita, fuga molestias non odio odit pariatur
                            voluptatibus? Dicta ea eveniet id illo neque odio temporibus. A accusamus at commodi debitis
                            dolores, eligendi eum fugit laborum odio omnis quaerat saepe sed sunt vel, vitae! A
                            dignissimos dolores, facilis harum minus neque quibusdam sequi ullam voluptates! Accusantium
                            aspernatur perspiciatis, quod recusandae tenetur voluptatibus! Deserunt laboriosam, numquam!
                            Atque ea fuga illum nemo odit sint temporibus voluptas! Consequatur cumque, delectus dolorem
                            eius impedit, laudantium maxime minus nostrum officia perspiciatis quam quas tempora
                            voluptatum. Accusamus commodi consequatur culpa cumque dolorem eaque est fugit inventore,
                            nesciunt perferendis quae saepe sapiente sit tempore totam ullam veniam voluptas voluptate.
                            Accusamus aperiam, asperiores consectetur deleniti dolorem earum error harum hic maiores
                            numquam quaerat quas soluta, tempora temporibus voluptate. Amet aspernatur assumenda beatae
                            dolore doloribus earum, eligendi exercitationem itaque molestiae nobis omnis quaerat quam
                            quia quisquam quos reiciendis soluta! At corporis nostrum quibusdam similique! Ab adipisci
                            commodi deserunt inventore laboriosam nesciunt qui repudiandae sint. Aliquam aliquid animi
                            aperiam assumenda cupiditate deserunt dignissimos dolores eius eligendi eum exercitationem
                            id laudantium maiores nemo nisi non odit optio perferendis praesentium quisquam, ratione
                            recusandae reprehenderit sunt tenetur ullam ut voluptate. A ad adipisci alias, aliquid amet
                            aspernatur atque blanditiis, consectetur cumque deserunt doloremque eos et eum
                            exercitationem explicabo id ipsa laboriosam magni maiores maxime mollitia nam natus
                            necessitatibus quaerat qui quibusdam reprehenderit sed sunt, temporibus voluptatem. Dolor ex
                            iure laboriosam nisi quia! Ad assumenda beatae deserunt dicta dolorum eaque earum eum
                            excepturi facilis fugiat harum impedit incidunt itaque iure iusto laboriosam laborum
                            molestias natus neque nulla numquam perspiciatis praesentium provident quas quia quidem quo
                            quos, ratione reiciendis rerum soluta sunt suscipit temporibus totam, ullam voluptate
                            voluptatem! Ab beatae consequuntur cum dignissimos hic incidunt quae quos sit ullam. Aperiam
                            distinctio laboriosam qui ratione repudiandae. Blanditiis delectus deleniti fugiat, impedit
                            iusto mollitia nemo nostrum numquam omnis quis quos tempora velit? Assumenda ea eius est
                            laudantium minus neque similique, temporibus vel voluptatibus voluptatum. Iste iusto
                            molestias non provident. A aspernatur blanditiis culpa dicta doloremque eligendi libero nemo
                            nobis, nulla quidem recusandae reiciendis sed unde! Assumenda beatae consequatur dicta
                            dolore, dolorem, dolorum eligendi harum hic, inventore ipsam iusto nisi non numquam omnis
                            quia reiciendis reprehenderit sunt tenetur ut veniam? Ipsam libero obcaecati quasi rerum
                            voluptates! Accusantium facere laborum laudantium necessitatibus odio quia rem repellendus
                            tenetur totam velit? Ab ducimus earum hic ipsam iure nesciunt odio pariatur perferendis
                            reprehenderit veniam. Aliquam blanditiis culpa debitis delectus distinctio, doloremque
                            dolorum eum explicabo in ipsa iusto labore nam numquam quaerat quas quisquam saepe sequi!
                            Asperiores eum modi officia, possimus quod quos recusandae voluptas.
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
                </Main>
                <Footer/>
            </>
        );
    }
}

export default withStyles(style, {withTheme: true})(Home);
