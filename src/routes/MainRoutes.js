import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import NewUser from 'pages/extra-pages/NewUser';
import ManageMiningHardware from 'pages/extra-pages/ManageMiningHardware';
import Analysis from 'pages/extra-pages/Analysis';
import ProtectedRoute from './ProtectedRoute';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <ProtectedRoute element={<DashboardDefault />} />
    },
    {
      path: 'color',
      element: <ProtectedRoute element={<Color />} />
    },
    {
      path: 'dashboard',
      element: <ProtectedRoute element={<DashboardDefault />} />
    },
    {
      path: 'manage-mining-hardware',
      element: <ProtectedRoute element={<ManageMiningHardware />} />
    },
    {
      path: 'add-new-user',
      element: <ProtectedRoute element={<NewUser />} />
    },
    {
      path: 'analysis',
      element: <ProtectedRoute element={<Analysis />} />
    },
    {
      path: 'updates',
      element: <ProtectedRoute element={<SamplePage />} />
    },
    {
      path: 'guided-tours',
      element: <ProtectedRoute element={<SamplePage />} />
    },
    {
      path: 'shadow',
      element: <ProtectedRoute element={<Shadow />} />
    },
    {
      path: 'typography',
      element: <ProtectedRoute element={<Typography />} />
    },
    {
      path: 'icons/ant',
      element: <ProtectedRoute element={<AntIcons />} />
    }
  ]
};

export default MainRoutes;
