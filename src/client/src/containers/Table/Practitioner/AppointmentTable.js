import React, { Component }                     from 'react';

import clsx                                     from 'clsx';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';
import TextField                                from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

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

function createData(id, patient, age, gender, disease, room, time, date, status) {
  return { id, patient, age, gender, disease, room, time, date, status };
};

let rows = [
  createData('1', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('2', 'B', 18, 'F', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('3', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('4', 'B', 18, 'F', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('5', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('6', 'B', 18, 'F', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('7', 'B', 18, 'F', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('8', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('9', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('10', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('6', 'B', 18, 'F', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('7', 'B', 18, 'F', 'B', 'A5.104', '16:00', 'Aug 20', false),
  createData('8', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('9', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
  createData('10', 'A', 18, 'F', 'A', 'A1.104', '18:00', 'Aug 18', true),
];

class AppointmentTable extends Component {
  state = {
    editDialog: false,
    newDialog: false
  };
  handleRowClick = (event, row) => {
    console.log("Row click", row);
    if (row.status) {
      this.setState({
        editDialog: true
      });
    }
  };
  handleNewClick = () => {
    this.setState({
      newDialog: true
    });
  };
  handleEditDialogClose = () => {
    this.setState({
      editDialog: false
    });
  };
  handleNewDialogClose = () => {
    this.setState({
      newDialog: false
    });
  };
  handleSave = () => {
    this.setState({
      editDialog: false
    });
  };
  handleDelete = () => {
    this.setState({
      editDialog: false
    });
  };
  handleNew = () => {
    this.setState({
      editDialog: false
    });
  };
  render() {
    return (
      <React.Fragment>
        <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>Upcomming appointment</Typography>
        <Table size = "medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell align = "center">Age</TableCell>
                <TableCell align = "center">F/M</TableCell>
                <TableCell>Disease</TableCell>
                <TableCell align = "right">Room</TableCell>
                <TableCell align = "right">Time</TableCell>
                <TableCell align = "right">Date</TableCell>
                <TableCell align = "right">
                  <Button variant       = "contained"
                          color         = "primary"
                          align         = "right"
                          onClick       = { this.handleNewClick }>
                    New
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key = { row.id } onClick = { (event) => this.handleRowClick(event, row) }>
                  <TableCell component="th" scope="row">{row.patient}</TableCell>
                  <TableCell align = "center">{row.age}</TableCell>
                  <TableCell align = "center">{row.gender}</TableCell>
                  <TableCell>{row.disease}</TableCell>
                  <TableCell align = "right">{row.room}</TableCell>
                  <TableCell align = "right">{row.time}</TableCell>
                  <TableCell align = "right">{row.date}</TableCell>
                  <TableCell align = "right">{
                      row.status
                      ? <Chip variant = "outlined"
                              size    = "small"
                              label   = "Upcomming"
                              color   = "primary"/>
                      : <Chip variant = "outlined"
                              size    = "small"
                              label   = "Completed"
                              color   = "secondary"/>
                  }</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>
        <Dialog
          open              = { this.state.editDialog }
          onClose           = { this.handleEditDialogClose }
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText id = "alert-dialog-description">
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              variant       = "outlined"
              margin        = "normal"
              id            = "name"
              label         = "Email Address"
              type          = "email"
              fullWidth
            />
            <TextField
              autoFocus
              variant       = "outlined"
              margin        = "normal"
              id            = "name"
              label         = "Name"
              fullWidth
            />
            <TextField
              autoFocus
              variant       = "outlined"
              margin        = "normal"
              id            = "name"
              label         = "Date"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick = { this.handleSave } color = "primary" align = "right">
              Save
            </Button>
            <Button onClick = { this.handleDelete } color = "primary" align = "left">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open              = { this.state.newDialog }
          onClose           = { this.handleNewDialogClose }
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Make new appointment</DialogTitle>
          <DialogContent>
            <DialogContentText id = "alert-dialog-description">
              To make new appointment, please enter your information here.
            </DialogContentText>
            <TextField
              autoFocus
              variant       = "outlined"
              margin        = "normal"
              id            = "name"
              label         = "Email Address"
              type          = "email"
              fullWidth
            />
            <TextField
              autoFocus
              variant       = "outlined"
              margin        = "normal"
              id            = "name"
              label         = "Name"
              fullWidth
            />
            <TextField
              autoFocus
              variant       = "outlined"
              margin        = "normal"
              id            = "name"
              label         = "Date"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick = { this.handleNew } color = "primary" align = "right">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default AppointmentTable;
