import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";
import EmailLogin from "./EmailLogin";
import OtpLogin from "./OtpLogin";
import OtpVerificationForm from "../login/OtpVerificationForm";

// STYLED COMPONENTS
const ContentBox = styled("div")(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)"
}));

const StyledRoot = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center"
  },
  "& .otp": {
    maxWidth: 800,
    minWidth:250,
    minHeight: 200,
    margin: "1rem",
    display: "flex",
    justifyContent:"center",
    borderRadius: 12,
    alignItems: "center"
  }
}));

export default function JwtLogin() {
  const [otpForm, setOtpForm] = useState();

  return (
    <StyledRoot>
        {otpForm ? (
          <Card size={12} className="otp">
            <OtpVerificationForm otpForm={otpForm}/>
          </Card>
        ) : (
          <Card className="card">
          <Grid container>
            <Grid size={12}>
              <ContentBox>
                <OtpLogin setOtpForm={setOtpForm} />
                <EmailLogin />
              </ContentBox>
            </Grid>
          </Grid>
          </Card>  )}
    </StyledRoot>
  );
}