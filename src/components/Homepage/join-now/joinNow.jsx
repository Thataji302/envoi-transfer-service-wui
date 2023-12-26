/***
**Module Name: Homepage join now
 **File Name :  joinNow.js
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
 **Description : contains Homepage join now component details.
 ***/
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ReactHtmlParser from 'react-html-parser';
import $ from "jquery";
import * as Config from "../../../constants/Config";
const JoinNow = (props) => {

    const history = useHistory();
    const [config, setConfig] = useState({});
    const [sec5, setSec5] = useState({});
    let img =window.app.img;
    useEffect(() => {
        if(window.site){
          setConfig(window.site);
         
        }
       
      }, [window.site]);
    
      if(config.common && config.common.resourcesUrl ){
         img = config.common.resourcesUrl;
      }
      
      useEffect(() => {
        {
            props.menus && props.menus.length > 0 && props.menus.map(function (item, i) {
                if (item.menuid === 100001) {
                     setSec5(item.team[4]);
                  
                }
            })
        }
    }, [props.menus]);

     function handleJoin(){
    history.push('./signup');
    }

    // const img= "https://orasi.imgix.net/orasi/client/resources/orasiv1/images";

    return (

        <>
        
        <h1 className="sec-heading">{sec5.caption1}<br /><span>{sec5.caption2}</span></h1><div className="sell-buy-wrapper">
            <div className="sell-buy-block" data-aos="fade-right">
                <div className="sell-buy-header yellow-gradient">
                    <img src={img + Config.imgmiddle + "/sellerBen.png?auto=compress,format"} />
                    <h3>Seller Benefits<br />Content Owner Benefits</h3>

                </div>
                <div className="triborder"></div>
                <div className="sell-buy-body">
                {ReactHtmlParser(sec5.sellerBenfits)}
                    {/* <ul>
                        <li>Improve sales And Marketing Productivity at both the Individual And Company level.</li>
                        <li>Reach tertiary markets more effectively</li>
                        <li>Generate new revenue opportunities.</li>
                        <li>Gain access to new opportunities to License Media Content.</li>
                        <li>Benefit From Low/No cost marketing resources and tools.</li>
                    </ul> */}

                </div>
            </div>

            <div className="sell-buy-block" data-aos="fade-left">
                <div className="sell-buy-header yellow-gradient">
                    <img src={img + Config.imgmiddle + "/buyerBen.png?auto=compress,format"} />
                    <h3>Buyer Benefits<br />Content Owner Benefits</h3>

                </div>
                <div className="triborder"></div>
                <div className="sell-buy-body">
                {ReactHtmlParser(sec5.buyerBenfits)}
                    {/* <ul>
                        <li>Unlock access to a much broader and deeper pool of media content including previously inaccessible libraries and territories.</li>
                        <li>Manage the acquisition process and improve effectiveness.</li>
                        <li>Find critical information more quickly and more efficiently.</li>
                        <li>Gain access to new opportunities to license media content.</li>
                        <li>Benefit from direct control of the
                            media acquisition process to decrease costs.</li>
                    </ul> */}
                </div>
            </div>

        </div><button className="fill_btn yellow-gradient mt-5" onClick={handleJoin}>JOIN NOW</button>
        </>
    );
};



export default JoinNow;
