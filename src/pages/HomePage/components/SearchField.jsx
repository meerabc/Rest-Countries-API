import { FaSearch } from "react-icons/fa";

export default function SearchField({onChange}){
    return(
        <div className="search-field">
            <FaSearch className="search-icon"/>
            <input type="text" id="country" name="country" 
            placeholder="Search for a country..." onChange={(e)=>onChange(e)}></input>
        </div>
    )

}