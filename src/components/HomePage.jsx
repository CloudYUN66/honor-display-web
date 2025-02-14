import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import WinnerModal from './WinnerModal';
import '../styles/HomePage.css';
import awardDescriptions from '../data/awardDescriptions';

function HomePage() {
  const [awards, setAwards] = useState([]);
  const [currentAwardId, setCurrentAwardId] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [winnersPerPage, setWinnersPerPage] = useState(18);
  const gridRef = useRef(null);
  const [selectedWinner, setSelectedWinner] = useState(null);
  
  const currentAward = awards.find(award => award.id === currentAwardId);
  
  // 获取奖项数据
  useEffect(() => {
    fetch('/api/awards')
      .then(res => res.json())
      .then(data => {
        setAwards(data);
        if (data.length > 0) {
          setCurrentAwardId(data[0].id);
        }
      })
      .catch(error => console.error('Error fetching awards:', error));
  }, []);

  // 修改计算逻辑，固定为18个
  const calculateWinnersPerPage = () => {
    return 18; // 固定返回18
  };

  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const newWinnersPerPage = calculateWinnersPerPage();
      if (newWinnersPerPage !== winnersPerPage) {
        setWinnersPerPage(newWinnersPerPage);
        setCurrentPage(1); // 重置到第一页
      }
    };

    handleResize(); // 初始计算
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [winnersPerPage]);

  // 计算当前页的获奖者
  const getCurrentPageWinners = () => {
    if (!currentAward) return [];
    const startIndex = (currentPage - 1) * 18; // 使用固定值18
    return currentAward.winners.slice(startIndex, startIndex + 18);
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
    const handleRotation = () => {
      // 确保有奖项数据
      if (!awards || awards.length === 0) return;
      
      // 获取当前奖项
      const currentAward = awards.find(award => award.id === currentAwardId);
      if (!currentAward) {
        console.log('重置到第一个奖项');
        setCurrentAwardId(awards[0].id);
        setCurrentPage(1);
        return;
      }

      // 获取当前奖项的获奖者总数和总页数
      const totalWinners = currentAward.winners.length;
      const maxPages = Math.ceil(totalWinners / winnersPerPage);
      console.log(`当前页: ${currentPage}, 总页数: ${maxPages}`);

      if (currentPage >= maxPages) {
        // 获取当前奖项的索引
        const currentIndex = awards.findIndex(award => award.id === currentAwardId);
        console.log(`当前奖项索引: ${currentIndex}, 总奖项数: ${awards.length}`);
        
        if (currentIndex >= awards.length - 1) {
          // 如果是最后一个奖项的最后一页，回到第一个奖项
          console.log('回到第一个奖项');
          setCurrentAwardId(awards[0].id);
        } else {
          // 切换到下一个奖项
          console.log('切换到下一个奖项');
          setCurrentAwardId(awards[currentIndex + 1].id);
        }
        // 重置到第一页
        setCurrentPage(1);
      } else {
        // 切换到下一页
        console.log('切换到下一页');
        setCurrentPage(prev => prev + 1);
      }
    };

    // 设置定时器
    const timer = setInterval(handleRotation, 70000);

    // 清理定时器
    return () => clearInterval(timer);
  }, [currentPage, currentAwardId, awards, winnersPerPage]);

  // 监听状态变化
  useEffect(() => {
    console.log('状态更新:', {
      currentAwardId,
      currentPage,
      totalAwards: awards?.length,
      currentAward: awards?.find(a => a.id === currentAwardId)?.name
    });
  }, [currentAwardId, currentPage, awards]);

  const currentPageWinners = getCurrentPageWinners();

  return (
    <div className="home-page">
      <div className="admin-entry">
        <Link to="/admin" className="admin-button">
          进入后台
        </Link>
      </div>

      <h1 className="main-title">2025年度荣誉风云榜</h1>
      <Navigation 
        awards={awards} 
        currentAwardId={currentAwardId}
        onAwardSelect={handleAwardSelect}
      />
      {currentAward && (
        <div className="award-section">
          <div className="award-title-container">
            <h2 className="award-title">{currentAward.name}</h2>
          </div>
          <p className="award-description">
            {awardDescriptions[currentAward.name] || ''}
          </p>
          
          <div 
            className="winners-grid" 
            ref={gridRef}
            data-count={currentPageWinners.length <= 6 ? currentPageWinners.length : 6}
          >
            {currentPageWinners.map(winner => (
              <div 
                key={winner.id} 
                className="winner-card"
                onClick={() => setSelectedWinner(winner)}
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