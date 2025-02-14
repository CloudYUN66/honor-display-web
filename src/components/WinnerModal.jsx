import React from 'react';
import '../styles/WinnerModal.css';

function WinnerModal({ winner, onClose }) {
  return (
    <div className="winner-modal-overlay" onClick={onClose}>
      <div className="winner-modal-content" onClick={e => e.stopPropagation()}>
        <button className="winner-modal-close-button" onClick={onClose}>&times;</button>
        <div className="winner-modal-info">
          <img src={winner.avatar} alt={winner.name} className="winner-modal-avatar" />
          <div className="winner-modal-details">
            <h2 className="winner-modal-name">{winner.name}</h2>
            <p className="winner-modal-department">{winner.department}</p>
            <p className="winner-modal-position">{winner.position}</p>
            <p className="winner-modal-award-name">{winner.awardName}</p>
            <p className="winner-modal-reason">{winner.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal; 