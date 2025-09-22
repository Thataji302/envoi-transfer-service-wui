/***
**Module Name: Homepage hitlab
 **File Name :  hitlab.js
 **Project :    Orasi Media
 **Copyright(c) : X Platform Consulting.
 **Organization : Peafowl Inc
 **author :  chandrasekhar
 **author :  Hari
 **license :
 **version :  1.0.0
 **Created on :
 **Created on: Dec 27 2022
 **Last modified on: Dec 27 2022
 **Description : contains Homepage hitlab component details.
 ***/
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { useHistory } from "react-router";

const Loader = () => {

    const history = useHistory();




    return (
        <>

            <div className="orasi-preloader">
                <img src="https://orasi-dev.imgix.net/orasi/common/images/preloader.png" />
            </div>

        </>
    );
};



export default Loader;
