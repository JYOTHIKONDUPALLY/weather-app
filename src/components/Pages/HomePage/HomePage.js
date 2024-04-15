import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import Header from '../../Header/Header';
import Typewriter from 'typewriter-effect';
import ClimateCard from '../../ClimateCard/ClimateCard';
import RecentSearchCities from '../../RecentSearchCities/RecentSearchCities';
import Searchbar from '../../Searchbar/Searchbar';
import { useWeather } from '../../../contexts/WeatherContext';
import "./HomePage.css";
import { updateRecentCities } from "../../../utils";
const HomePage = () => {
  const [searchPerformed, setSearchPerformed] = useState(false);
  const { cityData, fetchCityData,fetchTabularData, tabularData} = useWeather(); // Destructure tabularData from the context
  const { enqueueSnackbar } = useSnackbar();
  
  const handleSearch = async(searchValue) => {
    setSearchPerformed(true);
    fetchCityData(searchValue);
    updateRecentCities(searchValue)
    // const response = await fetchTabularData(1, searchValue); // Fetch tabular data with search value
    //     setTabularData(response);
  };

 
  const handleRecentCityClick = (cityName) => {
    setSearchPerformed(true);
    fetchCityData(cityName);
    const climateSection = document.querySelector(".ClimateSection");
    if (climateSection) {
      const targetScrollPosition = climateSection.offsetTop - 100; // Adjust the value as needed
      window.scrollTo({
        top: targetScrollPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="sections">
        <div className={`heroSection ${searchPerformed ? 'searchPerformed' : ''}`}>
          <h1 className="font1">
            <span></span> Weather & ForeCast
          </h1>
          <div className="typewriter">
            <Typewriter
              options={{
                strings: "Check out today's weather",
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <p className="font2">
            Stay ahead of the weather game, check out our forecasts today! From sunshine to showers, we've got you
            covered.
          </p>
        
          <Searchbar onSearch={handleSearch} tabularData={tabularData}/>
        </div>
        <div className="ClimateSection">{searchPerformed && cityData&& <ClimateCard city={cityData} />}</div>
      </div>
      <RecentSearchCities handleRecentCityClick={handleRecentCityClick} />
    </div>
  );
};

export default HomePage;
