/***
**Module Name: Header 
 **File Name :  Header.js
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
 **Description : contains header component details.
 ***/
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
// import "../../assets/css/style.css"
import * as Config from "./../../constants/Config";

// const headerNav = [
//   {
//     display: "Home",
//     path: `/${Config.HOME_PAGE}`,
//   },
//   {
//     display: "Movies",
//     path: `/${Config.HOME_PAGE}/movie`,
//   },
//   {
//     display: "TV Series",
//     path: `/${Config.HOME_PAGE}/tv`,
//   },
// ];

const Header = (props) => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const [scroll, setScroll] = useState(false);
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const [config, setConfig] = useState({});  
  const [activeId, setActiveId] = useState(props.activeClass ? props.activeClass : "100001");  
  useEffect(() => {
  
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  useEffect(() => {
    if(window.site){
      setConfig(window.site);
     
    }
  }, [window.site]);

  if(config.common && config.common.resourcesUrl ){
    var img = config.common.resourcesUrl;
  }

  // const handleAbout = async () => {
  //   history.push("./aboutus");
  // }
  // const handleHome = async () => {
  //   history.push("/");
  // }
  // const handleContactus = async () => {
  //   history.push("./contactus");
  // }
  const handlemenuclick = async (e,path,id) => {
    console.log('id--------->',id)
    setActiveId(id)
    if(id === 100005){
      window.open(
        'https://deas.hitlab.com/?ref=ORASI',
        '_blank' 
      );
    }else{
      console.log(path);
    history.push(path);
    }
  }
  const handleSignup = async () => {
    history.push("./signup");
  }
  const handleSignin = async () => {
    history.push("./login");
  }

  const toggleClass = () => {
    setToggle(!toggle);
  };

  return (

    <header id="header" className={scroll ? "fixed-top header-scrolled" : "fixed-top"}>
      <div className="container d-flex align-items-center justify-content-between">
        <h1 className="logo"><a href="/"><img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images//logoupdated.png" /></a></h1>
        <nav id="navbar" className={toggle ? "navbar navbar-mobile" : "navbar"}>
          {/* <ul>
            <li onClick={handleHome}><a className="nav-link active">Home</a></li>
            <li onClick={handleAbout}><a className="nav-link">About Us</a></li>
            <li><a className="nav-link" >Team</a></li>
            <li onClick={handleContactus}><a className="nav-link" >Contact Us</a></li>
            <li><a className="nav-link" >HITLAB</a></li>
           
            
          </ul> */}

          <ul>
            {props.menus && props.menus.length > 0  && props.menus.map(function (item, i) {
               let pathlink = "/" + item.route;
              return (
               
                item.type == "topmenu"?
                  <li key={i}><a className={`${activeId == item.menuid ? "active":""} nav-link`}  href="#"  onClick={e => handlemenuclick(e, pathlink,item.menuid)}>{item.menu}</a></li>:""
              
              )
            })}
            <li onClick={handleSignin}><a className="nav-link" >Login</a></li>
            <li onClick={handleSignup}><a className="getstarted yellow-gradient">Signup</a></li>

          </ul>

         <button className="mobile-nav-toggle mobile-menu-btn" onClick={() => toggleClass()}> <i className="material-symbols-outlined "> menu </i></button>
        </nav>

      </div>
    </header>
  );
};

export default Header;
