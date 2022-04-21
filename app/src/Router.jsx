import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppShell from "./components/organisms/AppShell";

const Router = () => {
    return (    
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppShell />}>
            <Route index element={<Home />}/></Route>
            <Route path="*" element={<div className="error">404</div>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router;