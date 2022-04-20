import { useEffect, useReducer } from "react"

function useLocallyPersistedReducer(reducer, defaultState, key,init = null) {
    const hookVars = useReducer(reducer, defaultState, (defaultState) => {
        const persisted = JSON.parse(sessionStorage.getItem(key))
        return persisted !== null
        ? persisted
        : init !== null ? init(defaultState) : defaultState
    })
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(hookVars[0]))
    }, [hookVars])
    return hookVars
}

export default useLocallyPersistedReducer;