import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import {allMedicalService} from "../../components/API/AllMedicalService";

let columns = [
    {id: 'id', label: 'ID'},
    {id: 'name', label: 'Name'},
    {id: 'price', label: 'Price', align: 'right'},
    {id: 'department', label: 'Department', align: 'right'},
];

class MedicalServiceTable extends Component {
    state = {
        medical_services: [],
        loading: false,
    };

    async componentDidMount() {
        try {
            await this.setState({ loading: true });
            await this.setState({
                medical_services: await allMedicalService()
            })
        } finally {
            await this.setState({loading: false})
        }
    }

    render() {
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Medical Services</Typography>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key = { column.id } align = { column.align }>
                                        { column.label }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.medical_services.map((row) => {
                                return (
                                    <TableRow hover key = { row.id }>
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
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default MedicalServiceTable;