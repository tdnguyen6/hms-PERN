import React, { Component }                         from 'react';
import ListItem                       from '@material-ui/core/ListItem';
import ListItemIcon                   from '@material-ui/core/ListItemIcon';
import ListItemText                   from '@material-ui/core/ListItemText';
import ListSubheader                  from '@material-ui/core/ListSubheader';
import DashboardIcon                  from '@material-ui/icons/Dashboard';
import ShoppingCartIcon               from '@material-ui/icons/ShoppingCart';
import PeopleIcon                     from '@material-ui/icons/People';
import BarChartIcon                   from '@material-ui/icons/BarChart';
import LayersIcon                     from '@material-ui/icons/Layers';
import AssignmentIcon                 from '@material-ui/icons/Assignment';
import { BrowserRouter, Route, Switch }   from 'react-router-dom';
import { Link as RouteLink }              from 'react-router-dom';

let admin = [
  { id: 'Dashboard', link: '/dashboard'},
  { id: 'Practitioner', link: '/dashboard'},
  { id: 'Patient', link: '/dashboard'},
  { id: 'Appointment', link: '/dashboard'}
];

let practitioner = [
  { id: 'Dashboard', link: '/dashboard'},
  { id: 'Patient', link: '/dashboard'},
  { id: 'Appointment', link: '/dashboard'}
];

let patient = [
  { id: 'Dashboard', link: '/dashboard'},
  { id: 'Appointment', link: '/dashboard'}
];

class SidebarFunction extends Component {
  render() {
    let funcs = (this.props.type != 'admin') ? (this.props.type != 'practitioner') ? patient : practitioner : admin;
    return (
      <div>{
        funcs.map((func) => (
          <ListItem button component = { RouteLink } to = { func.link }>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary = { func.id } />
          </ListItem>
        ))
      }</div>
    );
  }
}

export default SidebarFunction;
