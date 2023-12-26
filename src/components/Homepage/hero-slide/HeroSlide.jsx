/***
**Module Name: banner hero assets  
 **File Name :  heroslide.js
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
 **Description : contains homepage banner hero component details.
 ***/
import React, { useEffect, useRef, useState } from "react";
import tmdbApi from "../../../api/tmdbApi";

import { useHistory } from "react-router";
import $ from "jquery";
import * as Config from "../../../constants/Config";
import Loader from "../../../components/loader";
import moment from "moment";

const HeroSlide = (props) => {
  const history = useHistory();
  const [config, setConfig] = useState({});
  const [randomRecords, setRandomRecords] = useState([]);
  const [heroSlideData, setHeroSlideData] = useState([]);
  const [sampleArr, setSampleArr] = useState({});
  const [displayedRecords, setDisplayedRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [heroslide, setHeroSlide] = useState({});
  let img = window.app.img;
  useEffect(() => {
    if (window.site) {
      setConfig(window.site);

    }

  }, [window.site]);



  if (config.common && config.common.resourcesUrl) {
    img = config.common.resourcesUrl;
  }
  const cardWidth = $(".portfolio-item").width() != undefined ? $(".portfolio-item").width() : 169;

  const handleMoreInfo = (e, id) => {
    history.push("/moreinfo/" + id);
  }
  // console.log('config--->',config.client.siteUrl =="https://develop.orasimedia.com")


  useEffect(() => {
    {
      props.menus && props.menus.length > 0 && props.menus.map(function (item, i) {
        if (item.menuid === 100001) {
           setHeroSlide(item.team[0]);
          
        }
      })
    }
  }, [props.menus]);


  useEffect(() => {
    if (props.heroSlideData.length >= 9) {
       const startIndex = Math.floor(Math.random() * (props.heroSlideData.length - 9));
        const newRecords = props.heroSlideData.slice(startIndex, startIndex + 9);
        setDisplayedRecords(newRecords);
      }
  }, [props.heroSlideData]);


  useEffect(() => {
    if (props.heroSlideData.length >= 9) {

      const intervalId = setInterval(() => {
        const startIndex = Math.floor(Math.random() * (props.heroSlideData.length - 9));
        const newRecords = props.heroSlideData.slice(startIndex, startIndex + 9);
        setDisplayedRecords(newRecords);

      }, 30000);

      return () => clearInterval(intervalId);
    }
  }, [props.heroSlideData]);

  const handleImgs = (num) => {
    let defaultImg = `https://orasi-dev.imgix.net/orasi/common/images/img-default.jpg`;

    let imgUrl1 = displayedRecords[num].portraitimage != undefined && displayedRecords[num].portraitimage != "" ?
     img + displayedRecords[num].portraitimage :
    displayedRecords[num].landscapeimage != undefined &&  displayedRecords[num].landscapeimage  != "" ?
     img + displayedRecords[num].landscapeimage 
      : defaultImg
    imgUrl1 = imgUrl1 +  "?auto=compress,format&width=" + cardWidth+"&q=95";
    return imgUrl1
    
  }
  const handleCategory = (cat) => {
    let categoryItem = cat && typeof(cat) != 'string' ? cat && cat.length > 1 ? cat.join(', ') : cat : ""
   
    return categoryItem
  }

  return (
    <>
      <section id="hero" className="d-flex align-items-center">

        <div className="container" data-aos="fade-up" data-aos-delay="150">
          <div className="row">
            <div className="col-55" >
             
              <div className="thumb-grid">
              {displayedRecords.length > 0 ? isLoading ? <Loader /> :
              
                  <>
                  
                     <>
                      <div className="hero_thumb a" data-aos="flip-left" data-aos-delay="200">
                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[0].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[0].title}</h6>
                           {displayedRecords[0].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[0].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[0].duration ? <li>{displayedRecords[0].duration}</li> : null}

                              {displayedRecords[0].releasedate ? <li>{displayedRecords[0].releasedate && moment(displayedRecords[0].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[0].releaseyear ? <li>  {displayedRecords[0].releaseyear} </li> : null}

                              {displayedRecords[0].keywords ? <li>{displayedRecords[0].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[0].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[0].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(0)} alt="image-1" />
                      </div>
                      <div className="hero_thumb b" data-aos="flip-left" data-aos-delay="220">
                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[1].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[1].title}</h6>
                            {displayedRecords[1].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[1].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[1].duration ? <li>{displayedRecords[1].duration}</li> : null}

                               {displayedRecords[1].releasedate ? <li>{displayedRecords[1].releasedate && moment(displayedRecords[1].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[1].releaseyear ? <li>  {displayedRecords[1].releaseyear} </li> : null}

                              {displayedRecords[1].keywords ? <li>{displayedRecords[1].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[1].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[1].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(1)} alt="image-1" />
                      </div>
                      <div className="c">
                           <div className="hero_thumb" data-aos="flip-left" data-aos-delay="240">
                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[2].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[2].title}</h6>
                            {displayedRecords[2].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[2].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[2].duration ? <li>{displayedRecords[2].duration}</li> : null}

                              {displayedRecords[2].releasedate ? <li>{displayedRecords[2].releasedate && moment(displayedRecords[2].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[2].releaseyear ? <li>  {displayedRecords[2].releaseyear} </li> : null}

                              {displayedRecords[2].keywords ? <li>{displayedRecords[2].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[2].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[2].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(2)} alt="image-1" />
                          </div>
                           <div className="c-a">
                              <div className="hero_thumb" data-aos="flip-right" data-aos-delay="260">
                          <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[3].contentid)}>
                            <div className="thumb-info">

                              <h6 className="thumb-title">{displayedRecords[3].title}</h6>
                              {displayedRecords[3].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[3].category)}</h6>:null}
                              <ul className="thumb-meta">

                                {displayedRecords[3].duration ? <li>{displayedRecords[3].duration}</li> : null}

                                {displayedRecords[3].releasedate ? <li>{displayedRecords[3].releasedate && moment(displayedRecords[3].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[3].releaseyear ? <li>  {displayedRecords[3].releaseyear} </li> : null}

                                {displayedRecords[3].keywords ? <li>{displayedRecords[3].keywords}</li> : null}

                              </ul>
                              <p className="thumb-description">{displayedRecords[3].synopsis}</p>
                              <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[3].contentid)}>MORE INFO</button>
                            </div>
                          </div>

                          <img src={handleImgs(3)} alt="image-1" />
                               </div>
                                <div className="hero_thumb" data-aos="flip-left" data-aos-delay="280">
                          <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[4].contentid)}>
                            <div className="thumb-info">

                              <h6 className="thumb-title">{displayedRecords[4].title}</h6>
                              {displayedRecords[4].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[4].category)}</h6>:null}
                              <ul className="thumb-meta">

                                {displayedRecords[4].duration ? <li>{displayedRecords[4].duration}</li> : null}

                                {displayedRecords[4].releasedate ? <li>{displayedRecords[4].releasedate && moment(displayedRecords[4].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[4].releaseyear ? <li>  {displayedRecords[4].releaseyear} </li> : null}

                                {displayedRecords[4].keywords ? <li>{displayedRecords[4].keywords}</li> : null}

                              </ul>
                              <p className="thumb-description">{displayedRecords[4].synopsis}</p>
                              <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[4].contentid)}>MORE INFO</button>
                            </div>
                          </div>

                          <img src={handleImgs(4)} alt="image-1" />
                              </div>
                            </div>
                        </div>
                        <div className="hero_thumb e" data-aos="flip-left" data-aos-delay="300">
                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[5].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[5].title}</h6>
                            {displayedRecords[5].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[5].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[5].duration ? <li>{displayedRecords[5].duration}</li> : null}

                              {displayedRecords[5].releasedate ? <li>{displayedRecords[5].releasedate && moment(displayedRecords[5].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[5].releaseyear ? <li>  {displayedRecords[5].releaseyear} </li> : null}

                              {displayedRecords[5].keywords ? <li>{displayedRecords[5].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[5].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[5].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(5)} alt="image-1" />
                      </div>
                      <div className="hero_thumb f" data-aos="flip-right" data-aos-delay="320">
                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[6].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[6].title}</h6>
                            {displayedRecords[6].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[6].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[6].duration ? <li>{displayedRecords[6].duration}</li> : null}

                              {displayedRecords[6].releasedate ? <li>{displayedRecords[6].releasedate && moment(displayedRecords[6].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[6].releaseyear ? <li>  {displayedRecords[6].releaseyear} </li> : null}

                              {displayedRecords[6].keywords ? <li>{displayedRecords[6].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[6].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[6].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(6)} alt="image-1" />
                      </div>
                      <div className="hero_thumb g" data-aos="flip-left" data-aos-delay="340">

                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[7].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[7].title}</h6>
                            {displayedRecords[7].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[7].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[7].duration ? <li>{displayedRecords[7].duration}</li> : null}

                              {displayedRecords[7].releasedate ? <li>{displayedRecords[7].releasedate && moment(displayedRecords[7].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[7].releaseyear ? <li>  {displayedRecords[7].releaseyear} </li> : null}

                              {displayedRecords[7].keywords ? <li>{displayedRecords[7].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[7].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[7].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(7)} alt="image-1" />
                      </div>
                      <div className="hero_thumb h" data-aos="flip-left" data-aos-delay="340">

                        <div className="thumb-info-block black-gradient" onClick={e => handleMoreInfo(e, displayedRecords[8].contentid)}>
                          <div className="thumb-info">

                            <h6 className="thumb-title">{displayedRecords[8].title}</h6>
                            {displayedRecords[8].category ? 
                           <h6 className="sub-title">{handleCategory(displayedRecords[8].category)}</h6>:null}
                            <ul className="thumb-meta">

                              {displayedRecords[8].duration ? <li>{displayedRecords[8].duration}</li> : null}

                              {displayedRecords[8].releasedate ? <li>{displayedRecords[8].releasedate && moment(displayedRecords[8].releasedate).format('DD-MMM-YY')}
                              </li> : displayedRecords[8].releaseyear ? <li>  {displayedRecords[8].releaseyear} </li> : null}

                              {displayedRecords[8].keywords ? <li>{displayedRecords[8].keywords}</li> : null}

                            </ul>
                            <p className="thumb-description">{displayedRecords[8].synopsis}</p>
                            <button className="border-btn_sm" style={{ cursor: "pointer" }} onClick={e => handleMoreInfo(e, displayedRecords[8].contentid)}>MORE INFO</button>
                          </div>
                        </div>

                        <img src={handleImgs(8)} alt="image-1" />
                        </div>
                                              </>
                  </> : null
                }

              {displayedRecords.length <= 0?
                  (<>
          <div className="hero_thumb a">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div>
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/642ab8b5ae66742bbbbdbcfd/642ab8b5ae66742bbbbdbd00_CONTENT_IMAGE_1680521709141.png" />
          </div>
          <div className="hero_thumb b">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div>
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/642a86eca51c1d59d95c09f5/642a86eca51c1d59d95c09f8_CONTENT_IMAGE_1680520952684.png" />
          </div>
          <div className="c">
          <div className="hero_thumb">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div>
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/6424225c225c7ccb19e62a15/6424225c225c7ccb19e62a18_CONTENT%20IMAGE_1680090207832.png" />
          </div>
          <div className="c-a">
            <div className="hero_thumb">
              {/* <div className="thumb-info-block black-gradient">
                <div className="thumb-info">
                <p className="category">Movies</p>
                <h6 className="thumb-title">Inferno</h6>
                <ul className="thumb-meta">
                  <li>10 Episodes</li>
                  <li>02:20:30</li>
                  <li>Horror, Drama</li>
                </ul>
                <p className="thumb-description">
                  Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
                </p>
                <button className="border-btn_sm">
                  MORE INFO
                </button>
              </div>
              </div> */}
              <img src="https://orasi-dev.imgix.net/orasidev/content/642a86eaa51c1d59d95c092c/642a86eaa51c1d59d95c092f_CONTENT_IMAGE_1681288455315.png" />
            </div>
            <div className="hero_thumb">
              {/* <div className="thumb-info-block black-gradient">
                <div className="thumb-info">
                <p className="category">Movies</p>
                <h6 className="thumb-title">Inferno</h6>
                <ul className="thumb-meta">
                  <li>10 Episodes</li>
                  <li>02:20:30</li>
                  <li>Horror, Drama</li>
                </ul>
                <p className="thumb-description">
                  Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
                </p>
                <button className="border-btn_sm">
                  MORE INFO
                </button>
              </div>
              </div> */}
              <img src="https://orasi-dev.imgix.net/orasidev/content/642a86eda51c1d59d95c0a81/642a86eda51c1d59d95c0a84_CONTENT_IMAGE_1680521257149.png" />
            </div>
          </div>
          </div>
          <div className="hero_thumb e">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div>
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/6424225c225c7ccb19e629e9/6424225c225c7ccb19e629ec_CONTENT%20IMAGE_1680173044655.png" />
          </div>
          <div className="hero_thumb f">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div>
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/6424225b225c7ccb19e629b4/6424225b225c7ccb19e629b7_CONTENT%20IMAGE_1680090013292.png" />
          </div>
          <div className="hero_thumb g">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div> 
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/642a86eaa51c1d59d95c0936/642a86eaa51c1d59d95c0939_CONTENT_IMAGE_1681290537014.png" />
          </div>
          <div className="hero_thumb h">
            {/* <div className="thumb-info-block black-gradient">
              <div className="thumb-info">
              <p className="category">Movies</p>
              <h6 className="thumb-title">Inferno</h6>
              <ul className="thumb-meta">
                <li>10 Episodes</li>
                <li>02:20:30</li>
                <li>Horror, Drama</li>
              </ul>
              <p className="thumb-description">
                Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids.
              </p>
              <button className="border-btn_sm">
                MORE INFO
              </button>
            </div>
            </div> */}
            <img src="https://orasi-dev.imgix.net/orasidev/content/642a86eca51c1d59d95c0a26/642a86eca51c1d59d95c0a29_CONTENT_IMAGE_1680521058740.png" />
          </div>
          </>) : null}
              </div>
            </div>
            <div className="col-45">
              <div className="hero-captions">
                <h1 className="caption1">{heroslide.caption1}</h1>
                <h1 className="caption2">{heroslide.caption2}</h1>
                <img src={img + Config.imgmiddle + "/responsive.png?auto=compress,format"} />
                <p className="hero-description">
                {heroslide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};



export default HeroSlide;
