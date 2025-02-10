import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

function HomePage({ awards }) {
  return (
    <div className="home-page">
      <h1 className="main-title">2025年度荣誉风云榜</h1>
      <div className="awards-grid">
        {awards.map(award => (
          <Link 
            to={`/award/${award.id}`} 
            key={award.id} 
            className="award-card"
          >
            <h2>{award.name}</h2>
            <p>获奖{award.isTeam ? '团队' : '人员'}：{award.winners}</p>
            <p className="description">{award.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage; 