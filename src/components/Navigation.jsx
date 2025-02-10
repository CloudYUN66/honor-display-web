import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

function Navigation({ awards, currentAwardId, onAwardSelect }) {
  const navRef = useRef(null);

  // 处理导航栏滚动
  useEffect(() => {
    if (navRef.current) {
      const activeButton = navRef.current.querySelector('.nav-item.active');
      if (activeButton) {
        const container = navRef.current;
        const scrollLeft = activeButton.offsetLeft - (container.offsetWidth / 2) + (activeButton.offsetWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentAwardId]);

  return (
    <nav className="navigation">
      <div className="nav-outer-container">
        <div className="nav-container" ref={navRef}>
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
      </div>
    </nav>
  );
}

export default Navigation; 