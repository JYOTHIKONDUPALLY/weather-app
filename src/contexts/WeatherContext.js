// WeatherContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [tabularData, setTabularData] = useState([]);
  const [cityData, setCityData] = useState(null);
  const [climateData, setClimateData] = useState(null);

  useEffect(() => {
    fetchTabularData();
  }, []);

  const fetchTabularData = async () => {
    try {
      const response = await axios.get(
        'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=50'
      );
      setTabularData(response.data.results);
      return tabularData;
    } catch (error) {
      console.error('Error fetching tabular data:', error);
    }
  };

  const storeTabularData = (newData) => {
    setTabularData((prevData) => [...prevData, ...newData]);
  };
  const fetchCityData = async (searchValue) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=26ab58e31f69faf08beb94258744cbd0&units=metric`
      );
      setCityData(response.data);
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const fetchClimateData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26ab58e31f69faf08beb94258744cbd0&units=metric`
      );
      setClimateData(response.data);
    } catch (error) {
      console.error('Error fetching climate data:', error);
    }
  };

  return (
    <WeatherContext.Provider
      value={{ tabularData, cityData, climateData, fetchTabularData, fetchCityData, fetchClimateData, storeTabularData }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
