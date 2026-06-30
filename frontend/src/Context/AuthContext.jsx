//Authentication State Management: Context
import React, { createContext, useState,useEffect } from "react";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
   
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("userdata") || sessionStorage.getItem("userdata");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const login = (userData,rememberMe=true) => {
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
