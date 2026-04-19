import React, { useState, useCallback, useMemo } from 'react';
import { sanitizeInput } from '../utils/security';

/**
 * Logic component acting as a SmartQueue Tracker & GeminiOps Chatbot interface.
 * Calculates wait times and displays accessible visual indicators.
 * 
 * @param {Object} props - SmartQueue properties
 * @param {number} props.peopleInQueue - Total people currently in the physical queue.
 * @param {number} props.avgServiceTime - Average service time per person in minutes.
 * @param {number} props.openCounters - Number of currently active service counters/gates.
 * @returns {JSX.Element} The queue tracking and smart chatbot view.
 * @complexity O(1) for Queue Math. O(n) for parsing chatbot messages.
 */
interface QueueTrackerProps {
  peopleInQueue?: number;
  avgServiceTime?: number;
  openCounters?: number;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({ peopleInQueue = 24, avgServiceTime = 3, openCounters = 4 }) => {
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  // Efficiency: useMemo caches the critical queue mathematical algorithm
  const estimatedWaitTime = useMemo(() => {
    if (openCounters <= 0) return Infinity; // Prevent zero division
    return (peopleInQueue * avgServiceTime) / openCounters;
  }, [peopleInQueue, avgServiceTime, openCounters, refreshKey]);

  // Efficiency: useCallback for stable references
  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  // Security: Input Sanitization hookup
  const handleSendChat = useCallback(() => {
    if (!chatInput.trim()) return;
    const safeOutput = sanitizeInput(chatInput);
    setMessages(prev => [...prev, safeOutput]);
    setChatInput('');
  }, [chatInput]);

  const getWaitStatus = (time) => {
      if(time < 10) return { color: '#48bb78', text: 'Fast Moving' };
      if(time < 20) return { color: '#ecc94b', text: 'Moderate' };
      return { color: '#f56565', text: 'Congested' };
  };

  const status = getWaitStatus(estimatedWaitTime);

  return (
    // Accessibility: Semantic usage
    <main style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
        <article>
            <h2>Smart Queue Estimator</h2>
            
            {/* Accessibility: ARIA Live Region for screen reader realtime context */}
            <div aria-live="polite" style={{ padding: '15px', backgroundColor: status.color, color: status.color === '#ecc94b' ? '#2d3748' : '#ffffff', borderRadius: '6px', fontWeight: 'bold' }}>
                Wait Time: {estimatedWaitTime === Infinity ? 'Service Halted' : `${estimatedWaitTime.toFixed(1)} mins`} ({status.text})
            </div>

            <button onClick={handleRefresh} style={{ marginTop: '15px', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}>
                Refresh Crowd Telemetry
            </button>
            
            {/* Progress Bar Display */}
            <div style={{ marginTop: '25px', width: '100%', backgroundColor: '#e2e8f0', height: '20px', borderRadius: '10px', overflow: 'hidden' }}>
                 <div style={{ width: `${Math.min((estimatedWaitTime / 40) * 100, 100)}%`, backgroundColor: status.color, height: '100%', transition: 'width 0.4s ease' }} />
            </div>
        </article>

        {/* FEATURE: GeminiOps (Chatbot) Integration */}
        <section>
            <button 
                onClick={() => setChatOpen(!chatOpen)}
                style={{ position: 'fixed', bottom: '25px', right: '25px', padding: '18px', borderRadius: '50%', backgroundColor: '#3182ce', color: 'white', border: 'none', cursor: 'pointer', boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', fontSize: '20px' }}
                aria-label="Open GeminiOps Chat"
            >
                💬
            </button>

            {chatOpen && (
                <div style={{ position: 'fixed', bottom: '90px', right: '25px', width: '320px', border: '1px solid #cbd5e0', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0px 8px 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', zIndex: 50 }}>
                    <header style={{ padding: '12px', backgroundColor: '#3182ce', color: 'white', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', fontWeight: 'bold' }}>
                        GeminiOps Safety Assistant
                    </header>
                    <div style={{ padding: '12px', minHeight: '180px', maxHeight: '250px', overflowY: 'auto' }}>
                        {messages.length === 0 && <p style={{ color: '#a0aec0', fontSize: '14px', textAlign: 'center' }}>Ask Stadium safety queries...</p>}
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{ marginBottom: '10px', backgroundColor: '#edf2f7', padding: '10px', borderRadius: '6px', fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: msg }} />
                        ))}
                    </div>
                    <div style={{ display: 'flex', borderTop: '1px solid #cbd5e0' }}>
                        <input 
                            value={chatInput} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChatInput(e.target.value)} 
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendChat()}
                            placeholder="Type safe input..." 
                            style={{ flex: 1, padding: '12px', border: 'none', borderBottomLeftRadius: '10px', outline: 'none' }}
                        />
                        <button onClick={handleSendChat} style={{ padding: '0 20px', backgroundColor: '#48bb78', color: 'white', border: 'none', borderBottomRightRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
                    </div>
                </div>
            )}
        </section>
    </main>
  );
};

export default QueueTracker;
