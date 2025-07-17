import { FaSearch } from "react-icons/fa";

export default function SearchField({onChange,value}){
    return(
        <div className="search-field">
            <FaSearch className="search-icon"/>
            <input type="text" id="country" name="country" value={value}
            placeholder="Search for a country..." onChange={(e)=>onChange(e)}></input>
        </div>
    )

}

