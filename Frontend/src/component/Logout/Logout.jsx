import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Redirect to login page after logout
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
