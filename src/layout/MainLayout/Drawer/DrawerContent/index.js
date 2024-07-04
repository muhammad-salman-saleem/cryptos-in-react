// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';
import { Box, AvatarGroup, Avatar, Typography } from '@mui/material';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column'
      }
    }}
  >
    <Navigation />
    <Box
      sx={{
        m: 3
      }}
    >
      <Box sx={{ mb: 1.5 }}>
        <Typography variant="h5" color="textSecondary">
          Friends Online
        </Typography>
      </Box>
      <AvatarGroup
        total={54}
        sx={{
          justifyContent: 'left',
          '& > .MuiAvatar-root': {
            width: '34px',
            height: '34px',
            fontSize: '12px'
          }
        }}
      >
        <Avatar alt="Remy Sharp" src={avatar1} />
        <Avatar alt="Travis Howard" src={avatar2} />
        <Avatar alt="Agnes Walker" src={avatar3} />
        <Avatar alt="Trevor Henderson" src={avatar4} />
      </AvatarGroup>
    </Box>
    <NavCard />
  </SimpleBar>
);

export default DrawerContent;
