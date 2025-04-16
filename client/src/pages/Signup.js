import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { green } from "@mui/material/colors";
import { ADD_USER } from "../utils/mutations";
import { useTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Auth from "../utils/auth";

const styles = {
  container: {
    pb: 3,
  },
  textField: {
    width: "95%",
    my: 2,
    border: "1px solid grey",
  },
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Green Thumb Intelligence
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4caf50',
//     },
//     secondary: {
//       main: '#64dd20',
//     },
//   },
// });

export default function SignUp() {
  const [formState, setFormState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const navigate = useNavigate();

  const theme = useTheme(); // ✅ Get the theme object
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
      if (data.addUser.token) {
        navigate("/profile");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden">
      {/* 🌊 Gradient Background Animation */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(-45deg, 
      ${theme.palette.primary.main}, 
      ${theme.palette.secondary.main}, 
      ${theme.palette.background.default}, 
      ${theme.palette.success.dark})`,
          backgroundSize: "800% 800%",
          zIndex: -1,
          filter: "blur(50px)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10, // Speed up animation
          ease: "linear", // More fluid motion
          repeat: Infinity,
        }}
      />
      ;
      <Container component="main" maxWidth="md" sx={styles.container}>
        <CssBaseline />
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "rgba(255, 255, 255, 0.3)", // Transparent white background
            padding: 4,
            borderRadius: 3,
            backdropFilter: "blur(90px)", // Glass effect
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Avatar
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            sx={{
              m: 1,
              bgcolor: theme.palette.mode === "dark" ? "white" : green[500],
              color: "inherit", // Ensures text/icon inside takes the Avatar's color
            }}
          >
            <PersonAddIcon sx={{ color: "inherit" }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && (
            <Alert
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              sx={{ mt: 2 }}
              variant="outlined"
              severity="error"
            >
              Signup Failed
            </Alert>
          )}
          {/* form container */}
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 3, minWidth: "280px" }}
          >
            {/* input fields section */}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-root": {
                      backgroundColor: alpha(theme.palette.background.paper, 0.2), // 80% opacity
                      color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.divider, 0.6), // Slightly transparent border
                      },
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.light, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: alpha(theme.palette.text.secondary, 0.7), // Slightly faded label
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  })}
                  onChange={handleChange}
                  value={formState.firstName}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-root": {
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.2
                      ), // 80% opacity
                      color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.divider, 0.6), // Slightly transparent border
                      },
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.light, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: alpha(theme.palette.text.secondary, 0.7), // Slightly faded label
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  })}
                  onChange={handleChange}
                  value={formState.lastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-root": {
                      backgroundColor: alpha(theme.palette.background.paper, 0.2), // 80% opacity
                      color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.divider, 0.6), // Slightly transparent border
                      },
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.light, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: alpha(theme.palette.text.secondary, 0.7), // Slightly faded label
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  })}
                  onChange={handleChange}
                  value={formState.username}
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  // autoComplete='username'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-root": {
                      backgroundColor: alpha(theme.palette.background.paper, 0.2), // 80% opacity
                      color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.divider, 0.6), // Slightly transparent border
                      },
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.light, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: alpha(theme.palette.text.secondary, 0.7), // Slightly faded label
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  })}
                  onChange={handleChange}
                  value={formState.email}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  // autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-root": {
                      backgroundColor: alpha(theme.palette.background.paper, 0.2), // 80% opacity
                      color: theme.palette.text.primary,
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: alpha(theme.palette.divider, 0.6), // Slightly transparent border
                      },
                      "&:hover fieldset": {
                        borderColor: alpha(theme.palette.primary.light, 0.8),
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: alpha(theme.palette.text.secondary, 0.7), // Slightly faded label
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: theme.palette.primary.main,
                    },
                  })}
                  onChange={handleChange}
                  value={formState.password}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  // autoComplete='new-password'
                />
              </Grid>
            </Grid>
            {/* submit button section */}
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                color: "white",
                ":hover": { bgcolor: "white", color: "green" },
              }}
            >
              Sign Up
            </Button>
            {/* already have an account? section */}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={motion.a}
                  whileHover={{ scale: 1.1 }}
                  href="/login"
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "inherit", // Ensures it follows theme settings
                    textDecoration: "none",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
