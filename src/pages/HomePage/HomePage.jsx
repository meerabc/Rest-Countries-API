import './HomePage.css'
import { useState, useEffect } from 'react';
import Header from '../../components/Header'
import CountryCard from "./components/CountryCard"
import SearchField from "./components/SearchField"
import RegionDropDown from "./components/RegionDropDown"

export default function HomePage({countries}){

    const [filteredCountries,setFilteredCountries]= useState(countries);
    

    //updates filteredCountries IF the countries prop changes ever in future

    useEffect(()=>{
         setFilteredCountries(countries)
    },[countries]
    )

    const cardElements = filteredCountries.map(country=>
        <CountryCard key={country.cca3} {...country} /> 
    )
    
    function filterCountries(e){
       setFilteredCountries(
          countries.filter(country=>
            country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
          )
       )
    }

    function filterByRegion(selectedRegion){
       // Now we receive the region name directly, not an event object
       const selected = selectedRegion.toLowerCase();
       
       if(selected === "all"){
        setFilteredCountries(countries)
       } else{
        setFilteredCountries(
            countries.filter(country=>
                country.region.toLowerCase() === selected
            ))
       }     
    }

    return(
        <div className='container'>
            <Header/>
            <main>
                <div className="search-container">
                    <SearchField onChange={filterCountries} />
                    <RegionDropDown onChange={filterByRegion} />
                </div>
                <div className="cards-container">
                    {cardElements}
                </div>
            </main>
        </div>
    )
}