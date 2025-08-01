import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const loginContainerStyle: React.CSSProperties = {
  width: '100vw',
  height: '100vh',
  backgroundImage: 'url("https://4kwallpapers.com/images/walls/thumbs_3t/23236.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const formStyle: React.CSSProperties = {
  padding: '30px',
  borderRadius: '12px',
  background: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  minWidth: '300px',
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
};

const inputStyle: React.CSSProperties = {
  marginBottom: '15px',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: '#000',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#0070f3',
  color: 'white',
  cursor: 'pointer',
};

const errorStyle: React.CSSProperties = {
  color: '#ffcccc',
  marginBottom: '10px',
  fontSize: '14px',
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <div style={loginContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        {error && <div style={errorStyle}>{error}</div>}
        <input
          style={inputStyle}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button style={buttonStyle} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
