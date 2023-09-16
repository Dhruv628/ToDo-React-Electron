import React, { useEffect, useRef, useMemo } from 'react';
import { Chart } from 'chart.js/auto'; // Use 'chart.js/auto' for Chart.js version 3


const CustomChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Use useMemo to memoize the chart instance
  const chart = useMemo(() => {
    if (!data || !chartRef.current) {
      return null;
    }

    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,scales:{
          y: {
            suggestedMin: 0, // Set the minimum value for the y-axis to 0  
            ticks:{
              stepSize: 1,
            }
          }
        }
      },
    });

    return chartInstance.current;
  }, [data]);

  useEffect(() => {
    return () => {
      // Clean up chart instance when the component is unmounted
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default CustomChart;
