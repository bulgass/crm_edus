import React from 'react';
import { Box, Button, TextField, Modal, Typography, Stack } from '@mui/material';

const F1Page = () => {
  return (
    <div>
      <Typography variant='h4' gutterBottom>
        F1
      </Typography>
      <hr style={{border: '1px solid black', margin: '20px 0'}}/>
      <Button variant="contained" color="primary">
        save
      </Button>
    </div>
  );
};

export default F1Page;