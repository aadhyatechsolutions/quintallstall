import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Box, Button, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const VehicleDetailsForm = ({ formData, setFormData, setStep }) => {
  const validationSchema = Yup.object().shape({
    vehicleType: Yup.string().required("Vehicle type is required!"),
    vehicleNo: Yup.string().required("Vehicle number is required!"),
    permitNumber: Yup.string().required("Permit number is required!"),
    insuranceNumber: Yup.string().required("Insurance number is required!"),
  });


  const handleSubmit = async (values) => {
    setStep('account');
    setFormData(values);
  };

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
          {/* Vehicle Type */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="vehicleType"
            label="Vehicle Type"
            variant="outlined"
            onBlur={handleBlur}
            value={values.vehicleType}
            onChange={handleChange}
            helperText={touched.vehicleType && errors.vehicleType}
            error={Boolean(errors.vehicleType && touched.vehicleType)}
            sx={{ mb: 3 }}
          />

          {/* Vehicle Number */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="vehicleNo"
            label="Vehicle Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.vehicleNo}
            onChange={handleChange}
            helperText={touched.vehicleNo && errors.vehicleNo}
            error={Boolean(errors.vehicleNo && touched.vehicleNo)}
            sx={{ mb: 3 }}
          />

          {/* Permit Number */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="permitNumber"
            label="Permit Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.permitNumber}
            onChange={handleChange}
            helperText={touched.permitNumber && errors.permitNumber}
            error={Boolean(errors.permitNumber && touched.permitNumber)}
            sx={{ mb: 3 }}
          />

          {/* Insurance Number */}
          <TextField
            fullWidth
            size="small"
            type="text"
            name="insuranceNumber"
            label="Insurance Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.insuranceNumber}
            onChange={handleChange}
            helperText={touched.insuranceNumber && errors.insuranceNumber}
            error={Boolean(errors.insuranceNumber && touched.insuranceNumber)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={() => setStep('address')}
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
