import { useState } from "react";

function useInput(defaultState, defaultError){
    const [state, setState] = useState(defaultState);
    const [error, setError] = useState(defaultError);
    const reset = () => {
        setState(defaultState);
        setError(defaultError);
    }
    return [state, setState, error, setError, reset]
}

export default useInput;