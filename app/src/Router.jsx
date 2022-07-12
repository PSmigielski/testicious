import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppShell from "./components/organisms/AppShell";
import HomePreviev from "./components/organisms/HomePreviev";

const Router = () => {
    return (    
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppShell />}>
            <Route index element={<Home />}/></Route>
            <Route path="/menu" element={<HomePreviev />} />
            <Route path="*" element={<div className="error">404</div>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router;