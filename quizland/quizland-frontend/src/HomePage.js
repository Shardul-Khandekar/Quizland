import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="app-name">Quizland</h1>
            <div className="auth-links">
                <Link to="/registration">Register</Link>
                <span className="divider">|</span>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default HomePage;