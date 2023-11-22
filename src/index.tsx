import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import AppWithReducers from "./AppWithReducers";
import AppWithRedux from "./AppWithRedux/AppWithRedux";
import App from './App/App'
import {store} from "./state/store";
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store = {store}>
        <AppWithRedux />
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

