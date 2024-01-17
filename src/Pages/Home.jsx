import React, { useContext } from "react";
import { ThemeContext } from "../Component/Theme/Context";
import { Container } from "@mui/material";

const Home = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <Container>
            <div className="landing-container">
                <h1 className="heading1">Primary Text</h1>
                <br />

                <h1 className="heading2" >Secondary Text</h1>
                <br />

                <h1 className="heading3" style={{ color: 'blueviolet' }}>Blue Primary Text</h1>
                <br />

                <h1 className="heading4" style={{ color: 'green' }}>Green Secondary Text</h1>
                <br />

                <div className="container1">
                    <p>Secondary Background</p>
                </div>
                <br />

            </div>
        </Container>
    );
};

export default Home;
