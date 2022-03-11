import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './main.css';
import AppShell from "./pages/AppShell";
import Home from "./pages/Home";

const Router = () => {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />}/>
        <Route path="/menu" element={<div>menu</div>}/>
      </Route>
      <Route path="*" element={<div>404</div>}/>
    </Routes>
  </BrowserRouter>
  )

}

export default Router;
