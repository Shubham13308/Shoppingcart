import React, { useState } from 'react';
import axios from 'axios';
import AdminCustomerModal from '../../Modal/AdminCustomerModal';

const AdminCustomer = ({ customerdata ,handleModalClose , showModal ,handleModalShow,selectedCustomer }) => {
  // const [showModal, setShowModal] = useState(false);
  // const [selectedCustomer, setSelectedCustomer] = useState(null); 

  // const handleModalClose = () => setShowModal(false);

  // const handleModalShow = async (customer_id, type) => {
  //   try {
  //     const response = await axios.get("http://localhost:4001/admin/fetch-user", {
  //       params: {
  //         customer_id: customer_id,
  //         admintypes: type,
  //       },
  //     });

  //     if (response?.data) {
  //       setSelectedCustomer(response.data); 
  //       setShowModal(true); 
  //     }
  //   } catch (error) {
  //     console.error("Error fetching customer data:", error);
  //   }
  // };


  return (
    <>
      <AdminCustomerModal 
        show={showModal} 
        handleClose={handleModalClose} 
        customerdata={selectedCustomer} 
        
      />
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Customer Table</h3>
        </div>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Customer ID</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Customer Points</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(customerdata) && customerdata.length > 0 ? (
              customerdata.map((customer) => (
                <tr key={customer?.customer_id || Math.random()}>
                  <td>{customer?.customer_id ?? 'N/A'}</td>
                  <td>{customer?.customer_name ?? 'N/A'}</td>
                  <td>{customer?.customer_points ?? 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleModalShow(customer?.customer_id, "customer")}
                    >
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        alert(`Delete customer: ${customer?.customer_name || 'Unknown Customer'}`)
                      }
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Customers Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminCustomer;
