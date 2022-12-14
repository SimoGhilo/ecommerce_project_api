import "../styles/items.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}
const pStyles = { fontWeight: "bold", display: "inline-block", width: "90%" };

const Table = () => {

    const [goBack, setGoBack] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        if (goBack) {
            navigate(-1)
        }
    }, [goBack])

    return (
        <div>
            <h1 style={h1Styles}>Table</h1>
            <br />
            <img src="https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=709&q=80" />
            <h2>Specifications:</h2>
            <p>Height: 45" </p>
            <p>Width:   275"</p>
            <p>Length: 356.3"</p>
            <p style={pStyles}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <h5 className='link' onClick={() => setGoBack(true)}>Go back</h5>
            <br />
            <hr />
            <p>Copyright 2022 E-Market</p>
        </div>
    );
};

export default Table