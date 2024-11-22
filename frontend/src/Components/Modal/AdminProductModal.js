import React, { useState, useEffect } from 'react';

const AdminProductModal = ({ show, handleClose, handleSubmit, customer, selectedProduct }) => {
  
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

  console.log("product_id",selectedProduct);
  

  return (
    <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedProduct?.product_id ? 'Edit Customer' : 'Add Customer'}
            </h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="customerId" className="form-label">
                  Product ID
                </label>
                <input
                  type="text"
                  id="customerId"
                  name="customer_id"
                  className="form-control"
                  value={formData.product_id}
                  onChange={handleChange}
                  placeholder={selectedProduct?.product_id
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customer_name"
                  className="form-control"
                  value={formData.product_name}
                  onChange={handleChange}
                  placeholder={selectedProduct?.product_name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerPhone" className="form-label">
                  Product Category
                </label>
                <input
                  type="text"
                  id="customerPhone"
                  name="customer_phn"
                  className="form-control"
                  value={formData.product_category}
                  onChange={handleChange}
                  placeholder={selectedProduct?.product_description}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerEmail" className="form-label">
                  Customer Price
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customer_email"
                  className="form-control"
                  value={formData.product_price}
                  onChange={handleChange}
                  placeholder={selectedProduct?.product_price}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerPoints" className="form-label">
                  Product Stock
                </label>
                <input
                  type="number"
                  id="customerPoints"
                  name="customer_points"
                  className="form-control"
                  value={formData.product_stock}
                  onChange={handleChange}
                  placeholder={selectedProduct?.product_stock}
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
                  {selectedProduct?.product_id ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModal;
