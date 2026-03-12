import './ConfirmDialog.css';


// Dialog box to confirm Delete action or to cancel it.
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className='dialog-backdrop'>
      <div className='dialog-box'>
        <div className="dialog-icon">⚠️</div>
        <h3 className="dialog-title">Confirm Action</h3>
        <p className="dialog-message">{message}</p>
        <div className="dialog-actions">
          <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;