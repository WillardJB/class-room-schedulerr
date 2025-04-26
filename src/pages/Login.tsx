import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../auth'; // Import the signIn function
import './Login.css'; // Import the Login CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);  // Add loading state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);  // Start loading when user submits

    try {
      const user = await signIn(email, password);
      if (user) {
        // On successful login, redirect to the dashboard
        navigate('/admin/dashboard');
      } else {
        setErrorMessage('User not found.');
      }
    } catch (error: unknown) {
      // Handle error as 'unknown' and check if it has a message property
      if (error instanceof Error) {
        setErrorMessage(error.message); // Access the error message from Supabase
      } else {
        setErrorMessage('An error occurred during login.');
      }
    } finally {
      setLoading(false);  // Stop loading after request finishes
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
            disabled={loading}  // Disable button during loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
