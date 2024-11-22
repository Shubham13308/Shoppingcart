import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/ui/sidebar.css";
import {  useSelector,useDispatch } from "react-redux";
import { setCategoryFilter } from "../../redux/features/products/productsSlice";  

const Sidebar = ({ setPage }) => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const { category } = useSelector((state) => state.products);  
  const dispatch=useDispatch()
  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };
  const handleCategoryClick=(cat)=>{
    dispatch(setCategoryFilter(cat));

  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; 
  };
  

  return (
    <aside className="sidebar bg-dark text-white p-3">
      <hr />
      <nav className="nav flex-column">
        <Link className="nav-link text-white" onClick={() => setPage('')}>
          <i className="fas fa-home me-2"></i> Sale
        </Link>
        <Link className="nav-link text-white" onClick={() => setPage('Add')}>
          <i className="fas fa-chart-line me-2"></i> Add
        </Link>
        <Link className="nav-link text-white" onClick={() => setPage('Stock')}>
          <i className="fas fa-boxes me-2"></i> Stock
        </Link>
        <Link className="nav-link text-white" onClick={() => setPage('Analytics')}>
          <i className="fas fa-chart-pie me-2"></i> Analytics
        </Link>
        <Link className="nav-link text-white" onClick={() => setPage('Admin')}>
  <i className="fas fa-user-shield me-2"></i> Admin
</Link>

        <div className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            onClick={toggleCategory}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-list me-2"></i> Category
            <i className={`fas ${isCategoryOpen ? 'fa-caret-up' : 'fa-caret-down'} ms-auto`}></i>
          </a>
          
          {isCategoryOpen && (
  <div className="ms-3">
    <button
      type="button"
      className="btn btn-primary d-flex align-items-center mb-3"
      onClick={() => window.location.reload()}
    >
      <i className="fas fa-shopping-cart me-2"></i> All Products
    </button>

    {category && category.length > 0 ? (
      category.map((cat, index) => (
        <Link
          key={index}
          className="nav-link text-white d-flex align-items-center"
          onClick={() => handleCategoryClick(cat)}
          style={{ paddingLeft: "20px" }}
        >
          <i className="fas fa-tag me-2"></i> {cat}
        </Link>
      ))
    ) : (
      <p className="text-white ms-3">No categories available</p>
    )}
  </div>
)}

        </div>
        <Link className="nav-link text-white" onClick={handleLogout}>
          <i className="fas fa-cog me-2"></i> Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
