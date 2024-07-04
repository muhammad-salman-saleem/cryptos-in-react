import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import ProtectedRoute from './ProtectedRoute';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
import NotFound from './NotFound';
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <ProtectedRoute element={<AuthLogin />} />
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: 'register',
      element: <ProtectedRoute element={<AuthRegister />} />
    }
  ]
};

export default LoginRoutes;
