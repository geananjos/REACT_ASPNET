// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import App from './App';


// ReactDOM.render(
//   <div className="container">
//     <App />
//   </div>,
//   document.getElementById('root')
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import Menu from './components/Menu'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Menu />
    <div className="container">
      <App />
    </div>
  </>
  
);

//reportWebVitals();