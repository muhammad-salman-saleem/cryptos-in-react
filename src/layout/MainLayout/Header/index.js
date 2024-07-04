import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, AppBar, IconButton, Toolbar, useMediaQuery, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import _ from 'lodash';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';

// assets
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

function formatTime(date) {
  const hours = _.padStart(date.getHours().toString(), 2, '0');
  const minutes = _.padStart(date.getMinutes().toString(), 2, '0');
  const seconds = _.padStart(date.getSeconds().toString(), 2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function formatCurrentDate() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentDate = new Date();
  const day = days[currentDate.getDay()];
  const date = currentDate.getDate();
  const month = months[currentDate.getMonth()];

  return `${day}, ${date} ${month}`;
}

const Header = ({ open, handleDrawerToggle }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentFormattedDate, setCurrentFormattedDate] = useState(formatCurrentDate());

  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentFormattedDate(formatCurrentDate());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // common header
  const mainHeader = (
    <Toolbar>
      {matchDownMD && (
        <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          color="secondary"
          sx={{ color: 'text.primary', bgcolor: open ? iconBackColorOpen : iconBackColor, ml: { xs: 0, lg: -2 } }}
        >
          {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
      )}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '7px'
        }}
      >
        <AccessTimeIcon />
        <Typography
          variant="h6"
          sx={{
            width: '65px'
          }}
        >
          {formatTime(currentTime)}
        </Typography>
        <CalendarMonthIcon />
        <Typography
          variant="h6"
          sx={{
            width: 'max-content'
          }}
        >
          {currentFormattedDate}
        </Typography>
      </Box>
      <HeaderContent />
    </Toolbar>
  );

  // app-bar params
  const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`
      // boxShadow: theme.customShadows.z1
    }
  };

  return (
    <>
      {!matchDownMD ? (
        <AppBarStyled open={open} {...appBar}>
          {mainHeader}
        </AppBarStyled>
      ) : (
        <AppBar {...appBar}>{mainHeader}</AppBar>
      )}
    </>
  );
};

Header.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default Header;
