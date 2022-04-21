import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

const RequireAuth = ({children}) => {
    const auth = useContext(AuthContext);
    let navigate = useNavigate();
    let location = useLocation();
    useEffect(()=>{
        if(auth.user.role !== "ADMIN"){
            navigate("/");
        }
    },[])
    return children
}

export default RequireAuth;