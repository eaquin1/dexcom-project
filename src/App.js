import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import { ClipLoader } from "react-spinners";
import Routes from "./Components/Routes";
import Api from "./Helpers/api";

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [userId, setUserId] = useState(null);
    const [cookie, setCookie] = useState(document.cookie);
    useEffect(() => {
        const getUser = async () => {
            let user = await Api.ensureUser();

            setUserId(user);
            setInfoLoaded(true);
        };
        getUser();
    }, []);

    const handleLogOut = async () => {
        await Api.logoutUser();
        setUserId(null);
        setCookie(null);
    };
    if (!infoLoaded) {
        return (
            <ClipLoader
                size={150}
                color="#123abc"
                css={{
                    display: "block",
                    margin: "auto",
                }}
            />
        );
    }
    return (
        <BrowserRouter>
            <Nav user={cookie} logout={handleLogOut} />
            <Routes user={userId} />
        </BrowserRouter>
    );
}

export default App;
