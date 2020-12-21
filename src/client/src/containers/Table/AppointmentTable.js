import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {Completed, Upcoming} from '../../components/Services/AppointmentStatus';

import EditAppointmentDialog from '../Dialog/EditDialog/EditAppointmentDialog';
import NewAppointmentDialog from '../Dialog/NewDialog/NewAppointmentDialog';
import {allDisease} from "../../components/API/AllDisease";
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import {allAppointment} from "../../components/API/AllAppointment";
import {authorizedUser} from "../../components/API/Authenticated";
import PostAddIcon from '@material-ui/icons/PostAdd';
import CyclicSortButton from "../Others/CyclicSortButton";
import {Divider} from "@material-ui/core";
import FilterBox from "../Others/TableToolbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import TableToolbar from "../Others/TableToolbar";
import PaymentDialog from "../Dialog/OtherDialog/PaymentDialog";

let forAdmin = [
    {
        id: 'practitioner_name',
        label: 'Practitioner',
        compareFn: (a, b, dir) => {
            const res = a.practitioner_name.toUpperCase() > b.practitioner_name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'patient_name',
        label: 'Patient',
        compareFn: (a, b, dir) => {
            const res = a.patient_name.toUpperCase() > b.patient_name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'medical_service',
        label: 'Medical Service',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.medical_service.toUpperCase() > b.medical_service.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'room_id',
        label: 'Room',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.room_id - b.room_id;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'start',
        label: 'Time',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.start > b.start ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'date',
        label: 'Date',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.date > b.date ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'status',
        label: 'Status',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.status.toUpperCase() > b.status.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }
];
let forPatient = [
    {
        id: 'practitioner_name',
        label: 'Practitioner',
        compareFn: (a, b, dir) => {
            const res = a.practitioner_name.toUpperCase() > b.practitioner_name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'medical_service',
        label: 'Medical Service',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.medical_service.toUpperCase() > b.medical_service.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'room_id',
        label: 'Room',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.room_id - b.room_id;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'start',
        label: 'Time',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.start > b.start ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'date',
        label: 'Date',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.date > b.date ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'status',
        label: 'Status',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.status.toUpperCase() > b.status.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }
];
let forPractitioner = [
    {
        id: 'patient_name',
        label: 'Patient',
        compareFn: (a, b, dir) => {
            const res = a.patient_name.toUpperCase() > b.patient_name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'medical_service',
        label: 'Medical Service',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.medical_service.toUpperCase() > b.medical_service.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'room_id',
        label: 'Room',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.room_id - b.room_id;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'start',
        label: 'Time',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.start > b.start ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'date',
        label: 'Date',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.date > b.date ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'status',
        label: 'Status',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.status.toUpperCase() > b.status.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }
];

class AppointmentTable extends Component {
    state = {
        editAppointmentDialog: false,
        yesNoDialog: false,
        newAppointmentDialog: false,
        symptomsDialog: false,
        paymentDialog: true,
        price: null,
        appointment: [],
        symptomList: [],
        diseaseKnown: false,
        diseasePredicted: [],
        diseaseList: [],
        loading: false,
        columns: [],
        user: null,
        appointmentDetail: {
            id: null,
            medicalService: {
                id: null,
                name: null,
                price: null,
            },
            practitioner: {
                id: null,
                avatar: null,
                email: null,
                gender: null,
                name: null,
                phone: null,
                specialty: null,
                experience: null
            },
            patient: {
                id: null,
                avatar: null,
                dob: new Date(),
                email: null,
                gender: null,
                name: null,
                phone: null,
                ssn: null
            },
            room: null,
            time: null,
            date: new Date(),
            status: null
        },
        sortColumns: [
            // {key: 'id', dir: 'asc'}
        ],
    };
    sortTools = {
        sort: this.sort.bind(this),
        updateCriteria: this.updateSortColumns.bind(this)
    }

    async componentDidMount() {
        this.setState({loading: true});
        const user = await authorizedUser();
        if (user) {
            if (user.role === "admin") {
                await this.setState({columns: forAdmin});
            } else if (user.role === "practitioner") {
                await this.setState({columns: forPractitioner});
            } else if (user.role === "patient") {
                await this.setState({columns: forPatient});
            }
            await this.setState({
                user: user.role
            });
        }
        // await this.getAllAppointment();
        // console.log(this.state.appointment);
    }
    handleRowClick = async (event, row) => {
        console.log(row);
        await this.setState({
            appointmentDetail: {
                id: row.appointment_id,
                medicalService: {
                    id: row.service_id,
                    name: row.medical_service,
                    price: row.service_price
                },
                room: row.room_id,
                practitioner: {
                    id: row.practitioner_id,
                    avatar: row.practitioner_avatar,
                    email: row.practitioner_email,
                    gender: row.practitioner_gender,
                    name: row.practitioner_name,
                    phone: row.practitioner_phone,
                    specialty: row.practitioner_specialty,
                    experience: row.practitioner_experience
                },
                patient: {
                    id: row.patient_id,
                    avatar: row.patient_avatar,
                    dob: new Date(row.patient_dob),
                    email: row.patient_email,
                    gender: row.patient_gender,
                    name: row.patient_name,
                    phone: row.patient_phone,
                    ssn: row.patient_ssn
                },
                time: row.start,
                date: row.date.split('/').map(Number),
                log: row.log,
                prescription: row.prescription,
                next_appointment_service: row.next_service,
                next_appointment_service_id: row.next_service_id,
                next_appointment_period: row.next_appointment_period,
                status: row.status
            }
        });
        this.setState({editAppointmentDialog: true});
    };
    handleNewClick = async () => {
        let diseases;
        try {
            await this.setState({loading: true});
            diseases = await allDisease();
        } finally {
            await this.setState({loading: false});
        }
        await this.setState({
            newAppointmentDialog: true,
            diseaseList: diseases
        });
    };
    handleDialogClose = async (close, type) => {
        if (type === "newAppointment") {
            await this.setState({ newAppointmentDialog: close });
            if (this.state.user === "patient") await this.setState({ paymentDialog: true });
        } else if (type === "symptoms") {
            await this.setState({ symptomsDialog: close });
        } else if (type === "editAppointment") {
            await this.setState({ editAppointmentDialog: close });
            await this.getAllAppointment();
        } else if (type === "payment") {
            await this.setState({ paymentDialog: close });
            await this.getAllAppointment();
        }
    }
    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    }
    getAllAppointment = async () => {
        await this.setState({loading: true});
        await this.setState({
            appointment: await allAppointment(),
            loading: false
        });
        await this.setState({loading: false});
    }
    getPrice = async (price) => {
        await this.setState({loading: true});
        await this.setState({
            price: price
        });
        await this.setState({loading: false});
    }
    async sort() {
        let l = this.state.appointment;
        this.state.sortColumns.forEach(c => {
            l.sort((a, b) => this.state.columns.find(v => v.id === c.key).compareFn(a, b, c.dir));
        });
        await this.setState({medicalServiceList: l});
    }
    async updateSortColumns(operation, columnID, dir = '') {
        let s = this.state.sortColumns;
        s = s.filter(e => e.key !== columnID);
        if (operation === 'add') {
            s.splice(1, 0, {key: columnID, dir: dir});
        }
        if (!s.length) s.push({key: 'date', dir: 'dsc'});
        await this.setState({sortColumns: s});
    }
    async updateRowHandle(rows) {
        await this.setState({appointment: rows});
        await this.sort();
    }

    render() {
        return (
            <React.Fragment>
                <TableToolbar
                    columns = {this.state.columns.filter(column => !['status'].includes(column.id))}
                    updateRowHandle = {this.updateRowHandle.bind(this)}
                    defaultRows = {allAppointment}
                    loadingHandle = { this.handleLoading.bind(this) }
                    title = "Upcoming Appointment"/>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {this.state.columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {(column.label === 'Status' && this.state.user !== 'practitioner')
                                            ? <Button variant="contained"
                                                      color="primary"
                                                      align="right"
                                                      onClick={this.handleNewClick}
                                                      startIcon={<PostAddIcon/>}>
                                                New
                                            </Button>
                                            :
                                            <CyclicSortButton sortTools={this.sortTools} columnID={column.id}>
                                                {column.label}
                                            </CyclicSortButton>
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.appointment.map((row) => {
                                return (
                                    <TableRow hover key={row.id} onClick={(event) => this.handleRowClick(event, row)}>
                                        {this.state.columns.map((column) => {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {(column.id === 'status')
                                                        ? (row[column.id] === 'booked') ? Upcoming : Completed
                                                        : row[column.id]}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <NewAppointmentDialog open={this.state.newAppointmentDialog}
                                      close={this.handleDialogClose}
                                      price = {this.getPrice}
                                      loading={this.handleLoading}
                                      disease={this.state.diseaseList}
                                      user={this.state.user}/>
                {this.state.appointmentDetail.id &&
                <EditAppointmentDialog open={this.state.editAppointmentDialog}
                                       close={this.handleDialogClose}
                                       appointment={this.state.appointmentDetail}
                                       user={this.state.user}
                                       key={this.state.appointmentDetail.id}/>}
                <PaymentDialog open = { this.state.paymentDialog }
                               close = { this.handleDialogClose }
                               price = {this.state.price}/>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default AppointmentTable;
