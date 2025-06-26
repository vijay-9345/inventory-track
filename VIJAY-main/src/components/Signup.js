import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !gmail || !username || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.username === username)) {
      alert('Username already exists');
      return;
    }
    users.push({ name, gmail, username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Gmail"
          value={gmail}
          onChange={e => setGmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
          <span
            onClick={() => setShowPassword(v => !v)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <div style={{ position: 'relative' }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
          <span
            onClick={() => setShowConfirmPassword(v => !v)}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              userSelect: 'none'
            }}
            title={showConfirmPassword ? "Hide Password" : "Show Password"}
          >
            {showConfirmPassword ? '🙈' : '👁️'}
          </span>
        </div>
        <button type="submit">Create Account</button>
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default Signup;
