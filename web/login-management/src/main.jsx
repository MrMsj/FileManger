import React from 'react'
import ReactDOM from 'react-dom/client'
//样式初始化一般放在最前面
import "reset-css"
//UI框架的样式

//全局样式
import "./assets/styles/global.scss"
//组件的样式
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
//import Router from "./router"

import { Provider } from 'react-redux'
import store from "@/store"

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
