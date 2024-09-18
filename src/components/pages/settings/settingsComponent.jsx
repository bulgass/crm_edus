import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { IconButton, Typography, Card, CardContent } from '@mui/material';
import { FormatColorFill, Palette } from '@mui/icons-material'; 
import { Box } from '@mui/system';

const SettingsComponent = () => {
  const navigate = useNavigate();

  const handleBackgroundChangeClick = () => {
    navigate('background-color'); 
  };

  const handleIconChangeClick = () => {
    navigate('icon-color'); 
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: '20px' }}>
      <Card style={{ maxWidth: 400, margin: '20px auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            <IconButton onClick={handleBackgroundChangeClick}>
              <FormatColorFill sx={{ fontSize: 40 }} />
            </IconButton>

            <IconButton onClick={handleIconChangeClick}>
              <Palette sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </CardContent>
      </Card>
      <Outlet />
    </Box>
  );
};

export default SettingsComponent;
