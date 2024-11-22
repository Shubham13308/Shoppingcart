import React from "react";
import AdminOrderModal from "../../Modal/AdminOrderModal";
const AdminOrder = ({
  orderdata,
  handleOrderModalClose,
  handleModalShow,
  showModalOrder,
  selectedOrder,
  productsdetails
}) => {
  console.log("orderdata", orderdata);

  const totalPrice = Array.isArray(orderdata)
    ? orderdata.reduce((sum, order) => sum + (parseFloat(order?.price) || 0), 0)
    : 0;
console.log("productsdetails",productsdetails);

  return (
    <>
      <AdminOrderModal
        show={showModalOrder}
        handleClose={handleOrderModalClose}
        selectedOrder={selectedOrder}
        productsdetails={productsdetails}
      />

      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Order Table</h3>
          <div className="bg-light p-2 rounded shadow-sm">
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </div>
        </div>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orderdata) && orderdata.length > 0 ? (
              orderdata.map((order) => (
                <tr key={order?.order_id || Math.random()}>
                  <td>{order?.order_id ?? "N/A"}</td>
                  <td>{order?.category ?? "N/A"}</td>
                  <td>{order?.price ? `$${order.price}` : "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleModalShow(order?.order_id, "order")}
                       
                      >
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        alert(`Delete order: ${order?.order_id || "Unknown"}`)
                      }>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Orders Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminOrder;
