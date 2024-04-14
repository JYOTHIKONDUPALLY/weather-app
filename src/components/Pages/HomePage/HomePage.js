import React, { useState } from "react";
import { useSnackbar } from "notistack";
import "./HomePage.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Header from "../../Header/Header";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";
import WeatherPage from "../weatherPage/weatherPage";
import ClimateCard from "../../ClimateCard/ClimateCard";

const HomePage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [cityData, setCityData]=useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleInputValue = (e) => {
        const data = e.target.value;
        setSearchValue(data);
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=26ab58e31f69faf08beb94258744cbd0`);
            const citydata = response.data;
            console.log("City data:", cityData);
            setCityData(citydata);
            setSearchPerformed(true);
            // navigate("/weather", { state: { city: cityData } });
        } catch (err) {
            enqueueSnackbar("No city found", { variant: "error" });
        }
    }

    return (
        <div className="container">
            <Header/>
        <div className="sections">
        <div className={`heroSection ${searchPerformed ? "searchPerformed" : ""}`}>
            <h1 className="font1">
              <span></span> Weather & ForeCast
            </h1>
            <div className="typewriter">
              <Typewriter
                options={{
                  strings: "Check out today's weather",
                  autoStart: true,
                  loop: true
                }}
              />
            </div>
            <p className="font2">
              Stay ahead of the weather game, check out our forecasts today! From
              sunshine to showers, we've got you covered.
            </p>
            <div className="searchbar">
              <FaMapMarkerAlt color="black" size={"20px"} />
              <input
                type="text"
                value={searchValue}
                placeholder="Enter City"
                onChange={handleInputValue}
              />
              <FaArrowRight onClick={fetchData} size={"20px"} color="black" />
            </div>
          </div>
          <div className="ClimateSection">
            {searchPerformed && <div><ClimateCard city={cityData}/></div>}
          </div>
        </div>
         
         
        </div>
      );
};

export default HomePage;
