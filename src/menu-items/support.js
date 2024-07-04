// assets
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'updates',
      title: 'Updates',
      type: 'item',
      url: '/updates',
      icon: RocketLaunchIcon
    },
    {
      id: 'guided-tours',
      title: 'Guided tours',
      type: 'item',
      url: '/guided-tours',
      icon: HelpOutlineIcon
    }
  ]
};

export default support;
