import React, {useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosInstance from "../../../../utils/axiosInstance";
import useAuth from "app/hooks/useAuth";

const AddressForm = ({formData, setFormData, setStep, profileImage }) => {
  const [apmcs, setApmcs] = useState([]);
  const { register } = useAuth();
  const [loadingApmcs, setLoadingApmcs] = useState(true);

  const validationSchema = Yup.object().shape({
    apmc: Yup.string(),
    street: Yup.string().required("Address is required!"),
    city: Yup.string().required("City is required!"),
    state: Yup.string().required("State is required!"),
    postalCode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pin code must be 6 digits")
      .required("Pin code is required!"),
    shopNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]{0,4}$/, "Shop number must be 5 digits")
  });

  const handleSubmit = async (values, {resetForm}) => {
    setFormData(values);
    if(values.role === 'delivery'){
      setStep('vehicle')
    }else if (values.role === 'wholesaler' || values.role === 'retailer'){
      setStep('account')
    }else if(values.role === 'user' || values.role === 'admin'){
      const snakeCaseData = convertObjectKeysToSnakeCase(values);
      try {
        const response = await register(snakeCaseData, profileImage); 
        if(response.success){
          resetForm()
          navigate("/");
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }

    
  };
  const camelToSnake = (str) => {
    return str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
  };
  const convertObjectKeysToSnakeCase = (obj) => {
    const newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = camelToSnake(key);
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  };
  useEffect(() => {
    const fetchApmcs = async () => {
      try {
        const { data } = await axiosInstance.get("/apmcs");
        setApmcs(data.apmcs);
      } catch (error) {
        console.error("Error fetching APMCs:", error);
      } finally {
        setLoadingApmcs(false);
      }
    };

    fetchApmcs();
  }, []); 
    

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
           {(values.role === "wholeseller" || values.role === "retailer") && (
           <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel>Select APMC</InputLabel>
            <Select
              label="APMC"
              name="apmc"
              value={values.apmc}
              onBlur={handleBlur}
              onChange={handleChange}
              error={Boolean(errors.apmc && touched.apmc)}
              disabled={loadingApmcs}
            >
             {loadingApmcs ? (
                  <MenuItem value="">Loading...</MenuItem>
                ) : (
                  apmcs.map((apmc) => (
                    <MenuItem key={apmc.id} value={apmc.id}>
                      {apmc.name}
                    </MenuItem>
                  ))
                )}
            </Select>
            {touched.apmc && errors.apmc && (
              <Box sx={{ color: 'red', fontSize: '0.75rem' }}>
                {errors.apmc}
              </Box>
            )}
          </FormControl>
          )}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="street"
            label="Address"
            variant="outlined"
            onBlur={handleBlur}
            value={values.street}
            onChange={handleChange}
            helperText={touched.street && errors.street}
            error={Boolean(errors.street && touched.street)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="city"
            label="City"
            variant="outlined"
            onBlur={handleBlur}
            value={values.city}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(value)) {
                handleChange(e);
              }
            }}
            helperText={touched.city && errors.city}
            error={Boolean(errors.city && touched.city)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="state"
            label="State"
            variant="outlined"
            onBlur={handleBlur}
            value={values.state}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[a-zA-Z\s]*$/.test(value)) {
                handleChange(e);
              }
            }}
            helperText={touched.state && errors.state}
            error={Boolean(errors.state && touched.state)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="postalCode"
            label="Pin Code"
            variant="outlined"
            onBlur={handleBlur}
            value={values.postalCode}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 6
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,6}$/.test(value)) {
                handleChange(e);
              }
            }}
            helperText={touched.postalCode && errors.postalCode}
            error={Boolean(errors.postalCode && touched.postalCode)}
            sx={{ mb: 3 }}
          />

          {/* Add shopNumber field */}
          {values.role !== "user" && (
            <TextField
              fullWidth
              size="small"
              type="text"
              name="shopNumber"
              label="Shop Number"
              variant="outlined"
              onBlur={handleBlur}
              value={values.shopNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[a-zA-Z0-9]{0,4}$/.test(value)) {
                  handleChange(e);
                }
              }} 
              inputProps={{
                maxLength: 4
              }}
              helperText={touched.shopNumber && errors.shopNumber}
              error={Boolean(errors.shopNumber && touched.shopNumber)}
              sx={{ mb: 3 }}
            />
          )}

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => setStep('contact')}
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={4}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
                fullWidth
              >
                {values.role === "user" || values.role === "admin" ? "Register" : "Next"}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
