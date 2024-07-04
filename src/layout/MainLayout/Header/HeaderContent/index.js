// material-ui
import { Box, IconButton, useMediaQuery } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {!matchesXs && <Search />}
      {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

      <IconButton disableRipple color="secondary" sx={{ color: 'text.primary', bgcolor: 'transparent' }}>
        <Notification />
      </IconButton>
      <IconButton disableRipple color="secondary" sx={{ color: 'text.primary', bgcolor: 'transparent' }}>
        <SettingsIcon sx={{ color: 'gray' }} />
      </IconButton>
      {!matchesXs && <Profile />}
      {matchesXs && <MobileSection />}
    </>
  );
};

export default HeaderContent;
