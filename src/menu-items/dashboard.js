// assets
import { DashboardOutlined } from '@ant-design/icons';
import ArticleIcon from '@mui/icons-material/Article';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PaymentsIcon from '@mui/icons-material/Payments';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'manage-mining-hardware',
      title: 'Manage mining hardware',
      type: 'item',
      url: '/manage-mining-hardware',
      icon: ArticleIcon,
      breadcrumbs: true
    },
    {
      id: 'add-new-user',
      title: 'Add new user',
      type: 'item',
      url: '/add-new-user',
      icon: CurrencyBitcoinIcon,
      breadcrumbs: true
    },
    {
      id: 'analysis',
      title: 'Analysis',
      type: 'item',
      url: '/analysis',
      icon: PaymentsIcon,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
