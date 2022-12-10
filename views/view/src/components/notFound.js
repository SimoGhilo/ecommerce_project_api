import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    // Redirects you to the homepage if path doesn't exist

    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000)
    }, []);


    return (
        <div>
            <h1>Not Found</h1>
        </div>
    );
};

export default NotFound;