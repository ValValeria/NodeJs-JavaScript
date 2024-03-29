import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import "./style.css";
import { Provider } from "react-redux";
import store from './Store/store'

const wrapper = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, wrapper) ;
