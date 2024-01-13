import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Landing.css';

function LandingPage() {

    return (
        <div className="landing-container">
            <h2>Welcome to QuizLand!</h2>
            <div className="options">
                <Link to="/register-for-quiz" className="option">
                    Register for a Quiz
                </Link>
                <Link to="/host-a-quiz" className="option">
                    Host a Quiz
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
