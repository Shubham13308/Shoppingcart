import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { BASEURL } from "../../Auth/Matcher";
import { ToastContainer, toast } from 'react-toastify';

const CartModal = ({ showModal, handleClose, cartItems }) => {
  const customerdata = useSelector((state) => state.searchinput.customerdata);

  const [usePoints, setUsePoints] = useState(false);
  const [showpoint, setShowPoints] = useState(false);
  const navigate = useNavigate();
  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + item.product_price * item.quantity,
        0
      )
    : 0;

  const [finalPrice, setFinalPrice] = useState(totalPrice);

  useEffect(() => {
    const pointsToUse = usePoints ? customerdata?.data?.customer_points : 0;
    setFinalPrice(usePoints ? totalPrice - pointsToUse : totalPrice);
  }, [usePoints, totalPrice, customerdata?.data?.customer_points]);

  const handleSubmit = async () => {
    try {
      const category = cartItems.map((item) => item.product_id).join(",");
      const quantities = cartItems.map((item) => item.quantity).join(",");
      console.log("Quantities:", quantities);

      const pointsToUse = usePoints ? customerdata?.data?.customer_points : 0;

      const response = await axios.post(
        `${BASEURL}/order/order-register`,
        {
          customer_id: customerdata?.data?.customer_id,
          customer_points: pointsToUse,
          category,
          quantities,
          price: finalPrice.toFixed(2),
        }
      );

      if (response.status === 200) {
        toast.success("Order placed successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        handleClose();
      }
    } catch (error) {
      console.error("Error creating order:", error);
      
    }
  };

  return (
    <div
      id="cartModal"
      className={`modal fade ${showModal ? "show" : ""}`}
      tabIndex="-1"
      aria-labelledby="cartModalLabel"
      aria-hidden={!showModal}
      style={{ display: showModal ? "block" : "none" }}>
      
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">
              Customer: {customerdata?.data?.customer_name}
            </h5>
            <button
              type="button"
              className="btn-close text-white"
              aria-label="Close"
              onClick={handleClose}></button>
          </div>
          <div className="modal-body">
          
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                <ul className="list-group">
                  {cartItems.map((item) => (
                    <li
                      key={item.product_id}
                      className="list-group-item d-flex justify-content-between align-items-center bg-secondary border-dark"
                      style={{ height: "80px" }}>
                      {item.product_name} (x{item.quantity})
                      <span>
                        ${(item.product_price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
                <hr />
                <h5>Total: ${totalPrice.toFixed(2)}</h5>
                {usePoints && (
                  <p>Points Redeemed: {customerdata?.data?.customer_points}</p>
                )}
                <h5>Final Price: ${finalPrice.toFixed(2)}</h5>
              </div>
            )}
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="usePoints"
                checked={usePoints}
                onChange={() => setUsePoints(!usePoints)}
                disabled={customerdata?.data?.customer_points < 10}
              />
              {totalPrice < customerdata?.data?.customer_points ? (
                <div>
                  <label className="form-check-label" htmlFor="usePoints">
                    Redeem my points ({customerdata?.data?.customer_points}{" "}
                    points)
                  </label>
                  <input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Enter points to redeem"
                    min="1"
                    max={customerdata?.data?.customer_points}
                    onChange={(e) => setShowPoints(e.target.value)}
                    value={showpoint}
                  />
                </div>
              ) : (
                <label className="form-check-label" htmlFor="usePoints">
                  Redeem my points ({customerdata?.data?.customer_points}{" "}
                  points)
                </label>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              style={{ float: "left" }}
              onClick={handleSubmit}>
              Purchased
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
