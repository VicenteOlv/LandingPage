import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountMenu from './AccountMenu'; // Adjust the import based on your project structure
import { Button, useMediaQuery, useTheme } from '@mui/material';

interface MenuAppBarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Import your image dynamically
const logo = '/img/rookieAce.png'; // Adjust the path based on your project structure

export default function MenuAppBar({ isDarkMode, toggleTheme }: MenuAppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: 8,
          backgroundColor: isDarkMode ? '#0f172a ' : '#5eaf88', // Apply green background in light mode
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="RookieAce Logo" style={{ height: '40px' }} />
          </Box>
         {/*{!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'relative', justifyContent: 'center' }}>
              <Button color="inherit" variant="text" sx={{ mr: 2 }}>
                Text1
              </Button>
              <Button color="inherit" variant="text" sx={{ mr: 2 }}>
                Text2
              </Button>
              <Button color="inherit" variant="text" sx={{ mr: 2 }}>
                Text3
              </Button>
            </Box> 
            )} */ }
          
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <AccountMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}