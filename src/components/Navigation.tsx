import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Order Management System
        </Typography>
        <Box>
          <Button
            component={RouterLink}
            to="/orders/new"
            color="inherit"
            startIcon={<AddIcon />}
          >
            New Order
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 