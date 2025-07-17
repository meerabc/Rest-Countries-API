import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const regions = [
  { value: "all", label: "All" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" }
];

export default function RegionDropDown({ onChange, value }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get display text based on current value
  const getDisplayText = () => {
    if (!value || value === "all") return "Filter by Region";
    const region = regions.find(r => r.value === value);
    return region ? region.label : "Filter by Region";
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(regionValue) {
    setOpen(false);
    if (onChange) onChange(regionValue);
  }

  return (
    <div className="region-drop-down" ref={dropdownRef} >
      <button className="region-btn" onClick={() => setOpen((prev) => !prev)}> 
          {getDisplayText()} <FaAngleDown className="down-icon"/>
      </button>

      {open && (
        <ul className="region-options">
          {regions.map(region => (
            <li key={region.value}>
              <button 
                type="button" 
                className="region-option-btn" 
                onClick={() => handleSelect(region.value)}
              >
                {region.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
