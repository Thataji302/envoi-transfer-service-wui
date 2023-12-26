/***
**Module Name: terms
 **File Name :  signupterm.js
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
 **Description : contains signup terms and conditions details.
 ***/
import React, { useState, useEffect,useContext } from "react";

import tmdbApi from "../api/tmdbApi";
// import "../../src/assets/css/style.css"
import SweetAlert from 'react-bootstrap-sweetalert';

import Modal from 'react-bootstrap/Modal';
import * as Config from "./../constants/Config";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ReactHtmlParser from 'react-html-parser';
import { contentContext } from "../context/contentContext";
import { useParams, Link } from 'react-router-dom';

import { useHistory } from "react-router-dom";
const SignUpTerms = () => {
    const history = useHistory();
    let { id } = useParams();
    const [agree, setAgree] = useState(false);
    const [showInvalid, setShowInvalid] = useState(false);
    const [error, setError] = useState('');
    const [config, setConfig] = useState({});
    const [popup, setPopUp] = useState(false);
    const [activeLoad, setActiveLoad] = useState("");

    useEffect(() => {
        if (id == undefined) {
            history.push("/signup");
        }
    }, []);
    const { menus } = useContext(contentContext)
    // console.log('emailid-->',id)
    // console.log('link-->',Link)
    useEffect(() => {
        if (window.site) {
            setConfig(window.site);

        }

    }, [window.site]);

    let img = "https://orasi-dev.imgix.net/";

    if (config.common && config.common.resourcesUrl) {
        img = config.common.resourcesUrl;
    }

    if (window.site === undefined) {
        setTimeout(function () {
            if (window.site && window.site.common && window.site.common.resourcesUrl) {
                img = window.site.common.resourcesUrl;

                //  console.log('window.sitewindow.sitewindow.site======>',img)

            }
        }, 1000);
    }
    // console.log("img", img);
    // console.log("window.site-->", window.site);
    const validateEmail = () => {
        let formIsValid = true;
        const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}(.[a-zA-Z{2,8}])?/g;
        if (regEx.test(id)) {
            setError("");

            // setShowInvalid(false)
        } else if (!regEx.test(id) && id !== "") {
            //   setError("Email is Not Valid");
            setShowInvalid(true)
            formIsValid = false;
        }
        return formIsValid;
    }
    const handleAccept = () => {

        const isValid = validateEmail()
        if (isValid) {
            if (activeLoad == "") {
                updateUserCall()
            }
        }
    }
    const onConfirm = () => {
        history.push('./../signup')
        setShowInvalid(false)
    }
    const updateUserCall = async () => {

        if (agree) {
            try {
                setActiveLoad("acceptTerms")
                const response = await tmdbApi.updateUser({
                    "emailid": id,
                    "termsAcceppt": true
                });
                console.log(response);
                if (response.statusCode === 200) {
                    history.push('/message');
                } else {
                    setError(response.result);
                    setTimeout(function () { setError("") }, 3000);
                    history.push('/signup');
                }
                setActiveLoad("")
            } catch {
                setActiveLoad("")
                console.log("error");
            }
        } else {
            setPopUp(true);
        }


    };
    function handleClose() {
        history.push("/");
    }
    function handleBack() {
        history.push("/signup");
    }
    // console.log("agree", agree);
    function onCancel() {
        setPopUp(false);
    }
    return (
        <>
            {/* 
<Modal className="access-denied" show={showInvalid}>
 
 <div className="modal-body enquiry-form">
     <div className="container">
         <button className="close-btn" onClick={e => onConfirm()}><span className="material-icons">close</span></button>
         <span className="material-icons access-denied-icon">delete_outline</span>
         <h3>Email not found</h3>
         <p>Please sign up</p>

         <button className="fill_btn yellow-gradient" data-bs-toggle="modal" data-bs-target="#recommendModal" onClick={e => onConfirm()}>Yes, Remove</button>

     </div>
 </div>

</Modal> */}

            <button className="close-btn" onClick={handleClose}><span className="material-icons">close</span></button>
            <button className="back-btn" onClick={handleBack}><span className="material-icons"> arrow_back_ios </span></button>
            <div className="terms-header accept-terms"><a href="/">
                <img src={img + Config.imgmiddle + "logoupdated.png?auto=compress,format"} className="logo" />
            </a>
                <h5>Accept Orasi Terms to complete registration</h5>
            </div>
            <div className="terms-wrapper">

                <div className="terms-body">
                    {menus && menus.length > 0 && menus.map(function (item, i) {
                        return (
                            item.menuid === 100006 ? <div className="terms-cls-wrapper" key={i}>{ReactHtmlParser(item.content)}</div> : ""
                        )
                    })}

                </div>
                <div className="terms-footer">
                    <div className="terms-footer-wrapper">
                        <div className="flex-left terms-block">
                            <input type="checkbox" id="terms-check" onClick={(e) => setAgree(e.target.checked)} />
                            <label> I Agree to the terms of Orasi Media Market Place.</label>
                        </div>
                        <button className="fill_btn yellow-gradient" onClick={handleAccept}>{activeLoad === "acceptTerms" ?

                            (<img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images/common-icons/rotate_right.svg" className="loading-icon" />) : null}ACCEPT</button>
                    </div>
                    {error != "" ?
                        <span className="errormsg" style={{
                            fontWeight: 'bold',
                            color: 'red',
                        }}>{error}</span> : ""
                    }
                </div>

            </div>
            <Modal className="access-denied" show={popup}>

                <div className="modal-body enquiry-form">
                    <div className="container">
                        <button className="close-btn" onClick={e => onCancel()}><span className="material-icons">close</span></button>

                        <span className="material-icons access-denied-icon"></span>
                        <h3></h3>
                        <p></p>
                        <h5>Please Accept Terms and Conditions</h5>




                    </div>
                </div>

            </Modal>
            <SweetAlert show={showInvalid}
                custom
                confirmBtnText="Ok"
                confirmBtnBsStyle="primary"
                title={"Invalid Url"}
                onConfirm={e => onConfirm()}
            >
            </SweetAlert>

        </>
    );
};

export default SignUpTerms;
