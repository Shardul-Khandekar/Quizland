import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthenticationWrapper = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
        const navigate = useNavigate();
        const [authenticated, setAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const token = sessionStorage.getItem('token');
            axios.get('http://localhost:8080/api/users/secured', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                setAuthenticated(true);
            })
            .catch(error => {
                navigate('/login');
            })
            .finally(() => {
                setLoading(false);
            });
        }, []);

        if (loading) {
            return <div>Loading...</div>;
        }

        if (authenticated) {
            return <WrappedComponent {...props} />;
        } else {
            return <div>Unauthorized access</div>;
        }
    };

    return AuthenticatedComponent;
};

export default AuthenticationWrapper;