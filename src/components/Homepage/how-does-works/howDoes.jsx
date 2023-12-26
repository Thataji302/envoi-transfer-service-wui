/***
**Module Name: Homepage How does it works
 **File Name :  howDoes.js
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
 **Description : contains Homepage How does it works component details.
 ***/
import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

import VideoPlayer from "react-video-js-player";
import 'video.js/dist/video-js.css';

import { useHistory } from "react-router";
import { Player } from 'bitmovin-player';
import { UIFactory } from 'bitmovin-player/bitmovinplayer-ui';
import 'bitmovin-player/bitmovinplayer-ui.css';


import * as Config from "../../../constants/Config";



const HowDoes = (props) => {
    const history = useHistory();
    const [config, setConfig] = useState({});
    const [player, setPlayer] = useState({});
    const [sec1, setSec1] = useState({});
    const [sec2, setSec2] = useState({});
    const [sec3, setSec3] = useState({});
  //  const [cloud, setCloud] = useState({});

    let img = window.app.img;
   
    useEffect(() => {
        if (window.site) {
            setConfig(window.site);

        }

    }, [window.site]);

 

    if (config.common && config.common.resourcesUrl) {
        img = config.common.resourcesUrl;
    }

  
    
    useEffect(() => {
        {
            props.menus && props.menus.length > 0 && props.menus.map(function (item, i) {
                if (item.menuid === 100001) {
                    setSec1(item.team[1]);
                    setSec2(item.team[2]);
                    setSec3(item.team[3]);
                     var playerSource = {
            
                    // hls: "https://d3twrgyog9bzds.cloudfront.net/orasipromo/HLS/1234567890_ORASIPROMO_1678961024277_3500k.m3u8",
                    hls: window.site.common.proxiesCloudFront + item.team[1].url,
                    // poster: poster,
                    // title: "orasiMedia.com"
                };

                var playerSource2 = {
            
                    // hls: "https://d3twrgyog9bzds.cloudfront.net/orasipromo/HLS/1234567890_ORASIPROMO_1678961024277_3500k.m3u8",
                    hls: window.site.common.proxiesCloudFront + item.team[3].url,
                    // poster: poster,
                    // title: "orasiMedia.com"
                };
            
                console.log("playerSource2",playerSource2)
                setupPlayer(playerSource,"player");
                setupPlayer(playerSource2,"player2");
                }

                
               
            })
        }
    }, [props.menus && window.site]);


    const playerConfig = {
        key: 'CBF8DCA8-BE6B-4EF1-A47E-2B27EF85674B',
        playback: {
            autoplay: false
        }
    }


     
           


       




    const setupPlayer = async (playerSource,playerdiv) => {

        const portalDiv = document.getElementById(playerdiv);
      //  const portalDiv2 = document.getElementById('player2');
       
       
        const playerInstance = new Player(portalDiv, playerConfig);
        UIFactory.buildDefaultUI(playerInstance,);
        playerInstance.load(playerSource).then(() => {
            setPlayer(playerInstance)
            console.log('Successfully loaded source');
        }, () => {
            console.log('Error while loading source');
        });

      
    }

    const destroyPlayer = async (e) => {
        if (player && player != null) {
            player.destroy();
            setPlayer(null);
        }
        history.go(-1);
    }
    return (
        <><div className="section" data-aos="fade-up">
            <h1 className="sec-heading">WHY <span>ORASI MEDIA ?</span></h1>

            <div className="video-block">

                <div>

                    <div id='player' />
                </div>


            </div>
            <div className="bg-bar"></div>
        </div><div className="section map-section">
                <h1 className="sec-heading text-shadow" data-aos="fade-up" data-aos-delay="150">{sec2.caption1}<br /><span>{sec2.subcaption}</span></h1>
                <p className="map-dec" data-aos="fade-up" data-aos-delay="200">{sec2.caption2}</p>
                <img src={img + Config.imgmiddle + "map.png?auto=compress,format"} data-aos="fade-up" data-aos-delay="250" />
            </div>
            <div className="section text-center how-it-works" data-aos="fade-up" data-aos-delay="150">
                <h1 className="sec-heading" >HOW IT <span>WORKS ?</span></h1>
                {/* <p className="map-dec aos-init aos-animate" data-aos="fade-up" data-aos-delay="200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                <img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images/arrows-left.png" className="arrows-left" />
                <img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images/arrows-right.png" className="arrows-right" />
                <div className="video-block">

                    <div>

                        <div id='player2' />
                    </div>


                </div>

            </div>

        </>
    );
};



export default HowDoes;
