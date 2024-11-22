import React from 'react';

const NotificationModal = ({ showModal, handleClose, stockhandle }) => {

  const safeStock = Array.isArray(stockhandle) ? stockhandle : [];

  const modalStyle = {
    display: 'block',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1050
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const modalHeaderStyle = {
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const modalBodyStyle = {
    padding: '10px 0',
    fontSize: '16px',
    color: '#333',
  };

  const productItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  };

  const closeButtonStyle = {
    backgroundColor: '#6c757d',
    borderColor: '#6c757d',
    padding: '8px 16px',
    color: '#fff',
    borderRadius: '4px',
  };

  return (
    <>
      {showModal && (
        <div className="modal show" style={modalStyle} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={modalContentStyle}>
              <div className="modal-header" style={modalHeaderStyle}>
                <h5 className="modal-title">Notifications</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#333' }}
                ></button>
              </div>
              <div className="modal-body" style={modalBodyStyle}>
                {safeStock.length > 0 ? (
                  safeStock.map((item, index) => (
                    <div key={index} className="product-item" style={productItemStyle}>
                      <span>{index + 1}</span>
                      <span>{item.product_name}</span>
                      <span style={{ color: "red" }}>{item.product_stock} in stock</span>
                    </div>
                  ))
                ) : (
                  <p>No new notifications</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn" onClick={handleClose} style={closeButtonStyle}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;

