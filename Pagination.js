import React from 'react';
import './style.css';
import { useState, useEffect } from 'react';

const pageSize = 10;
export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function getData() {
      const resp = await fetch('https://dummyjson.com/products?limit=100');
      const data = await resp.json();
      setData(data.products);
    }
    getData();
  }, []);
  function onPageChange(pageNumber) {
    setCurrentPage(pageNumber);
  }
  function handleNextPage(dir) {
    if (dir === 'next') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  }
  return (
    <div>
      {data
        .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
        .map((d) => {
          return (
            <div key={d.id}>
              <h4>{d.title}</h4>
            </div>
          );
        })}
      <div className="buttons">
        {currentPage > 1 && (
          <h4 onClick={() => handleNextPage('prev')}>Prev</h4>
        )}
        {[...Array(Math.floor(data.length / pageSize))].map((_, i) => {
          return (
            <h4
              onClick={() => onPageChange(i + 1)}
              className={currentPage === i + 1 ? 'selected' : ''}
            >
              {i + 1}
            </h4>
          );
        })}
        {currentPage < Math.floor(data.length / pageSize) && (
          <h4 onClick={() => handleNextPage('next')}>Next</h4>
        )}
      </div>
    </div>
  );
}
