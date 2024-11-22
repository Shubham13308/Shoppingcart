import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import AdminCustomer from "./Category/AdminCustomer";
import AdminProduct from "./Category/AdminProduct";
import AdminOrder from "./Category/AdminOrder";
import { BASEURL } from "../../Auth/Matcher";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("order");
  const [order, setOrder] = useState("");
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalProduct, setShowModalProduct] = useState(false);
  const [showModalOrder, setShowModalOrder] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [productsdetails, setProductsDetails] = useState(null);
  
  const navigate = useNavigate();
  
  const fetchData = async () => {
    try {
      const response = await axios.post(`${BASEURL}/users/fetch-all`, {
        activetab: activeTab,
      });
      
      const result = response.data.data;
      console.log(result?.order);
      setOrder(result?.order);
      setCustomer(result?.customer);
      setProduct(result?.product);
    } catch (error) {
      console.error("Error fetching data:", error);
      navigate('/not-found')
    }
  };

  const handleModalShow = async (customer_id, type) => {
    console.log(customer_id);
    if (!customer_id) {
      console.error("Customer ID is undefined or null");
      return;
    }

    try {
      const response = await axios.post(
        `${BASEURL}/users/fetch-user`,
        {
          id: customer_id || null,
          admintypes: type,
        }
      );

      if (response?.data?.data) {
        if (type == "order") {
          setSelectedOrder(response?.data?.data?.order);
          setProductsDetails(response?.data?.data?.productDetails);
          setShowModalOrder(true);
        } else if (type == "product") {
          setSelectedProduct(response?.data?.data?.product);
          setShowModalProduct(true);
        } else if (type == "customer") {
          setSelectedCustomer(response?.data?.data?.customer);
          
          setShowModal(true);
        }
      } else {
        console.error("No customer data found");
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleModalClose = () => setShowModal(false);

  const handleProductModalClose = () => setShowModalProduct(false);

  const handleOrderModalClose = () => setShowModalOrder(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <main className="content flex-grow-1 p-3 bg-light">
      <ToastContainer />
      <div className="container-fluid">
        <div
          className="scrollable-container"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            scrollBehavior: "smooth",
            paddingRight: "15px",
          }}>
          <div className="card mx-auto" style={{ width: "1050px" }}>
            <div className="card-body">
              <h2 className="card-title">Admin Panel</h2>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "order" ? "active" : ""
                    }`}
                    id="order-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#order"
                    type="button"
                    role="tab"
                    aria-controls="order"
                    aria-selected={activeTab === "order"}
                    onClick={() => handleTabChange("order")}>
                    Order
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "product" ? "active" : ""
                    }`}
                    id="product-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#product"
                    type="button"
                    role="tab"
                    aria-controls="product"
                    aria-selected={activeTab === "product"}
                    onClick={() => handleTabChange("product")}>
                    Product Panel
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "customer" ? "active" : ""
                    }`}
                    id="customer-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#customer"
                    type="button"
                    role="tab"
                    aria-controls="customer"
                    aria-selected={activeTab === "customer"}
                    onClick={() => handleTabChange("customer")}>
                    Customer Panel
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3" id="myTabContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === "order" ? "show active" : ""
                  }`}
                  id="order"
                  role="tabpanel"
                  aria-labelledby="order-tab">
                  <AdminOrder
                    orderdata={order}
                    handleOrderModalClose={handleOrderModalClose}
                    handleModalShow={handleModalShow}
                    showModalOrder={showModalOrder}
                    selectedOrder={selectedOrder}
                    productsdetails={productsdetails}
                  />
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "product" ? "show active" : ""
                  }`}
                  id="product"
                  role="tabpanel"
                  aria-labelledby="product-tab">
                  <AdminProduct
                    productdata={product}
                    handleProductModalClose={handleProductModalClose}
                    handleModalShow={handleModalShow}
                    showModalProduct={showModalProduct}
                    selectedProduct={selectedProduct}
                  />
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "customer" ? "show active" : ""
                  }`}
                  id="customer"
                  role="tabpanel"
                  aria-labelledby="customer-tab">
                  <AdminCustomer
                    customerdata={customer}
                    handleModalClose={handleModalClose}
                    handleModalShow={handleModalShow}
                    showModal={showModal}
                    selectedCustomer={selectedCustomer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPanel;
