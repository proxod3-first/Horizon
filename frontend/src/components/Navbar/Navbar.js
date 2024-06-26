import React, { useState, useEffect } from "react";
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
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actionType from "../../constants/actionTypes";
import decode from "jwt-decode";
import zIndex from "@material-ui/core/styles/zIndex";

const settings = ["About", "Logout"];

function ResponsiveAppBar({ user, setUser }) {
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  //console.log(user?.result)

  const pages = ["Hotel", "Profile", "Mealsheet"];
  if (user?.result?.role === 2) {
    pages.push("Tenants");
    pages.push("Rooms");
    pages.push("Reviews");
  }
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //Navbar functionalities
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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
  //Navbar functionality ends here

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setUser(null);
    window.location.reload(false);
    navigate("/");
    //history.push('/auth');

    console.log("logout called");
  };
  const about = () => {
    navigate("/About");
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div>
      <AppBar
        position="static"
        style={{
          backgroundColor: "#3a3b7b",
          zIndex: "999",
          top: "0",
          width: "100%",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href={!user ? "/" : "/Homepage"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "Lora",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Horizon
            </Typography>

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
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        style={{
                          textDecoration: "none",
                          fontFamily: "tahoma",
                          color: "#3a3b7b",
                        }}
                        to={`/${page}`}
                      >
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Lora",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Horizon
            </Typography>

            {!user?.result ? (
              <div></div>
            ) : (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "white" }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ flexGrow: 0 }}>
              {!user?.result ? (
                <div></div>
              ) : (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt={user?.result.name}
                        style={{ backgroundColor: "#a65acc" }}
                        src="#"
                      />
                      <MenuIcon
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                        style={{ color: "white" }}
                      />
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
                        {setting === "Logout" ? (
                          <Typography onClick={logout} textAlign="center">
                            {setting}
                          </Typography>
                        ) : (
                          <Typography onClick={about} textAlign="center">
                            {setting}
                          </Typography>
                        )}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default ResponsiveAppBar;
