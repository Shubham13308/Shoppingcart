import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../../Auth/Matcher";
import { setCustomerData } from "../../redux/features/customer/customerSlice";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";


const CustomerVerifyModal = ({ showModal, handleClose }) => {
  const [customer_phn, setCustomer_phn] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.searchinput.searchinput);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCustomer_phn(e.target.value);
    setError(""); 
  };

  const handleVerify = async () => {
    try {
      if (!customer_phn) {
        setError("Please enter a verification number.");
        return;
      }

      const response = await axios.post(
        `${BASEURL}/customer/customer-verify`, 
        { customer_phn }
      );

      if (response.data.status) {
        dispatch(setCustomerData(response?.data));
        
        handleClose(); 
      } else {
        toast.error("Verification failed.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError("Customer Not Found.");
        }
      }
      console.error("Error verifying customer:", error);
      toast.error("An error occurred while verifying.");
      navigate('/not-found')
    }
  };


  return (
    <>
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Customer Verification</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="verification-number" className="col-form-label">
                    Enter Verification Number:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="verification-number"
                    value={customer_phn}
                    onChange={handleInputChange}
                  />
                  {error && <div className="text-danger">{error}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleVerify}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CustomerVerifyModal;
