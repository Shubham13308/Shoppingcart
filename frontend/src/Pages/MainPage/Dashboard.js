import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/ui/Header';
import Sidebar from '../../Components/ui/Sidebar';
import CustomerSale from '../../Components/Product/CustomerSale';
import AddProduct from '../../Components/Product/AddProduct';
import ProductStock from '../../Components/Product/ProductStock';
import Analytics from '../../Components/Product/Analytics';
import AdminPanel from '../../Components/Admin/AdminPanel';
import { BASEURL } from '../../Auth/Matcher';
import { Link,useNavigate } from "react-router-dom";



const Dashboard = () => {
  const [page, setPage] = useState('');
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  
  const fetchData = async () => {
    setLoading(true); 
    const token = localStorage.getItem('token'); 

    try {
      const response = await axios.get(`${BASEURL}/users/admin-dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setData(response?.data?.data?.admin_username); 
    } catch (err) {
      
      console.error("Error fetching data:", err);
      navigate('/not-found')
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    fetchData(); 
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <Header data={data} page={page} />
      <div className="main-container d-flex flex-grow-1">
        <Sidebar setPage={handlePageChange} />
        {loading && <p>Loading...</p>} 
        {error && <div className="error">{error}</div>} 
        {page === "" && <CustomerSale data={data} />} 
        {page === "Add" && <AddProduct />} 
        {page === "Stock" && <ProductStock />}
        {page === "Analytics" && <Analytics/>}
        {page === "Admin" && <AdminPanel/>}
      </div>
    </div>
  );
};

export default Dashboard;
