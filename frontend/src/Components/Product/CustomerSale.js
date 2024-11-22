import React, { useEffect, useRef, useState } from "react";
import Loader from "../ui/Loader";
import axios from "axios";
import { BASEURL } from "../../Auth/Matcher";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setCategory,
  setError,
  
} from "../../redux/features/products/productsSlice";
import {
  incrementQuantity,
  decrementQuantity,
  toggleAddToCart,
  setStock,
  setStockCount,
  updateCart
} from "../../redux/features/cart/cartSlice";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const CustomerSale = () => {
  const scrollableRef = useRef(null);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const { products,categoryfilter, isLoading, error } = useSelector((state) => state.products);
  const { quantities, isAdded } = useSelector((state) => state.cart);
  const searchInput = useSelector((state) => state.searchinput.searchinput); 
  const [formdata, setFormData] = useState({
    name: searchInput,
  });
  const navigate = useNavigate();
    
  const category = categoryfilter || ''; 

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: searchInput })); 
  }, [searchInput]);

  const handleScroll = (event) => {
    event.preventDefault();
    const { deltaY } = event;
    if (scrollableRef.current) {
      scrollableRef.current.scrollBy({
        top: deltaY,
        behavior: "smooth",
      });
    }
  };

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASEURL}/product/all-product`, { 
        params: formdata, 
      });
      console.log("response",response)
      dispatch(setProducts(response?.data?.data?.products || []));
      dispatch(setCategory(response?.data?.data?.categories || []));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setError("Failed to fetch products"));
      dispatch(setLoading(false));
      navigate('/not-found')
    }
  };

  const fetchCategoryData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${BASEURL}/product/category-product`, {
        params: { category } 
      });
      dispatch(setProducts(response?.data?.data?.products || []));
      dispatch(setCategory(response?.data?.data?.categories || []));
      
      dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
      dispatch(setError("Failed to fetch category products"));
      dispatch(setLoading(false));
      navigate('/not-found')
    }
  };
  const fetchStockdata = async ()=>{
    try{
      const response =await axios.get(`${BASEURL}/product/product-stock`)
      dispatch(setStockCount(response?.data?.totalLowStockProducts || []))
      dispatch(setStock(response?.data?.data || []))
      
    }catch(err){
      console.log(err)
      
navigate('/not-found')
    }
  }

  const incrementCounter = (index) => {
    dispatch(incrementQuantity(index));
  };

  const decrementCounter = (index) => {
    dispatch(decrementQuantity(index));
  };
  
  
  
  const toggleAddToCartHandler = (index, product) => {
    const quantity = quantities[index];  
    // toast.success(` added successfully!`);
    setCartItems((prevCartItems) => {
      const isProductInCart = prevCartItems.some(
        (item) => item.product_id === product.product_id
      );
  
      let updatedCartItems;
      if (isProductInCart) {
        
        updatedCartItems = prevCartItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity }
            : item
        );
      } else {
        // Add the product to the cart with the specified quantity
        updatedCartItems = [...prevCartItems, { ...product, quantity }];
      }
  
      
      dispatch(updateCart(updatedCartItems));
  
      return updatedCartItems;  
    });
  };
  
  
  




  useEffect(() => {
    if(formdata.name || category == ''){
      fetchData();
    }else if(category){
      fetchCategoryData();
    }

    fetchStockdata();

    const scrollableContainer = scrollableRef.current;
    if (scrollableContainer) {
      scrollableContainer.addEventListener("wheel", handleScroll, {
        passive: false, 
      });
    }

    return () => {
      if (scrollableContainer) {
        scrollableContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, [formdata, category]); 


  return (
    <>
      <main className="content flex-grow-1 p-3 bg-light">
      <ToastContainer />
        <div className="container-fluid">
          <div
            className="scrollable-container"
            ref={scrollableRef}
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              scrollBehavior: "smooth",
              paddingRight: "15px",
            }}>
            {isLoading ? (
              <Loader />
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : products.length === 0 ? (
              <div className="alert alert-warning">No Products Found</div>
            ) : (
              <div className="row">
              
                {products.map((product, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                    
                      <div className="card-body">
                        <h5 className="card-title">{product.product_name}</h5>
                        <p className="card-text">
                          {product.product_description}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "20px 0",
                            padding: "10px",
                            backgroundColor: "#f9f9f9",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                            maxWidth: "200px",
                          }}>
                          <input
                            type="button"
                            value="-"
                            onClick={() => decrementCounter(index)}
                            style={{
                              backgroundColor: "#ff6b6b", 
                              color: "white", 
                              fontWeight: "bold", 
                              padding: "10px 15px", 
                              fontSize: "16px", 
                              border: "none", 
                              borderRadius: "5px", 
                              cursor: "pointer", 
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", 
                              transition:
                                "background-color 0.3s ease, transform 0.1s ease", 
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#e55a5a"; 
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#ff6b6b"; 
                            }}
                            onMouseDown={(e) => {
                              e.target.style.transform = "scale(0.95)"; 
                            }}
                            onMouseUp={(e) => {
                              e.target.style.transform = "scale(1)"; 
                            }}
                          />

                          <input
                            type="number"
                            value={quantities[index]}
                            
                            readOnly
                            style={{
                              height: "43px",
                              width: "60px",
                              textAlign: "center",
                              fontSize: "16px",
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                            }}
                          />
                          <input
                            type="button"
                            value="+"
                            onClick={() => incrementCounter(index)}
                            style={{
                              backgroundColor: "#4CAF50", 
                              color: "white", 
                              fontWeight: "bold", 
                              padding: "10px 15px", 
                              fontSize: "16px", 
                              border: "none", 
                              borderRadius: "5px",
                              cursor: "pointer", 
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", 
                              transition:
                                "background-color 0.3s ease, transform 0.1s ease",  
                            }}
                            onMouseOver={(e) => {
                              e.target.style.backgroundColor = "#43A047"; 
                            }}
                            onMouseOut={(e) => {
                              e.target.style.backgroundColor = "#4CAF50"; 
                            }}
                            onMouseDown={(e) => {
                              e.target.style.transform = "scale(0.95)"; 
                            }}
                            onMouseUp={(e) => {
                              e.target.style.transform = "scale(1)"; 
                            }}
                          />
                        </div>
                        <p
                          className="card-text"
                          style={{
                            color: product.product_stock < 10 ? "red" : "green",
                            fontWeight: "bold",
                          }}>
                          Instock: {product.product_stock}
                        </p>
                        <p className="card-text">
                          Price: {product.product_price}
                        </p>
                        <button
                          onClick={() => toggleAddToCartHandler(index,product)}
                          style={{
                            backgroundColor: isAdded[index]
                              ? "#00c853"
                              : "#6200ea",
                            color: "white",
                            padding: "10px 20px",
                            fontSize: "16px",
                          }}>
                          {isAdded[index] ? "Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomerSale;
