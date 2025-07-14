import { useNavigate } from 'react-router-dom'

export default function CountryDetail({ country, countries }) {
    const navigate = useNavigate();

    const nativeName = country.name?.nativeName ? 
        Object.values(country.name.nativeName)[0]?.official || 'N/A' : 
        'N/A';

    const capital = Array.isArray(country.capital) ? 
        country.capital.join(', ') : 
        country.capital || 'N/A'

    return (
        <div className="country-detail">
            <img 
                src={country.flags?.png} 
                alt={country.flags?.alt || `${country.name?.common} flag`} 
            />
            <div className="text-content">
                <h2>{country.name?.common}</h2>
                <div className="info">
                    <div className="info-left">
                        <p><span>Native Name: </span>{nativeName}</p>
                        <p><span>Population: </span>
                            {country.population?.toLocaleString()}
                        </p>
                        <p><span>Region: </span>{country.region}</p>
                        <p><span>Sub Region: </span>
                            {country.subregion || 'N/A'}
                        </p>
                        <p><span>Capital: </span>{capital}</p>
                    </div>
                    <div className="info-right">
                        <p><span>Top Level Domain: </span>
                            {country.tld?.join(', ') || 'N/A'}
                        </p>
                        <p><span>Currencies: </span>
                            {country.currencies ? 
                                Object.values(country.currencies).map(c => c.name).join(', ') : 
                                "N/A"}
                        </p> 
                        <p><span>Languages: </span>
                            {country.languages ?
                                Object.values(country.languages).join(', ') :
                                "N/A"}
                        </p>
                    </div>
                </div>
                <div className="borders-div">
                    <span>Border Countries: </span>
                    {country.borders?.length > 0 ? (
                        country.borders.map(borderCode => {
                            const borderCountry = countries.find(c => c.cca3 === borderCode);
                            return (
                                <button 
                                    key={borderCode}
                                    className="border-btn"
                                    onClick={() => navigate(`/details/${borderCode}`)}
                                >
                                    {borderCountry?.name?.common || borderCode}
                                </button>
                            );
                        })
                    ) : (
                        "N/A"
                    )}
                </div>
            </div>
        </div>
    );
}