import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Email from './Email';
import Password from './Password';
import TwoFactorAuth from './TwoFactorAuth';
import BrowserSession from './BrowserSession';
import DeleteAccount from './DeleteAccount';

// Create a Material UI theme
const theme = createTheme();

export default () => (
    <>
    <Email />
    <Password/>
    <TwoFactorAuth/>
    <BrowserSession />
    <DeleteAccount/>
    </>
);

