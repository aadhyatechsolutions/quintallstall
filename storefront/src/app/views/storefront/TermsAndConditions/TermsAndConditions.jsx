import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Link,
  Grid,
  Collapse,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ArrowUpward as ArrowUpwardIcon
} from '@mui/icons-material';

const termsData = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: 'By accessing or using our website, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, you may not access or use the website.',
    children: [
      {
        id: 'usage',
        title: '1.1 Usage',
        content: 'You must be at least 18 years old to use our website or services. By using the website, you represent that you are at least 18 years old.',
      },
      {
        id: 'restrictions',
        title: '1.2 Restrictions',
        content: 'You may not use the site for any unlawful purposes or engage in any illegal activities including but not limited to:',
        children: [
          {
            id: 'prohibited-actions',
            title: '1.2.1 Prohibited Actions',
            content: 'Activities such as data scraping, using bots, automated tools, or any activity that may disrupt or interfere with the proper working of the website are strictly prohibited.',
          },
          {
            id: 'content-restrictions',
            title: '1.2.2 Content Restrictions',
            content: 'You may not post or transmit any content that is abusive, obscene, defamatory, or otherwise objectionable.',
          },
        ],
      },
    ],
  },
  {
    id: 'modifications',
    title: '2. Modifications to Terms',
    content: 'We reserve the right to modify these terms at any time. All changes will be effective immediately upon posting to the website.',
    children: [
      {
        id: 'notification',
        title: '2.1 Notification',
        content: 'For material changes to these terms, we may notify you via email or through a notice on our website homepage.',
      },
      {
        id: 'continued-use',
        title: '2.2 Continued Use',
        content: 'Your continued use of the website following the posting of changes constitutes your acceptance of such changes.',
      },
    ],
  },
  {
    id: 'account',
    title: '3. Account Registration',
    content: 'To access certain features of the website, you may be required to register for an account.',
    children: [
      {
        id: 'account-accuracy',
        title: '3.1 Account Information',
        content: 'You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate.',
      },
      {
        id: 'account-security',
        title: '3.2 Account Security',
        content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: '4. Intellectual Property',
    content: 'All content on this website, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by copyright and other intellectual property laws.',
  },
  {
    id: 'limitation-liability',
    title: '5. Limitation of Liability',
    content: 'To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the website.',
  },
];

const TableOfContents = ({ sections, activeSection, setActiveSection }) => {
  const renderTocItems = (items, level = 0) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <ListItem disablePadding sx={{ pl: level * 2 }}>
          <ListItemButton
            selected={activeSection === item.id}
            onClick={() => setActiveSection(item.id)}
            sx={{
              pl: 2 + level * 2,
              py: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                borderLeft: '3px solid',
                borderColor: 'primary.main',
              },
            }}
          >
            <ListItemText
              primary={item.title.split(' ')[0] + ' ' + item.title.split(' ').slice(1).join(' ')}
              primaryTypographyProps={{
                fontSize: level === 0 ? '0.95rem' : '0.85rem',
                fontWeight: level === 0 ? 600 : 400,
              }}
            />
          </ListItemButton>
        </ListItem>
        {item.children && (
          <Collapse in={activeSection.startsWith(item.id.split('.')[0])} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderTocItems(item.children, level + 1)}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Paper elevation={0} sx={{ p: 2, position: 'sticky', top: 20 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Table of Contents
      </Typography>
      <List dense sx={{ py: 0 }}>
        {renderTocItems(sections)}
      </List>
    </Paper>
  );
};

const TermSection = ({ section, level = 0 }) => {
  const [expanded, setExpanded] = useState(level === 0);
  const theme = useTheme();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getFontSize = () => {
    switch (level) {
      case 0: return '1.25rem';
      case 1: return '1.1rem';
      case 2: return '1rem';
      default: return '0.95rem';
    }
  };

  return (
    <Box
      id={section.id}
      sx={{
        pl: level > 0 ? 3 : 0,
        mb: level === 0 ? 4 : 3,
        borderLeft: level > 0 ? `2px solid ${theme.palette.divider}` : 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          cursor: level > 0 ? 'pointer' : 'default',
        }}
        onClick={level > 0 ? handleExpandClick : undefined}
      >
        {level > 0 && (
          <IconButton
            size="small"
            sx={{ mr: 1, mt: 0.5 }}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded ? <ExpandLessIcon fontSize="inherit" /> : <ExpandMoreIcon fontSize="inherit" />}
          </IconButton>
        )}
        <Typography
          sx={{
            fontWeight: level === 0 ? 700 : 600,
            fontSize: getFontSize(),
            color: level === 0 ? theme.palette.primary.main : 'text.primary',
            flexGrow: 1,
          }}
        >
          {section.title}
        </Typography>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: '0.95rem', mb: 2, mt: level > 0 ? 0.5 : 1 }}
        >
          {section.content}
        </Typography>

        {section.children && section.children.map((child) => (
          <TermSection key={child.id} section={child} level={level + 1} />
        ))}
      </Collapse>
    </Box>
  );
};

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState('acceptance');
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{xs:12, md:3}}>
            <TableOfContents 
              sections={termsData} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </Grid>
          <Grid size={{xs:12 ,md:9}}>
            <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, backgroundColor: '#fff' }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'error.main', mb: 3 }}
              >
                Terms and Conditions
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4, fontSize: '1.05rem' }}
              >
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Welcome to our website. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to comply with and be bound by these terms. Please read them carefully.
              </Typography>

              <Divider sx={{ mb: 4 }} />

              {termsData.map((section) => (
                <TermSection key={section.id} section={section} />
              ))}

              <Box sx={{ mt: 6, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  If you have any questions about these Terms and Conditions, please contact us at:
                </Typography>
                <Link href="mailto:legal@example.com" color="primary">
                  legal@example.com
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ position: 'fixed', bottom: 32, right: 32 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={scrollToTop}
            startIcon={<ArrowUpwardIcon />}
            sx={{
              borderRadius: '50%',
              minWidth: 0,
              width: 56,
              height: 56,
              boxShadow: 3,
            }}
            aria-label="scroll to top"
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;