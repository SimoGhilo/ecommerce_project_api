import "../styles/items.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}
const pStyles = { fontWeight: "bold", display: "inline-block", width: "90%" };

const Stool = () => {

    const [goBack, setGoBack] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        if (goBack) {
            navigate(-1)
        }
    }, [goBack])


    return (
        <div>
            <h1 style={h1Styles}>Stool</h1>
            <br />
            <img src="https://images.unsplash.com/photo-1625418419248-54a6a90c6776?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c3Rvb2x8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" />
            <h2>Specifications:</h2>
            <p>Height: 30" </p>
            <p>Width:   10"</p>
            <p>Length: 8.2"</p>
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

export default Stool;