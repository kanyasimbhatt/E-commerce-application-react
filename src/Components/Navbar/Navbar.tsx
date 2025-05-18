import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../ViewAllProducts/SidebarProvider';
import { useVisualMode } from './VisualModeProvider';

type ChildrenType = {
  showHamburger: boolean;
}

export default function Navbar({showHamburger} : ChildrenType) {
  const navigate = useNavigate();
  const { setOpen } = useSidebar();
  const {darkMode, setDarkMode} = useVisualMode();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user-id');
    handleClose();
    navigate('/login');
  };

  const handleClickOnFavorites = () => {
    navigate('/favorites');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleVisualModeChange = () => {
    setDarkMode((dark) => !dark)
  }
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          {showHamburger && <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>}
          <Typography
            variant="h6"
            component="div"
            fontWeight={'bold'}
            sx={{ flexGrow: 1 }}
          >
            Shopify
          </Typography>

          <div>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleVisualModeChange}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>

            <IconButton onClick={handleClickOnFavorites}>
              <FavoriteIcon sx={{ color: 'white' }} />
            </IconButton>

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
