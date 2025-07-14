import './DetailsPage.css'
import Header from '../../components/Header'
import BackButton from "./components/BackButton"
import CountryDetail from './components/CountryDetail'
import { useParams } from 'react-router-dom'


export default function DetailPage({ countries = [] }) {
    const { countryId } = useParams();
    
    // Finding the required country obbject using cca3
    const country = countries.find(country => country.cca3 === countryId);

    return (
        <div className='container'>
            <Header />
            <main>
                <BackButton />
                <CountryDetail country={country} countries={countries} />
            </main>
        </div>
    );
}