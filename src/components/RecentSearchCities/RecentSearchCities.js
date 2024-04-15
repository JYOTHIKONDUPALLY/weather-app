import React from 'react';
import "./RecentSearchcities.css";
import Day from "../../data/nature-4117_256.gif"
const RecentSearchCities = ({handleRecentCityClick}) => {
  return (
    <div className="recentCitiesSection">
    <h2 className="font1" style={{ fontSize: "40px" }}>Recent search Weather</h2>
    <p className="font2">Wherever you go, no matter what the weather, always bring your own sunshine.</p>
    <div className="recentCitiesList">
      {JSON.parse(localStorage.getItem("recentCities"))?.map((cityName, index) => (
        <div key={index} className="recentCity" onClick={() => handleRecentCityClick(cityName)}>
          <img src={Day} alt="day"/>
         <p>{cityName}</p> 
        </div>
      ))}
    </div>
  </div>
  )
}

export default RecentSearchCities