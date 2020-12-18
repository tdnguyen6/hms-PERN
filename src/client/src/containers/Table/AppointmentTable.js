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

let forAdmin = [
    {id: 'practitioner_name', label: 'Practitioner'},
    {id: 'patient_name', label: 'Patient'},
    {id: 'medical_service', label: 'Medical Service', align: 'right'},
    {id: 'start', label: 'Time', align: 'right'},
    {id: 'date', label: 'Date', align: 'right'},
    {id: 'status', label: 'Status', align: 'right'}
];

let forPatient = [
    {id: 'practitioner_name', label: 'Practitioner'},
    {id: 'medical_service', label: 'Medical Service', align: 'right'},
    {id: 'start', label: 'Time', align: 'right'},
    {id: 'date', label: 'Date', align: 'right'},
    {id: 'status', label: 'Status', align: 'right'}
];

let forPractitioner = [
    {id: 'patient_name', label: 'Patient'},
    {id: 'medical_service', label: 'Medical Service', align: 'right'},
    {id: 'start', label: 'Time', align: 'right'},
    {id: 'date', label: 'Date', align: 'right'},
    {id: 'status', label: 'Status', align: 'right'}
];


class AppointmentTable extends Component {
    state = {
        editAppointmentDialog: false,
        yesNoDialog: false,
        newAppointmentDialog: false,
        symptomsDialog: false,
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
            medical_services: null,
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
            time: null,
            date: new Date(),
            status: null
        }
    };

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
        await this.getAllAppointment();
        console.log(this.state.appointment);
    }

    handleRowClick = async (event, row) => {
        await this.setState({
            appointmentDetail: {
                id: row.appointment_id,
                medical_service: row.medical_service,
                medical_service_id: row.service_id,
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
            await this.setState({
                newAppointmentDialog: close
            });
            await this.getAllAppointment();
        } else if (type === "symptoms") {
            await this.setState({
                symptomsDialog: close
            });
        } else if (type === "editAppointment") {
            await this.setState({
                editAppointmentDialog: close
            });
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

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Upcoming appointment</Typography>
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
                                            : column.label}
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
                                      loading={this.handleLoading}
                                      disease={this.state.diseaseList}
                                      user={this.state.user}/>
                { this.state.appointmentDetail.id && <EditAppointmentDialog open={this.state.editAppointmentDialog}
                                                                       close={this.handleDialogClose}
                                                                       appointment={this.state.appointmentDetail}
                                                                       user={this.state.user}
                                                                       key={this.state.appointmentDetail.id}/> }
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default AppointmentTable;
