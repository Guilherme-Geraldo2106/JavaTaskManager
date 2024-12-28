import API_URL from "../config";

export const register = async (credentials) => {
    const response = await fetch(`${API_URL}/usuarios/registrar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const text = await response.text(); 
    return text; 
};
