import React from 'react';
import MapComponent from './components/MapComponent';
import QueueTracker from './components/QueueTracker';

/**
 * Root App component mounting the Heatmap and SmartQueue interfaces.
 * @returns {JSX.Element}
 */
const App: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', backgroundColor: '#f7fafc', minHeight: '100vh', paddingBottom: '50px' }}>
      <header style={{ padding: '25px', backgroundColor: '#2b6cb0', color: 'white', textAlign: 'center', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '32px' }}>🏟️ StadiumFlow</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Smart Crowd Management PWA</p>
      </header>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', marginTop: '30px' }}>
        <div style={{ flex: '1 1 500px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <MapComponent />
        </div>
        
        <div style={{ flex: '1 1 400px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <QueueTracker />
        </div>
      </div>
    </div>
  );
};

export default App;
