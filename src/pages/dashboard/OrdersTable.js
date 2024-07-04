import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// mock data ui
import mining_hardware_data from '../../utils/mining_hardware_data.json';

// material-ui
import {
  Box,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Grid,
  FormHelperText
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';

// project import
import Dot from 'components/@extended/Dot';
// package import
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { jwtDecode } from 'jwt-decode';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '5px',
  boxShadow: 24,
  '@media (max-width: 600px)': {
    width: '90%'
  }
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'location',
    align: 'left',
    disablePadding: true,
    label: 'Location'
  },
  {
    id: 'hashRate',
    align: 'left',
    disablePadding: false,
    label: 'HashRate'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,

    label: 'Actions'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ pl: headCell.label === 'Actions' ? '76px' : undefined }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'success';
      title = 'Approved';
      break;
    case 1:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable({ currentTab }) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [hashRate, setHashRate] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMinerId, setSelectedMinerId] = useState(null);
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const [decodedToken, setDecodedToken] = useState(null);
  const Token = useSelector((state) => state.auth.token);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const tabData = {
    0: tableData,
    1: mining_hardware_data.filter((row) => row.location === 'Mining Facility A'),
    2: mining_hardware_data.filter((row) => row.location === 'Mining Facility B'),
    3: mining_hardware_data.filter((row) => row.location === 'Mining Facility C')
  };
  const tabRows = tabData[currentTab] || [];
  const fetchAllMiningData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER}/miner`);
      setTableData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      console.log('Data fetch Successful');
    }
  };
  useEffect(() => {
    fetchAllMiningData();
  }, [currentTab]);
  const deleteMiner = (id) => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_SERVER}/miner/${id}`,
      headers: {
        Authorization: `Bearer ${Token}`
      }
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const filteredTableData = tableData.filter((item) => item.id !== id);
        const newTableData = [...filteredTableData];
        setTableData(newTableData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getMiner = (id) => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_SERVER}/miner/${id}`,
      headers: {
        Authorization: `Bearer ${Token}`
      }
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setName(data.name);
        setLocation(data.location);
        setHashRate(data.hashRate);
        setStatus(data.active);
        setSelectedMinerId(data.id);
      })
      .catch((error) => {
        setErrors(true);
        setErrorMessage(error.response.data.msg);
      });
  };
  const handleUpdateMiner = (event, id) => {
    event.preventDefault();
    if (!selectedMinerId) {
      return;
    }
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_SERVER}/miner/${id}`,
      headers: {
        Authorization: `Bearer ${Token}`
      },
      data: {
        name,
        location,
        hashRate,
        active: status
      }
    };

    axios
      .request(config)
      .then((response) => {
        const data = response.data.data;
        const indexToUpdate = tableData.findIndex((item) => item.id === data.id);

        if (indexToUpdate !== -1) {
          const updatedTableData = [...tableData];
          updatedTableData[indexToUpdate] = data;
          setTableData(updatedTableData);
          setOpen(false);
        } else {
          console.error('Element not found in the array');
        }
        setOpen(false);
      })
      .catch((error) => {
        setErrors(true);
        setErrorMessage(error.response.data.msg);
      });
  };
  // useEffect(() => {
  //   const decodeToken = () => {
  //     try {
  //       const token = Token;
  //       const decoded = jwtDecode(token);
  //       setDecodedToken(decoded);
  //     } catch (error) {
  //       console.error('Error decoding JWT token:', error.message);
  //       setDecodedToken(null);
  //     }
  //   };

  //   decodeToken();
  // }, [Token, currentTab]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
  };
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(tabRows, getComparator(order, orderBy)).map((data) => {
              const isItemSelected = isSelected(data.id);

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={data.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={data.id} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {data.name}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{data.location}</TableCell>
                  <TableCell align="left">{data.hashRate}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={data.active ? 0 : 1} />
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      display: 'flex',
                      gap: 2
                      // pt: decodedToken.id !== data.userId ? '36px' : undefined
                    }}
                  >
                    {/* {decodedToken.id === data.userId && ( */}
                    <>
                      <Button
                        onClick={() => {
                          getMiner(data.id);
                          handleOpen();
                        }}
                        variant="contained"
                        startIcon={<EditIcon />}
                        color="primary"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteMiner(data.id)}
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        sx={{
                          backgroundColor: '#e53935',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#b71c1c'
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </>
                    {/* )} */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={{ ...style, width: 400 }}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <CancelIcon sx={{ position: 'absolute', top: '15px', right: '20px', color: '#1890ff' }} onClick={handleClose} />
            <Typography variant="h5" align="center" gutterBottom>
              Update Mining Hardware
            </Typography>
            <form onSubmit={(e) => handleUpdateMiner(e, selectedMinerId)}>
              <TextField label="Name" variant="outlined" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
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
                <Select labelId="status" id="Status" value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value={true}>Approved</MenuItem>
                  <MenuItem value={false}>Rejected</MenuItem>
                </Select>
              </FormControl>
              {errors && (
                <Grid item xs={12}>
                  <FormHelperText error>{errorMessage}</FormHelperText>
                </Grid>
              )}

              <Button sx={{ marginTop: 2 }} type="submit" variant="contained" color="primary" fullWidth>
                Update Miner
              </Button>
            </form>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
}
OrderTable.propTypes = {
  currentTab: PropTypes.number.isRequired
};
