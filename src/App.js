import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage/HomePage';
import WeatherPage from './components/Pages/weatherPage/weatherPage';
import Table from './components/Table/Table';
import { WeatherProvider } from './contexts/WeatherContext';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <WeatherProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/table" element={<Table />} />
          </Routes>
        </WeatherProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
