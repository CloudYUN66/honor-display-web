import React from 'react';
import '../styles/WinnerModal.css';

function WinnerModal({ winner, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="winner-info">
          <img src={winner.avatar} alt={winner.name} className="winner-avatar" />
          <h2>{winner.name}</h2>
          <p className="department">{winner.department}</p>
          <p className="position">{winner.position}</p>
          <p className="award-name">{winner.awardName}</p>
          <p className="reason">{winner.reason}</p>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal; 