import React, { useState, useEffect,useContext } from "react";
// import PasswordInputField from "./PasswordInputField";
// import ConfirmPasswordInputField from "./ConfirmPasswordInputField";
import tmdbApi from "../api/tmdbApi";
import Footer from "../components/footer/Footer";
import axios from "axios";
// import "../../src/assets/css/style.css"
import * as Config from "../constants/Config";
import { useHistory } from "react-router-dom";
import { contentContext } from "../context/contentContext";
let {lambda,appname}=window.app;


function GeneratePassword() {
    const history = useHistory();
    const [passwordError, setPasswordErr] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [number, setNumber] = useState(false);
    const [upper, setUpper] = useState(false);
    const [limit, setLimit] = useState(false);
    const [lower, setLower] = useState(false);
    const [special, setSpecial] = useState(false);
    const [error, setError] = useState('');
    const [config, setConfig] = useState({});
    const [btnLoader, setBtnLoader] = useState(false);
    const [passwordInput, setPasswordInput] = useState({
        password: '',
        confirmPassword: ''
    })
    // const [menus, setMenus] = useState([]);
    const [email, setEmail] = useState([]);
    const [locData,setLocData] = useState("");

    const {welcomeMsg, setWelcomeMsg} = useContext(contentContext)

    const { menus } = useContext(contentContext);
    useEffect(() => {
        // appMenus();
        getUserData();
        setEmail(localStorage.getItem("email"))
        setLocData(JSON.parse(localStorage.getItem("loc")));
    }, []);
    useEffect(() => {
        if(window.site){
          setConfig(window.site);
         
        }
       
      }, [window.site]);
    
      if(config.common && config.common.resourcesUrl ){
        var img = config.common.resourcesUrl;
      }
    // const appMenus = async () => {
    //     try {
    //         console.log(tmdbApi);
    //         const response = await tmdbApi.appMenus({result : "micro"});
    //         setMenus(response.result)
    //         console.log(response);
    //     } catch {
    //         console.log("error");
    //     }
    // };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const getUserData = async (e) => {
        console.log('getuserdata')
        axios({
            method: 'GET',
            url: lambda + '/client?appname=' + appname + '&clientid='+ id,
        })
            .then(function (response) {
                console.log('response',response)
                if(response?.data?.result === "Client not found"){
                    setEmail("")
                    history.push("/");
                }
                else if(response?.data?.result?.result.length>0){
                    console.log("resp",response);
                    setEmail(response?.data?.result?.result[0]?.personalemail)
                }
                else{
                    setEmail("")
                    history.push("/");
                }
               

            });

    }
    const handlePasswordChange = (evnt) => {
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        const NewPasswordInput = { ...passwordInput, [passwordInputFieldName]: passwordInputValue }
        setPasswordInput(NewPasswordInput);

    }
    const handleAddclass = (evnt) => {
        var element = document.getElementById("instruction");
        element.classList.add("ins-dsp-none");
        setConfirmPasswordError("");
    }
    const handleRemoveclass = (evnt) => {
        var element = document.getElementById("instruction");
        element.classList.remove("ins-dsp-none");
    }
    // const handleConfirm = (evnt) => {
    //     const passwordInputFieldName = evnt.target.name;
    //     if (passwordInputFieldName === "confirmPassword" || (passwordInputFieldName === "password")) {
              
    //         if (passwordInput.confirmPassword !== passwordInput.password) {
    //             setConfirmPasswordError("Confirm password is not matched");
    //         } else {
    //             setConfirmPasswordError("");
    //         }

    //     }
    // }
    const handleValidation = (evnt) => {
        const passwordInputValue = evnt.target.value.trim();
        const passwordInputFieldName = evnt.target.name;
        //for password 
        if (passwordInputFieldName === 'password') {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const passwordLength = passwordInputValue.length;
            const uppercasePassword = uppercaseRegExp.test(passwordInputValue);
            const lowercasePassword = lowercaseRegExp.test(passwordInputValue);
            const digitsPassword = digitsRegExp.test(passwordInputValue);
            const specialCharPassword = specialCharRegExp.test(passwordInputValue);
            const minLengthPassword = minLengthRegExp.test(passwordInputValue);
            let errMsg = "";
            if (passwordLength === 0) {
                errMsg = "Password is empty";
            }
            // else if (!uppercasePassword) {
            //     errMsg = "At least one Uppercase";
            // } else if (!lowercasePassword) {
            //     errMsg = "At least one Lowercase";
            // } else if (!digitsPassword) {
            //     errMsg = "At least one digit";
            // } else if (!specialCharPassword) {
            //     errMsg = "At least one Special Characters";
            // } else if (!minLengthPassword) {
            //     errMsg = "At least minumum 8 characters";
            // } else {
            //     errMsg = "";
            // }
            if (uppercasePassword) {
                var element = document.getElementById("err1");
                element.classList.add("vaild");
                setUpper(true);
            } else {
                var element = document.getElementById("err1");
                element.classList.remove("vaild");
                setUpper(false);
            }
            if (lowercasePassword) {
                var element = document.getElementById("err");
                element.classList.add("vaild");
                setLower(true);
            } else {
                var element = document.getElementById("err");
                element.classList.remove("vaild");
                setLower(false);
            }
            if (digitsPassword) {
                var element = document.getElementById("err2");
                element.classList.add("vaild");
                setNumber(true);
            } else {
                var element = document.getElementById("err2");
                element.classList.remove("vaild");
                setNumber(false);
            }
            if (specialCharPassword) {
                var element = document.getElementById("err3");
                element.classList.add("vaild");
                setSpecial(true)
            } else {
                var element = document.getElementById("err3");
                element.classList.remove("vaild");
                setSpecial(false)
            }
            if (minLengthPassword) {
                var element = document.getElementById("err4");
                element.classList.add("vaild");
                setLimit(true)
            } else {
                var element = document.getElementById("err4");
                element.classList.remove("vaild");
                setLimit(false)
            }
            if (limit && upper && special && lower && number && confirmPasswordError === "") {
                setError("")
            }

           
            setPasswordErr(errMsg);
        }
        // for confirm password
        // if (passwordInputFieldName === "confirmPassword" || (passwordInputFieldName === "password")) {
              
        //     if (passwordInput.confirmPassword !== passwordInput.password) {
        //         setConfirmPasswordError("Confirm password is not matched");
        //     } else {
        //         setConfirmPasswordError("");
        //     }

        // }
    }
    const togglePassword = (e) => {
        setPasswordShown(!passwordShown);
    };

    const handlePwdGenerate = (e) => {
      
        if(passwordInput.password == ""){
            if(id){
                setError("Please Enter New Password");
                setTimeout(function () { setError("") }, 4000);
            }else{
                setError("Please Enter Password");
                setTimeout(function () { setError("") }, 4000);
            }
            
            

        }else if(passwordInput.confirmPassword === ""){
            setError("Please Enter Confirm Password");
            setTimeout(function () { setError("") }, 4000);

        }
        else if (passwordInput.confirmPassword !== passwordInput.password) {
            setConfirmPasswordError("Confirm password is not matched");
            // setTimeout(function () { setConfirmPasswordError("") }, 3000);
        }
        //else if(lower === false && number === false && limit === false && lower === false && special === false){
        //     setError("Please Enter Strong Password");
        //     setTimeout(function () { setError("") }, 3000);

        // }
       else if (!limit || !upper || !special || !lower || !number){
      
            setError("Please enter the password as per the instructions");
            // setTimeout(function () { setError("") }, 3000);
        
     }
       else if (limit && upper && special && lower && number && confirmPasswordError === "") {
        setError("")
        
          if(passwordInput.password === passwordInput.confirmPassword){
            setConfirmPasswordError("")
            
            pwdGenerate();
          }
        }
     
    }

    const pwdGenerate = async () => {
        setBtnLoader(true)
        try {
            const response = await tmdbApi.pwdGenerate({
                "emailid": email,
                "password": passwordInput.password,
                 "useragent" : locData?.headers !== undefined ? locData?.headers : {}
            });
            console.log(response.result.token);
           if(response.result.token){
             window.localStorage.setItem("token",response.result.token);
             window.localStorage.setItem("login","setlogin"); 
             window.localStorage.setItem("clientid",response.result.clientid); 

             let currentDate = new Date().toJSON();
             window.localStorage.setItem("currentSessionClientTime",currentDate); 
             setWelcomeMsg(true)
             history.push("/content")
           }
           setBtnLoader(false)
        } catch {
            setBtnLoader(false)
            console.log("error");
        }
    };

    function handleClose() {
        history.push("/");
    }
    return (
        <>


            <button className="close-btn" onClick={handleClose}><span className="material-icons">close</span></button>
            <div className="signin-wrapper create-password">
                <a href="/">
                    <img src={"https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images//logoupdated.png?auto=compress,format"} className="logo" /></a>
                {/* <h1 className="bold-heading bold-title">welcome back !</h1> */}
                <p className="strong">Create strong and secure passwords to keep your account safe</p>
                <span className="material-icons-outlined secure-icon">lock_person</span>
                <div className="crpsd-cnt-blk">
                <div className="signin-body create-password-body">
                    <div className="signin-section emaillogin ">
                       <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" value={email} placeholder={email} />
                            <label className="floatingInput">Email<span>*</span></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type={passwordShown ? "text" : "password"} value={passwordInput.password} onChange={(e) => handlePasswordChange(e)} onKeyUp={handleValidation} name="password" placeholder="Password" className="form-control" onBlur={(e) => {handleAddclass(e)}} 
                            onFocus={(e) => {handleRemoveclass(e)}} />
                            <p className="text-danger">{passwordError}</p>
                            <label className="floatingInput">{id ? "New Password" : "New Password"}<span>*</span></label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type={passwordShown ? "text" : "password"} value={passwordInput.confirmPassword} onChange={(e) => handlePasswordChange(e)}
                            //  onKeyUp={handleConfirm}
                              onBlur={(e) => {handleAddclass(e)}}
                               onFocus={(e) => {handleRemoveclass(e)}} 
                               name="confirmPassword" placeholder="Password" className="form-control" />
                            <p className="text-danger">{confirmPasswordError}</p>
                            <label className="floatingInput">Confirm Password<span>*</span></label>
                        </div>
                        <div className="flex-left terms-block">
                            <input type="checkbox" id="terms-check" onChange={(e) => togglePassword(e)} />
                            <label > Show Password.</label>
                        </div>
                        <p className="text-danger">{error}</p>
                        <div className="signin-footer mt-4">
                            <button className="fill_btn yellow-gradient" onClick={e => handlePwdGenerate(e)}>{btnLoader ? (<img src="https://orasi-dev.imgix.net/orasi/client/resources/orasiv1/images/common-icons/rotate_right.svg" className="loading-icon" />) : null}Create Password</button>
                        </div>

                    </div>

                    <div>

                    </div>

                </div>

                <div className="create-password-instruction ins-dsp-none" id="instruction">
                    <p className="error" id="err">{lower ? <span className="material-symbols-outlined">
                        check
                    </span> : <span className="material-symbols-outlined">
                        close
                    </span>} Password must contain a lower case letter</p>
                    <p className="error" id="err1"> {upper ? <span className="material-symbols-outlined">
                        check
                    </span> : <span className="material-symbols-outlined">
                        close
                    </span>} Password must contain an upper case letter</p>
                    <p className="error" id="err2">  {number ? <span className="material-symbols-outlined">
                        check
                    </span> : <span className="material-symbols-outlined">
                        close
                    </span>} Password must contain a number</p>
                   <p className="error" id="err3"> {special ? <span className="material-symbols-outlined">
                        check
                    </span> : <span className="material-symbols-outlined">
                        close
                    </span>} Password must contain a special character or a space</p>
                    <p className="error" id="err4"> {limit ? <span className="material-symbols-outlined">
                        check
                    </span> : <span className="material-symbols-outlined">
                        close
                    </span>} Password must contain at least 8 characters</p>
                        </div>
                        </div>

            </div>

            <Footer menus={menus} /></>
    )
}
export default GeneratePassword;