import { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import styled from "@mui/material/styles/styled";

import ContactDetailsForm from "./ContactDetailsForm";
import OtpVerificationForm from "./OtpVerificationForm";
import AddressForm from "./AddressForm";
import VehicleDetailsForm from "./VehicleDetailsForm";
import BankDetailsForm from "./BankDetailsForm";

const RegisterRoot = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#1A2038",
  minHeight: "100vh !important",
  "& .card": { maxWidth: 750, margin: 16, borderRadius: 12 }
});

const initialValues = {
  firstName: "",
  lastName: "",
  businessName: "",
  phoneNumber: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  street: "",
  city: "",
  state: "",
  postalCode: "",
  shopNumber: "",
  bankAccountNumber: "",
  routingNumber: "",
  ifscCode:'',
  accountType:'',
  branchName:'',
  role:'wholeseller',
  remember: true,
};

export default function JwtRegister() {
  // const { generateOtp, step } = useAuth();
  const [step, setStep ] = useState('contact');
  const [formData, setFormData] = useState(initialValues);
  const [profileImage, setProfileImage] = useState('');

    const renderForm = () => {
      if (step === 'contact') {
        return (<ContactDetailsForm formData={formData} setFormData={setFormData} setStep={setStep} setProfileImage={setProfileImage}/>);
      } else if (step === 'otp') {
        return (<OtpVerificationForm phoneNumber={formData.phoneNumber} setStep={setStep}/>);
      } else if (step === 'address') {
        return <AddressForm formData={formData} setFormData={setFormData} setStep={setStep}/>;
      } else if (step === 'vehicle') {
        return <VehicleDetailsForm formData={formData} setFormData={setFormData} setStep={setStep}/>;
      }else if(step === 'account'){
        return <BankDetailsForm formData={formData} setFormData={setFormData} initialValues={initialValues} setStep={setStep} profileImage={profileImage}/>;
      }
    };
  
    return (
      <RegisterRoot>
        <Card className="card">
          <Grid container>
            <Grid size={12}>
              <Box p={4} height="100%">
                {renderForm()}
              </Box>
            </Grid>
          </Grid>
        </Card>
      </RegisterRoot>
    );
}
