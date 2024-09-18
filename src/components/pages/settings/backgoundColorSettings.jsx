import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

const BackgroundColorSettings = () => {
  const gradients = ['linear-gradient(to right, #ff7e5f, #feb47b)', 'linear-gradient(to right, #43cea2, #185a9d)', 'linear-gradient(to right, #ff9966, #ff5e62)'];
  const [selectedGradient, setSelectedGradient] = useState(localStorage.getItem('backgroundColor') || gradients[0]);

  useEffect(() => {
    document.body.style.background = selectedGradient; 
    localStorage.setItem('backgroundColor', selectedGradient);
  }, [selectedGradient]);

  const handleGradientClick = (gradient) => {
    setSelectedGradient(gradient);
  };

  return (
    <Box sx={{ minHeight: '100vh', padding: '20px' }}>
      <Card style={{ maxWidth: 400, margin: '20px auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Select Background Color
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            {gradients.map((gradient, index) => (
              <div 
                key={index} 
                onClick={() => handleGradientClick(gradient)} 
                style={{ height: '50px', background: gradient, cursor: 'pointer' }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BackgroundColorSettings;
