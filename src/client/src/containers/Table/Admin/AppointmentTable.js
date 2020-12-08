import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Completed, Upcoming }           from '../../../components/Services/AppointmentStatus';

import EditAppointmentDialog              from '../../Dialog/EditDialog/EditAppointmentDialog';
import NewAppointmentDialog              from '../../Dialog/NewDialog/NewAppointmentDialog';
import YesNoDialog                       from "../../Dialog/OtherDialog/YesNoDialog";
import SymptomsDialog                    from "../../Dialog/OtherDialog/SymptomsDialog";
import {allDisease} from "../../../components/API/AllDisease";
import LoadingDialog from "../../Dialog/OtherDialog/LoadingDialog";
import {allSymptom} from "../../../components/API/AllSymptom";
import {allAppointment} from "../../../components/API/AllAppointment";

let columns = [
  { id: 'practitioner_name', label: 'Practitioner' },
  { id: 'patient_name', label: 'Patient'},
  { id: 'medical_service', label: 'Medical Service', align: 'right'},
  { id: 'start', label: 'Time', align: 'right'},
  { id: 'date', label: 'Date', align: 'right'},
  { id: 'status', label: 'Status', align: 'right'}
];
let appointment = {
  id: '',
  disease: '',
  practitioner: '',
  room: '',
  time: '',
  date: '',
  status: ''
};

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
    dataLoading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    allAppointment()
        .then(data => {
          console.log(data);
          this.setState({
            appointment: data,
            loading: false
          })
        });
  }
  handleRowClick = (event, row) => {
    console.log(row);
    appointment =  {
      id: row.id,
      disease: row.disease,
      practitioner: row.practitioner_name,
      room: row.room,
      time: row.time,
      date: row.date,
      status: false
    }
    this.setState({ editAppointmentDialog: row.status });
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
      await this.setState({ loading: true });
      console.log('loading');
      diseases = await allDisease();
      symptoms = await allSymptom();
      console.log('symptomList', symptoms);
    } finally {
      await this.setState( { loading: false });
      console.log('loaded');
    }
    await this.setState({
      yesNoDialog: true,
      newAppointmentDialog: false,
      symptomsDialog: false,
      symptomList: symptoms,
      diseaseKnown: false,
      diseasePredicted: [],
      diseaseList: diseases
    });
  };
  handleDialogClose = async (close, type) => {
    if (type === "newAppointment") {
      await this.setState({
        newAppointmentDialog: close
      });
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

  getDiseaseKnown = async (disease) => {
    await this.setState({
      diseaseKnown: disease,
      symptomsDialog: !disease,
      newAppointmentDialog: disease
    });
  }
  getDisease = async (disease) => {
    await this.setState({
      diseasePredicted: disease,
      newAppointmentDialog: true
    });
  }
  getAppointment = (appointment) => {

  }

  render() {
    return (
      <React.Fragment>
        <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>Upcomming appointment</Typography>
        <TableContainer>
          <Table size = "medium" stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell key = { column.id } align = { column.align }>
                      { (column.label === 'Status')
                        ? <Button variant       = "contained"
                                  color         = "primary"
                                  align         = "right"
                                  onClick       = { this.handleNewClick }>
                            New
                          </Button>
                        : column.label }
                    </TableCell>
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
              { this.state.appointment.map((row) => {
                return (
                    <TableRow hover key = { row.appointment_id } onClick = { (event) => this.handleRowClick(event, row) }>
                      { columns.map((column) => {
                        return (
                          <TableCell key = { column.id } align = { column.align }>
                            { (column.id === 'status')
                            ? row[column.id] ? Upcoming : Completed
                            : row[column.id] }
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/*
          - open and close props will send data back to its child component: EditAppointmentDialog.
          - getOpenState will receive data which been sent from its child component EditAppointmentDialog.
        */}
        <YesNoDialog open = { this.state.yesNoDialog }
                     close =  { this.handleDialogClose }
                     yesno = { this.getDiseaseKnown }
                     content = "Do you know your disease yet?" />
        <SymptomsDialog open = { this.state.symptomsDialog }
                        close = { this.handleDialogClose }
                        loading = { this.handleLoading }
                        symptom = { this.state.symptomList }
                        disease = { this.getDisease } />
        <NewAppointmentDialog open = { this.state.newAppointmentDialog }
                              close = { this.handleDialogClose }
                              loading = { this.handleLoading }
                              disease = { (this.state.diseaseKnown)
                                          ? this.state.diseaseList
                                          : this.state.diseasePredicted }
                              appointment = { this.getAppointment }/>
        <EditAppointmentDialog open = { this.state.editAppointmentDialog }
                               close = { this.handleDialogClose }
                               { ...appointment } />
        <LoadingDialog open = { this.state.loading } />
      </React.Fragment>
    );
  }
}

export default AppointmentTable;
