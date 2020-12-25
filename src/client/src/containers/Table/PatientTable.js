import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import ErrorDialog from "../Dialog/OtherDialog/ErrorDialog";
import {allPatient} from "../../components/API/AllPatient";
import EditPatientDialog from "../Dialog/EditDialog/EditPatientDialog";
import Avatar from "@material-ui/core/Avatar";
import CyclicSortButton from "../Others/CyclicSortButton";
import TableToolbar from "../Others/TableToolbar";

let columns = [
    {
        id: 'id',
        label: 'ID',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.id - b.id;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'name',
        label: 'Name',
        compareFn: (a, b, dir) => {
            const res = a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'gender',
        label: 'Sex',
        align: 'left',
        compareFn: (a, b, dir) => {
            const res = a.gender.toUpperCase() > b.gender.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'email',
        label: 'Email',
        align: 'left',
        compareFn: (a, b, dir) => {
            const res = a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'phone',
        label: 'Phone',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.phone.toUpperCase() > b.phone.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'ssn',
        label: 'SSN',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.ssn.toUpperCase() > b.ssn.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'dob',
        label: 'Date of Birth',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.dob > b.dob ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }
];
let patient = {
    id: '',
    avatar: '',
    name: '',
    sex: '',
    email: '',
    phone: '',
    dob: '',
    ssn: ''
};

class PatientTable extends Component {
    state = {
        patient: [],
        loading: false,
        editPatientDialog: false,
        newPractitionerDialog: false,
        errorDialog: false,
        sortColumns: [
            // {key: 'id', dir: 'asc'}
        ],
    };

    handleDialogClose = async (close, type) => {
        if (type === "editPatient") {
            await this.setState({
                editPatientDialog: close
            });
            this.getAllPatient().then().catch();
        } else if (type === "newPractitioner") {
            await this.setState({
                newPractitionerDialog: close
            });
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
        patient = {
            id: row.id,
            avatar: row.avatar,
            name: row.name,
            sex: row.gender,
            email: row.email,
            phone: row.phone,
            dob: row.dob,
            ssn: row.ssn
        }
        this.setState({editPatientDialog: true});
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
        await this.setState({
            newPractitionerDialog: true
        });
    };

    getError = async (error) => {
        await this.setState({
            errorDialog: error.error,
            errorMessage: error.message
        })
    };
    getAllPatient = async () => {
        allPatient()
            .then(data => {
                this.setState({
                    patient: data,
                    loading: false
                })
            });
    }

    async sort() {
        let l = this.state.patient;
        console.log(this.state.sortColumns);
        this.state.sortColumns.forEach(c => {
            l.sort((a, b) => columns.find(v => v.id === c.key).compareFn(a, b, c.dir));
        });
        await this.setState({medicalServiceList: l});
    }

    async updateSortColumns(operation, columnID, dir = '') {
        let s = this.state.sortColumns;
        s = s.filter(e => e.key !== columnID);
        if (operation === 'add') {
            s.splice(1, 0, {key: columnID, dir: dir});
        }
        if (!s.length) s.push({key: 'id', dir: 'asc'});
        await this.setState({sortColumns: s});
    }

    sortTools = {
        sort: this.sort.bind(this),
        updateCriteria: this.updateSortColumns.bind(this)
    }

    async updateRowHandle(rows) {
        await this.setState({patient: rows});
        await this.sort();
    }

    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    }

    render() {
        return (
            <React.Fragment>
                <TableToolbar
                    columns={columns}
                    updateRowHandle={this.updateRowHandle.bind(this)}
                    defaultRows={allPatient}
                    loadingHandle={this.handleLoading.bind(this)}
                    title = "Patients"/>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Avatar
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key = { column.id } align = { column.align }>
                                        <CyclicSortButton sortTools={this.sortTools} columnID={column.id}>
                                            {column.label}
                                        </CyclicSortButton>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.patient.map((row) => {
                                return (
                                    <TableRow hover key = { row.id } onClick = {(event) => this.handleRowClick(event, row)}>
                                        <TableCell>
                                            <Avatar src = {row.avatar}/>
                                        </TableCell>
                                        { columns.map((column) => {
                                            return (
                                                <TableCell key = { column.id } align = { column.align }>
                                                    { (column.id === 'gender') ?
                                                        (row[column.id] === 'female') ? 'F' : 'M' :row[column.id] }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <EditPatientDialog open={this.state.editPatientDialog}
                                        close={this.handleDialogClose}
                                        loading={this.handleLoading}
                                        {...patient}/>
                <ErrorDialog open={this.state.errorDialog}
                             close={this.handleDialogClose}
                             error={this.state.errorMessage}/>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default PatientTable;