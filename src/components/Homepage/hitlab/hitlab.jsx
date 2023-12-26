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
import * as Config from "../../../constants/Config";
const HitLab = () => {

    const history = useHistory();
    const [config, setConfig] = useState({});

    let img =window.app.img;
    useEffect(() => {
        if(window.site){
          setConfig(window.site);
         
        }
       
      }, [window.site]);
    
      if(config.common && config.common.resourcesUrl ){
         img = config.common.resourcesUrl;
      }
    function handleJoin(){
        window.open(
            'https://deas.hitlab.com/?ref=ORASI',
            '_blank' 
          );
   }

  
   const cardWidth = $(".laptop").width();

    return (
        <><div className="section hitlab">
            <div className="container-hitlab">
                <div className="row">
                    <div className="col-md-6">
                        <div className="hitlab-block" data-aos="fade-up">
                            <h1 className="hitlab-heading">Where Music Meets
                                Artificial Intelligence:<br /><span className="mt-5">HITLAB</span></h1>
                            <p>HITLAB is a digital media & entertainment company that is revolutionizing the way cultural content is discovered, produced, and consumed.</p>
                            <ul>
                                <li>
                                    <span className="material-icons"> psychology </span>
                                    Using patented AI technology and innovative software developed in-house, to connect, engage and create strong interactions between consumers and brands.
                                </li>
                                <li>
                                    <span className="material-icons"> language </span>
                                    The Digital Emerging Artist Showcase a platform for artists to access record labels, streaming opportunities and increase their social media presence.
                                </li>
                            </ul>
                            <button className="fill_btn yellow-gradient mt-3" onClick={handleJoin}>JOIN NOW</button>
                        </div>

                    </div>
                    <div className="col-md-6 laptop" data-aos="zoom-in-left">
                        <img src={img + Config.imgmiddle + "/Laptop.png?auto=compress,format&width=" + cardWidth} />
                    </div>
                </div>
            </div>

        </div><div className="section ">
                <h1 className="sec-heading mt-5" data-aos="fade-up"><span>CUSTOMIZE WEBSITE CONTROL</span></h1>
                <p className="map-dec my-4 center-desc" data-aos="fade-up">We work with a large number of OTT platforms in India, Australia, Africa, UK, USA & Canada. We provide a single-point of contact for the entire deal process. No need to interact with multiple individuals within a company. We handle all aspects of the deal, including Negotiations, Legal Agreement Queries, Delivery, Follow-ups. We even upload the content on our marketplace for you. Even when you are dealing with multiple clients, we remain a single point of contact – full service organization.</p>
                <div className="customize-block">
                    <div className="customize-sec" data-aos="fade-up" data-aos-delay="150">
                        <p><span className="material-symbols-outlined"> touch_app </span></p>
                        <ul>
                            <li>Full Transparency.</li>
                            <li>Partial Automation with Human Touch.</li>
                            <li>Simple & Easy.</li>
                        </ul>
                    </div>

                    <div className="customize-sec" data-aos="fade-up" data-aos-delay="300">
                        <p><span className="material-symbols-outlined"> cloud_upload </span></p>
                        <ul>
                            <li>Uploading & maintaining content.</li>
                            <li>Adding subtitles.</li>
                            <li>Negotiation, Legal agreement.</li>
                            <li>Post Sales Service.</li>
                        </ul>
                    </div>

                    <div className="customize-sec" data-aos="fade-up" data-aos-delay="450">
                        <p><span className="material-symbols-outlined"> ads_click </span></p>
                        <ul>
                            <li>We curate content.</li>
                            <li>Bring Niche content from international markets.</li>
                            <li>One-point contact enabling quicker interactions.</li>
                        </ul>
                    </div>


                </div>

            </div></>
    );
};



export default HitLab;
