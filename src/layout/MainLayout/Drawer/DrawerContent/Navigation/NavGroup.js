import PropTypes from 'prop-types';

// material-ui
import { List, Typography, Divider } from '@mui/material';

// project import
import NavItem from './NavItem';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse
          </Typography>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        // subheader={
        //   item.title &&
        //   drawerOpen && (
        //     <Box sx={{ pl: 3, mb: 1.5 }}>
        //       <Typography variant="subtitle2" color="textSecondary">
        //         {item.title}
        //       </Typography>
        //     </Box>
        //   )
        // }
        sx={{ py: 0, zIndex: 0 }}
      >
        {navCollapse}
      </List>
      <Divider
        sx={{
          borderWidth: '1px',
          m: '10px 20px'
        }}
      />
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
