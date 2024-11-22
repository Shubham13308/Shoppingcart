import React, { useState, useEffect } from 'react';

const AdminCustomerModal = ({ show, handleClose, handleSubmit, customer, customerdata }) => {
  
  const [formData, setFormData] = useState({
    customer_id: customer?.customer_id || '',
    customer_name: customer?.customer_name || '',
    customer_phn: customer?.customer_phn || '',
    customer_email: customer?.customer_email || '',
    customer_points: customer?.customer_points || '',
  });

  useEffect(() => {
    
    if (customer) {
      setFormData({
        customer_id: customer.customer_id || '',
        customer_name: customer.customer_name || '',
        customer_phn: customer.customer_phn || '',
        customer_email: customer.customer_email || '',
        customer_points: customer.customer_points || '',
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); 
    handleClose(); 
  };

  

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {customer?.customer_id ? 'Edit Customer' : 'Add Customer'}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="customerId" className="form-label">
                  Customer ID
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customer_id"
                  className="form-control"
                  value={formData.customer_id}
                  onChange={handleChange}
                  placeholder={customerdata?.customer_id
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customer_name"
                  className="form-control"
                  value={formData.customer_name}
                  onChange={handleChange}
                  placeholder={customerdata?.customer_name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerPhone" className="form-label">
                  Customer Phone
                </label>
                <input
                  type="text"
                  id="customerPhone"
                  name="customer_phn"
                  className="form-control"
                  value={formData.customer_phn}
                  onChange={handleChange}
                  placeholder={customerdata?.customer_phn}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerEmail" className="form-label">
                  Customer Email
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customer_email"
                  className="form-control"
                  value={formData.customer_email}
                  onChange={handleChange}
                  placeholder={customerdata?.customer_email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerPoints" className="form-label">
                  Customer Points
                </label>
                <input
                  type="number"
                  id="customerPoints"
                  name="customer_points"
                  className="form-control"
                  value={formData.customer_points}
                  onChange={handleChange}
                  placeholder={customerdata?.customer_points}
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {customer?.customer_id ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerModal;
