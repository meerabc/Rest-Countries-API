import "./App.css";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeContext from "./contexts/ThemeContext";
import {CountryProvider} from "./contexts/CountryContext"
import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";

export default function App() {
  const [isDark, setIsDark] = useState(false);

  function toggleTheme() {
    setIsDark(prev => !prev);
  }

  useEffect(() => {
    document.body.setAttribute("theme", isDark ? "dark" : "light");
  }, [isDark]);


  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
    <CountryProvider initialCountries={[]}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:countryId" element={<DetailsPage />} />
        </Routes>
      </Router>
    </CountryProvider>
    </ThemeContext.Provider>
  );
}