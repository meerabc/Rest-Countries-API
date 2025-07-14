import {useNavigate} from 'react-router-dom'
import { GoArrowLeft } from "react-icons/go";

export default function BackButton(){

    const navigate = useNavigate()

    function handleClick(){
         navigate("/")
    }
    return(
        <button onClick={handleClick} className="back-button">
            <GoArrowLeft className="back-arrow"/>
            <span>back</span>
        </button>
    )
}