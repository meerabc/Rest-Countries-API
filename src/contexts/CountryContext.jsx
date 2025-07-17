import {createContext,useContext,useReducer,useEffect} from 'react'
import axios from 'axios'

const CountryContext = createContext();

export function useCountryContext(){
    return useContext(CountryContext)
}


const initialState = {
    countries: [],
    filteredCountries: [],
    isFound: false,
    currentRegion: "all",
    searchQuery: "",
    isLoading : false,
    error : null
}

function countryReducer(state, action){
    switch(action.type){
        case 'FETCH_REQUEST':
            return {
                ...state,
                isLoading:true,
                error:null
            }
        case "FETCH_SUCCESS" :
            return {
                ...state,
                countries:action.payload,
                filteredCountries:action.payload,
                isFound:action.payload.length>0,
                isLoading:false
            }
        case "FETCH_FAILURE" :
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case "SET_REGION":
            return {
                ...state,
                currentRegion:action.payload
            }
        case "SET_SEARCH":
            return {
                ...state,
                searchQuery:action.payload
            }
        case "FILTER_COUNTRIES": {
            let result = [...state.countries]
            if(state.currentRegion !== "all"){
                result = result.filter(country=>
                    country.region.toLowerCase() === state.currentRegion.toLowerCase()
                )
            }
            if(state.searchQuery !== ""){
                result = result.filter(country=>
                    country.name.common.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            }
            return{
                ...state,
                filteredCountries : result,
                isFound : result.length>0
            }
        }
        default :
            return state
    }
}

export function CountryProvider({children,initialCountries}){
    const [state,dispatch] = useReducer(countryReducer,{
        ...initialState,
        countries : initialCountries,
        filteredCountries : initialCountries,
        isFound : initialCountries.length>0,
        isLoading: initialCountries.length === 0
    })

    useEffect(()=>{
        if (state.countries.length === 0) {
            const fetchCountries = async() =>{
                dispatch({type:"FETCH_REQUEST"})
                try{
                    const response=
                    await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,cca3,borders,currencies,languages,region,tld")
                    dispatch({type:"FETCH_SUCCESS" , payload:response.data})
                }
                catch(error){
                    dispatch({type:"FETCH_FAILURE" , payload:error.message})
                }
            }
            fetchCountries()
        }
    },[])

    return(
        <CountryContext.Provider value={{state,dispatch}}>
            {children}
        </CountryContext.Provider>
    )
}


