import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import Menu from './components/Menu';
import 'bootswatch/dist/cosmo/bootstrap.min.css';



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Menu />
    <div className="container">
      <App />
    </div>
  </>
  
);