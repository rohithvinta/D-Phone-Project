//imports 
// imports Material UI
import React, { useEffect, useState, navigate } from 'react'
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const settings = ["Logout"];
const NavbarComponent = ({ auth,cart }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)               
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [cookie, setCookie] = useCookies("jwt");
  const [user, setUser] = useState();
  const getUserData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.jwt}`,
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    const userData = await axios.get("http://localhost:8080/userinfo", config);
    setUser(userData.data);
    console.log(userData)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    
    setCookie("jwt", "");
    window.location = "/"
  }
  useEffect(() => {
    getUserData();
  },[])
  return (
    <AppBar
      style={{ backgroundColor: "#6EA9F7", color: "#153A8C" }}
      position="static"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBasketIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"

            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dphone
          </Typography>

          {auth  && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Link to="/">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#153A8C", display: "block" }}
                  >
                    PRODUCTS
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#153A8C", display: "block" }}
                  >
                    CART {cart.length}
                  </Button>
                </Link>
              </Menu>
            </Box>
          )}
          <ShoppingBasketIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Dphone
          </Typography>
          {auth  && user && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#153A8C", display: "block" }}
                >
                  PRODUCTS
                </Button>
              </Link>
              <Link to="/orders">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#153A8C", display: "block" }}
                >
                  ORDERS
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "#153A8C", display: "block" }}
                >
                  CART {cart.length}
                </Button>
              </Link>
            
                <Typography
                onClick={handleCloseNavMenu} 
                style={{ marginRight: "15px", fontWeight: "bold" }}
                  sx={{ my: 3, color: "#153A8C", display: "block" }}
                >
                  Hello {user.name}
              </Typography>
              
              <Typography
                onClick={handleCloseNavMenu}
                style={{ marginRight: "15px", fontWeight: "bold" }}
                sx={{ my: 3, color: "#153A8C", display: "block" }}
              >
                Referal Code {user.referralCode}
              </Typography>
              <Typography
                onClick={handleCloseNavMenu}
                style={{ marginRight: "15px", fontWeight:"bold" }}
                sx={{ my: 3, color: "green" ,display: "block" }}
              >
                Your points {user.points}
              </Typography>
            </Box>
          )}

          {auth && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogout} textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarComponent;