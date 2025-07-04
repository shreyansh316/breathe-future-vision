// Point 21: Web Workers for Heavy Computations
// Moves exposure calculation math off the main UI thread

export interface ExposureJob {
  baseAqi: number;
  activityLevel: 'resting' | 'light' | 'moderate' | 'heavy';
  durationMinutes: number;
  maskType: 'none' | 'cloth' | 'surgical' | 'n95';
}

export interface ExposureResult {
  pm25Inhaled: number;
  equivalentCigarettes: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
}

self.onmessage = (e: MessageEvent<ExposureJob>) => {
  const { baseAqi, activityLevel, durationMinutes, maskType } = e.data;
  
  // Respiration rate multipliers (liters per minute)
  const respirationRates = {
    resting: 6,
    light: 12,
    moderate: 40,
    heavy: 60
  };
  
  // Mask protection factor (percentage blocked)
  const maskProtection = {
    none: 0,
    cloth: 0.3,
    surgical: 0.5,
    n95: 0.95
  };
  
  // Convert AQI roughly to PM2.5 concentration (ug/m3) - simplified for simulation
  const pm25Concentration = baseAqi * 0.7; 
  
  // Calculate total volume of air breathed (m3)
  const volumeM3 = (respirationRates[activityLevel] * durationMinutes) / 1000;
  
  // Calculate raw PM2.5 inhaled (ug)
  const rawPm25 = pm25Concentration * volumeM3;
  
  // Apply mask filtration
  const actualPm25Inhaled = rawPm25 * (1 - maskProtection[maskType]);
  
  // 22 ug of PM2.5 inhaled roughly equals 1 cigarette
  const equivalentCigarettes = actualPm25Inhaled / 22;
  
  let riskLevel: ExposureResult['riskLevel'] = 'Low';
  if (actualPm25Inhaled > 250) riskLevel = 'Severe';
  else if (actualPm25Inhaled > 100) riskLevel = 'High';
  else if (actualPm25Inhaled > 50) riskLevel = 'Moderate';

  // Artificial delay to prove the worker is async and not blocking the main thread
  setTimeout(() => {
    self.postMessage({
      pm25Inhaled: Number(actualPm25Inhaled.toFixed(2)),
      equivalentCigarettes: Number(equivalentCigarettes.toFixed(2)),
      riskLevel
    });
  }, 150); // 150ms mock processing time
};
