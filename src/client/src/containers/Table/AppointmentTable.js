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
]

class AppointmentTable extends Component {
  state = {
    editAppointmentDialog: false,
    yesNoDialog: false,
    newAppointmentDialog: false,
    symptomsDialog: false,
    diseasePredicted: '',
    appointment: {
      id: '',
      disease: '',
      practitioner: '',
      room: '',
      time: '',
      date: '',
      status: ''
    }
  };
  handleRowClick = (event, row) => {
    this.setState({
        editAppointmentDialog: row.status,
        appointment: {
          id: row.id,
          disease: row.disease,
          practitioner: row.practitioner,
          room: row.room,
          time: row.time,
          date: row.date,
          status: row.status
        }
    });
  };
  handleNewClick = () => {
    this.setState({
      yesNoDialog: true,
      newAppointmentDialog: false,
      symptomsDialog: false,
      diseasePredicted: '',
      appointment: {
        id: '',
        disease: '',
        practitioner: '',
        room: '',
        time: '',
        date: '',
        status: ''
      }
    });
  };
  handleDialogClose = (close, type) => {
    if (type == "newAppointment") {
      this.setState({
        newAppointmentDialog: close
      });
    } else if (type == "yesNo") {
      this.setState({
        yesNoDialog: close
      });
    } else if (type == "symptoms") {
      this.setState({
        symptomsDialog: close
      });
    } else if (type == "editAppointment") {
      this.setState({
        editAppointmentDialog: close
      });
    }
  }
  getDiseaseKnown = (known) => {
    if (known == false) {
      this.setState({
        symptomsDialog: !known
      });
    } else {
      this.setState({
        newAppointmentDialog: known
      });
    }

  }
  // bug here but can't debug
  // don't know why?
  getDisease = (disease) => {
    this.setState({
      diseasePredicted: disease
    });
    this.setState({
      newAppointmentDialog: true
    });
    console.log(disease, this.state.diseasePredicted, "hahaaa");
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
                      { (column.label == 'Status')
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
                            { (column.id == 'status')
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
                     disease = { this.getDiseaseKnown }
                     content = "Do you know your disease yet?" />
        <SymptomsDialog open = { this.state.symptomsDialog }
                        close = { this.handleDialogClose }
                        disease = { this.getDisease } />
        <NewAppointmentDialog open = { this.state.newAppointmentDialog }
                              close = { this.handleDialogClose }
                              disease = { this.state.diseasePredicted }
                              appointment = { this.getAppointment }/>
        <EditAppointmentDialog open = { this.state.editAppointmentDialog }
                               close = { this.handleDialogClose }
                               { ...this.state.appointment } />
      </React.Fragment>
    );
  }
}

export default AppointmentTable;
