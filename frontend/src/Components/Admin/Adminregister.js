import React, { useState } from "react";
import '../../css/Admin/admin.css'
import { Link } from "react-router-dom";
const Adminregister = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
  
    const handleRegister = (e) => {
      e.preventDefault();
      
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Remember Me:", rememberMe);
    };
  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h2>Signup</h2>
        <div className="input-field">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Enter your email</label>
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <button type="submit">Create</button>
        <div className="register">
          <p>
             Have an account? <Link to='/'> <a>Login</a></Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Adminregister