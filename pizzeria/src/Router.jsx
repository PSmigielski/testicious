import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import './main.css';
import AppShell from "./pages/AppShell";
import Home from "./pages/Home";
import MenuNav from "./pages/Menu";
import Contact from "./pages/Contact";
import PizzaOfTheDay from "./pages/PizzaOfTheDay";
import Cart from "./pages/Cart";
import RequireAuth from "./components/organisms/RequireAuth";
const Router = () => {

  return(
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />}/>
          <Route path="/menu" element={<MenuNav />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/pizza-of-the-day" element={<PizzaOfTheDay />}/>
          <Route path="/cart" element={<Cart />}/>
        </Route>
        <Route path="/admin" element={<RequireAuth><AppShell /></RequireAuth>}>
          <Route path="/admin/products" element={<RequireAuth><div>produkty</div></RequireAuth>}/>
          <Route path="/admin/discounts" element={<RequireAuth><div>zniżki</div></RequireAuth>}/>
          <Route path="/admin/toppings" element={<RequireAuth><div>dodatki</div></RequireAuth>}/>
          <Route path="/admin/categories" element={<RequireAuth><div>kategorie</div></RequireAuth>}/>
        </Route>
        <Route path="*" element={<div>404</div>}/>
      </Routes>
    </BrowserRouter>
  )

}

export default Router;
