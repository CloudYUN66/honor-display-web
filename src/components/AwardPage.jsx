import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WinnerModal from './WinnerModal';
import './AwardPage.css';

function AwardPage({ awards }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedWinner, setSelectedWinner] = useState(null);
  const currentAward = awards.find(award => award.id === parseInt(id));

  useEffect(() => {
    const timer = setInterval(() => {
      const nextId = (parseInt(id) % awards.length) + 1;
      navigate(`/award/${nextId}`);
    }, 7000);

    return () => clearInterval(timer);
  }, [id, awards, navigate]);

  return (
    <div className="award-page">
      <h1>{currentAward?.name}</h1>
      <div className="winners-grid">
        {/* 这里将来需要替换为实际的获奖者数据 */}
        {Array(currentAward?.winners).fill(null).map((_, index) => (
          <div 
            key={index}
            className="winner-card"
            onClick={() => setSelectedWinner({
              name: `获奖者 ${index + 1}`,
              department: '示例部门',
              position: '职位',
              reason: '获奖理由'
            })}
          >
            <img src={`/placeholder-avatar.jpg`} alt="获奖者头像" />
          </div>
        ))}
      </div>
      
      {selectedWinner && (
        <WinnerModal 
          winner={selectedWinner} 
          onClose={() => setSelectedWinner(null)} 
        />
      )}
    </div>
  );
}

export default AwardPage; 