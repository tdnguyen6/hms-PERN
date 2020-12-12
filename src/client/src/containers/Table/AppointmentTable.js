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
import YesNoDialog from "../Dialog/OtherDialog/YesNoDialog";
import SymptomsDialog from "../Dialog/OtherDialog/SymptomsDialog";
import {allDisease} from "../../components/API/AllDisease";
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import {allSymptom} from "../../components/API/AllSymptom";
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
            id: '',
            medical_service: '',
            practitioner: '',
            practitionerID: '',
            time: '',
            date: '',
            status: ''
        }
    };

    async componentDidMount() {
        this.setState({loading: true});
        const user = await authorizedUser();
        if (user) {
            if (user.role === "admin") {
                await this.setState({ columns: forAdmin });
            } else if (user.role === "practitioner") {
                await this.setState({ columns: forPractitioner });
            } else if (user.role === "patient") {
                await this.setState({ columns: forPatient });
            }
            await this.setState({
                user: user.role
            });
        }
        this.getAllAppointment().then().catch();
    }

    handleRowClick = async (event, row) => {

        await this.setState({
            appointmentDetail: {
                id: row.appointment_id,
                medical_service: row.medical_service,
                practitioner: row.practitioner_name,
                practitionerID: row.practitioner_id,
                time: row.start,
                date: row.date.split('/').map(Number),
                status: (row.status === 'booked')
            }
        });
        console.log(this.state.appointmentDetail);

        this.setState({editAppointmentDialog: (row.status === 'booked')});
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
        let diseases;
        let symptoms;
        try {
            await this.setState({loading: true});
            console.log('loading');
            diseases = await allDisease();
            // symptoms = await allSymptom();
            // console.log('symptomList', symptoms);
        } finally {
            await this.setState({loading: false});
            console.log('loaded');
        }
        // await this.setState({
        //     yesNoDialog: true,
        //     newAppointmentDialog: false,
        //     symptomsDialog: false,
        //     symptomList: symptoms,
        //     diseaseKnown: false,
        //     diseasePredicted: [],
        //     diseaseList: diseases
        // });
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
            this.getAllAppointment().then().catch();
        } else if (type === "yesNo") {
            await this.setState({
                yesNoDialog: close
            });
        } else if (type === "symptoms") {
            await this.setState({
                symptomsDialog: close
            });
        } else if (type === "editAppointment") {
            await this.setState({
                editAppointmentDialog: close
            });
        }
    }
    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    }

    // getDiseaseKnown = async (disease) => {
    //     await this.setState({
    //         diseaseKnown: disease,
    //         symptomsDialog: !disease,
    //         newAppointmentDialog: disease
    //     });
    // }
    // getDisease = async (disease) => {
    //     await this.setState({
    //         diseasePredicted: disease,
    //         newAppointmentDialog: true
    //     });
    // }
    // getAppointment = (appointment) => {
    //
    // };
    getAllAppointment = async () => {
        await allAppointment()
            .then(data => {
                console.log(data);
                this.setState({
                    appointment: data,
                    loading: false
                })
            });
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Upcomming appointment</Typography>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                { this.state.columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        {(column.label === 'Status')
                                            ? <Button variant="contained"
                                                      color="primary"
                                                      align="right"
                                                      onClick={this.handleNewClick}
                                                      startIcon={<PostAddIcon />}>
                                                New
                                            </Button>
                                            : column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.appointment.map((row) => {
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
                                      user = {this.state.user}
                                      appointment={this.getAppointment}/>
                <EditAppointmentDialog open={this.state.editAppointmentDialog}
                                       close={this.handleDialogClose}
                                       appointment={this.state.appointmentDetail}
                                       key={this.state.appointmentDetail.id} />
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default AppointmentTable;
