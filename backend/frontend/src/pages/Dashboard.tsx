import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const Dashboard: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [internData, setInternData] = useState({
    name: '',
    referral_code: '',
    donations_raised: 0,
  });

  const [leaderboard, setLeaderboard] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [activeUsers, setActiveUsers] = useState(100);
  const [data, setData] = useState([
    { name: 'Mon', users: 120 },
    { name: 'Tue', users: 98 },
    { name: 'Wed', users: 130 },
    { name: 'Thu', users: 110 },
    { name: 'Fri', users: 150 },
    { name: 'Sat', users: 170 },
    { name: 'Sun', users: 140 },
  ]);

  const [activityFeed, setActivityFeed] = useState([
    { message: 'Shantanu uploaded a report', time: '2 min ago' },
    { message: 'Riya completed her task', time: '10 min ago' },
    { message: '3 new messages from HR', time: '30 min ago' },
    { message: 'Intern meeting scheduled', time: '1 hour ago' },
    { message: 'Mihir submitted final project', time: '2 hours ago' },
  ]);

  useEffect(() => {
    fetch('https://intern-backend.onrender.com/api/intern')
      .then(res => res.json())
      .then(data => setInternData(data))
      .catch(err => console.error('Error fetching intern data:', err));

    fetch('https://intern-backend.onrender.com/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.leaders);
        const newActivities = data.leaders.map((leader: { name: any; amount: any; }) => ({
          message: `${leader.name} raised ₹${leader.amount}`,
          time: 'Just now'
        }));
        setActivityFeed(prev => [...newActivities, ...prev]);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newUsers = Math.floor(Math.random() * 50 + 100);
      setActiveUsers(newUsers);
      setData((prev) => [
        ...prev.slice(1),
        { name: new Date().toLocaleTimeString(), users: newUsers },
      ]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const isDark = darkMode;

  const pageStyle: React.CSSProperties = {
    backgroundColor: isDark ? '#121212' : '#f0f0f0',
    color: isDark ? '#ffffff' : '#000000',
    minHeight: '100vh',
    width: '100vw',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box'
  };

  const splitStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const leftPanel: React.CSSProperties = {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const rightPanel: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const cardStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: isDark ? '#1e1e1e' : 'white',
    color: isDark ? '#ffffff' : '#000000',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    boxSizing: 'border-box'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px 15px',
    fontSize: '14px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: isDark ? '#ffffff' : '#222',
    color: isDark ? '#000000' : '#ffffff',
    cursor: 'pointer',
    marginLeft: '10px',
  };

  const progressBarContainer: React.CSSProperties = {
    height: '20px',
    width: '100%',
    backgroundColor: isDark ? '#333' : '#ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '10px',
  };

  const progressBar: React.CSSProperties = {
    height: '100%',
    width: '75%',
    backgroundColor: '#00c851',
  };

  const activityListStyle: React.CSSProperties = {
    maxHeight: '200px',
    overflowY: 'auto',
    marginTop: '10px',
  };

  const activityItemStyle: React.CSSProperties = {
    borderBottom: '1px solid #ccc',
    padding: '8px 0',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50px',
    right: '20px',
    backgroundColor: isDark ? '#1e1e1e' : '#fff',
    color: isDark ? '#fff' : '#000',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    zIndex: 10,
    minWidth: '200px',
    padding: '10px',
  };

  return (
    <div style={pageStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <div>
          <h1>Welcome, {internData.name || 'Intern'}</h1>
          <p>Referral Code: <strong>{internData.referral_code}</strong></p>
          <p>Total Donations Raised: ₹{internData.donations_raised}</p>
        </div>
        <div>
          <button style={buttonStyle} onClick={() => setDarkMode(!darkMode)}>
            Toggle {isDark ? 'Light' : 'Dark'} Mode
          </button>
          <button style={buttonStyle} onClick={() => setShowDropdown(!showDropdown)}>
            Leaderboard ▼
          </button>
          {showDropdown && (
            <div style={dropdownStyle}>
              <h4>Leaderboard</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Name</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry: any, index) => (
                    <tr key={index}>
                      <td>{entry.name}</td>
                      <td>₹{entry.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div style={splitStyle}>
        <div style={leftPanel}>
          <div style={cardStyle}>
            <h3>Active Users (Live)</h3>
            <p style={{ fontSize: '32px', margin: 0 }}>{activeUsers}</p>
          </div>

          <div style={cardStyle}>
            <h3>User Activity Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="name" stroke={isDark ? '#ccc' : '#000'} />
                <YAxis stroke={isDark ? '#ccc' : '#000'} />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="users" stroke="#0070f3" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={rightPanel}>
          <div style={cardStyle}>
            <h3>Your Progress</h3>
            <p>Tasks Completed: 15 / 20</p>
            <div style={progressBarContainer}>
              <div style={progressBar}></div>
            </div>
            <p style={{ marginTop: '10px', fontSize: '14px' }}>75% completed</p>
          </div>

          <div style={cardStyle}>
            <h3>Recent Activity</h3>
            <div style={activityListStyle}>
              {activityFeed.map((activity, index) => (
                <div key={index} style={activityItemStyle}>
                  <span>{activity.message}</span>
                  <span style={{ fontSize: '12px', opacity: 0.6 }}>{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
