import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { navBarList } from '../../Functions';

export default function ListDrawer({ setIsDrawerOpen }) {
  return navBarList.map(({ name, link }) => (
    <Link key={name} to={link}>
      <ListItem button onClick={() => setIsDrawerOpen(false)}>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  ));
}

// define prop types, and validate props,
// if not valid, return error
ListDrawer.propTypes = {
  setIsDrawerOpen: PropTypes.func.isRequired,
};
