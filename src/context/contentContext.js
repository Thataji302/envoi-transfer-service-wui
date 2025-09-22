import React,{useState,createContext,useEffect,useRef } from "react";
import { useHistory  } from "react-router-dom";
import axios from "axios";
import tmdbApi from "../api/tmdbApi";

export const contentContext = createContext();

function ChangeContentProvider(props){
  const history = useHistory();
  const [menus, setMenus] = useState([]);
    const [initialData,setInitialData]= useState([])
    const [data, setData] = useState([]);
    const [initialCategoriesData1,setInitialCategoriesData1] = useState([]);
    const [isLoad1, setIsLoad1] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [perPageConst, setPerPageConst] = useState(18); 
    const [perpage, setPerpage] = useState(18);
    const [totalPages, setTotalPages] = useState(0);
    const [totalPagesArray, setTotalPagesArray] = useState(0);
    const [isLoading, setIsLoading] = useState(false); 
    const [grid, setGrid] = useState(true);
    const [list, setList] = useState(false);
    const [assetTotal, setAssetTotal] = useState(0); 
    const [hideMenu, setHideMenu] = useState(true);
    const [enqFormValues, SetEnqFormValues] = useState([]);
    const [categoryFields, setCategoryFields] = useState({});

    const [formValuesForContent, setFormValuesForContent] = useState([]);

    const [selectedOptions, setSelectedOptions] = useState([]);

  const [searchTitleInput, SetSearchTitleInput] = useState('');

    const [categoryName1, setCategoryName1] = useState([]);
    const [clientData , setClientData1] = useState([]);
    const [formValues, setFormValues] = useState([]);
    const [wishListData, setWishListData] = useState({});
    const [showCategoryData, setShowCategoryData] = useState(true); 
    const [MenuCategoryName, setMenuCategoryName] = useState(""); 
    const [isShowMyContent, setIsShowMyContent] = useState(false);
    const [searchFunActive, setSearchFunActive] = useState(false);
    const [contentSearchFlag, setContentSearchFlag] = useState(true);

    const [searchPayload, setSearchPayload] = useState({}); 
    const prevRouteRef = useRef(null);
    const [route, setRoute] = useState("");
    const [categorySearchPayload, setCategorySearchPayload] = useState({}); 
    const [titleSearchPayload, setTitleSearchPayload] = useState({});  
    const [activePayload, setActivePayload] = useState({});  
    const [welcomeMsg, setWelcomeMsg] = useState(false); 
    const [paramType, setParamType] = useState(""); 
    const [wishlistCount, setwishlistCount] = useState(0); 
    const [multiSelectFields, setMultiSelectFields] = useState({});
    const [activeSortingPayload, setActiveSortingPayload] = useState({});
    const [activeFieldsObj, setActiveFieldsObj] = useState({CookingshowActive:false,seriesActive:false,SportsActive:false,MusicActive:false,seriesActive:false});

    useEffect(() => {
      appMenus();
      // GetClientDataFunction();
      userAgent();
    }, []);
    function usePrevious(newRoute) {
      const ref = React.useRef();
      React.useEffect(()=>{
        ref.current = newRoute
      }, [newRoute])
      return ref.current
    }
    const userAgent = async () => {
    axios({
      method: 'GET',
      url: "https://d4nv8o5tzs3mt.cloudfront.net/",
    })
      .then(function (response) {
        let locData = JSON.stringify(response.data)
        localStorage.setItem("loc", locData);
      });
  }

      
    
    const Categories = async () => {
        try {
       
          const response = await tmdbApi.getCategoriesFeatured({});
          if (response.statusCode === 200) {
            setData(response.result);
            let arr = []
            response.result.forEach((item) => {
              arr.push(item.name);
            });
    
            const arrOfObj = arr.map((item) => {
              return { value: item, label: item };
            });
            setCategoryName1(arrOfObj);
            setIsLoading(false)
          }
        } catch {
          console.log("error");
        }
      };



      const appMenus = async () => {
        try {
          console.log(tmdbApi);
          const response = await tmdbApi.appMenus({result : "tiny"});
          setMenus(response.result);
          console.log(response);
        } catch {
          // history.push('/home')
          console.log("error");
        }
      };

      const GetClientDataFunction = async () => {
        try {
          // console.log('context/contentContextcontext/contentContext')
          const response = await tmdbApi.getClientData({});
          console.log('responseeee',response)
          if(response.result == "Client not found" || response.result == []){
            localStorage.removeItem("token");
            localStorage.removeItem("clientid");
            localStorage.removeItem("login");
            localStorage.removeItem("currentSessionClientTime")
            console.log('------------------------ client not found',localStorage.getItem("token"))
            history.push('/login')
          }else{
          if (response.statusCode === 200) {
            setClientData1(response && response.result && response.result.result && response.result.result[0]);
           //console.log('response client Data--->',response.result[0].signednda)
           localStorage.setItem("signed",response && response.result && response.result.result && response.result.result[0] && response.result.result[0].signednda);
           localStorage.setItem("companyid",response && response.result && response.result.result && response.result.result[0] && response.result.result[0].companyid)
           
          }
        }
        } catch {
          console.log("error");
        }
      };
    
      

    return(
        <contentContext.Provider value={{setInitialCategoriesData1,setClientData1,initialData,Categories,categoryName1,setCategoryName1,setIsLoad1,isLoad1,initialCategoriesData1,setHideMenu,hideMenu,perPageConst, setPerPageConst,pageNumber,setPageNumber,assetTotal, setAssetTotal,perpage, setPerpage,totalPagesArray, setTotalPagesArray,totalPages, setTotalPages,appMenus,menus,isLoading, setIsLoading,clientData,GetClientDataFunction,formValues, setFormValues,wishListData, setWishListData,showCategoryData, setShowCategoryData,MenuCategoryName, setMenuCategoryName,isShowMyContent, searchPayload, setSearchPayload,setIsShowMyContent,searchFunActive, welcomeMsg, setWelcomeMsg,setSearchFunActive,paramType, setParamType ,list, setList,grid, setGrid,wishlistCount, setwishlistCount,activePayload, setActivePayload,userAgent,
          categorySearchPayload, setCategorySearchPayload,titleSearchPayload, setTitleSearchPayload,searchTitleInput, SetSearchTitleInput,categoryFields, setCategoryFields,
          selectedOptions, setSelectedOptions, data, setData,multiSelectFields, setMultiSelectFields,activeFieldsObj, setActiveFieldsObj,enqFormValues, SetEnqFormValues,formValuesForContent, setFormValuesForContent,usePrevious,route, setRoute,prevRouteRef,contentSearchFlag, setContentSearchFlag,activeSortingPayload, setActiveSortingPayload
       }}>
            {props.children}
        </contentContext.Provider>
    )
}

export default ChangeContentProvider;