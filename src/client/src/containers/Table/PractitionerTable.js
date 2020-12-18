import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import EditPractitionerDialog from "../Dialog/EditDialog/EditPractitionerDialog";
import NewPractitionerDialog from "../Dialog/NewDialog/NewPractitionerDialog";
import ErrorDialog from "../Dialog/OtherDialog/ErrorDialog";
import {allPractitioner} from "../../components/API/AllPractitioner";
import {allSpecialty} from "../../components/API/AllSpecialty";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Avatar from "@material-ui/core/Avatar";
import {authorizedUser} from "../../components/API/Authenticated";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

let forAdmin = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: 'Name'},
    {id: 'gender', label: 'Sex', align: 'right'},
    {id: 'email', label: 'Email', align: 'right'},
    {id: 'phone', label: 'Phone', align: 'right'},
    {id: 'specialty', label: 'Specialty', align: 'right'},
];

let forPatient = [
    {id: 'name', label: 'Name'},
    {id: 'gender', label: 'Sex', align: 'right'},
    {id: 'specialty', label: 'Specialty', align: 'right'},
]

let practitioner = {
    id: '',
    name: '',
    avatar: '',
    sex: '',
    email: '',
    phone: '',
    speciality: ''
};

const style = (theme) => ({
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
});

class PractitionerTable extends Component {
    state = {
        practitioner: [],
        specialtyList: [],
        columns: [],
        user: null,
        loading: false,
        editPractitionerDialog: false,
        newPractitionerDialog: false,
        errorDialog: false
    };

    async componentDidMount() {
        const user = await authorizedUser();
        if (user) {
            if (user.role === "admin") {
                await this.setState({columns: forAdmin});
            } else if (user.role === "patient") {
                await this.setState({columns: forPatient});
            }
            await this.setState({
                user: user.role,
            });
        }
        await this.getAllPractitioner();
    }

    handleDialogClose = async (close, type) => {
        if (type === "editPractitioner") {
            await this.setState({
                editPractitionerDialog: close
            });
            this.getAllPractitioner().then();
        } else if (type === "newPractitioner") {
            await this.setState({
                newPractitionerDialog: close
            });
            this.getAllPractitioner().then();
        } else if (type === 'error') {
            await this.setState({
                errorDialog: close
            });
        }
    };
    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    };
    handleRowClick = async (event, row) => {
        practitioner = {
            id: row.id,
            avatar: row.avatar,
            name: row.name,
            sex: row.gender,
            email: row.email,
            phone: row.phone,
            specialty: row.specialty
        }
        if (this.state.user === 'admin') await this.setState({ editPractitionerDialog: true });
    };

    handleNewClick = async () => {
        let specialty;
        try {
            await this.setState({ loading: true });
            specialty = await allSpecialty();
        } finally {
            await this.setState( { loading: false });
        }
        await this.setState({
            newPractitionerDialog: true,
            specialtyList: specialty
        });
    };
    getError = async (error) => {
        await this.setState({
            errorDialog: error.error,
            errorMessage: error.message
        })
    }
    getAllPractitioner = async () => {
        this.setState({ loading: true });
        await allPractitioner()
            .then(data => {
                this.setState({
                    practitioner: data,
                    loading: false
                })
            });
        this.setState({ loading: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Practitioners</Typography>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                { this.state.columns.map((column) => (
                                    <TableCell key = { column.id } align = { column.align }>
                                        { (column.id === 'id' && this.state.user === "admin") ?
                                                <Button variant = "contained"
                                                        color = "primary"
                                                        align = "right"
                                                        onClick = {this.handleNewClick}
                                                        startIcon = {<PersonAddIcon />}>
                                                    New
                                                </Button> : column.label
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.practitioner.map((row) => {
                                return (
                                    <TableRow hover key = { row.id } onClick = {(event) => this.handleRowClick(event, row)}>
                                        { this.state.columns.map((column) => {
                                            return (
                                                <TableCell key = {column.id} align = {column.align}>
                                                    { (column.id === 'name') ?
                                                        <Grid container>
                                                            <Grid item xs = {2}>
                                                                <Avatar className = { classes.avatar } src = { row.avatar }/>
                                                            </Grid>
                                                            <Grid item xs = {10}>
                                                                { row[column.id] }
                                                            </Grid>
                                                        </Grid> : row[column.id]
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <EditPractitionerDialog open = { this.state.editPractitionerDialog }
                                        close = {this.handleDialogClose}
                                        loading = {this.handleLoading}
                                        {...practitioner} />
                <NewPractitionerDialog open = { this.state.newPractitionerDialog }
                                       close = { this.handleDialogClose }
                                       loading = { this.handleLoading }
                                       error = { this.getError }
                                       specialty = { this.state.specialtyList } />
                <ErrorDialog open = {this.state.errorDialog}
                             close = {this.handleDialogClose}
                             error = {this.state.errorMessage}/>
                <LoadingDialog open = {this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(PractitionerTable);