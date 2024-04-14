import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import "./Table.css";
interface CityData {
  ascii_name: string;
  country_code: string;
  cou_name_en: string;
  population: number;
  timezone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
}

const API_URL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100';

const columns = [
    { field: 'ascii_name', headerName: 'ASCII Name', width: 150 },
     { field: 'country_code', headerName: 'Country Code', width: 150 },
    { field: 'cou_name_en', headerName: 'Country Name (English)', width: 200 },
     { field: 'population', headerName: 'Population', width: 150 },
    { field: 'timezone', headerName: 'Timezone', width: 150 },
    { field: 'coordinates', headerName: 'Coordinates', width: 200 },
];

const LazyLoadingGrid: React.FC = () => {
  const [rows, setRows] = useState<CityData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchRows = async (pageNumber: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}&page=${pageNumber}`);
      const { results, total_count } = response.data;
      setRows((prevRows) => [...prevRows, ...results]);
      setTotalCount(total_count);
      setPage(pageNumber);
    } catch (error) {
      console.error('Error fetching rows:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current!;
    if (scrollTop + clientHeight >= scrollHeight - 20 && !loading && rows.length < totalCount) {
      fetchRows(page + 1);
    }
  };

  useEffect(() => {
    fetchRows(1);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page, loading]);

  return (
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
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={column.field}>
                  {column.field === 'coordinates'
                    ? `${row.coordinates.lat}, ${row.coordinates.lon}`
                    : (row as any)[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default LazyLoadingGrid;
