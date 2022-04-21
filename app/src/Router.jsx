import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
    return (    
    <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<div>home</div>}/>
            </Route>
            <Route path="*" element={<div className="error">404</div>}/>
        </Routes>
    </BrowserRouter>)
}

export default Router;