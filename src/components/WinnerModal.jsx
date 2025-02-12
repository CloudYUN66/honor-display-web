import '../styles/WinnerModal.css';

function WinnerModal({ winner, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button 
          className="modal-close" 
          onClick={onClose}
          aria-label="关闭"
        >
          ✕
        </button>
        <div className="modal-info-container">
          <h2 className="modal-name">{winner.name}</h2>
          <p className="modal-info">{winner.department}</p>
          <p className="modal-description">{winner.description}</p>
        </div>
      </div>
    </div>
  );
}

export default WinnerModal; 