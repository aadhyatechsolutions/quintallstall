//ContactForm.js
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Button,
  Alert,
} from "@mui/material";
import { ArrowRightAlt, Person, Email, Subject } from "@mui/icons-material";
import { useSubmitContactForm } from "../../../../hooks/contactHooks";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const { mutate, isLoading, isSuccess, isError, error } =
    useSubmitContactForm();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  useEffect(() => {
    if (isSuccess) {
      setForm({ name: "", email: "", subject: "", message: "" });
    }

    if (isSuccess || isError) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, isError]);

  return (
    <Paper elevation={2} sx={{ p: { xs: 4, md: 5 }, borderRadius: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Send Us a Message
      </Typography>
      <Divider sx={{ width: 64, height: 4, bgcolor: "#b6131a", mb: 4 }} />

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              name="name"
              label="Your Name"
              fullWidth
              variant="outlined"
              value={form.name}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#b6131a" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              name="email"
              label="Email Address"
              fullWidth
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#b6131a" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              name="subject"
              label="Subject"
              fullWidth
              variant="outlined"
              value={form.subject}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Subject sx={{ color: "#b6131a" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              name="message"
              label="Your Message"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={form.message}
              onChange={handleChange}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              endIcon={<ArrowRightAlt />}
              sx={{
                borderRadius: 3,
                px: 6,
                py: 1.5,
                textTransform: "none",
                fontWeight: 600,
                background: "#b6131a",
              }}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </Grid>

          {isSuccess && showAlert && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="success">Message sent successfully!</Alert>
            </Grid>
          )}

          {isError && showAlert && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">
                {error?.response?.data?.message || "Something went wrong."}
              </Alert>
            </Grid>
          )}
        </Grid>
      </form>
    </Paper>
  );
};

export default ContactForm;
