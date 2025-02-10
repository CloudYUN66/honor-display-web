import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WinnerModal from '../components/WinnerModal';
import '../styles/AwardPage.css';

function AwardPage({ awards }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedWinner, setSelectedWinner] = useState(null);
  const currentAward = awards.find(award => award.id === parseInt(id));

  // 模拟获奖者数据
  const generateWinnerData = (index, awardName, isTeam) => ({
    name: isTeam ? `优秀团队 ${index + 1}` : `获奖者 ${index + 1}`,
    department: isTeam ? '研发中心' : `部门 ${index + 1}`,
    position: isTeam ? '研发团队' : `职位 ${index + 1}`,
    awardName: awardName,
    reason: isTeam 
      ? '该团队在项目开发中展现出色的协作能力，成功完成多个重要项目的交付。'
      : '在工作中表现突出，展现出优秀的专业能力和奉献精神。',
    avatar: `/images/placeholder-avatar.jpg`
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const nextId = (parseInt(id) % awards.length) + 1;
      navigate(`/award/${nextId}`);
    }, 7000);

    return () => clearInterval(timer);
  }, [id, awards, navigate]);

  if (!currentAward) {
    return <div className="error-message">未找到该奖项</div>;
  }

  return (
    <div className="award-page">
      <h1 className="award-title">{currentAward.name}</h1>
      <p className="award-description">{currentAward.description}</p>
      
      <div className="winners-grid">
        {Array(currentAward.winners).fill(null).map((_, index) => (
          <div 
            key={index}
            className="winner-card"
            onClick={() => setSelectedWinner(
              generateWinnerData(index, currentAward.name, currentAward.isTeam)
            )}
          >
            <div className="winner-avatar">
              <img src="/images/placeholder-avatar.jpg" alt="获奖者头像" />
            </div>
            <p className="winner-name">
              {currentAward.isTeam ? `优秀团队 ${index + 1}` : `获奖者 ${index + 1}`}
            </p>
          </div>
        ))}
      </div>
      
      {selectedWinner && (
        <WinnerModal 
          winner={selectedWinner} 
          onClose={() => setSelectedWinner(null)} 
        />
      )}

      <div className="navigation-buttons">
        <button 
          onClick={() => navigate('/')}
          className="nav-button home"
        >
          返回首页
        </button>
      </div>
    </div>
  );
}

export default AwardPage; 