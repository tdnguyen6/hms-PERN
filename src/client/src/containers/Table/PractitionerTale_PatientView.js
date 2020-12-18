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
import {allAppointment} from "../../components/API/AllAppointment";
import {allPractitioner} from "../../components/API/AllPractitioner";
import {Redirect} from "react-router-dom";
import {allDisease} from "../../components/API/AllDisease";
import {allSymptom} from "../../components/API/AllSymptom";
import {allSpecialty} from "../../components/API/AllSpecialty";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Avatar from "@material-ui/core/Avatar";

let columns = [
    {id: 'name', label: 'Name'},
    {id: 'gender', label: 'Sex', align: 'right'},
    {id: 'specialty', label: 'Specialty', align: 'right'},
    {id: 'experience', label: 'Years of Experience', align: 'center'}
];

class PractitionerTable_PatientView extends Component {
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

    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
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
                                <TableCell>
                                    Avatar
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key = { column.id } align = { column.align }>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.practitioner.map((row) => {
                                return (
                                    <TableRow hover key = { row.id } >
                                        <TableCell>
                                            <Avatar src = {row.avatar}/>
                                        </TableCell>
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
                <LoadingDialog open = {this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default PractitionerTable_PatientView;