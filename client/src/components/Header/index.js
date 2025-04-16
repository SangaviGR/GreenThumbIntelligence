import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  FormControlLabel,
  Switch,
  Grid,
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import { green } from "@mui/material/colors";
import Auth from "../../utils/auth";

const Header = ({ theme, themeToggle }) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [anchorAvatarEl, setAnchorAvatarEl] = React.useState(null);
  const avatarOpen = Boolean(anchorAvatarEl);

  const handleAvatarClick = (event) => setAnchorAvatarEl(event.currentTarget);
  const handleAvatarClose = () => setAnchorAvatarEl(null);

  return (
    <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <AppBar position="static" sx={{ bgcolor: green[700] }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Left Section - Brand */}
          <Typography
            component={Link}
            to="/"
            variant="h5"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              cursor: "pointer",
            }}
          >
            Green Thumb Intelligence
          </Typography>

          {/* Center Section - Navigation Links */}
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Typography
                component={Link}
                to="/people"
                sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
              >
                People
              </Typography>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }}>
              <Typography
                component={Link}
                to="/search"
                sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
              >
                Search
              </Typography>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Typography
                component={Link}
                to="/community"
                sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
              >
                Community
              </Typography>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Typography
                component={Link}
                to="/about"
                sx={{ color: "white", textDecoration: "none", cursor: "pointer" }}
              >
                About
              </Typography>
            </motion.div>
          </Box>

          {/* Right Section - Theme Toggle, Login/Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FormControlLabel
              sx={{ color: "white" }}
              control={<Switch color="default" onChange={themeToggle} />}
              label={theme === "light" ? "Light Mode" : "Dark Mode"}
              labelPlacement="start"
            />

            {Auth.loggedIn() ? (
              <>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Avatar
                    onClick={handleAvatarClick}
                    sx={{
                      cursor: "pointer",
                      bgcolor: "white",
                      color: "green",
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                </motion.div>

                <Menu
                  anchorEl={anchorAvatarEl}
                  open={avatarOpen}
                  onClose={handleAvatarClose}
                  PaperProps={{
                    elevation: 5,
                    sx: {
                      mt: 1.5,
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                >
                  <MenuItem component={Link} to="/profile">Profile</MenuItem>
                  <MenuItem onClick={logout} component={Link} to="/">Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      color: "green",
                      bgcolor: "white",
                      ":hover": {
                        bgcolor: "green",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button
                    component={Link}
                    to="/signup"
                    sx={{
                      color: "green",
                      bgcolor: "white",
                      ":hover": {
                        bgcolor: "green",
                        color: "white",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </motion.div>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
