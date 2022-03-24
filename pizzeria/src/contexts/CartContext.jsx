import React, { useReducer } from "react";


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
            return arr2;
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
    const [items, dispatch] = useReducer(reducer, [])
    const handleAdd = (data) => {
        dispatch({type: "add", payload: data});
    }
    const handleDelete = (id) => {
        dispatch({type: "add", payload: { id } });
    }   
    return (
        <CartContext.Provider
            value={{
                items,
                dispatch,
                handleAddProp: (data) => handleAdd(data),
                handleDeleteProp: (id) => handleDelete(id)
            }}
        >
            {children}
        </CartContext.Provider>
    )
}