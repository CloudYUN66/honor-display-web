import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const awards = [
  { id: 'pxdy', name: '披星戴月奖', count: 62 },
  { id: 'cxjy', name: '创新进步奖', count: 45 },
  // 添加其他奖项...
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">2025年度荣誉展示</h1>
      <div className="awards-grid">
        {awards.map((award) => (
          <div
            key={award.id}
            className="award-card"
            onClick={() => navigate(`/award/${award.id}`)}
          >
            <h2>{award.name}</h2>
            <p>获奖人数：{award.count}人</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage; 