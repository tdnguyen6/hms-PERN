import React                          from 'react';
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

export const AdminSidebar = (
  <div>
    <ListItem button component = { RouteLink } to = "/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component = { RouteLink } to = "/login">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Practitioner" />
    </ListItem>
    <ListItem button component = { RouteLink } to = "/register">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Patient" />
    </ListItem>
    <ListItem button component = { RouteLink } to = "/dashboard">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Appointment" />
    </ListItem>
  </div>
);
