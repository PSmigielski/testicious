import React, { createContext } from "react";

export const MenuContext = createContext

export const MenuProvider = ({children}) => {
    return (
    <MenuContext.Provider
        value={{
            data: "dane"
        }}
    >
        {children}
    </MenuContext.Provider>)
}