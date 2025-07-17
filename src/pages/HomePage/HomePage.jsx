import "./HomePage.css"
import {useCountryContext} from "../../contexts/CountryContext"
import Header from '../../components/Header'
import CountryCard from "./components/CountryCard"
import SearchField from "./components/SearchField"
import RegionDropDown from "./components/RegionDropDown"

export default function HomePage(){
    
    const {state,dispatch} = useCountryContext()
    const {filteredCountries,isFound,isLoading,error,searchQuery,currentRegion} = state

    function handleSearch(e) {
        dispatch({type:"SET_SEARCH" , payload:e.target.value})
        dispatch({type:"FILTER_COUNTRIES"})
    }

    function handleRegionSelect(region) {
        dispatch({type:"SET_REGION" , payload:region})
        dispatch({type:"FILTER_COUNTRIES"})
    }

    const cardElements = filteredCountries.map(country =>
        <CountryCard key={country.cca3} {...country} /> 
    )

    


    return(
        <div className='container'>
            <Header/>
            <main>
                <div className="search-container">
                    <SearchField value={searchQuery} onChange={handleSearch} />
                    <RegionDropDown value={currentRegion} onChange={handleRegionSelect} />
                </div>
                <div className="cards-container">
                    {isLoading ? (
                        <div className="loading-div">Loading data ...</div>
                    ) : error ? (
                        <div className="error-div">{error}</div>
                    ) : !isFound ? (
                        <div className="not-found-div">No Country Found ...</div>
                    ) : (
                        cardElements
                    )}
                </div>
            </main>
        </div>
    )
}