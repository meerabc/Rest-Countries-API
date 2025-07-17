import './DetailsPage.css'
import { useCountryContext } from '../../contexts/CountryContext';
import Header from '../../components/Header'
import BackButton from "./components/BackButton"
import CountryDetail from './components/CountryDetail'
import { useParams } from 'react-router-dom'


export default function DetailPage() {
    const { countryId } = useParams();
    const {state} = useCountryContext()
    const {countries} = state
    
    // Finding the required country obbject using cca3
    const country = countries.find(country => country.cca3 === countryId);

    return (
        <div className='container'>
            <Header />
            <main>
                <BackButton />
                <CountryDetail country={country} />
            </main>
        </div>
    );
}