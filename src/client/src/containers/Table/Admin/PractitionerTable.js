import React, { Component }                     from 'react';

import Typography                               from '@material-ui/core/Typography';
import Button                                   from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { Completed, Upcomming }           from '../../../components/Services/AppointmentStatus';

import EditAppointmentDialog              from '../../Dialog/EditDialog/EditAppointmentDialog';
import NewAppointmentDialog              from '../../Dialog/NewDialog/NewAppointmentDialog';
import YesNoDialog                       from "../../Dialog/OtherDialog/YesNoDialog";
import SymptomsDialog                    from "../../Dialog/OtherDialog/SymptomsDialog";
import {allDisease} from "../../../components/API/AllDisease";
import LoadingDialog from "../../Dialog/OtherDialog/LoadingDialog";
import {Edit} from "@material-ui/icons";
import EditPractitionerDialog from "../../Dialog/EditDialog/EditPractitionerDialog";
import NewPractitionerDialog from "../../Dialog/NewDialog/NewPractitionerDialog";
import ErrorDialog from "../../Dialog/OtherDialog/ErrorDialog";

function createData(name, sex, ssn, dob, email, phone, speciality) {
  return { name, sex, ssn, dob, email, phone, speciality };
};
let rows = [
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality'),
  createData('name', 'sex', 'ssn', 'dob', 'email', 'phone', 'speciality')
];
let columns = [
  { id: 'name', label: 'Name' },
  { id: 'sex', label: 'Sex', align: 'right'},
  { id: 'ssn', label: 'SSN', align: 'right'},
  { id: 'dob', label: 'Date of Birth', align: 'right'},
  { id: 'email', label: 'Email', align: 'right'},
  { id: 'phone', label: 'Phone', align: 'right'},
  { id: 'speciality', label: 'Speciality', align: 'right'}
];
let practitioner = {
  name: '',
  sex: '',
  ssn: '',
  dob: '',
  email: '',
  phone: '',
  speciality: ''
};

class PractitionerTable extends Component {
  state = {
    loading: false,
    editPractitionerDialog: false,
    newPractitionerDialog: false,
    errorDialog: false
  };

  handleDialogClose = async (close, type) => {
    if (type === "editPractitioner") {
      await this.setState({
        editPractitionerDialog: close
      });
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
    practitioner =  {
      name: row.name,
      sex: row.sex,
      ssn: row.ssn,
      dob: row.dob,
      password: row.email,
      phone: row.phone,
      speciality: row.speciality
    }
    this.setState({ editPractitionerDialog: true });
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
  }

  render() {
    return (
        <React.Fragment>
          <Typography component = "h2" variant = "h6" color = "primary" gutterBottom>Practitioners</Typography>
          <TableContainer>
            <Table size = "medium" stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                      <TableCell key = { column.id } align = { column.align }>
                        { (column.label === 'Name')
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
          <EditPractitionerDialog open = { this.state.editPractitionerDialog }
                                  close = { this.handleDialogClose }
                                  loading = { this.handleLoading }
                                  { ...practitioner }/>
          <NewPractitionerDialog open = { this.state.newPractitionerDialog }
                                 close = { this.handleDialogClose }
                                 loading = { this.handleLoading }
                                 error = { this.getError } />
          <ErrorDialog open = { this.state.errorDialog }
                       close = { this.handleDialogClose }
                       error = { this.state.errorMessage } />
          <LoadingDialog open = { this.state.loading } />
        </React.Fragment>
    );
  }
}

export default PractitionerTable;