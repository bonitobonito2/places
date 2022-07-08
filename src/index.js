import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
  <Provider store = {store}>
  <App />
  </Provider>
   
  </BrowserRouter>,
  document.getElementById("root")
);
