import React, { useState } from 'react';
import axios from 'axios';
import './css//Registration.css';


function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

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
            const response = await axios.post('http://localhost:8080/api/users/register', formData);
            console.log(response.data); // Registration successful
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} placeholder="Enter new username" required onChange={handleChange} />
                <input type="email" name="email" value={formData.email} placeholder="Enter your email" required onChange={handleChange} />
                <input type="password" name="password" value={formData.password} placeholder="Enter your password" required onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>);
}

export default RegistrationForm;