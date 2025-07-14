
import {useContext} from 'react'
import ThemeContext from "../contexts/ThemeContext"
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

export default function Header (){

    const {isDark,toggleTheme}=useContext(ThemeContext);

    return(
        <header>
            <h1>Where in the world?</h1>
            <button className="toggle-mode-btn" onClick={toggleTheme}>
                {isDark?<MdDarkMode className="darkmode-icon"/>:
                <MdOutlineDarkMode className="darkmode-icon"/>}
                Dark Mode
            </button>
        </header>
    )
}