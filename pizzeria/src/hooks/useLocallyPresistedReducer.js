import { useEffect, useReducer } from "react"

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

export default useLocallyPersistedReducer;