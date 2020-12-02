import React, { Component }                     from 'react';

import clsx                                     from 'clsx';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Dialog                             from '@material-ui/core/Dialog';
import DialogActions                      from '@material-ui/core/DialogActions';
import DialogContent                      from '@material-ui/core/DialogContent';
import DialogContentText                  from '@material-ui/core/DialogContentText';
import DialogTitle                        from '@material-ui/core/DialogTitle';

import { Completed, Upcomming }           from '../../components/Services/AppointmentStatus';

import EditAppointmentDialog              from '../Dialog/EditAppointmentDialog';
import NewAppointmentDialog              from '../Dialog/NewAppointmentDialog';
import YesNoDialog                       from "../Dialog/YesNoDialog";
import SymptomsDialog                    from "../Dialog/SymptomsDialog";
import {login} from "../../components/API/Login";
import {allDisease} from "../../components/API/AllDisease";
import LoadingDialog from "../Dialog/LoadingDialog";

function createData(id, disease, practitioner, room, time, date, status) {
  return { id, disease, practitioner, room, time, date, status };
};
let rows = [
  createData('1', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('2', 'B', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('3', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('4', 'B', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('5', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('6', 'B', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('7', 'B', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('8', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('9', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('10', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('11', 'B', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('12', 'B', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('13', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('14', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('15', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true)
];
let columns = [
  { id: 'disease', label: 'Disease' },
  { id: 'practitioner', label: 'Practitioner' },
  { id: 'room', label: 'Room', align: 'right'},
  { id: 'time', label: 'Time', align: 'right'},
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
    diseaseKnown: false,
    diseasePredicted: '',
    diseaseList: '',
    loading: false
  };
  handleRowClick = (event, row) => {
    appointment =  {
      id: row.id,
      disease: row.disease,
      practitioner: row.practitioner,
      room: row.room,
      time: row.time,
      date: row.date,
      status: row.status
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
    try {
      await this.setState({ loading: true });
      console.log('loading');
      let res = await allDisease();
      await this.setState({
        diseaseList: res
      });
    } finally {
      await this.setState( { loading: false });
      console.log('loaded');
    }
    await this.setState({
      yesNoDialog: true,
      newAppointmentDialog: false,
      symptomsDialog: false,
      diseaseKnown: false,
      diseasePredicted: ''
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
              { rows.map((row) => {
                return (
                    <TableRow hover key = { row.id } onClick = { (event) => this.handleRowClick(event, row) }>
                      { columns.map((column) => {
                        return (
                          <TableCell key = { column.id } align = { column.align }>
                            { (column.id === 'status')
                            ? row[column.id] ? Upcomming : Completed
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
                        disease = { this.getDisease } />
        <NewAppointmentDialog open = { this.state.newAppointmentDialog }
                              close = { this.handleDialogClose }
                              loading = { this.handleLoading }
                              diseaseKnown = { this.state.diseaseKnown }
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
