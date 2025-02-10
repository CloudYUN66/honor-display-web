import '../styles/WinnerModal.css';

function WinnerModal({ winner, onClose }) {
  // 阻止点击模态框内容时关闭
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-avatar">
          <img src={winner.avatar} alt={winner.name} />
        </div>
        <h2 className="modal-name">{winner.name}</h2>
        <p className="modal-info">{winner.department}</p>
        <p className="modal-info">{winner.title}</p>
        <p className="modal-award">{winner.awardName}</p>
        {winner.description && (
          <p className="modal-info">{winner.description}</p>
        )}
      </div>
    </div>
  );
}

export default WinnerModal; 