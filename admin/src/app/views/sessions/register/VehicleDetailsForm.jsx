import {
  TextField,
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Formik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import useVehicleTypeStore from "../../../../store/vehicleType/vehicleTypeStore";

const VehicleDetailsForm = ({ formData, setFormData, setStep }) => {
  const { vehicleTypes, fetchVehicleTypes } = useVehicleTypeStore();

  useEffect(() => {
    fetchVehicleTypes();
  }, [fetchVehicleTypes]);

  const validationSchema = Yup.object().shape({
    vehicleTypeId: Yup.string().required("Vehicle type is required!"),
    vehicleNo: Yup.string().required("Vehicle number is required!"),
    permitNumber: Yup.string().required("Permit number is required!"),
    permitExpiryDate: Yup.string().required("Permit expiry date is required!"),
    insuranceNumber: Yup.string().required("Insurance number is required!"),
    insuranceExpiryDate: Yup.string().required("Insurance expiry date is required!"),
  });

  const handleSubmit = async (values) => {
    setFormData(values);
    setStep("account");
  };

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
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
          {/* Vehicle Type Dropdown */}
          <FormControl
            fullWidth
            size="small"
            error={Boolean(errors.vehicleType && touched.vehicleType)}
            sx={{ mb: 3 }}
          >
            <InputLabel id="vehicleType-label">Vehicle Type</InputLabel>
            <Select
              labelId="vehicleType-label"
              id="vehicleTypeId"
              name="vehicleTypeId"
              value={values.vehicleTypeId}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Vehicle Type"
            >
              {vehicleTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.type}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {touched.vehicleTypeId  && errors.vehicleTypeId }
            </FormHelperText>
          </FormControl>

          {/* Other fields */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="vehicleNo"
            label="Vehicle Number"
            variant="outlined"
            placeholder="e.g. GJ01WD1583"
            onBlur={handleBlur}
            value={values.vehicleNo}
            onChange={handleChange}
            inputProps={{
              maxLength: 10,
              pattern: '[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}',
              style: { textTransform: 'uppercase' },
            }}
            helperText={touched.vehicleNo && errors.vehicleNo}
            error={Boolean(errors.vehicleNo && touched.vehicleNo)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            size="small"
            type="text"
            name="permitNumber"
            placeholder="e.g. MH/TRANS/2021/12345"
            label="Permit Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.permitNumber}
            onChange={handleChange}
            inputProps={{
              maxLength: 20,
              pattern: '^[A-Z]{2}[-/]?[A-Z]*[-/]?\\d{4}[-/]?\\d{1,6}$',
              style: { textTransform: 'uppercase' },
            }}
            helperText={touched.permitNumber && errors.permitNumber}
            error={Boolean(errors.permitNumber && touched.permitNumber)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="permitExpiryDate"
            label="Permit Expiry Date"
            variant="outlined"
            onBlur={handleBlur}
            value={values.permitExpiryDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            helperText={touched.permitExpiryDate && errors.permitExpiryDate}
            error={Boolean(errors.permitExpiryDate && touched.permitExpiryDate)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="text"
            name="insuranceNumber"
            label="Insurance Number"
            placeholder="e.g. OG-19-1234-5678-00000000"
            variant="outlined"
            onBlur={handleBlur}
            value={values.insuranceNumber}
            onChange={handleChange}
            inputProps={{
              maxLength: 20,
              pattern: '^[A-Za-z0-9/-]{8,20}$',
              style: { textTransform: 'uppercase' },
            }}
            helperText={touched.insuranceNumber && errors.insuranceNumber}
            error={Boolean(errors.insuranceNumber && touched.insuranceNumber)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            size="small"
            type="date"
            name="insuranceExpiryDate"
            label="Insurance Expiry Date"
            variant="outlined"
            onBlur={handleBlur}
            value={values.insuranceExpiryDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            helperText={touched.insuranceExpiryDate && errors.insuranceExpiryDate}
            error={Boolean(errors.insuranceExpiryDate && touched.insuranceExpiryDate)}
            sx={{ mb: 3 }}
          />
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => setStep("address")}
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

export default VehicleDetailsForm;
