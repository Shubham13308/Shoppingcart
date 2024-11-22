import React, { useState, useEffect } from "react";
import CartModal from "../Modal/CartModal";
import NotificationModal from "../Modal/NotificationModal"; 
import CustomerRegisterModal from "../Modal/CustomerRegisterModal";
import CustomerVerifyModal from "../Modal/CustomerVerifyModal";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../redux/features/customer/customerSlice";

const Header = ({ data, page, customerCount, points }) => {
  const [showModal, setShowModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showCustomerRegisterModal, setShowCustomerRegisterModal] = useState(false);
  const [showCustomerVerifyModal, setShowCustomerVerifyModal] = useState(false);
  const searchInput = useSelector((state) => state.searchinput.searchinput);
  const customerdata = useSelector((state) => state.searchinput.customerdata);
  const stockCount = useSelector((state) => state.cart.stockCount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const stock = useSelector((state) => state.cart.stock);
  const dispatch = useDispatch();
  const [stockhandle, setStockHandle] = useState(stock);
  const [stockCounthandle,setStockHandleCount]=useState(stockCount);
  useEffect(() => {
    setStockHandleCount(stockCount);
    setStockHandle(stock);
  }, [stock]); 
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    dispatch(setSearchInput(searchValue)); 
  };

  
  const shakeAnimationStyle = stockCount > 0 ? {
    animation: "shake 0.5s ease-in-out infinite",
    transformOrigin: "center"
  } : {};

  const handleNotificationModalClose = () => {
    setStockHandleCount('')
    setStockHandle(''); 
    setShowNotificationModal(false);  
  };
  const handlecartModalClose=()=>{
    setShowModal(false)

  }
  const cartlength=cartItems.length;
  

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <a className="navbar-brand" href="#">
            Welcome {data}
          </a>

          <form className="d-flex mx-3" role="search" style={{ flexShrink: 0 }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "220px" }}
              value={searchInput} 
              onChange={handleSearchChange} 
            />
          </form>

          {page === "" && (
            <>
              <a className="navbar-brand" href="#">
                <i className="fas fa-person"></i> Customer: {customerdata?.data?.customer_name || ''}
              </a>
              <a className="navbar-brand" href="#">
                <i className="fas fa-coins"></i> Pts: {customerdata?.data?.customer_points || ''}
              </a>
            
              <button className="btn btn-outline-light" onClick={() => setShowCustomerVerifyModal(true)}>
                Customer
              </button>
              <button className="btn btn-outline-light" onClick={() => setShowCustomerRegisterModal(true)}>
                <i className="fas fa-person-circle-plus"></i> Add Customer
              </button>
            </>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i
                    className="fas fa-shopping-cart"
                    onClick={() => setShowModal(true)}></i>
                  <span className="badge bg-danger ms-1">{cartlength}</span>
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => setShowNotificationModal(true)}
                >
                  <i
                    className="fas fa-bell"
                    style={shakeAnimationStyle}
                  ></i>
                  <span className="badge bg-danger ms-1">{stockCounthandle}</span> 
                </a>
              </li>

              <CartModal
                showModal={showModal}
                handleClose={handlecartModalClose}
                cartItems={cartItems}
              />
              
              <NotificationModal
                showModal={showNotificationModal}
                handleClose={handleNotificationModalClose}  
                stockhandle={stockhandle}
              />
              
              <CustomerRegisterModal
                showModal={showCustomerRegisterModal}
                handleClose={() => setShowCustomerRegisterModal(false)}
              />
              <CustomerVerifyModal
                showModal={showCustomerVerifyModal}
                handleClose={() => setShowCustomerVerifyModal(false)}
              />
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
