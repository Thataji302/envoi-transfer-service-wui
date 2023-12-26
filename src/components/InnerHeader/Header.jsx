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
import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import tmdbApi from "../../api/tmdbApi";
import { contentContext } from "../../context/contentContext";
import SessionPopup from "../../pages/SessionPopup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Config from "../../constants/Config";

const InsideHeader = (props) => {

  const history = useHistory();

  const [nameerror, setNameError] = useState("");
  const [emailerror, setEmailError] = useState("");
  const [companynameerror, setCompanyNameError] = useState("");
  const [messageerror, setMessageError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [activeCheckId, setActiveCheckId] = useState("");

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [activeClass, setActiveClass] = useState(props.activeClass ? props.activeClass : "1");

  const [profileName, setProfileName] = useState("");
  const [showSessionPopupup, setShowSessionPopupup] = useState(false);

  const handleClose = () => {
    window.location.pathname == "/content" ? setActiveClass("1") : window.location.pathname == "/contactus" ? setActiveClass("5") : 
    window.location.pathname == "/aboutus" ? setActiveClass("4") :  window.location.pathname == "/enquire" ? setActiveClass("2") : setActiveClass("0")
    setShow(false);
  }

  const [config, setConfig] = useState({});
  // const [clientData , setClientData] = useState([]);


  const { clientData, setClientData1, formValues, setFormValues, GetClientDataFunction, wishlistCount, setwishlistCount, wishListData, setWishListData, showCategoryData, setShowCategoryData, setInitialCategoriesData1, hideMenu, setHideMenu, isShowMyContent, setIsShowMyContent, pageNumber, setPageNumber, assetTotal, setAssetTotal, perpage, setPerpage, totalPagesArray, setTotalPagesArray, totalPages, setTotalPages, setGrid, setList, setMenuCategoryName, SetSearchTitleInput,
    selectedOptions, setSelectedOptions, multiSelectFields, setMultiSelectFields,setActivePayload,searchPayload, setSearchPayload,setActiveFieldsObj, setParamType
  } = useContext(contentContext)
  //  console.log('activeClass',activeClass)
  useEffect(() => {
    if (window.site) {
      setConfig(window.site);

    }
    // GetClientDataFun()
    GetClientDataFunction();
  }, [window.site]);

  if (config.common && config.common.resourcesUrl) {
    var img = config.common.resourcesUrl;
  }
  // console.log('clientData',clientData)
  const [recommend, setRecommend] = useState({ username: '', useremail: '', name: '', email: '', number: '', companyname: '', message: 'I was going through this portal and thought it might be interesting to you. This is a digital content marketplace where one can syndicate and acquire content. It is a global platform (Media and Entertainment) and seems to have a wide variety of content. I hope you like it.' });

  const handleProfile = (e) => {
    history.push("/profile");
  }
  const handlePreference = (e) => {
    // setSearchPayload({})
    setActiveClass("7")
    history.push("/preference");
  }
  const handleBack = (e) => {
    history.push("/content");
    setShowCategoryData(true);

  }
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("clientid");
    localStorage.removeItem("login");
    localStorage.removeItem("wishlistcount");
    localStorage.removeItem("currentSessionClientTime")
    localStorage.removeItem("previousid");
    signoutsession()
    unSetValues()
    history.push("/");

  }

  const handleChangePwd = (e) => {
    // setSearchPayload({})
    setActiveClass("6")
    history.push("/profile");
  }
  const handleCart = () => {
    history.push("/cart");
  }
  const unSetValues = () => {
    setHideMenu(false)
    setInitialCategoriesData1([])
    setShowCategoryData(true)
    setMenuCategoryName("")
    setClientData1([])
    setParamType("")
    setFormValues([])
    setPageNumber(1)
    setAssetTotal(0)
    setPerpage(18)
    setTotalPagesArray(0)
    setGrid(true);
    setList(false);
    setTotalPages(0)
    setSelectedOptions([])
    setMultiSelectFields([])
    SetSearchTitleInput("")
    setActivePayload({})
    setSearchPayload({})
    setIsShowMyContent(false)

  }
  const AddNotify = () => toast.success('Recommendation Sent!', {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  },)

  const Recommend = async () => {
    try {
      setActiveCheckId("active")
      const response = await tmdbApi.Recommend({
        "username": clientData.name || "",
        "useremail": clientData.personalemail || "",
        "name": recommend.name || "",
        "email": recommend.email || "",
        "phone": recommend.number || "",
        "companyname": recommend.companyname || "",
        "message": recommend.message || "",


      });

      if (response.result == "Invalid token or Expired") {
        setShowSessionPopupup(true)

      } else {
       
        AddNotify()
        console.log(response);
      }
      setRecommend({...recommend,["name"]:"",["email"]:"",["number"]:"",["companyname"]:""})
      setActiveCheckId("")
      handleClose()

    } catch {
      handleClose()
      setRecommend({...recommend,["name"]:"",["email"]:"",["number"]:"",["companyname"]:""})
      setActiveCheckId("")
      console.log("error");
    }
  };
  const signoutsession = async () => {
    try {
      const response = await tmdbApi.SignOutUser({ emailId: clientData.personalemail });
      console.log(response);

    } catch {
      console.log("error");
    }
  }

  const handleChange = (e) => {
    setRecommend({ ...recommend, [e.target.name]: e.target.value });
  }

  const handleRecommend = (e) => {
    
    let flag = true

    const regEx = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}(.[a-zA-Z{2,8}])?/g;
    if (regEx.test(recommend.email)) {
     
      setEmailError("");
      setTimeout(function () { setEmailError("") }, 2000)
    } else if (!regEx.test(recommend.email) && recommend.email !== "") {
      setEmailError("Email is Not Valid");
  
      flag = false;
      setTimeout(function () { setEmailError("") }, 2000)
    }
  
    if (recommend.name === "") {
      setNameError("Please enter Name");
      flag = false;
    }
    if (recommend.email === "") {
      setEmailError("Please enter Email");
      flag = false;
    }
    if (recommend.companyname === "") {
      setCompanyNameError("Please enter Company Name");
      flag = false;
    }
    if (recommend.message === "") {
      setMessageError("Please enter Message");
      flag = false;
    }

    if (flag) {
      if(activeCheckId == ""){
      Recommend();
      }
    }
    
  }
  const getToken = (e) => {
    console.log('localStorage.getItem("token")', localStorage.getItem("token"))
  }
  //  getToken();
  const handleMarket = (e, val) => {
    setActiveClass(val);
    setSearchPayload({})
    setInitialCategoriesData1([])
    history.push("/content")
    setShowCategoryData(true)
    setHideMenu(true)

  }
  const handleEnquire = (e,val)=> {
    setActiveClass(val);
    // setSearchPayload({})
    history.push("/enquire")
  }

  const handleShow = (e, val) => {
    setShow(true);
    setActiveClass(val);
  }
  
  const handleAboutus = (e, val) => {
    setActiveClass(val);
    setInitialCategoriesData1([])
    setSearchPayload({})
    history.push("/aboutus");
  }
  const handleContact = (e, val) => {
    setActiveClass(val);
    setSearchPayload({})
    setInitialCategoriesData1([])
    history.push("/contactus");
  }
  let myArray = []
  myArray = clientData && clientData.name?.split(" ");

  // if(myArray && myArray.length > 0){
  //   let a = myArray[0]?.slice(0,1);
  //   let b = myArray[1]?.slice(0,1); 

  //   setProfileName(a+b);
  // }

  // console.log(myArray && myArray.length > 0 && myArray[0]?.slice(0,1) + myArray[1]?.slice(0,1))

  const handleFocusName = (e) => {
    setNameError("");
  }
  const handleFocusEmail = (e) => {
    setEmailError("");
  }
  const handleFocusCompanyName = (e) => {
    setCompanyNameError("");
  }
  const handleFocusMessage = (e) => {
    setMessageError("");
  }
  const toggleClass = () => {
    setToggle(!toggle);
  };


  // console.log('activeClass',activeClass)
  // console.log(' localStorage.getItem', localStorage.getItem('wishlistCount'))
  return (

    <>
      {showSessionPopupup && <SessionPopup />}
      <header id="header" className="fixed-top dark-header inner-header ">
        <div className="container d-flex align-items-center justify-content-between nopadding">
          <a className="logo" onClick={handleBack}><img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images/logo_white.png" alt="" className="img-fluid" /></a>
          <nav id="navbar" className={toggle ? "navbar inner-nav navbar-mobile" : "inner-nav navbar"}>
            <ul>
              <li><a className={`${activeClass === "1" ? "active" : ""} nav-link`} onClick={(e) => handleMarket(e, "1")}>Market Place</a></li>
              {!isShowMyContent && clientData && clientData.type != "SELLER" ?<li><a className={`${activeClass === "2" ? "active" : ""} nav-link`} onClick={(e) => handleEnquire(e, "2")}>Orders</a></li>: null}
              <li><a className={`${activeClass === "3" ? "active" : ""} nav-link`} onClick={(e) => handleShow(e, "3")}>Recommend</a></li>
              <li><a className={`${activeClass === "4" ? "active" : ""} nav-link`} onClick={(e) => handleAboutus(e, "4")}>About Us</a></li>
              <li><a className={`${activeClass === "5" ? "active" : ""} nav-link`} onClick={(e) => handleContact(e, "5")}>Contact Us</a></li>
            </ul>
            <button className="mobile-nav-toggle mobile-menu-btn" onClick={() => toggleClass()}> <i className="material-symbols-outlined "> menu </i></button>          </nav>
          <div className="nav-actions">
            {!isShowMyContent && clientData && clientData.type != "SELLER" ?
             (<button type="button" className="nav-btn ms-3" onClick={handleCart}>
              <div className="btn-cont">
                {(wishlistCount || parseInt(localStorage.getItem('wishlistCount')) )> 0 ? <span className="count blueBg">{wishlistCount|| localStorage.getItem('wishlistCount')}</span> : null}
                <span className="material-symbols-outlined"> shopping_cart </span>
              </div>
              Cart
            </button>
            ) : null}
            <div className="btn-group mr-2 nav-grp-btns ms-3">
           {clientData.type !== "SELLER" &&   <button type="button" className={`${activeClass === "7" ? "active" : ""} btn btn-primary`} onClick={handlePreference}>Preferences</button>}
              <button type="button" className={`${activeClass === "6" ? "active" : ""} btn btn-primary`} onClick={handleChangePwd}>Change Password</button>
            </div>
            {/* <div className="dropdown user-dd ms-3">
        <button type="button" className="btn dropdown-toggle" data-bs-toggle="dropdown">
         <img src="./assets/img/profile/profile-pic.jpg" className="nav-avatar" />
        </button>
        <ul className="dropdown-menu"> <!-- add class 'show' to this ul -->
          <div className="avatar-card">
            <div className="avatar-lg">
              <img src="./assets/img/profile/profile-pic.jpg"/>
            </div>
            <h6 className="username">satya7n@gmail.com</h6>
            <p className="sm-badge badge">BUYER</p>
          </div>
          <li><a className="dropdown-item" href="#">profile</a></li>
          <li><a className="dropdown-item" href="#">Log Out</a></li>
        </ul>
      </div> */}
            <Dropdown className="dropdown user-dd ms-3">
              <Dropdown.Toggle className="btn dropdown-toggle">
                {/* <img src={img + Config.imgmiddle + "profile-pic.jpg"} className="nav-avatar" /> */}
                <div className="profile-thumb md-2">
                  <p>{myArray && myArray.length > 1 ? myArray && myArray.length > 0 && myArray[0]?.slice(0, 1)?.toUpperCase() + myArray[1]?.slice(0, 1)?.toUpperCase()
                    : clientData && clientData.name?.slice(0, 2)?.toUpperCase()}</p>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <div className="avatar-card">
                  <div className="avatar-lg">
                    <div className="profile-thumb md-2">
                      <p>{myArray && myArray.length > 1 ? myArray && myArray.length > 0 && myArray[0]?.slice(0, 1)?.toUpperCase() + myArray[1]?.slice(0, 1)?.toUpperCase()
                        : clientData && clientData.name?.slice(0, 2)?.toUpperCase()}</p>
                    </div>
                  </div>
                  <h6 className="username">{clientData && clientData.name}</h6>
                  <p className="phone-number">{clientData && clientData.personalphone}</p>
                  <p className="sm-badge badge">{clientData && clientData.type ? clientData.type == 'BOTH' ? 'BUYER, SELLER' : clientData.type : 'BUYER'}</p>
                </div>
                <Dropdown.Item onClick={handleProfile}>Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                <Dropdown.Item onClick={handlePreference} className={`${!isShowMyContent && clientData && clientData.type != "SELLER" ?'':'seller_preferences_hide'}`}>Preferences</Dropdown.Item>
                <Dropdown.Item onClick={handleProfile}>Change Password</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </header>

      <Modal show={show}>

        <div className="modal-header">
          <img src={img + Config.imgmiddle + "logo.png"} alt="" className="modal-logo" />
          <h4 className="modal-title pos-center">Recommend Orasi Media</h4>
          <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={handleClose}></button>
        </div>


        <div className="modal-body">
          <div className="container">
            <div className="row">
            <div className="col-md-6 col-lg-6">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" name="username" value={clientData && clientData.name} placeholder="Enter Name" disabled />
                  <label >Name<span>*</span></label>
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="form-floating mb-3">
                  <input type="Your Name" className="form-control" name="useremail" value={clientData && clientData.personalemail} id="floatingInput" placeholder="Enter Email Id " disabled />
                  <label >Email Id<span>*</span></label>
                </div>
              </div>
            
            </div>
            <h6 className="mt-3">Recommend to</h6>
            <div className="row">
              <div className="col-md-6 col-lg-6">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" name="name" onChange={(e) => handleChange(e)} value={ recommend && recommend.name} id="floatingInput" placeholder="Enter Name" onFocus={handleFocusName} />
                  <label >Name<span>*</span></label>
                  {nameerror != "" ?
                    <span className="errormsg" style={{
                      fontWeight: 'bold',
                      color: 'red',
                    }}>{nameerror}</span> : ""
                  }
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="floatingInput" name="email" onChange={(e) => handleChange(e)} value={recommend && recommend.email} placeholder="Enter Email Id" onFocus={handleFocusEmail} />
                  <label >Email Id<span>*</span></label>
                  {emailerror != "" ?
                    <span className="errormsg" style={{
                      fontWeight: 'bold',
                      color: 'red',
                    }}>{emailerror}</span> : ""
                  }
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="floatingInput" name="companyname" onChange={(e) => handleChange(e)} value={recommend && recommend.companyname} placeholder="Enter Comapny Name" onFocus={handleFocusCompanyName} />
                  <label >Company Name<span>*</span></label>
                  {companynameerror != "" ?
                    <span className="errormsg" style={{
                      fontWeight: 'bold',
                      color: 'red',
                    }}>{companynameerror}</span> : ""
                  }
                </div>
              </div>
              <div className="col-md-6 col-lg-6">
                <div className="form-floating mb-3">
                  <input type="tel" className="form-control" id="floatingInput" name="number" onChange={(e) => handleChange(e)} value={recommend && recommend.number} placeholder="Enter Phone Number" />
                  <label >Contact Number</label>
                </div>
              </div>
              <div className="col-md-12 col-lg-12">
                <div className="form-floating mb-3">
                  <textarea name="messages" rows="10" onChange={(e) => handleChange(e)} value={recommend && recommend.message} className="form-control" onFocus={handleFocusMessage}>Recommed text</textarea>
                  <label >Recommend Text<span>*</span></label>
                  {messageerror != "" ?
                    <span className="errormsg" style={{
                      fontWeight: 'bold',
                      color: 'red',
                    }}>{messageerror}</span> : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal.Footer>
          {error != "" ?
            <span className="errormsg" style={{
              fontWeight: 'bold',
              color: 'red',
            }}>{error}</span> : ""
          }

          <div className="modal-footer">
            <button className="fill_btn yellow-gradient float-end" onClick={handleRecommend}>
              {activeCheckId === "active" ? (<img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images/common-icons/rotate_right.svg" className="loading-icon" />) :
                null}

              Recommend</button>
            <div className="clearfix"></div>
          </div>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default InsideHeader;
