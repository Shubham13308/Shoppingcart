import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { BASEURL } from "../../Auth/Matcher";
import { Link,useNavigate } from "react-router-dom";

const CustomerRegisterModal = ({ showModal, handleClose }) => {
  
const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    customer_name: "",
    customer_phn: "",
    customer_email: "",
    customer_points: "",
  });

  const [errors, setErrors] = useState({
    customer_name: "",
    customer_phn: "",
    customer_email: "",
    customer_points: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${BASEURL}/customer/customer-register`,
        formdata
      );
      console.log("Customer saved:", response.data);
      setFormdata({
        customer_name: "",
        customer_phn: "",
        customer_email: "",
        customer_points: "",
      });
      toast.success("Customer registered successfully!");
      handleClose();
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Customer already exists!");
          setErrors((prevErrors) => ({
            ...prevErrors,
            customer_phn: "Phone number already exists!",
            customer_email: "Email already exists!",
          }));
        } else {
          console.error("Error saving customer:", error.response);
          toast.error("Failed to register customer");
        }
      } else {
        console.error("Error in request:", error);
        toast.error("An error occurred while making the request");
        navigate('/not-found')
      }
    }
  };
  return (
    <>
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register New Customer</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="customer-name" className="col-form-label">
                      Customer Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customer-name"
                      name="customer_name"
                      value={formdata.customer_name}
                      onChange={handleInputChange}
                    />
                    {errors.customer_name && (
                      <div className="text-danger">{errors.customer_name}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="customer-phn" className="col-form-label">
                      Phone:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customer-phn"
                      name="customer_phn"
                      value={formdata.customer_phn}
                      onChange={handleInputChange}
                    />
                    {errors.customer_phn && (
                      <div className="text-danger">{errors.customer_phn}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="customer-email" className="col-form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="customer-email"
                      name="customer_email"
                      value={formdata.customer_email}
                      onChange={handleInputChange}
                    />
                    {errors.customer_email && (
                      <div className="text-danger">{errors.customer_email}</div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="customer-points" className="col-form-label">
                      Points:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="customer-points"
                      name="customer_points"
                      value={formdata.customer_points}
                      onChange={handleInputChange}
                    />
                    {errors.customer_points && (
                      <div className="text-danger">
                        {errors.customer_points}
                      </div>
                    )}
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}>
                  Save Customer
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

export default CustomerRegisterModal;
