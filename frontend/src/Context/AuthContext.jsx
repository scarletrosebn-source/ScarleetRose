//Authentication State Management: Context
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   // const [user, setUser] = useState(null);
    const [user, setUser] = useState({ name: "Test User", role: "admin" });
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("userdata", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("userdata");
    };

    return (
        <AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
