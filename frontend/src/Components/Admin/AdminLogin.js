import React, { useState } from "react";
import axios from 'axios'; 
import '../../css/Admin/admin.css';
import { Link,useNavigate } from "react-router-dom";
import { BASEURL } from "../../Auth/Matcher";
const AdminLogin = () => {
    const [formdata, setFormData] = useState({
        admin_username: '',
        admin_password: ''
    });
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formdata,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await axios.post(`${BASEURL}/users/admin-login`, { 
                admin_username: formdata.admin_username,
                admin_password: formdata.admin_password,
                rememberMe,
            });

       
            if(response.data.data.token){
              localStorage.setItem('token',response.data.data.token)
            }
       navigate('/dashboard')
            
        } catch (error) {
       
            setError("Login failed. Please check your credentials."); 
            console.error("Login error:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <>
            <div className="wrapper">
                <form onSubmit={handleLogin}>
                    <h2 style={{color:"white"}}>Login</h2>
                    {error && <div className="error">{error}</div>} {/* Display error if any */}
                    <div className="input-field">
                        <input
                            type="text"
                            name="admin_username"
                            value={formdata.admin_username}
                            onChange={handleChange}
                            required
                        />
                        <label>Enter your email</label>
                    </div>
                    <div className="input-field">
                        <input
                            type="password"
                            name="admin_password"
                            value={formdata.admin_password}
                            onChange={handleChange}
                            required
                        />
                        <label>Enter your password</label>
                    </div>
                    <div className="forget">
                        <label htmlFor="remember">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <p>Remember me</p>
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>
                    <button type="submit" disabled={loading}> {/* Disable button while loading */}
                        {loading ? 'Logging In...' : 'Log In'}
                    </button>
                    <div className="register">
                        <p>
                            Don't have an account? <Link to='/register'>Register</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminLogin;
