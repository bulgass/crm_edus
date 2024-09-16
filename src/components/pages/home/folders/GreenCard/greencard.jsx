import React, { useState, lazy, Suspense } from 'react';
import { Box, Button, Tab, Tabs, Typography, TextField, Modal, Stack } from '@mui/material';
import { collection, addDoc, doc } from 'firebase/firestore';
import { db } from '../../../../../firebase';

const InProgressTab = lazy(() => import('./InProgressTab'));
const DoneTab = lazy(() => import('./DoneTab'));

const GreenCardPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    city: '',
    serviceType: '',
    phoneNumber: '',
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const b1DocRef = doc(db, 'clients', 'GreenCard'); 
      const inProgressCollectionRef = collection(b1DocRef, 'InProgress'); // Collection within GreenCard document
      await addDoc(inProgressCollectionRef, formData);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    handleClose();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        GreenCard
      </Typography>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab label="In Progress" />
        <Tab label="Done" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {activeTab === 0 && (
          <Suspense fallback={<div>Loading In Progress...</div>}>
            <InProgressTab onMoveToDone={() => setActiveTab(1)} />
          </Suspense>
        )}
        {activeTab === 1 && (
          <Suspense fallback={<div>Loading Done...</div>}>
            <DoneTab />
          </Suspense>
        )}
      </Box>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        New Client
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            New Client
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Service Type"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

export default GreenCardPage;
