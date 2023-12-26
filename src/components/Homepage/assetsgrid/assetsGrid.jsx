/***
**Module Name: Homepage assets  
 **File Name :  assetsGrid.js
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
 **Description : contains homepage assets component details.
 ***/
import React, { useEffect, useRef, useState, useContext } from "react";
import tmdbApi from "../../../api/tmdbApi";
import $ from 'jquery';
import { useHistory } from "react-router";
import { contentContext } from "../../../context/contentContext";
import moment from "moment";

import * as Config from "../../../constants/Config";






const AssetsGrid = (props) => {

    const history = useHistory();
    const [config, setConfig] = useState({});
    const [intialcontentData, setIntialcontentData] = useState(props.assetGridData.length > 0 ? props.assetGridData :[]);
    const [isLoad, setIsLoad] = useState(false);
    const [catName, setcatName] = useState([]);
    const [myArray, setMyArray] = useState([]);

    const [activeLabelName, setActiveLabelName] = useState(["ALL"]);

// console.log('assetGridData propsss',props.assetGridData)
    let img = window.app.img;
    const { Categories, categoryName1, setCategoryName1, isLoading, setIsLoading } = useContext(contentContext)

    // const handleCategory = async (name) => {
    //     try {
    //         setIsLoading(true)
    //         let payload = name == 'ALL' ? { 'featured': true, 'assetcount': 12 } : { 'category': [name], 'featured': true, 'assetcount': 12 }
    //         //   console.log('payload',payload)
    //         const response = await tmdbApi.featuredContent(payload);
    //         if (response.statusCode === 200) {
    //             let data = response.result && response.result.data && response.result.data.length > 0 ? response.result.data : []
    //             setIntialcontentData(data)
    //             if (data.length > 0) {
    //                 setIsLoading(false)
    //             }
    //         }
    //     } catch {
    //         console.log("error");
    //     }
    // };
    const menusData = categoryName1.filter((eachitem) => eachitem.label !== "FORMATS")
    // const menusData = categoryName1

    useEffect(() => {
        if (window.site) {
            setConfig(window.site);
            Categories()
           
        }

    }, [window.site]);

    useEffect(() => {
        let flag = true
        if (props.assetGridData.length >0 && flag == true) {
          
            const newArray = props.assetGridData.length >=12 ? props.assetGridData.slice(0, 12) : props.assetGridData;
            setIntialcontentData(newArray);   
            flag = false
        }

    }, [props.assetGridData]);
    useEffect(() => {
        if (intialcontentData.length >= 12) {
        //   console.log('intialcontentData use effect', intialcontentData)
          const intervalId = setInterval(() => {
            if(activeLabelName == "ALL"){
            const startIndex = Math.floor(Math.random() * (props.assetGridData.length - 12));
            const newRecords = props.assetGridData.slice(startIndex, startIndex + 12);
            // console.log("newRecordsnewRecordsnewRecordsnewRecordsnewRecords",newRecords)
            setIntialcontentData(newRecords);
         }else{
            const filterDataArr = props.assetGridData.filter((eachItem)=> eachItem.category.includes(activeLabelName))
            const startIndex = Math.floor(Math.random() * (filterDataArr.length - 12));
            const newRecords = filterDataArr.slice(startIndex, startIndex + 12);
            // const newArray = filterDataArr.length >12 ? filterDataArr.slice(0, 12):filterDataArr
          
           setIntialcontentData(newRecords)
        }
          }, 30000);
    
          return () => clearInterval(intervalId);
        }
      }, [intialcontentData]);

    // console.log("new Date().toLocaleString()",new Date().toLocaleString())
    // console.log('categoryName1categoryName1',categoryName1)
    if (config.common && config.common.resourcesUrl) {
        img = config.common.resourcesUrl;
    }

    function handleJoin() {
        history.push('./signup');
    }
    const handleMoreInfo = (e, id) => {
        history.push("/moreinfo/" + id);
    }
//    console.log('intialcontentData',intialcontentData)

    const filterData = (e,activeCategory) => {

        let contentData = props.assetGridData
        if(activeCategory == "ALL"){
            const startIndex = Math.floor(Math.random() * (props.assetGridData.length - 12));
            const newRecords = props.assetGridData.slice(startIndex, startIndex + 12);
            setIntialcontentData(newRecords);
        }else{
         const filterDataArr = contentData.filter((eachItem)=> eachItem.category.includes(activeCategory))
        //  console.log('filterDataArr',filterDataArr)
         const newArray = filterDataArr.length >12 ? filterDataArr.slice(0, 12):filterDataArr
        // console.log('activeCategory',activeCategory)
        // console.log('myArraymyArray',filterDataArr)
        setIntialcontentData(newArray)
        }
        setActiveLabelName(activeCategory)
    }

    const handleMenu = (e, name) => {
        setActiveLabelName(name)
     
    }

    const cardWidth = $(".portfolio-item").width() != undefined ? $(".portfolio-item").width() : 169;
    return (
        <div className="portfolio_block">
            <div className="section">
                <section id="portfolio" className="portfolio">
                    <div className="container">
                        <h1 className="sec-heading">CONTENT FROM<br /><span>ALL ACROSS THE GLOBE</span></h1>

                        <div className="row">
                            <div className="col-lg-12 d-flex justify-content-center">
                                <ul id="portfolio-flters">
                                    <li data-filter="*" className={`${activeLabelName == "ALL" ? 'filter-active' : ''}`} onClick={(e) => filterData(e, 'ALL')}>All</li>
                                    {menusData && menusData.length > 0 && menusData.map((item, i) => {

                                        let labelName = item.label
                                        return (
                                            <li key={i} data-filter="*" className={`${labelName == activeLabelName ? 'filter-active' : ''}`} onClick={(e) => filterData(e, labelName)}>{labelName}</li>
                                        )
                                    })}
                                                                        
                                </ul>
                            </div>
                        </div>

                        <div className="row portfolio-container1">
                            {/* {
                            
                            props.assets && props.assets.length > 0 && props.assets.map(function (item, i) {
                             return (
                            <div className="col-lg-4 col-md-6 portfolio-item filter-movies" key={i}>
                                <div className="portfolio-wrap">
                                    <img src={item.thumbnail} className="img-fluid" alt="" />
                                    <div className="portfolio-info">
                                        <div className="thumb-info">
                                            <p className="category">Movies</p>
                                            <h6 className="thumb-title">{item.assetname}</h6>
                                            <ul className="thumb-meta">
                                                <li>10 Episodes</li>
                                                <li>{item.formatedduration}</li>
                                                <li>{item.assetType}</li>
                                            </ul>
                                            <p className="thumb-description">
                                                {item.description}
                                                {/* Here is a show that every mother can learn from. Mummy Ka Magic has yummylicious solutions for the biggest problem in a mother’s life – feeding healthy food to their kids. */}
                            {/* </p>
                                            <button className="border-btn_sm">
                                                MORE INFO
                                            </button>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            )
                        }
                        
                        )}  */}
                            {/* ----------------------------------------------------------------------------------- */}

                            {intialcontentData && intialcontentData.length > 0 ? intialcontentData.map((item, i) => {

                                let picName = item.mediaType === 'video' ? 'videoclip-defaulr' : item.mediaType === 'audio' ? 'musicfile-default' : item.mediaType === 'pdf' ? 'pdf-default' : item.mediaType === 'doc' ? 'doc-defaulr' : 'img-default'
                                // let defaultImg = `https://orasi-dev.imgix.net/orasi/common/images/${picName}.jpg`;
                                // let defaultImg = `https://orasi-dev.imgix.net/orasi/common/images/${picName}.jpg`;
                                let defaultImg = `https://orasi-dev.imgix.net/orasi/common/images/img-default.jpg`;
                                // console.log('landscapeimage-->',item.landscapeimage)
                                // console.log('portraitimage-->',item.portraitimage)
                                let imgUrl = (item.portraitimage !="" && item.portraitimage != undefined)? img + item.portraitimage :
                                ( item.landscapeimage !="" && item.landscapeimage != undefined )? img + item.landscapeimage  : defaultImg
                                
                                let categoryItem = item.category && typeof(item.category) != 'string' ? item.category && item.category.length > 1 ? item.category.join(', ') : item.category : ""
                                            
                                return (

                                    <div className="col6-sm1 col-md-6 portfolio-item" key={i} >
                                        <div className="portfolio-wrap" style={{cursor:"default"}} onClick={e => handleMoreInfo(e, item.contentid)}>
                                            {/* <img src={img + Config.imgmiddle + "portfolio1.jpg?auto=compress,format&width=" + cardWidth} className="asset-portrait-thumb" alt="" /> */}
                                            <img src={imgUrl + "?auto=compress,format&width=" + cardWidth+"&q=95"} className="asset-portrait-thumb" alt="" />
                                            {/* <img src={img + Config.imgmiddle + item.thumbnail+ "?auto=compress,format&width=" + cardWidth} className="asset-portrait-thumb" alt={item.title} /> */}
                                            <div className="portfolio-info black-gradient" >
                                                <div className="thumb-info-block black-gradient" >
                                                    <div className="thumb-info">
                                                        {/* <p className="category">{id}</p> */}
                                                        <h6 className="thumb-title">{item.title}</h6>
                                                        {item.category ? <h6 className="sub-title">{categoryItem}</h6>:null}
                                                        <ul className="thumb-meta">
                                                            {/* <li>10 Episodes</li>
                                                             <li>10 Episodes</li> */}
                                                               {/* {item.category ? <li>{categoryItem}</li>:null} */}
                                                            {item.duration ? <li>{item.duration}</li> : null}
                                                            {/* <li>{item.releasedate}</li> */}
                                                            {item.releasedate ? <li> { item.releasedate && moment(item.releasedate).format('DD-MMM-YY')}</li> : 
                                                            item.releaseyear ? <li>  {item.releaseyear} </li> : null}

                                                            {item.keywords ? <li>{item.keywords}</li> : null}

                                                        </ul>
                                                        <p className="thumb-description">{item.synopsis}</p>
                                                        <button className="border-btn_sm" style={{cursor:"pointer"}} onClick={e => handleMoreInfo(e, item.contentid)}>MORE INFO</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                                :
                                // isLoading ? (
                                //     <div className="orasi-preloader">
                                //         <img src="https://orasi-dev.imgix.net/orasi/common/images/preloader.png" />
                                //     </div>
                                // ) :
                                (

                                    //     <div className="col6-sm1 col-md-6 portfolio-item" >

                                    // <div className="col-md-12"><h4 className="text-center">Coming soon..</h4></div>
                                    // </div>
                                    <div className="col-md-12 comingsoon-wrapper">
                                        <div className="comingsoon-block">
                                            <img src="https://orasi-dev.imgix.net/orasi/common/images/comingsoon.png" />
                                            <h6>Stay Tuned!</h6>
                                            <p>The Orasi Media team is updating the latest content into this category</p>
                                        </div>
                                    </div>


                                )

                            }


                        </div>
                        {intialcontentData && intialcontentData.length > 0  &&
                        <div className="text-center">
                            <button className="fill_btn yellow-gradient" onClick={handleJoin}>VIEW ALL</button>
                        </div>
}
                    </div>
                </section>
            </div>
        </div>
    );
};



export default AssetsGrid;
