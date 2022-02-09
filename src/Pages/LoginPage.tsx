import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../Services/CommonService";
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, SetUsername] = useState('');
    const [password, SetPassword] = useState('');
    const [showMessage, SetShowMessage] = useState(false);
    const adminUser = 'admin';

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (username === adminUser && password === '123456') {
            fakeAuth.isAuthenticated = true;
            fakeAuth.username = adminUser;
            navigate('/dashboard');
        } else {
            SetShowMessage(true);
        }
    }

    return (
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
                <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="img-container">
                        <img src="/img/avatar.png" alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label htmlFor="username"><b>Username</b></label>
                        <input type="text" placeholder="Enter username" name="username" onChange={(e) => SetUsername(e.target.value)} required />
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" placeholder="Enter password" name="password" onChange={(e) => SetPassword(e.target.value)} required />
                        {showMessage && (
                            <div className="text-danger">
                                Your username or password is not correct
                            </div>
                        )}
                        <button type="submit">Login</button>
                        <p className="hint">Test user: <i>admin/123456</i></p>
                    </div>
                </form>
            </div>
            <div className="col-md-4"></div>
        </div>
    );
}

export default LoginPage;