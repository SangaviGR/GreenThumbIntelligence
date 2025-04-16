import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { green } from "@mui/material/colors";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material/styles";

const styles = {
  textField: {
    width: "100%",
    my: 2,
    bgcolor: "white", // White background for clarity
    borderRadius: "5px",
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

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);
  const navigate = useNavigate();
  const theme = useTheme(); // ✅ Get the theme object

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      if (data.login.token) navigate("/profile");
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
          background:
            "linear-gradient(-45deg, #32a852, #2c3e50, #16a085, #27ae60)",
          backgroundSize: "400% 400%",
          zIndex: -1,
          filter: "blur(50px)",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Login Form */}
      <Container component="main" maxWidth="sm">
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
            bgcolor: "rgba(255, 255, 255, 0.2)", // Transparent white background
            padding: 4,
            borderRadius: 3,
            backdropFilter: "blur(10px)", // Glass effect
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
            <PersonIcon sx={{ color: "inherit" }} />
          </Avatar>

          <Typography component="h1" variant="h5">
            Log in
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
              Login Failed
            </Alert>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleFormSubmit}
            sx={{ mt: 3, minWidth: "280px" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-input": {
                      color: theme.palette.mode === "dark" ? "#fff" : "#000", // Input text color
                    },
                    "& .MuiInputLabel-root": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.7)", // Label color
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.5)"
                          : "rgba(0, 0, 0, 0.5)", // Placeholder color
                      opacity: 1, // Ensures visibility
                    },
                  })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formState.email}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: formState.email !== "" }} // Fixes placeholder overlap
                  InputProps={{
                    placeholder: "Enter your email",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={(theme) => ({
                    ...styles.textField,
                    "& .MuiInputBase-input": {
                      color: theme.palette.mode === "dark" ? "#fff" : "#000", // Input text color
                    },
                    "& .MuiInputLabel-root": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.7)"
                          : "rgba(0, 0, 0, 0.7)", // Label color
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.5)"
                          : "rgba(0, 0, 0, 0.5)", // Placeholder color
                      opacity: 1, // Ensures visibility
                    },
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formState.password}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: formState.password !== "" }} // Fixes placeholder overlap
                  InputProps={{
                    placeholder: "Enter your password",
                  }}
                />
              </Grid>
            </Grid>
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
              Log In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  component={motion.a}
                  whileHover={{ scale: 1.1 }}
                  href="/signup"
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "inherit", // Ensures it follows theme settings
                    textDecoration: "none",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  Don't have an account? Sign up
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
