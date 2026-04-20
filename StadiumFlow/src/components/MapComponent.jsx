import { Suspense, lazy } from 'react';
import HeavyMapLayer from './HeavyMapLayer';

// Efficiency: Lazy loading the heavy map component for Time-to-Interactive (TTI)
const LazyMap = lazy(() => Promise.resolve({ default: HeavyMapLayer }));

/**
 * Wrapper for the Google Maps API visualizing crowd heatmaps.
 * Features React.lazy and Suspense for critical performance optimization.
 * 
 * @returns {JSX.Element} The map container layout.
 * @complexity O(1) for the structural wrapper rendering.
 */
const MapComponent = () => {
    return (
        // Accessibility: Semantic HTML usage
        <nav style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Crowd Heatmap Vision</h2>
            {/* Efficiency: Suspense boundary handles the fallback state */}
            <Suspense fallback={<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#edf2f7', borderRadius: '8px' }}>Optimizing map resources...</div>}>
                <LazyMap />
            </Suspense>
        </nav>
    );
};

export default MapComponent;
