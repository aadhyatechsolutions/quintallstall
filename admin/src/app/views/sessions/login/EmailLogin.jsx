import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import LoadingButton from "@mui/lab/LoadingButton";
import MatxDivider from "app/components/MatxDivider";
import useAuth from "app/hooks/useAuth";
import { Paragraph } from "app/components/Typography";

import {Snackbar,Alert } from "@mui/material";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

// initial login credentials
const initialValues = {
  email: "jason@ui-lib.com",
  password: "dummyPass",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be 6 character length")
    .required("Password is required!"),
  email: Yup.string().email("Invalid Email address").required("Email is required!")
});

export default function EmailLogin() {
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    });

  const theme = useTheme();
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleFormSubmit = async (values) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      setSnackbar({
        open: true,
        message: error?.response?.data?.message || "Failed to login",
        severity: "error",
      });
    }
  };

  return (
    <>
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        {({
            values,
            errors,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit
        }) => (
            <form onSubmit={handleSubmit}>

            {/* Email Field */}
            <TextField
                fullWidth
                size="small"
                type="email"
                name="email"
                label="Email"
                variant="outlined"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(errors.email && touched.email)}
                sx={{ mb: 3 }}
            />

            {/* Password Field */}
            <TextField
                fullWidth
                size="small"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={Boolean(errors.password && touched.password)}
                sx={{ mb: 1.5 }}
            />

            {/* Remember Me and Forgot Password */}
            <Box display="flex" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1}>
                <Checkbox
                    size="small"
                    name="remember"
                    onChange={handleChange}
                    checked={values.remember}
                    sx={{ padding: 0 }}
                />
                <Paragraph>Remember Me</Paragraph>
                </Box>

                <NavLink
                to="/session/forgot-password"
                style={{ color: theme.palette.primary.main }}>
                Forgot password?
                </NavLink>
            </Box>

            {/* Submit Button */}
            <LoadingButton
                type="submit"
                color="primary"
                loading={isSubmitting}
                variant="contained"
                sx={{ my: 2 }}>
                Login
            </LoadingButton>

            {/* Register Link */}
            <Paragraph>
                Don't have an account?
                <NavLink
                to="/session/signup"
                style={{
                    marginInlineStart: 5,
                    color: theme.palette.primary.main
                }}>
                Register
                </NavLink>
            </Paragraph>
            </form>
        )}
    </Formik>
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
    </>
  );
}
