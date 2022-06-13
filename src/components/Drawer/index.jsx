import { Drawer, List } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import ListDrawer from './ListDrawer';

export default function DrawerComponent({ isDrawerOpen, setIsDrawerOpen }) {
  return (
    <Drawer anchor={'left'} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
      <List style={{ width: '300px' }}>
        {/* Items nav Bar */}
        <ListDrawer setIsDrawerOpen={setIsDrawerOpen} />
      </List>
    </Drawer>
  );
}

// define prop types, and validate props,
// if not valid, return error
DrawerComponent.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  setIsDrawerOpen: PropTypes.func.isRequired,
};
