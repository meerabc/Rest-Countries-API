import "./App.css";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ThemeContext from "./contexts/ThemeContext";
import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function toggleTheme() {
    setIsDark(prev => !prev);
  }

  useEffect(() => {
    document.body.setAttribute("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,cca3,borders,currencies,languages,region,tld"
        );
        setCountries(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage countries={countries} 
                 loading={loading} error={error} />} />
          <Route path="/details/:countryId" element={<DetailsPage countries={countries} />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
}