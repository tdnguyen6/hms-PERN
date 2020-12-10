import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingDialog from "../../Dialog/OtherDialog/LoadingDialog";
import EditPractitionerDialog from "../../Dialog/EditDialog/EditPractitionerDialog";
import NewPractitionerDialog from "../../Dialog/NewDialog/NewPractitionerDialog";
import ErrorDialog from "../../Dialog/OtherDialog/ErrorDialog";
import {allAppointment} from "../../../components/API/AllAppointment";
import {allPractitioner} from "../../../components/API/AllPractitioner";
import {Redirect} from "react-router-dom";
import {allDisease} from "../../../components/API/AllDisease";
import {allSymptom} from "../../../components/API/AllSymptom";
import {allSpecialty} from "../../../components/API/AllSpecialty";

let columns = [
    {id: 'name', label: 'Name'},
    {id: 'gender', label: 'Sex', align: 'right'},
    {id: 'email', label: 'Email', align: 'right'},
    {id: 'phone', label: 'Phone', align: 'right'},
    {id: 'specialty', label: 'Specialty', align: 'right'}
];
let practitioner = {
    id: '',
    name: '',
    sex: '',
    email: '',
    phone: '',
    speciality: ''
};

class PractitionerTable extends Component {
    state = {
        practitioner: [],
        specialtyList: [],
        loading: false,
        editPractitionerDialog: false,
        newPractitionerDialog: false,
        errorDialog: false
    };

    componentDidMount() {
        this.setState({ loading: true });
        this.getAllPractitioner().then();
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
    handleRowClick = (event, row) => {
        practitioner = {
            id: row.id,
            name: row.name,
            sex: row.gender,
            email: row.email,
            phone: row.phone,
            specialty: row.specialty
        }
        this.setState({ editPractitionerDialog: true });
    };

    /*
    * Click New -> Yes/No Dialog
    *             -> Yes: symptomsKnown = true
    *               -> New Appointment Dialog
    *             -> No:  symptomsKnown = false
    *               -> Symptoms Dialog -> Click Save -> Return Predicted Disease
    *                 -> New Appointment Dialog
    */
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
        await allPractitioner()
            .then(data => {
                this.setState({
                    practitioner: data,
                    loading: false
                })
            });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Practitioners</Typography>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key = { column.id } align = { column.align }>
                                        {(column.label === 'Name')
                                            ? <Button variant = "contained"
                                                      color = "primary"
                                                      align = "right"
                                                      onClick = {this.handleNewClick}>
                                                New
                                            </Button>
                                            : column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.practitioner.map((row) => {
                                return (
                                    <TableRow hover key = { row.id } onClick = {(event) => this.handleRowClick(event, row)}>
                                        { columns.map((column) => {
                                            return (
                                                <TableCell key = {column.id} align = {column.align}>
                                                    { row[column.id] }
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

export default PractitionerTable;