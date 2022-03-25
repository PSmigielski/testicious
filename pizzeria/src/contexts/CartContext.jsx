import React, { useEffect, useReducer } from "react";


export const CartContext = React.createContext();

function reducer(prevState, action) {
    switch (action.type) {
        case "add":
            let arr1 = [...prevState]
            if(arr1.length > 0){
                const itemIdx = arr1.findIndex((item) => item.id === action.payload.id )
                if(itemIdx !== -1){
                    const quantity = action.payload.quantity + arr1[itemIdx].quantity;
                    action.payload.quantity = quantity;
                    arr1.splice(itemIdx,1);
                }
                arr1.push(action.payload);
            }else{
                arr1.push(action.payload);
            }
            return arr1;
        case "remove":
            let arr2 = [...prevState]
            const itemIdx = arr2.findIndex((item) => item.id === action.payload.id);
            if(itemIdx !== -1){
                arr2.splice(itemIdx,1);
            }
            console.log(arr2)
            console.log("dupa")
            return arr2;
        case "update":
            let arr3 = [...prevState]
            const item = arr3.find((item) => item.id === action.payload.id)
            if(item){
                const itemIdx = arr3.findIndex((item) => item.id === action.payload.id)
                item.quantity = action.payload.quantity
                arr3[itemIdx] = item
            }
            return arr3;
        case "reset":
            init([]);
            break;
        default:
    }
}
function init(initialState) {
    return initialState;
}
export const CartProvider = ({ children }) => {

    function useLocallyPersistedReducer(reducer, defaultState, init = null) {
        const hookVars = useReducer(reducer, defaultState, (defaultState) => {
            const persisted = JSON.parse(sessionStorage.getItem("items"))
            return persisted !== null
            ? persisted
            : init !== null ? init(defaultState) : defaultState
        })
        useEffect(() => {
            sessionStorage.setItem("items", JSON.stringify(hookVars[0]))
        }, [hookVars])
        return hookVars
    }
    const [items, dispatch] = useLocallyPersistedReducer(reducer, [])
    const handleAdd = (data) => {
        dispatch({type: "add", payload: data});
    }
    const handleDelete = (id) => {
        dispatch({type: "remove", payload: { id } });
    }  
    const handleUpdate = (id, quantity) => {
        dispatch({type: "update", payload: { id, quantity }})
    }
    return (
        <CartContext.Provider
            value={{
                items,
                dispatch,
                handleAddProp: (data) => handleAdd(data),
                handleDelete,
                handleUpdate
            }}
        >
            {children}
        </CartContext.Provider>
    )
}