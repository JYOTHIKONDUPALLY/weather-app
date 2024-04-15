import React, { useState, useEffect, useRef } from 'react';
import "./Table.css";
import Header from '../Header/Header';
import axios from "axios";
import FilterSection from '../FilterSection/FilterSection';
import Searchbar from '../Searchbar/Searchbar';
import { useWeather } from '../../contexts/WeatherContext';
import { useNavigate } from "react-router-dom";
import { updateRecentCities } from '../../utils';

const columns = [
    { field: 'ascii_name', headerName: 'ASCII Name', width: 150 },
    { field: 'country_code', headerName: 'Country Code', width: 150 },
    { field: 'cou_name_en', headerName: 'Country Name', width: 200 },
    { field: 'population', headerName: 'Population', width: 150 },
    { field: 'timezone', headerName: 'Timezone', width: 150 },
    { field: 'coordinates', headerName: 'Coordinates', width: 200 },
];

const LazyLoadingGrid = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [tabularData, setTabularData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const containerRef = useRef(null);
    const { fetchTabularData } = useWeather(); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchTableData();
    }, [page]); // Fetch data when page changes

    useEffect(() => {
        setFilteredData(tabularData);
    }, [tabularData]); // Set filtered data when tabularData changes

    const fetchTableData = async () => {
        try {
            setLoading(true);
            const response = await fetchTabularData(page); // Pass page number to fetch data for pagination
            setTabularData((prevData) => [...prevData, ...response]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tabular data:', error);
            setLoading(false);
        }
    };

    const handleSearch = (searchValue) => {
        navigate("/weather");
        updateRecentCities(searchValue);
    };

    const handleCityClick = (cityName, event) => {
        handleSearch(cityName);
        if (event.button === 2) {
            window.open(`/weather?city=${encodeURIComponent(cityName)}`, "_blank");
        }
    };

    const handleFilterChange = (filteredData) => {
        setFilteredData(filteredData);
    };
    const handleResetFilters = () => {
        setFilteredData(tabularData); // Reset filteredData to entire tabularData
    };
    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 20 && !loading) {
            setPage(page + 1); // Increment page number when reaching the end of the page
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading]); // Add loading as a dependency to prevent multiple event listeners

    return (
        <div>
            <Header/>
            <Searchbar tabularData={tabularData} onSearch={handleSearch}/>
            <FilterSection tabularData={tabularData} onApplyFilters={handleFilterChange} onResetFilters={handleResetFilters} />
            <div ref={containerRef} style={{ height: 400, width: '100%', overflowY: 'auto' }}>
                <table className='table'>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.field}>{column.headerName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column) => (
                                    <td
                                        key={column.field}
                                        onClick={(event) => handleCityClick(row.ascii_name, event)}
                                        onContextMenu={(event) => handleCityClick(row.ascii_name, event)}
                                    >
                                        {column.field === 'coordinates'
                                            ? `${row.coordinates.lat}, ${row.coordinates.lon}`
                                            : row[column.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {loading && <div>Loading...</div>}
            </div>
        </div>
    );
};

export default LazyLoadingGrid;
