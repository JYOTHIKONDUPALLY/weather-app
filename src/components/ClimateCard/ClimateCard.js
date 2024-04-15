import React, { useEffect, useState } from "react";
import "./ClimateCard.css";
import { Link } from "react-router-dom";
import Sky from "../../data/mountains-8451480.jpg"
import Rain from "../../data/rain-3582.gif";
import Clouds from "../../data/nature-4117_256.gif";
import haze from "../../data/flowers-276014.jpg"


const weatherCondition=[
  {climate:"clear sky",
description:"Enjoy your hassle-free day under the clear skies.",img:Sky },
{climate:"Rain", description:"Don't Forget your Umberlla",img:Rain},
{climate:"overcast clouds", description:"Embrace the tranquil beauty of the overcast sky", img:Clouds},
{climate:"haze", description:"Amidst the haze, find solace in the subtle diffusion of light", img:haze},
]
const ClimateCard = ({ city }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const cityUnixSeconds = city.dt;
    const cityDate = new Date(cityUnixSeconds * 1000);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = cityDate.toLocaleString('en-US', options);
    const formattedTime = cityDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  
    // Define regular expressions for different weather conditions
    const rainRegex = /rain/i; // case-insensitive match for rain
    const cloudRegex = /cloud/i; // case-insensitive match for cloud
    const hazeRegex = /haze/i; // case-insensitive match for haze
  
    // Find the weather condition in weatherCondition array
    const condition = weatherCondition.find(condition => {
      return rainRegex.test(condition.climate) && rainRegex.test(city.weather[0].main) ||
             cloudRegex.test(condition.climate) && cloudRegex.test(city.weather[0].main) ||
             hazeRegex.test(condition.climate) && hazeRegex.test(city.weather[0].main);
    });
  
    if (condition) {
      setDescription(condition.description);
      setImageUrl(condition.img);
    } else {
      // Handle unmatched weather conditions
      setDescription("Enjoy Your day!");
      setImageUrl("../../data/dancing-dave-minion-510835_1920");
    }
  }, [city]);
  

  return (
    <div className='ClimateCardConatiner'>
      <div className='card'>
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
      </div>
    </div>
  );
}

export default ClimateCard;