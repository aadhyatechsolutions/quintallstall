import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  useTheme
} from '@mui/material';

const returnPolicyData = [
  {
    title: '1. Order Cancellation Policy',
    children: [
      {
        title: '1.1 Before Dispatch',
        content:
          'Customers can cancel an order any time before it is dispatched. Once dispatched or picked up for delivery, cancellation is not allowed. However, you may reject it at the doorstep.',
      },
      {
        title: '1.2 Cancellation Fee',
        content:
          'If the order is ready and loaded in the delivery vehicle, a cancellation fee may be applied. This fee varies and is determined by the order’s status and readiness.',
      },
      {
        title: '1.3 Seller Cancellations',
        content:
          'In the event of cancellation by the seller due to unforeseen circumstances, a full refund will be initiated for prepaid orders.',
      },
      {
        title: '1.4 Company Rights',
        content:
          'Quintal Stall reserves the right to accept or decline any cancellation requests and may modify the cancellation policy, including the fee or time window, at its discretion.',
      },
    ],
  },
  {
    title: '2. Returns Policy',
    children: [
      {
        title: '2.1 Seller-Specific Policies',
        content:
          'Returns are governed by the respective seller’s policy. Not all categories or items have the same return/replacement options. Refer to the product page for specific conditions.',
      },
      {
        title: '2.2 Exceptions',
        content:
          'Some items may not be eligible for return or replacement due to hygiene or other concerns. Please check the specific return policy on the product page.',
      },
    ],
  },
  {
    title: '3. Refunds',
    children: [
      {
        title: '3.1 Refund Process',
        content:
          'Refunds are initiated once the returned product is received and inspected by the seller. This process may take a few business days.',
      },
      {
        title: '3.2 No Replacement Scenario',
        content:
          'If a replacement cannot be arranged for any reason, a full refund will be processed as per policy.',
      },
      {
        title: '3.3 Damaged or Incorrect Products',
        content:
          'If a damaged or incorrect item is received, a refund will be initiated immediately, especially for COD orders. Post delivery acceptance, no return request will be entertained.',
      },
    ],
  },
];

const renderPolicy = (sections, level = 0) => {
  const theme = useTheme();

  const getFontSize = () => {
    switch (level) {
      case 0: return '1.2rem';
      case 1: return '1.05rem';
      case 2: return '0.95rem';
      default: return '0.9rem';
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

const ReturnPolicy = () => {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: '#fafafa' }}>
      <Container maxWidth="md">
        <Paper elevation={4} sx={{ p: { xs: 3, sm: 5 }, backgroundColor: '#fff' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'error.main' }}
          >
            Order Cancellation and Return Policy
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Please review our cancellation, return, and refund policy before placing an order.
          </Typography>

          {renderPolicy(returnPolicyData)}

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

export default ReturnPolicy;
