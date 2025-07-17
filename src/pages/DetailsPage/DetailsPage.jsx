import './DetailsPage.css'
import Header from '../../components/Header'
import BackButton from "./components/BackButton"
import CountryDetail from './components/CountryDetail'
import { useParams } from 'react-router-dom'
import {useState,useEffect} from 'react' 
import axios from 'axios'


export default function DetailsPage() {
  const { countryId } = useParams(); // countryId is cca3
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://restcountries.com/v3.1/alpha/${countryId}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`
      )
      .then((res) => {
        console.log("country: ", res.data)
        setCountry(res.data[0] || res.data); // API may return array or object
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load country details.");
        setLoading(false);
      });
  }, [countryId]);

    return (
        <div className='container'>
            <Header />
            <main>
                <BackButton />
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {!loading && !error && !country && <div>Country not found.</div>}
                {!loading && !error && country && <CountryDetail country={country} />}
            </main>
        </div>
    );
}