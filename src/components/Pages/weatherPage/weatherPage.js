import React, { useEffect, useState } from "react";
import "./weatherPage.css";
import { useSnackbar } from "notistack";
import { Grid } from "@mui/material";
import Day from "../../../data/nature-4117_256.gif";
import Night from "../../../data/night-9061.gif";
import Header from "../../Header/Header";
import RecentSearchCities from "../../RecentSearchCities/RecentSearchCities";
import { useWeather } from "../../../contexts/WeatherContext"; // Import useWeather hook

const WeatherPage = () => {
  const storedCities = JSON.parse(localStorage.getItem("recentCities"));
  const defaultCity = storedCities ? storedCities[0] : "Delhi";
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [cityName, setCityName] = useState(defaultCity);
  const { fetchCityData, fetchClimateData, cityData, climateData } =
    useWeather(); // Destructure climateData

  useEffect(() => {
    fetchCityData(cityName);
    fetchClimateData(cityName);
  }, [cityName]);

  const formatTime = (dt) => {
    const citydate = new Date(dt * 1000);
    const formattedTime = citydate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return formattedTime;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const handleRecentCityClick = (cityName) => {
    setCityName(cityName);
    const weatherContainer = document.getElementById("weatherContainer");
    const targetScrollPosition = weatherContainer.offsetTop - 100;
    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth",
    });
  };

  const handleNextDayClick = () => {
    setSelectedDateIndex((prevIndex) => Math.min(prevIndex + 1, 4)); // Increment index, limit to 4
  };

  const handlePreviousDayClick = () => {
    setSelectedDateIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Decrement index, limit to 0
  };

  const filterNextDateData = () => {
    if (!climateData || !climateData.list) return []; // Check if climateData is null or list is null
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + selectedDateIndex); // Get next date
    const nextDateString = nextDate.toISOString().split("T")[0];

    return climateData.list.filter((data) => {
      const date = data.dt_txt.split(" ")[0];
      return date === nextDateString;
    });
  };

  return (
    <>
      <Header />
      <div id="weatherContainer">
        <h1 className="font1" style={{ fontSize: "40px" }}>
          Hourly Weather Data
        </h1>
        <p className="font2">
          A change in the weather is sufficient to recreate the world and
          ourselves.
        </p>
        {cityData && (
          <>
            <h2 className="Heading">{cityData.name}</h2>
            <section>
              <div className="section1">
                <div className="time-section">
                  <span className="sunrise">
                    <img src={Day} alt="day" />
                    <p>
                      sunrise:<br></br>
                      {formatTime(cityData.sys.sunrise)}
                    </p>
                  </span>
                  <span className="sunset">
                    {" "}
                    <img src={Night} alt="night" />
                    <p>
                      sunset<br></br>
                      {formatTime(cityData.sys.sunset)}
                    </p>
                  </span>
                </div>
                <div className="statusSection">
                  <p>
                    Wind status<br></br>
                    {cityData.wind.speed}m/sec
                  </p>
                  <p>
                    {" "}
                    humidity<br></br>
                    {cityData.main.humidity}%
                  </p>
                  <p>
                    visibility<br></br>
                    {cityData.visibility}m
                  </p>
                </div>
                <div className="statusSection">
                  <p>
                    temp<br></br>
                    {cityData.main.temp}m
                  </p>
                  <p>
                    max temp<br></br>
                    {cityData.main.temp_max}m/sec
                  </p>
                  <p>
                    min temp<br></br>
                    {cityData.main.temp_min}%
                  </p>
                </div>
              </div>
              <div className="section2">
                <h2>
                  {filterNextDateData().length > 0 &&
                    formatDate(filterNextDateData()[0].dt_txt)}
                </h2>
                <Grid container spacing={2} className="tempCard">
                  {filterNextDateData().map((data, index) => {
                    const weatherCondition = data.weather[0].main.toLowerCase();
                    const cardClassName = `weather-card ${weatherCondition}`;
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        key={index}
                        className={cardClassName}
                      >
                        <div>
                          <h1
                            style={{ fontSize: "20px", marginBottom: "10px" }}
                          >
                            {formatTime(data.dt)}
                          </h1>
                          <h3>{data.main.temp}C</h3>
                          <p style={{ fontSize: "30px" }}>
                            {data.weather[0].main}
                          </p>
                        </div>
                      </Grid>
                    );
                  })}
                </Grid>
                <div className="buttonContainer">
                  <button
                    disabled={selectedDateIndex <= 0}
                    onClick={handlePreviousDayClick}
                  >
                    Previous day
                  </button>
                  <button
                    disabled={selectedDateIndex >= 4}
                    onClick={handleNextDayClick}
                  >
                    Next day
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      <RecentSearchCities handleRecentCityClick={handleRecentCityClick} />
    </>
  );
};

export default WeatherPage;
