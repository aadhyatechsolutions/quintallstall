import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  useTheme
} from '@mui/material';

const privacyPolicyData = [
  {
    title: '1. Information We Collect',
    children: [
      { title: '1.1 Personal Information', content: 'We collect personal information like your name, phone number, email address, shipping address, and payment details when you register or place an order.' },
      { title: '1.2 Device & Log Info', content: 'We automatically collect device information such as IP address, browser type, and visited URLs to analyze usage.' },
      { title: '1.3 Behavioral Data', content: 'We gather data like purchase history, preferences, and interactions with our Platform to improve your experience.' },
    ]
  },
  {
    title: '2. How We Use Your Information',
    children: [
      { title: '2.1 To Fulfill Orders', content: 'Your information is used to process and deliver your orders.' },
      { title: '2.2 Communication', content: 'We send updates, promotional offers, and service-related announcements.' },
      { title: '2.3 Improve Services', content: 'We use aggregated data to analyze and improve our services, user experience, and platform performance.' },
    ]
  },
  {
    title: '3. Cookies & Tracking',
    children: [
      { title: '3.1 Cookies', content: 'We use cookies to remember preferences and deliver personalized content.' },
      { title: '3.2 Third-party Tools', content: 'Services like Google Analytics may be used to track traffic patterns. You can opt out via their settings.' }
    ]
  },
  {
    title: '4. Sharing Your Information',
    children: [
      { title: '4.1 With Partners & Sellers', content: 'We may share relevant information with sellers or delivery partners for order processing.' },
      { title: '4.2 Legal Compliance', content: 'Your information may be shared with law enforcement or regulatory bodies as required by law.' },
      { title: '4.3 Business Transfers', content: 'In case of a merger or acquisition, your data may be transferred as part of that transaction.' }
    ]
  },
  {
    title: '5. Your Choices',
    children: [
      { title: '5.1 Communication Preferences', content: 'You can opt out of marketing emails at any time via your account settings.' },
      { title: '5.2 Access & Deletion', content: 'You may request access to, or deletion of, your personal data by contacting our support team.' }
    ]
  },
  {
    title: '6. Data Security',
    children: [
      { title: '6.1 Secure Systems', content: 'We implement industry-standard security measures to safeguard your information.' },
      { title: '6.2 User Responsibility', content: 'You are responsible for keeping your account credentials safe.' }
    ]
  }
];

const renderPolicy = (sections, level = 0) => {
  const theme = useTheme();

  const getFontSize = () => {
    switch (level) {
      case 0: return '1.2rem';
      case 1: return '1.05rem';
      default: return '0.95rem';
    }
  };

  return sections.map((section, idx) => (
    <Box
      key={section.title + idx}
      sx={{
        pl: level * 3,
        pb: 3,
        borderLeft: level > 0 ? `2px solid ${theme.palette.divider}` : 'none',
        ml: level > 0 ? 2 : 0,
      }}
    >
      <Typography
        sx={{
          fontWeight: level === 0 ? 700 : 600,
          fontSize: getFontSize(),
          color: level === 0 ? theme.palette.primary.main : 'text.primary',
          mb: 1,
        }}
      >
        {section.title}
      </Typography>

      {section.content && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: '0.95rem', mb: 1.5 }}
        >
          {section.content}
        </Typography>
      )}

      {section.children && renderPolicy(section.children, level + 1)}
    </Box>
  ));
};

const PrivacyPolicy = () => {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: '#fafafa' }}>
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, backgroundColor: '#fff' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Privacy Policy
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Please read this Privacy Policy carefully to understand how we handle your information. By using our services, you agree to the practices described herein.
          </Typography>

          {renderPolicy(privacyPolicyData)}

          <Divider sx={{ mt: 4 }} />

          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 2, textAlign: 'right', color: 'text.disabled' }}
          >
            Last Updated: 16-08-2024
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
