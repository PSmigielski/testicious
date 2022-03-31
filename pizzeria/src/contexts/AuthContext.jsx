import React, { useState } from "react";
import useLocallyPersistedReducer from "../hooks/useLocallyPresistedReducer";

export const AuthContext = React.createContext();
const reducer = (prevState, action) => {
    let data = {...prevState};
    switch(action.type){
        case "LOGIN":
            return {...data, id: action.payload.id, email: action.payload.email, role: action.payload.role}
        case "RESET":
            return {id: null, email: null, role: null}
        default:
            throw new Error("cos sie zepsuło");
    }
}

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setItAdmin] = useState(false);
    const [state, dispatch] = useLocallyPersistedReducer(reducer, {id: null, email: null, role: null})
    return ( <AuthContext.Provider
        value={{
            user: state,
            dispatch
        }}>
        {children}
    </AuthContext.Provider> )
}
