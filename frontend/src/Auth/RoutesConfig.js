import React from "react";
import { Routes, Route } from "react-router-dom";
import Adminloginpage from "../Pages/Admin/Adminloginpage";
import Adminregisterpage from "../Pages/Admin/Adminregisterpage";
import Loader from "../Components/ui/Loader";
import Dashboard from "../Pages/MainPage/Dashboard";
import NotFound from "../Components/ui/NotFound";
import ProtectedRoutes from "../Auth/ProtectedRoutes";

const RoutesConfig = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Adminloginpage />} />
      <Route path="/register" element={<Adminregisterpage />} />
      <Route path="/loader" element={<Loader />} />
      <Route path="/not-found" element={<NotFound />} />

      
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      
      <Route path="/not-found" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesConfig;
