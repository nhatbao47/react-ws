import React from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../Services/CommonService";

const LoginPage = () => {
    let navigate = useNavigate();

    function handleClick() {
        fakeAuth.isAuthenticated = true;
        navigate('/');
    }

    return (
        <div className="unauthorized-layout">
            <h1>Login Page</h1>
            <button onClick={() => handleClick()}>Login</button>
        </div>
    );
}

export default LoginPage;