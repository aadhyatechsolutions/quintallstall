import { NavLink, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import useTheme from "@mui/material/styles/useTheme";
import MatxDivider from "app/components/MatxDivider";

import useAuth from "app/hooks/useAuth";
import { useState } from "react";

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
  phone: "",
  remember: true
};

// form field validation schema
const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .optional(),
});

export default function OtpLogin({setOtpForm}) {
  const navigate = useNavigate();

  const {generateLoginOtp } = useAuth();

  const handleFormSubmit = async (values) => {
    try {
      const {success} = await generateLoginOtp(values.phone_number);
      if(success){
        setOtpForm(values.phone_number)
      }
    //   navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
        
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
            {/* Phone Number Field */}
            <TextField
                fullWidth
                size="small"
                type="tel"
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                placeholder="Enter your phone number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.phone && errors.phone}
                error={Boolean(errors.phone && touched.phone)}
            />
            <LoadingButton
                type="submit"
                color="primary"
                loading={isSubmitting}
                variant="contained"
                sx={{ my: 2 }}>
                Send OTP
            </LoadingButton>
            <MatxDivider sx={{ px: 4, mb: 4 }} text="Or" />
            </form>
        )}
    </Formik>

  );
}
