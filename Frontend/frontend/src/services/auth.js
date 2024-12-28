import API_URL from "../config";
import { jwtDecode } from "jwt-decode";



export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error("Falha no login");
    }

    return response.json(); 
};

export const saveToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const getToken = () => {
    return localStorage.getItem("authToken");
};

export const removeToken = () => {
    localStorage.removeItem("authToken");
};

export const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;

    const { exp } = jwtDecode(token); 
    return Date.now() >= exp * 1000; 
};
