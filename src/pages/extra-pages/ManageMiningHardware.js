import MainCard from 'components/MainCard';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Snackbar,
  SnackbarContent
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
// ==============================|| SAMPLE PAGE ||============================== //

const ManageMiningHardware = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [hashRate, setHashRate] = useState(null);
  const [active, setActive] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('success');

  const Token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      location,
      hashRate,
      active
    };
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER}/miner`,
        {
          name: name,
          location: location,
          hashRate: hashRate,
          active: active
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`
          }
        }
      );

      console.log('Mining hardware added:', response.data);
      if (response.data) {
        setActive();
        setHashRate(0);
        setLocation('');
        setName('');
        setSnackbarMessage('Mining hardware added successfully.');
        setSnackbarColor('success');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding mining hardware:', error);
      setSnackbarMessage('Error adding mining hardware.');
      setSnackbarColor('error');
      setSnackbarOpen(true);
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainCard>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '70vh' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
              New Mining Hardware
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                required
                label="Hash Rate"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={hashRate}
                onChange={(e) => setHashRate(e.target.value)}
                sx={{
                  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                    '-webkit-appearance': 'none',
                    margin: 0
                  },
                  '& input[type="number"]': {
                    '-moz-appearance': 'textfield'
                  }
                }}
              />
              <FormControl sx={{ marginTop: 2 }} fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select labelId="active" id="active" value={active} label="active" onChange={(e) => setActive(e.target.value)}>
                  <MenuItem value={true}>Approved</MenuItem>
                  <MenuItem value={false}>Rejected</MenuItem>
                </Select>
              </FormControl>

              <Button sx={{ marginTop: 2 }} type="submit" variant="contained" color="primary" fullWidth>
                Add Mining Hardware
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

export default ManageMiningHardware;
