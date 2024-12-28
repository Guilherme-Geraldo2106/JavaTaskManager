import React, { createContext, useState, useEffect } from "react";
import { isTokenExpired, getToken, removeToken } from "../services/auth";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = () => {
            const token = getToken();
            if (!token || isTokenExpired()) {
                setIsAuthenticated(false);
                removeToken();
                navigate("/login"); 
            } else {
                setIsAuthenticated(true);
            }
        };

        checkToken();
        const interval = setInterval(checkToken, 60000); 
        return () => clearInterval(interval); 
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
