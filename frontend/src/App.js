import React from "react";
import { Provider } from "react-redux";
import store from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./Auth/RoutesConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
      <RoutesConfig/> 
      </Router>
    </Provider>
  );
};

export default App;
