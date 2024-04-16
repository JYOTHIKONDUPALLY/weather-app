import React, { useEffect, useState } from "react";
import "./ClimateCard.css";
import { Link } from "react-router-dom";
import Sky from "../../data/mountains-8451480.jpg";
import Rain from "../../data/rain-3582.gif";
import Clouds from "../../data/nature-4117_256.gif";
import haze from "../../data/flowers-276014.jpg";
import Sorry from "../../data/sorry.gif";

const weatherCondition=[
  {climate:"Clear", description:"Enjoy your hassle-free day under the clear skies.", img:Sky },
  {climate:"Rain", description:"Don't Forget your Umbrella", img:Rain},
  {climate:"Clouds", description:"Embrace the tranquil beauty of the overcast sky", img:Clouds},
  {climate:"Haze", description:"Amidst the haze, find solace in the subtle diffusion of light", img:haze},
];

const ClimateCard = ({ city }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");



  useEffect(() => {
    if (!city) return; // Handle case where city data is not available
  
    const cityDate = new Date((city.dt + city.timezone) * 1000); // Adjust time based on timezone
    const optionsDate = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = cityDate.toLocaleString('en-US', optionsDate);
    
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = cityDate.toLocaleString('en-US', optionsTime);
    
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
    
    const condition = weatherCondition.find(condition => {
      return condition.climate.toLowerCase() === city.weather[0].main.toLowerCase();
    });
    if (condition) {
      setDescription(condition.description);
      setImageUrl(condition.img);
    } else {
      setDescription("Enjoy Your day!");
      setImageUrl("../../data/dancing-dave-minion-510835_1920");
    }
  }, [city]);
  
  const cityName = JSON.parse(localStorage.getItem("recentCities"))[0];
  return (
    <div className='ClimateCardConatiner'>
      <div className='card'>
        {!city && <>
          <img src={Sorry} alt="sorry-img" />
          <div className="text">
            <div className='font1'>{cityName}</div>
            <p className="font2">Sorry! could not find the data</p>
          </div>
          <Link to={`/weather`}>
            <button className="button">More Details</button>
          </Link>
        </> }
        {city && <>
          <img src={imageUrl} alt="weather-img" />
          <div className="text">
            <div className='DateTime'>
              <p>{currentDate}</p>
              <p>{currentTime}</p>
            </div>
            <div className='font'>{city.name}</div>
            <h1>Climate: {city.weather[0].main}</h1>
            <p className='font2'>{city.weather[0].description}</p>
            <div className='font2'>temperature: {city.main.temp} C</div>
            <div>wind: {city.wind.speed} m/s</div>
            <p className="font2">{description}</p>
          </div>
          <Link to={`/weather`}>
            <button className="button">More Details</button>
          </Link>
        </>}
      </div>
    </div>
  );
}

export default ClimateCard;
