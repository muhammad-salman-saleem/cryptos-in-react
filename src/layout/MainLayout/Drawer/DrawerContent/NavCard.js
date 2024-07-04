// material-ui
import { Button, Stack, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// project import
import MainCard from 'components/MainCard';

// assets
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const keyPoints = [
  {
    id: 1,
    title: 'Checkout pro features'
  },
  {
    id: 2,
    title: 'Multi-level permissions'
  },
  {
    id: 3,
    title: 'Timeline'
  },
  {
    id: 4,
    title: 'Data analysis'
  }
];

const NavCard = () => (
  <MainCard sx={{ bgcolor: '#f5f6fb', m: 3 }}>
    <Stack alignItems="center" spacing={2.5}>
      <Stack alignItems="center">
        <Typography variant="h5">Upgrade to Pro</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            margin: '20px 0'
          }}
        >
          {keyPoints.map((item) => {
            return (
              <Box
                sx={{
                  display: 'flex',
                  gap: '7px',
                  width: '100%'
                }}
                key={item.id}
              >
                <CheckCircleIcon sx={{ color: '#01c265', fontSize: '1.2rem' }} />
                <Typography variant="h6" color="secondary">
                  {item.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Stack>
      <AnimateButton>
        <Button
          variant="contained"
          sx={{
            m: 0,
            backgroundColor: '#0086ff',
            padding: '5px 15px'
          }}
          size="small"
        >
          Upgrade Now
        </Button>
      </AnimateButton>
    </Stack>
  </MainCard>
);

export default NavCard;
