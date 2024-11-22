import React from "react";
import AdminProductModal from "../../Modal/AdminProductModal";
const AdminProduct = ({
  productdata,
  handleProductModalClose,
  handleModalShow,
  showModalProduct,
  selectedProduct,
}) => {
  console.log("selectedProduct",selectedProduct)
  return (
    <>
      <AdminProductModal
        show={showModalProduct}
        handleClose={handleProductModalClose}
        selectedProduct={selectedProduct}
      />
      <div>
        <h3 className="mb-4">Product Table</h3>
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(productdata) && productdata.length > 0 ? (
              productdata.map((product) => (
                <tr key={product?.product_id || Math.random()}>
                  <td>{product?.product_id ?? "N/A"}</td>
                  <td>{product?.product_name ?? "N/A"}</td>
                  <td>{product?.product_price ?? "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={()=>handleModalShow(product?.product_id, "product")}>
                      <i className="fas fa-eye"></i> View
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        alert(
                          `Delete product: ${
                            product?.product_name || "Unknown Product"
                          }`
                        )
                      }>
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No Products Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminProduct;
