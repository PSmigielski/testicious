import React from "react";
import useLocallyPersistedReducer from "../hooks/useLocallyPresistedReducer";
function init(initialState) {
    return initialState;
}
function reducer(prevState, action) {
    let data = {items: [...prevState.items], overallPrice: prevState.overallPrice}
    switch (action.type) {
        case "add":
            if(data.items.length > 0){
                const itemIdx = data.items.findIndex((item) => item.id === action.payload.id )
                if(itemIdx !== -1){
                    const quantity = action.payload.quantity + data.items[itemIdx].quantity;
                    action.payload.quantity = quantity;
                    data.items.splice(itemIdx,1);
                }
                data.items.push(action.payload);
                data.overallPrice += action.payload.quantity * action.payload.price
            }else{
                data.items.push(action.payload);
                data.overallPrice += action.payload.quantity * action.payload.price
            }
            return data;
        case "remove":
            const itemIdx = data.items.findIndex((item) => item.id === action.payload.id);
            if(itemIdx !== -1){
                const item = data.items[itemIdx];
                data.items.splice(itemIdx,1);
                if(data.items.length === 0){
                    data.overallPrice = 0;
                }else{
                    data.overallPrice -= item.quantity * item.price;
                }
            }
            return data;
        case "update":
            const item = data.items.find((item) => item.id === action.payload.id)
            if(item){
                const itemIdx = data.items.findIndex((item) => item.id === action.payload.id)
                const oldQuantity = item.quantity
                item.quantity = action.payload.quantity
                data.items[itemIdx] = item
                if(oldQuantity > action.payload.quantity){
                    return {...data, overallPrice: data.overallPrice -= item.price}
                }
                else{
                    return {...data, overallPrice: data.overallPrice += item.price}
                }
            }
            return data;
        case "reset":
            return init({
                items:[],
                overallPrice: 0
            });
        default:
    }
}
export const CartContext = React.createContext();
export const CartProvider = ({ children }) => {


    const [cartData, dispatch] = useLocallyPersistedReducer(reducer, {
        items:[],
        overallPrice: 0
    })
    const handleAdd = (data) => {
        dispatch({type: "add", payload: data});
    }
    const handleDelete = (id) => {
        dispatch({type: "remove", payload: { id } });
    }  
    const handleUpdate = (id, quantity) => {
        dispatch({type: "update", payload: { id, quantity }})
    }
    const handleReset = () => {
        dispatch({type: "reset"});
    } 
    return (
        <CartContext.Provider
            value={{
                cartData,
                dispatch,
                handleAddProp: (data) => handleAdd(data),
                handleDelete,
                handleUpdate,
                handleReset
            }}
        >
            {children}
        </CartContext.Provider>
    )
}