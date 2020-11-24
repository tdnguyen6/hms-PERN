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
  createData('10', 'A', 'A', 'A1.104', '18:00', 'Aug 18', true)
];

class PatientAppointmentTable extends Component {
  state = {
    button: {
      open: false,
      error: ''
    }
  };
  handleRowClick = (event, row) => {
    console.log("Row click", row);
    if (row.status) {
      this.setState({
        button: {
          open: true,
          error: "Success"
        }
      });
    }
  }
  handleDialogClose = () => {
      this.setState({
        button: {
          open: false,
          error: ''
        }
      })
  };
  render() {
    return (
      <React.Fragment>
        <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>Upcomming appointment</Typography>
        <Table size = "medium" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Disease</TableCell>
                <TableCell>Practitioner</TableCell>
                <TableCell align = "right">Room</TableCell>
                <TableCell align = "right">Time</TableCell>
                <TableCell align = "right">Date</TableCell>
                <TableCell align = "right">
                  <Button variant       = "contained"
                          color         = "primary"
                          align         = "right"
                          onClick       = { this.handleDialogClose }>
                    New
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key = { row.id } onClick = { (event) => this.handleRowClick(event, row) }>
                  <TableCell component="th" scope="row">{row.disease}</TableCell>
                  <TableCell>{row.practitioner}</TableCell>
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
          open              = { this.state.button.open }
          onClose           = { this.handleDialogClose }
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
            <Button onClick = { this.handleDialogClose } color = "primary" align = "right">
              Save
            </Button>
            <Button onClick = { this.handleDialogClose } color = "primary" align = "left">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default PatientAppointmentTable;
