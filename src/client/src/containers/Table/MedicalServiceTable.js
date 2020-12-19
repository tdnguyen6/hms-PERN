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
import CyclicSortButton from "../../components/Others/CyclicSortButton";
import FilterBox from "../../components/Others/FilterBox";
import {allAppointment} from "../../components/API/AllAppointment";

let columns = [
    {
        id: 'id',
        label: 'ID',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.id - b.id;
            return dir === 'asc' ? res : -res;
        }
    },
    {
        id: 'name',
        label: 'Name',
        compareFn: (a, b, dir) => {
            const res = a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    },
    {
        id: 'price',
        label: 'Price',
        compareFn: (a, b, dir) => {
            const res = +a.price.slice(1) - +b.price.slice(1);
            return dir === 'asc' ? res : -res;
        }
    },
    {
        id: 'department',
        label: 'Department',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.department.toUpperCase() > b.department.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    },
];

class MedicalServiceTable extends Component {
    state = {
        medicalServiceList: [],
        sortColumns: [
            // {key: 'id', dir: 'asc'}
        ],
        loading: false,
    };

    async componentDidMount() {
        try {
            await this.setState({loading: true});
            await this.setState({
                medicalServiceList: await allMedicalService()
            })

        } finally {
            await this.setState({loading: false})
        }
        await this.sort();
    }

    async sort() {
        let l = this.state.medicalServiceList;
        console.log(this.state.sortColumns);
        this.state.sortColumns.forEach(c => {
            l.sort((a, b) => columns.find(v => v.id === c.key).compareFn(a, b, c.dir));
        });
        await this.setState({medicalServiceList: l});
    }

    async updateSortColumns(operation, columnID, dir = '') {
        let s = this.state.sortColumns;
        s = s.filter(e => e.key !== columnID);
        if (operation === 'add') {
            s.splice(1, 0, {key: columnID, dir: dir});
        }
        if (!s.length) s.push({key: 'id', dir: 'asc'});
        await this.setState({sortColumns: s});
    }

    sortTools = {
        sort: this.sort.bind(this),
        updateCriteria: this.updateSortColumns.bind(this)
    }

    async updateRowHandle(rows) {
        await this.setState({appointment: rows});
        await this.sort();
    }

    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    }

    render() {
        return (
            <React.Fragment>
                <FilterBox
                    columns={columns}
                    updateRowHandle={this.updateRowHandle.bind(this)}
                    defaultRows={allMedicalService}
                    loadingHandle={this.handleLoading}
                />
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Medical Services</Typography>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        <CyclicSortButton sortTools={this.sortTools} columnID={column.id}>
                                            {column.label}
                                        </CyclicSortButton>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.medicalServiceList.map((row) => {
                                return (
                                    <TableRow hover key={row.id}>
                                        {columns.map((column) => {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {row[column.id]}
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