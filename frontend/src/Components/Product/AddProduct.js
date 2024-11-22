import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { BASEURL } from '../../Auth/Matcher';
import { Link,useNavigate } from "react-router-dom";

const AddProduct = () => {
  
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: '',
    product_category: '',
    product_description: '',
    product_price: '',
    product_stock: '',
  });

  const scrollableRef = useRef(null);

  const categories = ["Electronics", "Food", "Home Appliances", "Books", "Toys"]; 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASEURL}/product/add-product`, formData);
      const productname=response?.data?.data?.product_name
      
      toast.success(`${productname} added successfully!`);
      setFormData({
        product_name: '',
        product_category: '',
        product_description: '',
        product_price: '',
        product_stock: '',
      });
    } catch (error) {
      toast.error('Error adding product');
      console.error('Error adding product:', error);
      navigate('/not-found')
    }
  };

  const handleScroll = (event) => {
    const { deltaY } = event;
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({
        top: deltaY,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="content flex-grow-1 p-3 bg-light">
     <ToastContainer />
      <div className="container-fluid">
        <div
          className="scrollable-container"
          ref={scrollableRef}
          onWheel={handleScroll}
          style={{ maxHeight: "500px", overflowY: "auto", scrollBehavior: "smooth", paddingRight: "15px" }}
        >
          <div className="card mx-auto" style={{ width: '1050px' }}>
            <div className="card-body">
              <h2 className="card-title">Add New Product</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="product_name" className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="product_category" className="form-label">Product Category</label>
                  <select
                    className="form-select"
                    id="product_category"
                    value={formData.product_category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="product_description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="product_description"
                    rows="3"
                    value={formData.product_description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="product_price" className="form-label">Price ($)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="product_price"
                    value={formData.product_price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="product_stock" className="form-label">Stock</label>
                  <input
                    type="number"
                    className="form-control"
                    id="product_stock"
                    value={formData.product_stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">Add Product</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
