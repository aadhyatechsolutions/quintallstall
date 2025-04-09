import React, {useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toast from "app/components/Toast";
import useAuth from "app/hooks/useAuth";
import axiosInstance from "../../../../utils/axiosInstance";

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    businessName: Yup.string(),
    phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required!"),
    email: Yup.string().email("Invalid email address").required("Email is required!"),
    password: Yup.string().min(6, "Password must be at least 6 characters long").required("Password is required!"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required!"),
    role: Yup.string().required("Role is required!"), 
    profileImage: Yup.mixed()
      .test("fileSize", "File too large (max 2MB)", (value) => !value || (value && value.size <= 1024 * 1024 * 2))
      .test("fileType", "Unsupported format (JPEG/PNG only)", (value) => 
        !value || (value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type))),
  });

export default function ContactDetailsForm({ formData, setFormData, setStep, setProfileImage }) {
  const { generateOtp } = useAuth();
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchRoles = async () => {
        try {
          const { data } = await axiosInstance.get("/roles");
          setRoles(data);
        } catch (error) {
          console.error("Error fetching roles:", error);
        } finally {
          setLoadingRoles(false);
        }
      };
  
      fetchRoles();
    }, []); 

  const handleFormSubmit = async (values) => {
    setFormData(values);
    const data = await generateOtp(values.phoneNumber, values.email);
    if(data.status == 'success'){
        setStep('otp');
    }else{
      setError(data.message);
      setOpenToast(true);
    }
  };
  const handleImageChange = (event) => {
    const profileImage = event.target.files[0];
    if (profileImage && profileImage instanceof File) {
      setProfileImage(profileImage);
      setImagePreview(URL.createObjectURL(profileImage));
    }
  }
  const handleBackButton = ()=>{
    navigate('/session/signin');
  }
  const handleToastClose = ()=>{
    setOpenToast(false);
  }

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={formData}
        validationSchema={validationSchema}
      >
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                src={imagePreview || "/assets/images/avatars/blank-profile.png"}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-image-upload"
                type="file"
                onChange={handleImageChange}  // Handle image file change
              />
              <label htmlFor="profile-image-upload">
                <Button variant="contained" component="span">
                  Upload Profile Image
                </Button>
              </label>
              {touched.profileImage && errors.profileImage && (
                <div style={{ color: "red", fontSize: "12px" }}>
                  {errors.profileImage}
                </div>
              )}
            </Box>
              <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Role"
                  error={Boolean(errors.role && touched.role)}
                  disabled={loadingRoles}
                  >
                  {loadingRoles ? (
                    <MenuItem value="">Loading...</MenuItem>
                  ) : (
                    roles.map((role) => (
                      <MenuItem key={role.id} value={role.slug}>
                        {role.name}
                      </MenuItem>
                    ))
                  )}
                  </Select>
                  {touched.role && errors.role && (
                  <div style={{ color: "red", fontSize: "12px" }}>
                      {errors.role}
                  </div>
                  )}
              </FormControl>
            <TextField
              fullWidth
              size="small"
              type="text"
              name="firstName"
              label="First Name"
              variant="outlined"
              onBlur={handleBlur}
              value={values.firstName}
              onChange={handleChange}
              helperText={touched.firstName && errors.firstName}
              error={Boolean(errors.firstName && touched.firstName)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              size="small"
              type="text"
              name="lastName"
              label="Last Name"
              variant="outlined"
              onBlur={handleBlur}
              value={values.lastName}
              onChange={handleChange}
              helperText={touched.lastName && errors.lastName}
              error={Boolean(errors.lastName && touched.lastName)}
              sx={{ mb: 3 }}
            />
          {(values.role === "wholeseller" || values.role === "retailer") && (
              <TextField
                fullWidth
                size="small"
                type="text"
                name="businessName"
                label="Business Name"
                variant="outlined"
                onBlur={handleBlur}
                value={values.businessName}
                onChange={handleChange}
                helperText={touched.businessName && errors.businessName}
                error={Boolean(errors.businessName && touched.businessName)}
                sx={{ mb: 3 }}
              />
            )}

            <TextField
              fullWidth
              size="small"
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              onBlur={handleBlur}
              value={values.phoneNumber}
              onChange={handleChange}
              helperText={touched.phoneNumber && errors.phoneNumber}
              error={Boolean(errors.phoneNumber && touched.phoneNumber)}
              sx={{ mb: 3 }}
            />

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
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              size="small"
              name="passwordConfirmation"
              type="password"
              label="Confirm Password"
              variant="outlined"
              onBlur={handleBlur}
              value={values.passwordConfirmation}
              onChange={handleChange}
              helperText={touched.passwordConfirmation && errors.passwordConfirmation}
              error={Boolean(errors.passwordConfirmation && touched.passwordConfirmation)}
              sx={{ mb: 3 }}
            />

            <Grid container spacing={2} justifyContent="space-between">
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
              <Grid item xs={4}>
                <LoadingButton
                  type="submit"
                  color="primary"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{ mb: 2 }}
                >
                  Next
                </LoadingButton>
              </Grid>
            </Grid>
            
          </form>
        )}
      </Formik>
      <Toast
        open={openToast}
        message={error}
        severity="error"
        onClose={handleToastClose}
      />
    </>
  );
}
