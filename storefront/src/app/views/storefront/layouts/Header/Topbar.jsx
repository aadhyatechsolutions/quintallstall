import React from "react";
import { 
  Box, 
  Typography, 
  IconButton, 
  Stack, 
  useMediaQuery,
  Tooltip,
  Skeleton
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  Email,
} from "@mui/icons-material";

const staticContactInfo = {
  email: "info@quintalstall.com",
  socialMedia: {
    facebook: "https://www.facebook.com/yourpage",
    twitter: "https://www.twitter.com/yourhandle",
    instagram: "https://www.instagram.com/yourprofile",
    pinterest: "https://www.pinterest.com/yourboard"
  }
};

const Topbar = ({ contactInfo = staticContactInfo, loading = false }) => {
  const shouldCenterIcons = useMediaQuery('(max-width:649px)');
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleSocialClick = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailClick = (email) => {
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  if (loading) {
    return (
      <Box sx={{
        display: "flex",
        justifyContent: shouldCenterIcons ? "center" : "space-between",
        alignItems: "center",
        bgcolor: "#2b4a04",
        px: 2,
        py: 1,
      }}>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          {!isSmallScreen && <Skeleton width={150} height={24} />}
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: shouldCenterIcons ? "center" : "space-between",
        alignItems: "center",
        bgcolor: "#2b4a04",
        color: "white",
        px: 2,
        py: 1,
        width: '100%'
      }}
    >
      {shouldCenterIcons ? (
        /* CENTERED LAYOUT (for screens < 650px) */
        <Stack 
          direction="row" 
          spacing={1} 
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          {/* Social Icons */}
          <Tooltip title="Facebook">
            <IconButton color="inherit" size="small"
              onClick={() => handleSocialClick(contactInfo.socialMedia?.facebook)}>
              <Facebook fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Twitter">
            <IconButton color="inherit" size="small"
              onClick={() => handleSocialClick(contactInfo.socialMedia?.twitter)}>
              <Twitter fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Instagram">
            <IconButton color="inherit" size="small"
              onClick={() => handleSocialClick(contactInfo.socialMedia?.instagram)}>
              <Instagram fontSize="small" />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Pinterest">
            <IconButton color="inherit" size="small"
              onClick={() => handleSocialClick(contactInfo.socialMedia?.pinterest)}>
              <Pinterest fontSize="small" />
            </IconButton>
          </Tooltip>

          {/* Email */}
          <Tooltip title="Email us">
            <Stack direction="row" spacing={0.5} alignItems="center" onClick={() => handleEmailClick(contactInfo.email)}
              sx={{ cursor: 'pointer' }}>
              <Email fontSize="small" />
              {!isSmallScreen && contactInfo.email && (
                <Typography variant="body2">
                  {contactInfo.email.split('@')[0]}
                </Typography>
              )}
            </Stack>
          </Tooltip>
        </Stack>
      ) : (
        /* DEFAULT LAYOUT (for screens ≥ 650px) */
        <>
          {/* Left-aligned social icons */}
          <Stack direction="row" spacing={1}>
            <Tooltip title="Facebook">
                <IconButton color="inherit" 
                    onClick={() => handleSocialClick(contactInfo.socialMedia?.facebook)}
                >
                    <Facebook />
                </IconButton>
            </Tooltip>
            
            <Tooltip title="Twitter">
              <IconButton 
                color="inherit" 
                onClick={() => handleSocialClick(contactInfo.socialMedia?.twitter)}
              >
                <Twitter />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Instagram">
              <IconButton 
                color="inherit" 
                onClick={() => handleSocialClick(contactInfo.socialMedia?.instagram)}
              >
                <Instagram />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Pinterest">
              <IconButton 
                color="inherit" 
                onClick={() => handleSocialClick(contactInfo.socialMedia?.pinterest)}
              >
                <Pinterest />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* Right-aligned email */}
          <Tooltip title="Email us">
            <Stack 
              direction="row" 
              spacing={1} 
              alignItems="center"
              onClick={() => handleEmailClick(contactInfo.email)}
              sx={{ cursor: 'pointer' }}
            >
              <Email />
              <Typography variant="body2">
                {contactInfo.email}
              </Typography>
            </Stack>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default Topbar;