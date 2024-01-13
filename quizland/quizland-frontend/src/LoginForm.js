import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', formData);
            console.log(response.data);
            const { token, email } = response.data; // Extract email from response
            // Store JWT token and email in session
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('email', email);
            // Redirect to the main page
            navigate('/landingpage');
        } catch (error) {
            console.error('Login Failed:', error);
            // Display error message to user
            setErrorMessage('Login failed. Please check your credentials.');
            navigate('/login');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={formData.email} placeholder="Enter your email" required onChange={handleChange} />
                <input type="password" name="password" value={formData.password} placeholder="Enter your password" required onChange={handleChange} />
                <button type="submit">Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
