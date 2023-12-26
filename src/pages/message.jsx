/***
**Module Name: sucess message
 **File Name :  message.js
 **Project :    Orasi Media
 **Copyright(c) : X Platform Consulting.
 **Organization : Peafowl Inc
 **author :  chandrasekhar
 **author :  Hari
 **license :
 **version :  1.0.0
 **Created on :
 **Created on: Dec 29 2022
 **Last modified on: Dec 29 2022
 **Description : contains success page details.
 ***/
import React, { useState, useEffect, useContext} from "react";
import tmdbApi from "../api/tmdbApi";

// import "../../src/assets/css/style.css"
import * as Config from "./../constants/Config";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useHistory } from "react-router-dom";
import { contentContext } from "../context/contentContext";

const SignupMessage = () => {
    const history = useHistory();
    // const [menus, setMenus] = useState([]);
    const [config, setConfig] = useState({});
    const [msg, setMsg] = useState(false);

    const { menus } = useContext(contentContext);
 
    useEffect(() => {
        if (localStorage.getItem("rejected")) {
            setMsg(true);
        }
        // appMenus();
    }, []);

    useEffect(() => {
        if (window.site) {
            setConfig(window.site);

        }

    }, [window.site]);

    if (config.common && config.common.resourcesUrl) {
        var img = config.common.resourcesUrl;
    }
    // const appMenus = async () => {
    //     try {
    //         console.log(tmdbApi);
    //         const response = await tmdbApi.appMenus({ result: "micro" });
    //         setMenus(response.result)
    //         console.log(response);
    //     } catch {
    //         console.log("error");
    //     }
    // };

    function handleClose() {
        history.push("/");
        localStorage.removeItem("rejected");
    }
    return (
        <>
            <button className="close-btn" onClick={handleClose} ><span className="material-icons">close</span></button>
            {msg ? <div className="pending-wrapper">
                <div className="pending-header">
                    <a href="/"> <img src={"https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images//logoupdated.png?auto=compress,format"} className="big_logo mb-5" /></a>
                    <p className="mb-5">Your Account has been Rejected.</p>
                    <p className="mb-5">Please Contact Admin</p>
                    <button className="fill_btn yellow-gradient" onClick={handleClose}>BACK TO HOME</button>
                </div>

            </div>
                :
                <div className="pending-wrapper">
                    <div className="pending-header">
                        <a href="/"> <img src={"https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images//logoupdated.png?auto=compress,format"} className="big_logo mb-5" /></a>
                        <h1 className="mb-3">Thank you for your interest in participating with Orasi B2B marketplace.</h1>
                        <p className="mb-5">Our team will work on your account creation. You will be notified by email soon.</p>
                        <button className="fill_btn yellow-gradient" onClick={handleClose}>BACK TO HOME</button>
                    </div>

                </div>
            }

            <Footer menus={menus} />


        </>
    );
};

export default SignupMessage;
