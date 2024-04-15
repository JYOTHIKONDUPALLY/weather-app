// WeatherContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {useSnackbar} from "notistack";
const WeatherContext = createContext();

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [tabularData, setTabularData] = useState([]);
  const [cityData, setCityData] = useState(null);
  const [climateData, setClimateData] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    fetchTabularData();
  }, []);

  const fetchTabularData = async () => {
    try {
      const response = await axios.get(
        'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100'
      );
      setTabularData(response.data.results);
      return tabularData;
    } catch (error) {
      enqueueSnackbar("sorry! unable to fetch data", {variant:"error"})
    }
  };

  
  const fetchCityData = async (searchValue) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=26ab58e31f69faf08beb94258744cbd0&units=metric`
      );
      setCityData(response.data);
    } catch (error) {
      enqueueSnackbar("sorry! unable to fetch data", {variant:"error"})
    }
  };

  const fetchClimateData = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26ab58e31f69faf08beb94258744cbd0&units=metric`
      );
      setClimateData(response.data);
    } catch (error) {
      enqueueSnackbar("sorry! unable to fetch data", {variant:"error"})
    }
  };

  return (
    <WeatherContext.Provider
      value={{ tabularData, cityData, climateData, fetchTabularData, fetchCityData, fetchClimateData, }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
