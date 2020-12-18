import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingDialog from "../Dialog/OtherDialog/LoadingDialog";
import EditPractitionerDialog from "../Dialog/EditDialog/EditPractitionerDialog";
import NewPractitionerDialog from "../Dialog/NewDialog/NewPractitionerDialog";
import ErrorDialog from "../Dialog/OtherDialog/ErrorDialog";
import {allPractitioner} from "../../components/API/AllPractitioner";
import {allSpecialty} from "../../components/API/AllSpecialty";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Avatar from "@material-ui/core/Avatar";
import {authorizedUser} from "../../components/API/Authenticated";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CyclicSortButton from "../../components/Others/CyclicSortButton";

let forAdmin = [
    {id: 'avatar', label: 'Avatar'},
    {
        id: 'id',
        label: 'ID',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.id - b.id;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'name',
        label: 'Name',
        compareFn: (a, b, dir) => {
            const res = a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'gender',
        label: 'Sex',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.gender.toUpperCase() > b.gender.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'email',
        label: 'Email',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'phone',
        label: 'Phone',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.phone.toUpperCase() > b.phone.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'specialty',
        label: 'Specialty',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.specialty.toUpperCase() > b.specialty.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'experience',
        label: 'Experience',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.experience > b.experience ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }
];

let forPatient = [
    {id: 'avatar', label: 'Avatar', align: 'center'},
    {
        id: 'id',
        label: 'ID',
        align: 'center',
        compareFn: (a, b, dir) => {
            const res = a.id - b.id;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'name',
        label: 'Name',
        compareFn: (a, b, dir) => {
            const res = a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'gender',
        label: 'Sex',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.gender.toUpperCase() > b.gender.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'specialty',
        label: 'Specialty',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.specialty.toUpperCase() > b.specialty.toUpperCase() ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }, {
        id: 'experience',
        label: 'Experience',
        align: 'right',
        compareFn: (a, b, dir) => {
            const res = a.experience > b.experience ? 1 : -1;
            return dir === 'asc' ? res : -res;
        }
    }
]

let practitioner = {
    id: null,
    name: null,
    avatar: null,
    sex: null,
    email: null,
    phone: null,
    speciality: null,
    experience: null
};

const style = (theme) => ({
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
});

class PractitionerTable extends Component {
    state = {
        practitionerList: [],
        specialtyList: [],
        columns: [],
        user: null,
        loading: false,
        editPractitionerDialog: false,
        newPractitionerDialog: false,
        errorDialog: false,
        sortColumns: [
            // {key: 'id', dir: 'asc'}
        ],
    };

    async componentDidMount() {
        try {
            this.setState({loading: true});
            const user = await authorizedUser();
            if (user) {
                if (user.role === "admin") {
                    await this.setState({columns: forAdmin});
                } else if (user.role === "patient") {
                    await this.setState({columns: forPatient});
                }
                await this.setState({
                    user: user.role,
                });
            }
            await this.getAllPractitioner();
        } finally {
            this.setState({loading: false});
        }
    }

    handleDialogClose = async (close, type) => {
        this.setState({loading: true});
        if (type === "editPractitioner") {
            await this.setState({
                editPractitionerDialog: close
            });
            this.getAllPractitioner().then();
        } else if (type === "newPractitioner") {
            await this.setState({
                newPractitionerDialog: close
            });
            this.getAllPractitioner().then();
        } else if (type === 'error') {
            await this.setState({
                errorDialog: close
            });
        }
        this.setState({loading: false});
    };
    handleLoading = async (loading) => {
        await this.setState({
            loading: loading
        })
    };
    handleRowClick = async (event, row) => {
        practitioner = {
            id: row.id,
            avatar: row.avatar,
            name: row.name,
            sex: row.gender,
            email: row.email,
            phone: row.phone,
            specialty: row.specialty,
            experience: row.experience
        }
        if (this.state.user === 'admin') await this.setState({editPractitionerDialog: true});
    };

    handleNewClick = async () => {
        let specialty;
        try {
            await this.setState({loading: true});
            specialty = await allSpecialty();
        } finally {
            await this.setState({loading: false});
        }
        await this.setState({
            newPractitionerDialog: true,
            specialtyList: specialty
        });
    };
    getError = async (error) => {
        await this.setState({
            errorDialog: error.error,
            errorMessage: error.message
        })
    }
    getAllPractitioner = async () => {
        const data = await allPractitioner();
        this.setState({
            practitionerList: data,
        });
    }

    async sort() {
        let l = this.state.practitionerList;
        console.log(this.state.sortColumns);
        this.state.sortColumns.forEach(c => {
            l.sort((a, b) => this.state.columns.find(v => v.id === c.key).compareFn(a, b, c.dir));
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

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Typography component="h2" variant="h6" color="primary" gutterBottom>Practitioners</Typography>
                <TableContainer>
                    <Table size="medium" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {this.state.columns.map((column) => (
                                    <TableCell key={column.id} align={column.align}>
                                        { column.id === 'avatar' ?
                                            this.state.user === "admin" ?
                                                <Button variant="contained"
                                                        color="primary"
                                                        onClick={this.handleNewClick}
                                                        startIcon = {<PersonAddIcon />} >
                                                    New
                                                </Button>
                                            : column.label :
                                            <CyclicSortButton sortTools={this.sortTools} columnID={column.id}>
                                                {column.label}
                                            </CyclicSortButton>
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { this.state.practitionerList.map((row) => {
                                return (
                                    <TableRow hover key={row.id} onClick={(event) => this.handleRowClick(event, row)}>
                                        {this.state.columns.map((column) => {
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    { (column.id === 'avatar') ?
                                                        <Avatar className = { classes.avatar } src = { row.avatar }/>
                                                        : (column.id === 'experience') ? `${row[column.id]} years` : row[column.id]
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <EditPractitionerDialog open={this.state.editPractitionerDialog}
                                        close={this.handleDialogClose}
                                        loading={this.handleLoading}
                                        {...practitioner} />
                <NewPractitionerDialog open={this.state.newPractitionerDialog}
                                       close={this.handleDialogClose}
                                       loading={this.handleLoading}
                                       error={this.getError}
                                       specialty={this.state.specialtyList}/>
                <ErrorDialog open={this.state.errorDialog}
                             close={this.handleDialogClose}
                             error={this.state.errorMessage}/>
                <LoadingDialog open={this.state.loading}/>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(PractitionerTable);