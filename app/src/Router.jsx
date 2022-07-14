import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppShell from "./components/organisms/AppShell";
import TestView from "./components/organisms/TestViev";

const Router = () => {
    return (    
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppShell />}>
            <Route index element={<Home />}/></Route>
            <Route path="/menu" element={<TestView />} />
            <Route path="*" element={<div className="error">404</div>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router;