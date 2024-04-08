import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, createTheme, ThemeProvider, IconButton, Avatar, Menu, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import { getAvatarStyles } from '../../utils/chat/message/message';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Home, Logout } from '@mui/icons-material';

// Create a theme instance and include the decorative font
const theme = createTheme({
  typography: {
    h6: {
      fontWeight: 500,
      fontSize: '1.75rem', // Adjust the size as needed
      letterSpacing: '0.5px', // Optional: add some letter spacing
    }
  },
});

const AppTitle = () => {

  const { user, setUserDetails } = useContext(AppContext) ?? {};

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = () => {
    localStorage.removeItem("jwt")
    if(setUserDetails) setUserDetails(null);
  }

  const handleMenuItemClick = (item: string) => {

    if(item === "home") navigate("/home")
    else if(item === "logout") logout()
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ 
              flexGrow: 1,
              cursor: 'default',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            onClick={()=>navigate("/home")}
          >
            HFChat Mistral
          </Typography>
          <IconButton
            color="inherit"
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleMenu}
          >
            <Avatar alt="Name" {...getAvatarStyles(user?.firstname ?? "", user?.lastname ?? "")}>
              {user?.firstname ? user?.firstname[0] : ""}{user?.lastname ? user?.lastname[0] : ""}
            </Avatar>
          </IconButton>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick("home")}>
              <ListItemIcon>
                <Home/>
              </ListItemIcon>
              <ListItemText>Home</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("logout")}>
              <ListItemIcon>
                <Logout/>
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default AppTitle;
