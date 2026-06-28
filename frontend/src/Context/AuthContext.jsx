//Authentication State Management: Context
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   // const [user, setUser] = useState(null);
    const [user, setUser] = useState(null);
    const login = (userData,rememberMe) => {
        console.log(userData);
        setUser(userData);
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("userdata", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("userdata");
        sessionStorage.removeItem("userdata");
    };

    return (
        <AuthContext.Provider value={{ login, logout, user , setUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
