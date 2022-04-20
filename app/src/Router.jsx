import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
const Router = () => {
    return (    
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<div><Home /></div>}/>
            </Route>
            <Route path="*" element={<div className="error">404</div>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router;