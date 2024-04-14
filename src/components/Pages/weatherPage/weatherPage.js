import React, { useState, useEffect } from 'react';
import axios from "axios";
// import night from "../../data/wolf.jpg";
// import nightGif from "../../data/night.gif";
import "./weatherPage.css";

const WeatherPage = () => {
  console.log(`citydata:${city}`)
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate]=useState(null);
  const city={
    "coord": {
        "lon": -0.1257,
        "lat": 51.5085
    },
    "weather": [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 290.21,
        "feels_like": 289.72,
        "temp_min": 287.09,
        "temp_max": 292.04,
        "pressure": 1019,
        "humidity": 67
    },
    "visibility": 10000,
    "wind": {
        "speed": 5.66,
        "deg": 250
    },
    "clouds": {
        "all": 75
    },
    "dt": 1713032892,
    "sys": {
        "type": 2,
        "id": 2075535,
        "country": "GB",
        "sunrise": 1712984889,
        "sunset": 1713034397
    },
    "timezone": 3600,
    "id": 2643743,
    "name": "London",
    "cod": 200
}
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleCurrentTime();
      console.log(city)
    }, 1000); // Update every second

    return () => clearInterval(intervalId); 
  }, []);

  const handleCurrentTime = () => {
    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
  
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  setCurrentDate(formattedDate)
    setCurrentTime(formattedTime);
  };
  
  return (
    <div className='container'>
      <div className='card'>
      <h1>{city.name}</h1>
      <h2>Date:{currentDate}</h2>
      <h2>Current Time: {currentTime}</h2>
      <ul>
        <li>temp:{city.main.temp}K</li>
        <li>humidity:{city.main.humidity}</li>
        <li>wind:{city.wind.speed}</li>
        <li>sunrise:{city.sys.sunrise}, sunset:{city.sys.sunset}</li>
      </ul>
      
      <h3>{city.weather[0].main}</h3>
      <p>{city.weather[0].description}</p>
      </div>
    </div>
  );
};

export default WeatherPage;
