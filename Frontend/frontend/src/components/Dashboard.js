import React from "react";
import { removeToken } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken(); 
        navigate("/login"); 
    };

    return (
        <div>
            <h1>Bem-vindo ao Dashboard</h1>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Dashboard;
