import { useState, useEffect } from 'react';
import Navigation from './Navigation';
import WinnerModal from './WinnerModal';
import '../styles/HomePage.css';

function HomePage({ awards }) {
  const [currentAwardId, setCurrentAwardId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const winnersPerPage = 15; // 修改为每页显示15个获奖者
  const [selectedWinner, setSelectedWinner] = useState(null);
  
  const currentAward = awards.find(award => award.id === currentAwardId);
  
  // 计算当前页的获奖者
  const getCurrentPageWinners = () => {
    if (!currentAward) return [];
    const startIndex = (currentPage - 1) * winnersPerPage;
    return currentAward.winners.slice(startIndex, startIndex + winnersPerPage);
  };

  // 计算总页数
  const totalPages = currentAward ? Math.ceil(currentAward.winners.length / winnersPerPage) : 0;

  // 切换奖项时重置页码
  const handleAwardSelect = (awardId) => {
    setCurrentAwardId(awardId);
    setCurrentPage(1);
  };

  // 自动翻页逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      // 如果当前页是最后一页
      if (currentPage === totalPages) {
        // 如果当前奖项是最后一个奖项，回到第一个奖项
        if (currentAwardId === awards.length) {
          setCurrentAwardId(1);
          setCurrentPage(1);
        } else {
          // 否则切换到下一个奖项
          setCurrentAwardId(prev => prev + 1);
          setCurrentPage(1);
        }
      } else {
        // 如果不是最后一页，切换到下一页
        setCurrentPage(prev => prev + 1);
      }
    }, 7000); // 7秒切换一次

    // 清理定时器
    return () => clearInterval(timer);
  }, [currentPage, totalPages, currentAwardId, awards.length]);

  return (
    <div className="home-page">
      <h1 className="main-title">2025年度荣誉风云榜</h1>
      <Navigation 
        awards={awards} 
        currentAwardId={currentAwardId}
        onAwardSelect={handleAwardSelect}
      />
      {currentAward && (
        <div className="award-section" key={`${currentAwardId}-${currentPage}`}>
          <div className="award-title-container">
            <h2 className="award-title">{currentAward.name}</h2>
          </div>
          <p className="award-description">{currentAward.description}</p>
          <div className="winners-grid">
            {getCurrentPageWinners().map((winner, index) => (
              <div 
                key={winner.id} 
                className="winner-card"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedWinner({
                  ...winner,
                  awardName: currentAward.name
                })}
              >
                <div className="winner-avatar">
                  <img src={winner.avatar} alt={winner.name} />
                </div>
                <p className="winner-name">{winner.name}</p>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                className="page-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                上一页
              </button>
              <span className="page-info">
                {currentPage} / {totalPages}
              </span>
              <button 
                className="page-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                下一页
              </button>
            </div>
          )}
        </div>
      )}
      {selectedWinner && (
        <WinnerModal 
          winner={selectedWinner} 
          onClose={() => setSelectedWinner(null)} 
        />
      )}
    </div>
  );
}

export default HomePage; 