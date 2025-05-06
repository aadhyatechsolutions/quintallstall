import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  LinkedIn,
  Apple,
  Android,
  Payment 
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const footerColumns = [
    {
      title: 'Quick Links',
      items: ['Home', 'Shop', 'About Us', 'Blog', 'Contact Us']
    },
    {
      title: 'Help Center',
      items: ['Your Order', 'Your Account', 'Terms & Conditions', 'Return Policy', 'Privacy Policy']
    },
    {
      title: 'Products',
      items: ['Vegetables', 'Exotic Vegetables', 'Fruits', 'Exotic Fruits', 'Flowers']
    },
    {
      title: 'Contact Us',
      isContact: true
    }
  ];

  const customPaths = {
    'Home': '/',
    'About Us': '/about',
    'Shop': '/shop',
    'Blog': '/blog',
    'Contact Us': '/contact',
    'Products': '/products',
    'Terms & Conditions': '/termsandconditions',
    'Return Policy': '/returnpolicy',
  };

  const enabledLinks = Object.keys(customPaths);

  const isLinkEnabled = (item) => enabledLinks.includes(item);

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f8f9fa',
        py: 6,
        px: 2,
        borderTop: '1px solid #e0e0e0'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          flexWrap: 'wrap',
          gap: 4,
          mb: 4
        }}>
          {footerColumns.map((column, index) => (
            <Box key={index} sx={{
              flex: isMobile ? '1 1 100%' : '1 1 0',
              minWidth: isMobile ? '100%' : '200px'
            }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {column.title}
              </Typography>
              
              {column.isContact ? (
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Hotline: <strong>+91 37778980105</strong>
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Email: <strong>info@quintalstall.com</strong>
                  </Typography>
                  
                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Download Our App
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="error" size="small">
                      <Android fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <Apple fontSize="small" />
                    </IconButton>
                  </Box>

                  <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                    Follow Us
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, idx) => (
                      <IconButton key={idx} color="error" size="small">
                        <Icon fontSize="small" />
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              ) : (
                <Box>
                  {column.items.map((item) => {
                    const enabled = isLinkEnabled(item);
                    const path = customPaths[item] || '#';

                    return enabled ? (
                      <NavLink
                        key={item}
                        to={path}
                        style={({ isActive }) => ({
                          textDecoration: 'none',
                          display: 'block',
                          marginBottom: '8px',
                          color: isActive ? '#d32f2f' : 'gray',
                          fontWeight: isActive ? 'bold' : 'normal',
                        })}
                      >
                        {item}
                      </NavLink>
                    ) : (
                      <Typography
                        key={item}
                        sx={{
                          color: 'lightgray',
                          display: 'block',
                          marginBottom: '8px',
                          cursor: 'not-allowed'
                        }}
                      >
                        {item}
                      </Typography>
                    );
                  })}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 Quintal Stall. All rights reserved.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: isMobile ? 2 : 0 
          }}>
            <Payment sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              PayPal | VISA | Mastercard
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
