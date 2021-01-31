import React, {createContext,useContext,useReducer} from 'react'
import reducer, { initState } from './reducer';
import authReducer, {AuthinitState} from './auth/authReducer'

export const StateContext = createContext();

export const StateProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,initState);
    const [authState,authDispatch] = useReducer(authReducer,AuthinitState)

    return (
        <StateContext.Provider value={{
            state,
            dispatch,
            authState,
            authDispatch
        }}>
            {children}
        </StateContext.Provider> 
    )
};


export const useStateValue = () => useContext(StateContext);

