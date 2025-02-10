import '../styles/WinnerModal.css';

function WinnerModal({ winner, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <img src={winner.avatar || '/placeholder-avatar.jpg'} alt={winner.name} />
        <h2>{winner.name}</h2>
        
        <div className="info-container">
          <div className="info-item">
            <span className="info-label">部门：</span>
            <span>{winner.department}</span>
          </div>
          <div className="info-item">
            <span className="info-label">职务：</span>
            <span>{winner.position}</span>
          </div>
          <div className="info-item">
            <span className="info-label">获奖名称：</span>
            <span>{winner.awardName}</span>
          </div>
        </div>

        <div className="reason">
          <p>{winner.reason}</p>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal; 