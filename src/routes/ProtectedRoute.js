import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader';

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/protected`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, [token]);

  if (isAuthenticated === null) {
    return <Loader />;
  }

  if (isAuthenticated === true) {
    if (pathname == '/login' || pathname == '/register') {
      return <Navigate to="/" replace />;
    }
    return element;
  } else if (isAuthenticated === false && (pathname === '/login' || pathname === '/register')) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired
};
