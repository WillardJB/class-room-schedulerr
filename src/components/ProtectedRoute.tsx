import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSession } from '../supabaseClient';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const session = getSession();  // Get session from localStorage

      if (!session || session.user.email !== 'admin@admin.com') {
        // If no session or not admin, redirect to login
        navigate('/login');
      }
      
      setLoading(false); // Session is valid, just stop loading
    };

    checkSession();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
