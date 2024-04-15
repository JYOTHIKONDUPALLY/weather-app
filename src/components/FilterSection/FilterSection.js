import React, { useState } from 'react';
import "./FilterSection.css";

const FilterSection = ({ tabularData, onApplyFilters, onResetFilters}) => {
    const [selectedTimezones, setSelectedTimezones] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedPopulations, setSelectedPopulations] = useState([]);
    const [showFilters, setShowFilters] = useState(false); // State to control visibility of filter categories

    // Extract unique timezones, countries, and populations from tabularData
    const timezones = Array.from(new Set(tabularData.map(data => data.timezone)));
    const countries = Array.from(new Set(tabularData.map(data => data.cou_name_en)));
    const populations = Array.from(new Set(tabularData.map(data => {
        if (data.population <= 100) {
            return "0-100";
        } else if (data.population <= 1000) {
            return "101-1000";
        } else if (data.population <= 10000) {
            return "1001-10000";
        }
    })));

    const applyFilters = () => {
        // Filter the data based on selected filters
        const filteredData = tabularData.filter(data => {
            return (
                (selectedTimezones.length === 0 || selectedTimezones.includes(data.timezone)) &&
                (selectedCountries.length === 0 || selectedCountries.includes(data.cou_name_en)) &&
                (selectedPopulations.length === 0 || selectedPopulations.includes(getPopulationRange(data.population)))
            );
        });
        
        // Pass the filtered data back to the parent component
        onApplyFilters(filteredData);
    };

    const resetFilters = () => {
        // Reset selected filters and set filtered data to entire tabular data
        setSelectedTimezones([]);
        setSelectedCountries([]);
        setSelectedPopulations([]);
        onResetFilters();
    };

    const getPopulationRange = (population) => {
        if (population <= 100) {
            return "0-100";
        } else if (population <= 1000) {
            return "101-1000";
        } else if (population <= 10000) {
            return "1001-10000";
        }
    };

    return (
        <div className='filterSection'>
            <div className='filterbutton' onClick={() => setShowFilters(!showFilters)}>Filter</div>
            {showFilters && ( 
                <>
                    <label>
                        Timezone:
                        <select onChange={(e) => setSelectedTimezones([e.target.value])}>
                            <option value="">Select Timezone</option>
                            {timezones.map((timezone, index) => (
                                <option key={index} value={timezone}>{timezone}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Country:
                        <select onChange={(e) => setSelectedCountries([e.target.value])}>
                            <option value="">Select Country</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>{country}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Population:
                        <select onChange={(e) => setSelectedPopulations([e.target.value])}>
                            <option value="">Select Population</option>
                            {populations.map((population, index) => (
                                <option key={index} value={population}>{population}</option>
                            ))}
                        </select>
                    </label>
                    <div>
                <span className='applyButton' onClick={applyFilters}>Apply Filters</span>
                <span className='Resetbutton' onClick={resetFilters}>Reset Filters</span>
            </div>
                </>
            )}
           
        </div>
    );
}

export default FilterSection;
