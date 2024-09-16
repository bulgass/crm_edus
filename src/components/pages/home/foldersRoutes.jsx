import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography, Stack } from '@mui/material';
import { db } from '../../../firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const B1Page = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    city: '',
    serviceType: ''
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Добавляем данные клиента в Firestore
      const docRef = await addDoc(collection(db, 'clients/B1'), formData);
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
    handleClose();
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        B1 Service
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Создать клиента
      </Button>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Создать клиента
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Отчество"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Город"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              <TextField
                fullWidth
                label="Тип услуги"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Сохранить
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

export default B1Page;
