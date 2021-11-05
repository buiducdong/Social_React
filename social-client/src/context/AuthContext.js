import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    // user: null,
    user: {
        _id: '617c2d98e673a885db1effe6',
        username: 'test',
        email: 'test@gmail.com',
        isAdmin: false,
        profilePicture: '',
        coverPicture: '',
        follower: [],
        following: [],
        
    },
    isFetching: false,
    error: false
};

export const AuthContext =  createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider 
            value={{
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}