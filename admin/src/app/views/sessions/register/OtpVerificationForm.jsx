import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "app/hooks/useAuth";

const OtpVerificationForm = ({ phoneNumber, setStep }) => {
  const { verifyOtp } = useAuth(); // Assuming you have a verifyOtp function in useAuth to validate OTP

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required!"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await verifyOtp(phoneNumber, values.otp);
      if(response.success){
        setStep('address');
      }

    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
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
          <TextField
            fullWidth
            size="small"
            type="text"
            name="otp"
            label="Enter OTP"
            variant="outlined"
            onBlur={handleBlur}
            value={values.otp}
            onChange={handleChange}
            helperText={touched.otp && errors.otp}
            error={Boolean(errors.otp && touched.otp)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={4}>
            {/* Back Button */}
            <Grid item xs={4}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={()=>setStep('contact')}
              >
                Back
              </Button>
            </Grid>

            {/* Verify OTP Button */}
            <Grid item xs={8}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
                fullWidth
              >
                Verify OTP
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default OtpVerificationForm;
