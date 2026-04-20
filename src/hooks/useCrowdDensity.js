import { useMemo, useState, useEffect } from 'react';

/**
 * Custom hook to calculate and manage crowd density.
 * Demonstrates the use of useMemo to prevent unnecessary density recalculations.
 * 
 * @param {Array<{lat: number, lng: number, weight: number}>} initialData - Array of mock GPS tracking points.
 * @returns {number} The aggregated total density value.
 * @complexity O(n) where n is the number of data points. useMemo optimizes this.
 */
export const useCrowdDensity = (initialData = []) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    // Simulating generic real-time data stream updates
    const interval = setInterval(() => {
       if(data.length > 0) {
          setData(prev => prev.map(pt => ({ ...pt, weight: Math.floor(Math.random() * 20) })));
       }
    }, 10000);
    return () => clearInterval(interval);
  }, [data.length]);

  // Efficiency: useMemo caches the total density calculation
  const totalDensity = useMemo(() => {
    return data.reduce((sum, currentPoint) => sum + currentPoint.weight, 0);
  }, [data]);

  return totalDensity;
};
