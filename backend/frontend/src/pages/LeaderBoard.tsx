import React from 'react';

const containerStyle: React.CSSProperties = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  maxWidth: '600px',
  margin: '0 auto',
};

const headerStyle: React.CSSProperties = {
  fontSize: '28px',
  marginBottom: '20px',
  textAlign: 'center',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

const thStyle: React.CSSProperties = {
  borderBottom: '2px solid #ddd',
  padding: '12px 15px',
  textAlign: 'left',
  backgroundColor: '#0070f3',
  color: 'white',
};

const tdStyle: React.CSSProperties = {
  borderBottom: '1px solid #ddd',
  padding: '12px 15px',
};

const rows = [
  { rank: 1, name: 'Alice', score: 980 },
  { rank: 2, name: 'Bob', score: 870 },
  { rank: 3, name: 'Charlie', score: 850 },
  { rank: 4, name: 'David', score: 830 },
  { rank: 5, name: 'Eva', score: 800 },
];

const Leaderboard: React.FC = () => {
  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Leaderboard</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ rank, name, score }) => (
            <tr key={rank}>
              <td style={tdStyle}>{rank}</td>
              <td style={tdStyle}>{name}</td>
              <td style={tdStyle}>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
