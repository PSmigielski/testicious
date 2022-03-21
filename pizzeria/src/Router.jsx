import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './main.css';
import AppShell from "./pages/AppShell";
import Home from "./pages/Home";
import MenuNav from "./pages/Menu";
import PizzaOfTheDay from "./pages/PizzaOfTheDay";

const Router = () => {

  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />}/>
        <Route path="/menu" element={<MenuNav />}/>
        <Route path="/pizza-of-the-day" element={<PizzaOfTheDay />}/>
      </Route>
      <Route path="*" element={<div>404</div>}/>
    </Routes>
  </BrowserRouter>
  )

}

export default Router;
