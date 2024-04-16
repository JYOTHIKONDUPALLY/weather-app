import "./Searchbar.css";
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { useWeather } from '../../contexts/WeatherContext';

const Searchbar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const { fetchTabularData, tabularData} = useWeather();
  const handleInputValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  useEffect(() => {
    if (tabularData.length>0) {
      const optionsData = tabularData.map((city) => city.ascii_name);
      setSearchOptions(optionsData);
    }
  }, [tabularData]);

  return (
    <div className="search-container">
      <div className="searchbar">
        <FaMapMarkerAlt className="icon" />
        <input
          type="text"
          value={searchValue}
          placeholder="Enter City"
          onChange={handleInputValue}
          onKeyDown={handleKeyDown}
        />
        <FaArrowRight className="icon" onClick={() => onSearch(searchValue)} />
      </div>
      {searchOptions.length > 0 && (
        <div className="dropdown">
          {searchOptions
            .filter((item) => {
              const searchCity = searchValue.toLowerCase();
              const cityName = item.toLowerCase();
              return searchCity && cityName.startsWith(searchCity) && cityName !== searchCity;
            })
            .map((item, index) => (
              <div
                className="dropdown-row"
                key={index}
                onClick={() => {
                  setSearchValue(item);
                  onSearch(item); 
                }}
              >
                {item}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
