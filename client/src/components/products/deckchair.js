import React from 'react';

const pStyles = { fontWeight: "bold", display: "inline-block", width: "90%" };
const h1Styles = {
    color: "#202020",
    textShadow: "2px 2px rgb(127, 80, 245)",
    marginBottom: "2rem",
}

const Deckchair = () => {


    return (
        <div>
            <h1 style={h1Styles}>Deckchair</h1>
            <br />
            <img src="../media/deckchair.jpg" />
            <h2>Specifications:</h2>
            <p>Height: 50" </p>
            <p>Width:   25"</p>
            <p>Length: 100"</p>
            <p style={pStyles}>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
            </p>
            <br />
            <hr />
            <p>Copyright 2022 E-Market</p>
        </div>
    );
};

export default Deckchair;