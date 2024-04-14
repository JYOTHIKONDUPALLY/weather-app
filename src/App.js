import React from 'react';
import Table from "./components/Table/Table";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage/HomePage';
import WeatherPage from './components/Pages/weatherPage/weatherPage';
import "./App.css";
const App= () => {
  return (
<BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage/>} />
        <Route path="/weather" element={<WeatherPage/>} />
        <Route path="/Table" element={<Table/>}/>
    </Routes>
       
        </BrowserRouter>
  );
}

export default App;
