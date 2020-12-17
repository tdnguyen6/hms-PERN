import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link as RouteLink} from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import EventIcon from '@material-ui/icons/Event';

let admin = [
    {id: 'Dashboard', link: '/admin/dashboard', icon: <DashboardIcon/>},
    {id: 'Practitioner', link: '/admin/practitioner', icon: <PersonAddIcon/>},
    {id: 'Patient', link: '/admin/patient', icon: <AirlineSeatIndividualSuiteIcon/>},
    {id: 'Appointment', link: '/admin/appointment', icon: <EventIcon/>}
];

let practitioner = [
    {id: 'Dashboard', link: '/practitioner/dashboard', icon: <DashboardIcon/>},
    {id: 'Appointment', link: '/practitioner/appointment', icon: <EventIcon/>}
];

let patient = [
    {id: 'Dashboard', link: '/patient/dashboard', icon: <DashboardIcon/>},
    {id: 'Practitioner', link: '/patient/practitioner', icon: <PersonAddIcon/>},
    {id: 'Appointment', link: '/patient/appointment', icon: <EventIcon/>}
];

class SidebarFunction extends Component {
    render() {
        let roleFunctions = (this.props.type !== 'admin') ? (this.props.type !== 'practitioner') ? patient : practitioner : admin;
        return (
            <div>{
                roleFunctions.map((func) => (
                    <ListItem button component = {RouteLink} to = {func.link}>
                        <ListItemIcon>
                            { func.icon }
                        </ListItemIcon>
                        <ListItemText primary = {func.id}/>
                    </ListItem>
                ))
            }</div>
        );
    }
}

export default SidebarFunction;
