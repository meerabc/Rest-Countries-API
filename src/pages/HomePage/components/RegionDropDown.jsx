import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionDropDown({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Filter by Region");
  const dropdownRef = useRef(null);

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

  function handleSelect(region) {
    setSelected(region);
    setOpen(false);
    // Pass the region name directly to onChange
    if (onChange) onChange(region);
  }

  return (
    <div className="region-drop-down" ref={dropdownRef} >
      <button className="region-btn" onClick={() => setOpen((prev) => !prev)}> 
          {selected} <FaAngleDown className="down-icon"/>
      </button>

      {open && (
        <ul className="region-options">
          {regions.map(region => (
            <li key={region}>
              <button type="button" className="region-option-btn" onClick={() => handleSelect(region)}>
                {region}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}