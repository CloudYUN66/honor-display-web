import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation({ awards, currentAwardId, onAwardSelect }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        {awards.map(award => (
          <button
            key={award.id}
            className={`nav-item ${award.id === currentAwardId ? 'active' : ''}`}
            onClick={() => onAwardSelect(award.id)}
          >
            {award.name}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navigation; 