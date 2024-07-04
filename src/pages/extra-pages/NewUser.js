import MainCard from 'components/MainCard';
import { TextField, Button, Grid, Paper, Typography, Snackbar, SnackbarContent } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NewUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('success');

  const Token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/addUser`, userData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Token}`
        }
      });

      if (response.data) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setSnackbarMessage('User added successfully.');
        setSnackbarColor('success');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setSnackbarMessage(error.response.data.msg);
      setSnackbarColor('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainCard>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '50vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              Add New User
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button sx={{ marginTop: 2 }} type="submit" variant="contained" color="primary" fullWidth>
                Add User
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SnackbarContent sx={{ backgroundColor: snackbarColor === 'success' ? '#557C55' : '#FA7070' }} message={snackbarMessage} />
      </Snackbar>
    </MainCard>
  );
};

export default NewUser;
