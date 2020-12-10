import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link as RouteLink} from 'react-router-dom';

let admin = [
    {id: 'Dashboard', link: '/admin/dashboard'},
    {id: 'Practitioner', link: '/admin/practitioner'},
    {id: 'Patient', link: '/admin/patient'},
    {id: 'Appointment', link: '/admin/appointment'}
];

let practitioner = [
    {id: 'Dashboard', link: '/practitioner/dashboard'},
    {id: 'Patient', link: '/practitioner/patient'},
    {id: 'Appointment', link: '/practitioner/appointment'}
];

let patient = [
    {id: 'Dashboard', link: '/patient/dashboard'},
    {id: 'Appointment', link: '/patient/appointment'}
];

class SidebarFunction extends Component {
    render() {
        let roleFunctions = (this.props.type !== 'admin') ? (this.props.type !== 'practitioner') ? patient : practitioner : admin;
        return (
            <div>{
                roleFunctions.map((func) => (
                    <ListItem button component = {RouteLink} to = {func.link}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary = {func.id}/>
                    </ListItem>
                ))
            }</div>
        );
    }
}

export default SidebarFunction;
