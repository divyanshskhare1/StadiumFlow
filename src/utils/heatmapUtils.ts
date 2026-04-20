export interface HeatNode {
    id: number;
    x: number;
    y: number;
    intensity: number;
    radius: number;
    color: string;
}

/**
 * Algorithm: Generate random crowd density hotspots simulating GPS signals
 * 
 * @returns {Array} An array of heatmap point objects mapping coordinates, intensity, and colors.
 * @complexity O(n) array mapping logic.
 */
export const generatePoints = (): HeatNode[] => {
    return Array.from({ length: 25 }).map(() => ({
        id: Math.random(),
        x: 5 + Math.random() * 90, // Map X% bound
        y: 5 + Math.random() * 90, // Map Y% bound
        intensity: 0.4 + Math.random() * 0.6, // Pulse strength
        radius: 30 + Math.random() * 60, // Crowd volume spread
        color: Math.random() > 0.6 ? '245, 101, 101' : (Math.random() > 0.5 ? '236, 201, 75' : '72, 187, 120') // Risk bands: Red, Yellow, Green
    })).filter(p => {
         // Mathematically exclude the exact center oval (the active pitch)
         const dy = p.y - 50;
         const dx = (p.x - 50) * 1.5; // Stretch weight to form ellipse
         const distance = Math.sqrt(dx*dx + dy*dy);
         return distance > 22; // Only render heat in the stadium "stands"
    });
};
