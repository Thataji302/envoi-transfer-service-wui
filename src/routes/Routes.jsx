import React from "react";
import { Route, Switch } from "react-router-dom";


import Home from "../pages/Home";
// import * as Config from "../constants/Config";
import SignUp from "../pages/signup";

import SignUpTerms from "../pages/signUpTerms";
import SignupMessage from "../pages/message";
import SignIn from "../pages/signin";
import SignInOtp from "../pages/loginOtp";
import GeneratePassword from "../pages/pwdGenerate";
const Routes = () => {
  return (
    <Switch>
   
      <Route path={'/'} exact component={Home} />

      <Route path={`/signup`} component={SignUp} />
      <Route path={`/login`} component={SignIn} />
      <Route path={`/loginotp`} component={SignInOtp} />
      <Route path={`/generatepassword`} component={GeneratePassword} />
      {/* <Route path={`/terms`} component={SignUpTerms} /> */}
      <Route path={`/terms/:id`} component={SignUpTerms} />
      <Route path={`/message`} component={SignupMessage} />
      
    </Switch>
  );
};

export default Routes;
