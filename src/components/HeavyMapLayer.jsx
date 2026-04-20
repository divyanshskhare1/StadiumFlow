import React, { useState, useEffect } from 'react';
import { generatePoints } from '../utils/heatmapUtils';

/**
 * Advanced pure HTML/CSS mockup simulating a real-time Stadium Heatmap.
 * Generates dynamic structural bounding layouts with radial gradient heat nodes.
 * @returns {JSX.Element}
 */
const HeavyMapLayer = () => {
    const [heatPoints, setHeatPoints] = useState([]);

    useEffect(() => {
        // Bootstrap data and bind standard polling interval
        setHeatPoints(generatePoints());
        const telemetryInterval = setInterval(() => setHeatPoints(generatePoints()), 3500);
        return () => clearInterval(telemetryInterval);
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#1a202c', overflow: 'hidden', borderRadius: '12px', boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.5)' }}>
            
            {/* The Pitch (Center Grass Layout) */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30%', height: '55%', backgroundColor: '#276749', borderRadius: '45%', border: '2px solid rgba(255,255,255,0.4)', zIndex: 1 }} />
            {/* Midfield Line */}
            <div style={{ position: 'absolute', top: '50%', left: '35%', width: '30%', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)', zIndex: 2 }} />
            
            {/* The Inner Stands Blueprint */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '55%', height: '75%', borderRadius: '45%', border: '1px solid #4a5568' }} />
            {/* The Outer Stands Blueprint */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '85%', height: '90%', borderRadius: '45%', border: '1px solid #2d3748' }} />

            {/* Dynamic Real-Time Heatmap Data Link rendering */}
            {heatPoints.map(point => (
                <div 
                    key={point.id}
                    style={{
                        position: 'absolute',
                        top: `${point.y}%`,
                        left: `${point.x}%`,
                        transform: 'translate(-50%, -50%)',
                        width: `${point.radius}px`,
                        height: `${point.radius}px`,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgba(${point.color}, ${point.intensity}) 0%, rgba(${point.color}, 0) 70%)`,
                        pointerEvents: 'none',
                        transition: 'all 3s ease-in-out',
                        zIndex: 3,
                        mixBlendMode: 'screen'
                    }}
                />
            ))}

            {/* Tactical UI Data Ribbon overlay */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', backgroundColor: 'rgba(0,0,0,0.7)', padding: '6px 12px', borderRadius: '6px', color: '#fff', fontSize: '12px', fontWeight: 'bold', zIndex: 10, borderLeft: '3px solid #ecc94b', letterSpacing: '0.5px' }}>
                LIVE 📡 | Active Sectors: {heatPoints.length}
            </div>
            
            {/* Tactical Legend overlay */}
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', display: 'flex', gap: '15px', padding: '8px 12px', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '6px', fontSize: '11px', color: '#cbd5e0', zIndex: 10 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#48bb78', boxShadow: '0 0 5px #48bb78' }} /> Fluid</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ecc94b', boxShadow: '0 0 5px #ecc94b' }} /> Busy</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f56565', boxShadow: '0 0 5px #f56565' }} /> Jammed</span>
            </div>
        </div>
    );
};

export default HeavyMapLayer;
