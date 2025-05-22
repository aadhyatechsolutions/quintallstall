import { Formik } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { TextField, Box, Button, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "app/hooks/useAuth";

const BankDetailsForm = ({ formData, setFormData, initialValues, setStep, profileImage}) => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    bankAccountNumber: Yup.string()
      .matches(/^\d{0,18}$/, "Bank account number must be 9-18 digits")
      .required("Bank account number is required!"),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{0,6}$/, "Invalid IFSC Code format")
      .required("IFSC Code is required!"),
    accountType: Yup.string()
      .required("Account type is required!"),
    branchName: Yup.string()
      .required("Branch name is required!")
  });

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

  const handleSubmit = async (values, {resetForm}) => {
    setFormData(values)
    const snakeCaseData = convertObjectKeysToSnakeCase(values);
    try {
      const response = await register(snakeCaseData, profileImage); 
      if(response.success){
        resetForm()
        setFormData(initialValues);
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
const handleBackButton = ()=>{
  if(formData.role === 'delivery'){
    setStep('vehicle')
  }else{
    setStep('address')
  }
  
}
  return (
    <Formik
      initialValues={formData}
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
            name="bankAccountNumber"
            label="Bank Account Number"
            variant="outlined"
            onBlur={handleBlur}
            value={values.bankAccountNumber}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              maxLength: 18 // You can set a max depending on the bank, or allow up to 18
            }}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,18}$/.test(value)) {
                handleChange(e);
              }
            }}
            helperText={touched.bankAccountNumber && errors.bankAccountNumber}
            error={Boolean(errors.bankAccountNumber && touched.bankAccountNumber)}
            sx={{ mb: 3 }}
          />

         

          <TextField
            fullWidth
            size="small"
            type="text"
            name="ifscCode"
            label="IFSC Code"
            variant="outlined"
            onBlur={handleBlur}
            value={values.ifscCode}
            onChange={(e) => {
              const value = e.target.value.toUpperCase();
              if (/^[A-Z]{0,4}$/.test(value) || /^[A-Z]{4}0[A-Z0-9]{0,6}$/.test(value)) {
                handleChange({ target: { name: "ifscCode", value } });
              }
            }}
            inputProps={{
              maxLength: 11,
              inputMode: 'text',
              pattern: '^[A-Z]{4}0[A-Z0-9]{6}$'
            }}
            helperText={touched.ifscCode && errors.ifscCode}
            error={Boolean(errors.ifscCode && touched.ifscCode)}
            sx={{ mb: 3 }}
            placeholder="e.g. SBIN0001234"
          />

          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              name="accountType"
              label="Account Type"
              value={values.accountType}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.accountType && touched.accountType)}
            >
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="current">Current</MenuItem>
              <MenuItem value="salary">Salary</MenuItem>
              <MenuItem value="fixed_deposit">Fixed Deposit</MenuItem>
              <MenuItem value="recurring_deposit">Recurring Deposit</MenuItem>
            </Select>
            {touched.accountType && errors.accountType && (
              <Box sx={{ color: 'error.main', fontSize: '0.75rem', mt: 1 }}>
                {errors.accountType}
              </Box>
            )}
          </FormControl>

          <TextField
            fullWidth
            size="small"
            type="text"
            name="branchName"
            label="Branch Name"
            variant="outlined"
            onBlur={handleBlur}
            value={values.branchName}
            onChange={handleChange}
            helperText={touched.branchName && errors.branchName}
            error={Boolean(errors.branchName && touched.branchName)}
            sx={{ mb: 3 }}
          />

          <Grid container spacing={2} justifyContent="space-between">
            {/* Back Button */}
            <Grid item xs={1}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleBackButton}
              >
                Back
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={4}>
              <LoadingButton
                type="submit"
                color="primary"
                variant="contained"
                loading={isSubmitting}
                fullWidth
              >
                Register
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default BankDetailsForm;