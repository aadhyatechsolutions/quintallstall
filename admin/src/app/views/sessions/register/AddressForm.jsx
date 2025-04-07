import React, {useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axiosInstance from "../../../../utils/axiosInstance";

const AddressForm = ({formData, setFormData, setStep }) => {
  const [apmcs, setApmcs] = useState([]);
  const [loadingApmcs, setLoadingApmcs] = useState(true);

  const validationSchema = Yup.object().shape({
    apmc: Yup.string(),
    street: Yup.string().required("Address is required!"),
    city: Yup.string().required("City is required!"),
    state: Yup.string().required("State is required!"),
    postalCode: Yup.string()
      .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
      .required("Zip code is required!"),
    shopNumber: Yup.string()
      .matches(/^[0-9]{5}$/, "Shop number must be 5 digits")
      .required("Shop number is required!"),
  });

  const handleSubmit = async (values) => {
    if(values.role === 'delivery'){
      setStep('vehicle')
    }else{
      setStep('account')
    }
    setFormData(values);
  };
  useEffect(() => {
    const fetchApmcs = async () => {
      try {
        const { data } = await axiosInstance.get("/apmc");
        setApmcs(data);
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
            onChange={handleChange}
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
            onChange={handleChange}
            helperText={touched.state && errors.state}
            error={Boolean(errors.state && touched.state)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="postalCode"
            label="Zip Code"
            variant="outlined"
            onBlur={handleBlur}
            value={values.postalCode}
            onChange={handleChange}
            helperText={touched.postalCode && errors.postalCode}
            error={Boolean(errors.postalCode && touched.postalCode)}
            sx={{ mb: 3 }}
          />

          {/* Add shopNumber field */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="shopNumber"
            label="Shop Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.shopNumber}
            onChange={handleChange}
            helperText={touched.shopNumber && errors.shopNumber}
            error={Boolean(errors.shopNumber && touched.shopNumber)}
            sx={{ mb: 3 }}
          />

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
                Next
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AddressForm;
