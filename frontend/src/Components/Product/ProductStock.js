import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import axios from 'axios';  
import { BASEURL } from '../../Auth/Matcher';
import { Link,useNavigate } from "react-router-dom";


const ProductStock = () => {
    const scrollableRef = useRef(null);
    const stock = useSelector((state) => state.cart.stock);
    const [quantities, setQuantities] = useState(stock.map(() => 1));
    const [orderPlaced, setOrderPlaced] = useState(stock.map(() => false));
    
    const navigate = useNavigate();
    
    

    const handleIncrement = (index) => {
        setQuantities((prevQuantities) => 
            prevQuantities.map((quantity, i) => i === index ? quantity + 1 : quantity)
        );
    };

    const handleDecrement = (index) => {
        setQuantities((prevQuantities) => 
            prevQuantities.map((quantity, i) => i === index && quantity > 1 ? quantity - 1 : quantity)
        );
    };

    const handleOrderPlaced = (index) => {
        const product_id = stock[index].product_id;  
        const product_name=stock[index].product_name
        const quantity = quantities[index];  

        
        axios.put(`${BASEURL}/product/re-stock`, { 
          product_id, 
            additional_stock: quantity 
        })
        .then((response) => {
            
            toast.success(`${product_name} Stock Updated successfully!`);
            setOrderPlaced((prevOrderPlaced) =>
                prevOrderPlaced.map((placed, i) => i === index ? true : placed)
            );

        })
        .catch((error) => {
            console.error('Error adding stock:', error);
            
navigate('/not-found')
        });
    };

    return (
        <main className="content flex-grow-1 p-3 bg-light">
        <ToastContainer />
            <div className="container-fluid">
                <div
                    className="scrollable-container"
                    ref={scrollableRef}
                    
                    style={{ maxHeight: "500px", overflowY: "auto", scrollBehavior: "smooth", paddingRight: "15px" }}
                >
                    <div className="card mx-auto" style={{ width: '1080px', marginBottom: '20px' }}>
                        <div className="card-body">
                            <h2 className="card-title">Products</h2>
                            <div className="row">
                                {stock.length > 0 ? (
                                    stock.map((item, index) => (
                                        <div key={index} className="col-md-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.product_name}</h5>
                                                    <p className="card-text">{item.product_description}</p>
                                                    <p className="card-text">Stock: {item.product_stock}</p>
                                                    
                                                    
                                                    <div className="d-flex align-items-center">
                                                        <button 
                                                            className="btn btn-secondary me-2" 
                                                            onClick={() => handleDecrement(index)}
                                                        >
                                                            -
                                                        </button>
                                                        <input 
                                                            type="text" 
                                                            value={quantities[index]} 
                                                            readOnly 
                                                            className="form-control text-center" 
                                                            style={{ width: "50px" }} 
                                                        />
                                                        <button 
                                                            className="btn btn-secondary ms-2" 
                                                            onClick={() => handleIncrement(index)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    
                                                    <button
                                                        className="btn btn-primary mt-3"
                                                        onClick={() => handleOrderPlaced(index)}
                                                        disabled={orderPlaced[index]}
                                                    >
                                                        {orderPlaced[index] ? "Stock Added" : "Add Stock"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12">
                                        <p>No out-of-stock items</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductStock;
