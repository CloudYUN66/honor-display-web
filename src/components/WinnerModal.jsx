import '../styles/WinnerModal.css';

function WinnerModal({ winner, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="winner-info">
          <div className="winner-avatar-large">
            <img src={winner.avatar} alt={winner.name} />
          </div>
          <h2>{winner.name}</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">部门：</span>
              <span className="value">{winner.department}</span>
            </div>
            <div className="info-item">
              <span className="label">职务：</span>
              <span className="value">{winner.position}</span>
            </div>
            <div className="info-item">
              <span className="label">获奖名称：</span>
              <span className="value">{winner.awardName}</span>
            </div>
          </div>
          <div className="reason-section">
            <h3>获奖理由</h3>
            <p>{winner.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal; 