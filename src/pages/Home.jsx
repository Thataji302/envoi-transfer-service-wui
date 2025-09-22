/***
**Module Name: Homepage
 **File Name :  Home.js
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
 **Description : contains Home page details.
 ***/
import React, { useEffect, useState, useContext } from "react";
// import { Link } from "react-router-dom";
import { Link, useLocation, useHistory } from "react-router-dom";
import "../../src/assets/css/style.css"
import tmdbApi from "../api/tmdbApi";
import * as Config from "./../constants/Config";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroSlide from "../components/Homepage/hero-slide/HeroSlide";
import HowDoes from "../components/Homepage/how-does-works/howDoes";
import JoinNow from "../components/Homepage/join-now/joinNow";
import HitLab from "../components/Homepage/hitlab/hitlab";
import AssetsGrid from "../components/Homepage/assetsgrid/assetsGrid";
import Loader from "../components/loader";
import axios from 'axios';
import { contentContext } from "../context/contentContext";


const Home = () => {
  const [assetGridData, setAssetGridData] = useState([]);
  // const [menus, setMenus] = useState([]);
  const [loader, setLoader] = useState(false);
  const [heroSlideData, setHeroSlideData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [config, setConfig] = useState({});
  const history = useHistory();
  const { menus, userAgent } = useContext(contentContext);
  const [logout, setLogout] = useState({});
  useEffect(() => {
    // setTimeout(function () { setLoader(false) }, 1000)
    if (localStorage.getItem("loc") === null) {
      userAgent();
    }

    heroSlideContent()
  }, []);

  useEffect(() => {
    if (window.site) {
      setConfig(window.site);

    }

  }, [window.site]);

  useEffect(() => {
    // setTimeout(function () { setLoader(false) }, 1000)
    let token = localStorage.getItem("token")
    setLogout(token);
  })
  // const userAgent = async () => {
  // axios({
  //   method: 'GET',
  //   url: "https://d4nv8o5tzs3mt.cloudfront.net/",
  //   })
  //   .then(function (response) {
  //     let locData = JSON.stringify(response.data)
  //       localStorage.setItem("loc",locData);
  //   });
  // }


  // console.log('config----->',config && config.client && config.client.siteUrl)

  // let date = new Date().toJSON();
  // console.log(date); 
  const heroSlideContent = async (name) => {
    try {
      setLoader(true)
      let payload = { 'featured': true, 'page': 'landing' }

      const response = await tmdbApi.featuredContentHeroSlide(payload);
      if (response.statusCode === 200) {
        let data = response.result && response.result.data && response.result.data.length > 0 ? response.result.data : []
        if (data.length > 0) {
          const filterArray = data.filter((eachItem) => {

            // console.log('window----->',window && window.site)
            if (window && window.site && window.site.client && window.site.client.siteUrl == "https://orasimedia.com") {
              if (eachItem.portraitimage != "") return eachItem
            } else if (window && window.site && window.site.client && window.site.client.siteUrl == "https://develop.orasimedia.com") {
              if (eachItem.thumbnail != "") return eachItem
            }

          })
          // console.log('filterArray-->',filterArray)
          const filterArray2 = data.filter(eachItem => eachItem.portraitimage != "" && eachItem.portraitimage != undefined)
          const filterArray3 = data.filter(eachItem => ((eachItem.portraitimage != "" && eachItem.portraitimage != undefined) || (eachItem.landscapeimage != "" && eachItem.landscapeimage != undefined)))
          console.log('filterArray2-->', filterArray2.length)
          console.log('filterArray3-->', filterArray3.length)
          console.log('data length-->', data.length)
          setHeroSlideData(filterArray2)
          setAssetGridData(data)

          setLoader(false)
        }
        else {
          setLoader(false)
        }

      }
    } catch {
      setLoader(false)
      console.log("error");
    }
  };
  const handleSignup = async () => {
    history.push("./signup");
  }
  const handleSignin = async () => {
    history.push("./login");
  }
  const handleLogout = async () => {
    localStorage.clear();
    history.location = '/';
  }

  return (
    <>
      {loader ? <Loader /> : null}

      {/* <Header menus={menus} /> */}
      <div className=" upload_landing" style={{ backgroundImage: `url(${require("../assets/upload_bg.jpg")})` }} >
        {/* <div className="overlay"></div> */}
        <div className="feature_header" >
          <header id="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container">
                <a className="navbar-brand" href="#"><img alt="header" class="wp_logo" src="https://envoi-common-resources.imgix.net/Envoi/submission/images/landingpagelogo.png" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">My uploads</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Categories</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">My list</a>
                    </li>
                  </ul>
                </div>
                {!logout ?
                  <form class="d-flex">
                    <button class="btn btn-outline-success" type="submit" onClick={handleSignup}>sign up</button>
                    <button class="btn btn-outline-success" type="submit" onClick={handleSignin}>sign in</button>
                  </form> :
                  <form class="d-flex">
                    <button class="btn btn-outline-success" type="submit" onClick={handleLogout}>logout</button>
                  </form>
                }
              </div>
            </nav>
          </header>
        </div>
        <div className="join_row float_center">
          {/* <div className="cols">
                         <div className="jp_signinWrapper">
                             <img alt="header" className="wp_logo" src={(envoiScheduler.landingPage || {}).logo} />
                             <div className="jp_descBlock">
                                 <h1 className="land_title">{(envoiScheduler.landingPage || {}).title}</h1>
                                 <p className="land_subtitle">{(envoiScheduler.landingPage|| {}).description}</p>
                                 <h1 className="land_title">Mobile Live Streaming</h1>
                                 <p className="land_subtitle">Mobile Streaming for Live Broadcasters</p>
 
                                 {!this.state.isDisableLoginButtons && <div className="signup_btns">
                                     <SignUp isLoaderUpdated={this.isLoaderUpdated} labelText="SIGN UP" cssClass="green_filled" hiddenDiv="jp_signinWrapper" removeHidden="authlogindiv" buttonHide={false} />
                                     <SignIn isLoaderUpdated={this.isLoaderUpdated} labelText="SIGN IN" cssClass="stroke" hiddenDiv="jp_signinWrapper" removeHidden="authlogindiv" buttonHide={false} />
                                 </div>}
                             </div>
                             <div className="store-icons">
                                 {siteConfig.storeLinks && siteConfig.storeLinks.iTunesAppStore && <a href={siteConfig.storeLinks && siteConfig.storeLinks.iTunesAppStore} onClick={ev => { ev.preventDefault(); }}><img alt="apple" src={imagesAssetResourcesPrefix + "images/common-images/applestore.png"} />
                                 </a>}
                                 {siteConfig.storeLinks && siteConfig.storeLinks.googleAppStore && <a target="_blank" href={siteConfig.storeLinks && siteConfig.storeLinks.googleAppStore} onClick={ev => { ev.preventDefault(); }}><img alt="tv" src={imagesAssetResourcesPrefix + "images/common-images/google-play.png"} />
                                 </a>}
                                 {siteConfig.storeLinks && siteConfig.storeLinks.amazonAppStore && <a href={siteConfig.storeLinks && siteConfig.storeLinks.amazonAppStore} target="_blank" >
                                     <img alt="google" src={imagesAssetResourcesPrefix + "images/common-images/amazonfiretv.png"} /></a>}
                             </div>
                         </div>
                     </div> */}

          <div className="cols">
            <div className="upload_block">
              <div class="video_file">
                <input type="file" name="upload" class="udisplay-none" id="upload" accept="" />
                <span class="material-icons">file_upload</span>
              </div>
              <h6>Drag and drop video files to upload</h6>
              <p>Your videos will be private until you publish them.</p>
              <button class="btn"><input type="file" name="upload" class="udisplay-none" id="upload" accept="" />select files</button>
            </div>
          </div>
        </div>
        <Footer menus={menus} />
      </div>
      {/* <HeroSlide heroSlideData={heroSlideData} menus={menus} />
       <main id="main">
         <HowDoes menus={menus}/>
         <div className="section text-center">
           <JoinNow menus={menus}/>
         </div>
         <HitLab />
         <AssetsGrid assetGridData={assetGridData} />
       </main> */}
      {/* <Footer menus={menus}/> */}

      {/* <div className="container">
         <div className="section mb-3">
           <div className="section__header mb-2">
             <h2>Trending Movies</h2>
             <Link to={`/${Config.HOME_PAGE}/movie`}>
               <OutlineButton className="small">View more</OutlineButton>
             </Link>
           </div>
           <MovieList category={category.movie} type={movieType.popular} />
         </div>
 
         <div className="section mb-3">
           <div className="section__header mb-2">
             <h2>Top Rated Movies</h2>
             <Link to={`/${Config.HOME_PAGE}/movie`}>
               <OutlineButton className="small">View more</OutlineButton>
             </Link>
           </div>
           <MovieList category={category.movie} type={movieType.top_rated} />
         </div>
 
         <div className="section mb-3">
           <div className="section__header mb-2">
             <h2>Trending TV</h2>
             <Link to={`/${Config.HOME_PAGE}/tv`}>
               <OutlineButton className="small">View more</OutlineButton>
             </Link>
           </div>
           <MovieList category={category.tv} type={tvType.popular} />
         </div>
 
         <div className="section mb-3">
           <div className="section__header mb-2">
             <h2>Top Rated TV</h2>
             <Link to={`/${Config.HOME_PAGE}/tv`}>
               <OutlineButton className="small">View more</OutlineButton>
             </Link>
           </div>
           <MovieList category={category.tv} type={tvType.top_rated} />
         </div>
       </div> */}
    </>
  );
};

export default Home;
