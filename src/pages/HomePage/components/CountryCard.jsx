import { useNavigate } from 'react-router-dom'

export default function CountryCard(props){
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/details/${props.cca3}`)
    }

    return(
        <div className="card" onClick={handleCardClick}>
            <img src={props.flags.png} alt={props.flags.alt}></img>
            <div className="basic-info">
                <h3>{props.name.common}</h3>
                <p><span>Population: </span>{props.population}</p>
                <p><span>Region: </span>{props.region}</p>
                <p><span>Capital: </span>{props.capital}</p>
            </div>
        </div>
    )
}