import axiosClient from "./axiosClient";
let { appname } = window.app;

const tmdbApi = {
  
  websitedefaults: (params) => {
    const url = "/config?" + 'appname=' + appname;
    return axiosClient.get(url, params);
  },


  appMenus: (params) => {
    let payloadResult =  params.result
    const url = "/menus?" + 'appname=' + appname + '&appType=client&page=landingpage&result=' + payloadResult;
    return axiosClient.get(url, params);
  },

  appMenusCode: (params) => {
    const Code =  localStorage.getItem("menuCode");
    const url = "/menus?" + 'appname=' + appname + '&appType=client&page=landingpage&menuid='+ Code;
    return axiosClient.get(url, params);
  },

  signUp: (params) => {
    const url = "/signUp?appname=" + appname ;
    return axiosClient.post(url, params);
  },

  otpVerify: (params) => {
    const url = "/otpVerify?appname=" + appname ;
    return axiosClient.post(url, params);
  },
  
  resendMail: (params) => {
    let payload = params
    let url = `/resendMail?appname=${appname}${params?.page ? `&page=${params?.page}`:''}`;
    if (payload.hasOwnProperty('page')) delete payload['page']

    return axiosClient.post(url, payload);
  },

  updateUser: (params) => {
    const url = "/termsaccept?appname=" + appname;
    return axiosClient.post(url, params);
  },

  signin: (params) => {
    const url = "/signin?appname=" + appname;
    return axiosClient.post(url, params);
  },

  signOtp: (params) => {
    const url = "/signin?appname=" + appname+"&type=signin" ;
    return axiosClient.post(url, params);
  },

  pwdGenerate: (params) => {
    // const token = localStorage.getItem("token")

    const url = "/setPassword?appname=" + appname;
    // +"&token="+token ;
    return axiosClient.post(url, params);
  },

  ForgotPassword: (params) => {
    const url = "/forgotPassword?appname=" + appname;
    return axiosClient.post(url, params);
  },

  ClientContactus: (params) => {
    const token = localStorage.getItem("token")

    const url = "/contactus?appname=" + appname
    +"&token="+token;
    return axiosClient.post(url, params);
  },
  contactus: (params) => {

    const url = "/contactus?appname=" + appname
    return axiosClient.post(url, params);
  },
  
  getCategoriesFeatured : (params) => {

    const url = "/category?appname="+ appname + "&projection=tiny";
    return axiosClient.get(url, params);
  },

  getCategories: (params) => {
    const token = localStorage.getItem("token")

    const url = "/category?appname="+ appname 
    +"&token="+token ;
    return axiosClient.get(url, params);
  },

  getClientData: (params) => {
    const clientid = localStorage.getItem("clientid")
    const url = "/client?appname="+ appname +"&clientid="+clientid;
    return axiosClient.get(url, params);
  },

  updateClientData: (params) => {
    const token = localStorage.getItem("token")

    const clientid = localStorage.getItem("clientid")
    const url = "/client?appname="+ appname +"&clientid="+clientid
    +"&token="+token;
    return axiosClient.post(url, params);
  },

  
  updateCompanyData: (params) => {
    let payload = params
    const token = localStorage.getItem("token")
    let companyid = params.companyid
    const clientid = localStorage.getItem("clientid")
    if (payload.hasOwnProperty('companyid')) delete payload['companyid']

    const url = "/company?appname="+ appname +"&clientid="+clientid+"&companyid="+companyid
    +"&token="+token;
    return axiosClient.post(url, payload);
  },


  Recommend: (params) => {
    const clientid = localStorage.getItem("clientid")
    const token = localStorage.getItem("token")

    const url = "/recommend?appname="+ appname +"&clientid="+clientid
    +"&token="+token;
    return axiosClient.post(url, params);
  },


  // filterCategoryOriginal: (params) => { 
  //   let payload = params 
  //   const token = localStorage.getItem("token")
  //   const clientid = localStorage.getItem("clientid")
  //   const currentSessionClientTime = localStorage.getItem("currentSessionClientTime")
  //   payload = {...payload,["login_time"]:currentSessionClientTime}
  //   let pageNumber = params.pageNumber || 1;
  //   let assetcount = params.perpage || 18;
  //   let companyid = params.companyid || "";
  //   // let sorting = params.sorting || "";
    
  //   if (payload.hasOwnProperty('pageNumber')) delete payload['pageNumber']
  //   if (payload.hasOwnProperty('assetcount')) delete payload['assetcount']
  //   if (payload.hasOwnProperty('perpage')) delete payload['perpage']
  //   if (payload.hasOwnProperty('companyid')) delete payload['companyid']
  //   // if (payload.hasOwnProperty('sorting')) delete payload['sorting']

  //   let url = "/content?appname="+ appname +"&clientid="+clientid
  //   +"&token="+token; 
  //   if( pageNumber != "") { url = url + `&pageNumber=${pageNumber}`}
  //   if( assetcount != "") {url = url + `&assetcount=${assetcount}`}
  //   if( companyid != "") {url = url + `&companyid=${companyid}`}
  //   // if( sorting != "") {url = url + `&sorting=${sorting}`}
  //   // console.log('payload in content',payload)
  //   // console.log('params in content',params)
  //   return axiosClient.post(url, payload);

  // },
  
  filterCategory: (params) => { 
    let payload = params 
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    const currentSessionClientTime = localStorage.getItem("currentSessionClientTime")

    payload = {...payload,["login_time"]:currentSessionClientTime}
    let pageNumber = params.pageNumber || 1;
    let assetcount = params.perpage || 18;
    let companyid = params.companyid || "";
    let sorting = params.sorting || "";
    // console.log('filterCategoryv1 tmdapi before',payload)

    function modifyObject(inputObject) {
      const filterKeys = [
        "languages",
        "dubbinglanguages",
        "resolution",
        "restrictioncountry",
        "rightsavailablefromdate",
        "rightsavailabletodate",
        "territoriesavailable",
        "typeofrights"
      ];
    
      
      const clientcontentSearch = {};
      const contentSearch = {};
    
      // Copy values to clientcontentSearch and remove from inputObject
      filterKeys.forEach(key => {
        if (inputObject[key]) {
          clientcontentSearch[key] = inputObject[key];
          delete inputObject[key];
        }
      });
    
    
      for (const key in inputObject) {
        if (key !== "contentsearch" && key !== "login_time" && key !== "clientcontentSearch" && key !== "pageNumber" && key !== "perpage" && key !== "showmycontent" && key !=="companyid" && key !== "assetcount" && key !== "sorting") {
          contentSearch[key] = inputObject[key];
          delete inputObject[key];
        }
      }
    
      // Only add "contentSearch" if it has values
      if (Object.keys(contentSearch).length > 0) {
        inputObject.contentSearch = contentSearch;
      }
    
      // Add "clientcontentSearch" if it has values
      if (Object.keys(clientcontentSearch).length > 0) {
        inputObject.clientcontentSearch = clientcontentSearch;
      }
    
      return inputObject;
    }
    
    let payload2 = modifyObject(payload);
    // console.log('modifiedObject---->',payload);
    
    
    if (payload2.hasOwnProperty('pageNumber')) delete payload2['pageNumber']
    if (payload2.hasOwnProperty('assetcount')) delete payload2['assetcount']
    if (payload2.hasOwnProperty('perpage')) delete payload2['perpage']
    if (payload2.hasOwnProperty('companyid')) delete payload2['companyid']
    if (payload2.hasOwnProperty('sorting')) delete payload2['sorting']

    let url = "/content?appname="+ appname +"&clientid="+clientid
    +"&token="+token; 
    if( pageNumber != "") { url = url + `&pageNumber=${pageNumber}`}
    if( assetcount != "") {url = url + `&assetcount=${assetcount}`}
    if( companyid != "") {url = url + `&companyid=${companyid}`}
    if( sorting != "") {url = url + `&sorting=${sorting}`}
    // console.log('filterCategoryv1 tmdapi after',payload2)

    return axiosClient.post(url, payload2);

  },


  featuredContent: (params) => {
    let payload = params
    let assetcount = params.perpage || 12;
    // if( pageNumber != "") { url = url + `&pageNumber=${pageNumber}`}
    if (payload.hasOwnProperty('perpage')) delete payload['perpage']
    if (payload.hasOwnProperty('assetcount')) delete payload['assetcount']

    let url = "/content?appname="+ appname;

    if( assetcount != "") {url = url + `&assetcount=${assetcount}`}
    return axiosClient.post(url, payload);

  },


  featuredContentHeroSlide: (params) => {
    
    let url = "/content?appname="+ appname+"&projection=macro";
    return axiosClient.post(url, params);

  },


  updatePreferences: (params)=> {
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    const url = "/preferences?appname="+appname+"&clientid="+clientid
    +"&token="+token;
    return axiosClient.post(url, params);
  },

  getLookUp: (params) => {
    const url = "/lookups?appname=" + appname;
    return axiosClient.post(url, params);
  },

  deleteWishlist: (params) => {
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    console.log('paramsssss',params)
    let payload = {contentid:[params.contentid]}
    const url = "/wishlist?appname="+appname+"&clientid="+clientid+"&token="+token;
    return axiosClient.delete(url, payload);
  },

  
  getEnquireList: (params) => {
    const token = localStorage.getItem("token")
    let clientid = localStorage.getItem("clientid")

    let payload = params
    let pageNumber = params.pageNumber || 1;
    let assetcount = params.perpage || 10;
    
    let url = "/clientEnquiry?appname="+appname+"&clientid="+clientid
    +"&token="+token;
    if( pageNumber != "") { url = url + `&pageNumber=${pageNumber}`}
  if( assetcount != "") {url = url + `&assetcount=${assetcount}`}
  if (payload.hasOwnProperty('pageNumber')) delete payload['pageNumber']
  if (payload.hasOwnProperty('assetcount')) delete payload['assetcount']
  if (payload.hasOwnProperty('perpage')) delete payload['perpage']
    return axiosClient.get(url,payload);
  }
,

getEnquireItem: (params) => {
  const token = localStorage.getItem("token")

  let url = "/clientEnquiry?appname="+appname+"&enquiryid="+params.enquiryid
  +"&token="+token;

  return axiosClient.get(url,params);
}
,
  getWishlist: (params) => {
    const token = localStorage.getItem("token")
    let payload = params
    // let pageNumber = params.pageNumber || 1;
    // let assetcount = params.perpage || 18;
    
    let clientid = localStorage.getItem("clientid")
    let url = "/wishlist?appname="+appname+"&clientid="+clientid
    +"&token="+token;
    // if( pageNumber != "") { url = url + `&pageNumber=${pageNumber}`}
    // if( assetcount != "") {url = url + `&assetcount=${assetcount}`}
    // if (payload.hasOwnProperty('pageNumber')) delete payload['pageNumber']
    // if (payload.hasOwnProperty('assetcount')) delete payload['assetcount']
    // if (payload.hasOwnProperty('perpage')) delete payload['perpage']
    // console.log('params',params)
    return axiosClient.get(url,payload);
  }
,


cartGetWishlist: (params) => {
  const token = localStorage.getItem("token")
  let payload = params
  let pageNumber = params.pageNumber || 1;
  let assetcount = params.perpage || 10;
  
  let clientid = localStorage.getItem("clientid")
  let url = "/wishlist?appname="+appname+"&clientid="+clientid
  +"&token="+token;
  if( pageNumber != "") { url = url + `&pageNumber=${pageNumber}`}
  if( assetcount != "") {url = url + `&assetcount=${assetcount}`}
  if (payload.hasOwnProperty('pageNumber')) delete payload['pageNumber']
  if (payload.hasOwnProperty('assetcount')) delete payload['assetcount']
  if (payload.hasOwnProperty('perpage')) delete payload['perpage']
  // console.log('params',params)
  return axiosClient.get(url,payload);
}
,

  
  AddToWishlist: (params) => {
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    const url = "/wishlist?appname="+appname+"&clientid="+clientid
    +"&token="+token;
    return axiosClient.put(url, params);
  },

  SignOutUser: (params) => {

    // const url = "/signout?appname="+appname+"&emailid="+params.emailId;
    let payload = {emailid:params.emailId}
    const url = "/signout?appname="+appname;
    return axiosClient.post(url,payload);
  },

  SignOutUserInSession: (params) => {

    const url = "/signout?appname="+appname;
    return axiosClient.post(url,params);
  },

  getPreferences: (params) => {
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    const url = "/preferences?appname="+appname+"&clientid="+clientid
    +"&token="+token;
    return axiosClient.get(url, params);
  },

  submitEnquiry: (params) => {
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    const url = "/clientEnquiry?appname="+appname+"&clientid="+clientid
    +"&token="+token;
    return axiosClient.put(url, params);
  },
  requestVideo: (params) => {
    let payload = params
    const token = localStorage.getItem("token")
    const clientid = localStorage.getItem("clientid")
    const url = "/requestMetaData?appname="+appname+"&clientid="+clientid+"&contentid="+params.contentid;
    if (payload.hasOwnProperty('contentid')) delete payload['contentid']
    return axiosClient.post(url, payload);
  },






  // getTvList: (type, params) => {
  //   const url = "tv/" + tvType[type];
  //   return axiosClient.get(url, params);
  // },

  // getVideos: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/videos";
  //   return axiosClient.get(url, { params: {} });
  // },
  // search: (cate, params) => {
  //   const url = "search/" + category[cate];
  //   return axiosClient.get(url, params);
  // },
  // detail: (cate, id, params) => {
  //   const url = category[cate] + "/" + id;
  //   return axiosClient.get(url, params);
  // },
  // credits: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/credits";
  //   return axiosClient.get(url, { params: {} });
  // },
  // similar: (cate, id) => {
  //   const url = category[cate] + "/" + id + "/similar";
  //   return axiosClient.get(url, { params: {} });
  // },
};

export default tmdbApi;
