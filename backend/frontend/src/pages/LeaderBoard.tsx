import React, { useEffect, useState } from 'react';

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

const Leaderboard: React.FC = () => {
  const [rows, setRows] = useState<
    { rank: number; name: string; score: number }[]
  >([]);

  useEffect(() => {
    fetch('https://assignment-1-0q0c.onrender.com/api/leaderboard')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.leaders
          .sort((a: any, b: any) => b.amount - a.amount)
          .map((item: any, index: number) => ({
            rank: index + 1,
            name: item.name,
            score: item.amount,
          }));
        setRows(sorted);
      })
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Leaderboard</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ rank, name, score }) => (
            <tr key={rank}>
              <td style={tdStyle}>{rank}</td>
              <td style={tdStyle}>{name}</td>
              <td style={tdStyle}>₹{score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
