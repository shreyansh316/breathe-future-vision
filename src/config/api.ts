// Point 90: Eliminate All Hardcoded Localhost Fallbacks
// Environment-aware API configuration

const IS_PROD = import.meta.env.PROD;

export const API_CONFIG = {
  // Switch intelligently to secure absolute production endpoints
  BASE_URL: IS_PROD ? 'https://api.vayunet.in/v1' : 'http://localhost:8000/api/v1',
  WS_URL: IS_PROD ? 'wss://api.vayunet.in/ws' : 'ws://localhost:8000/ws',
  
  // Point 98: Secure Environment Key Injection (using Vite's import.meta.env)
  MAPLIBRE_TOKEN: import.meta.env.VITE_MAPLIBRE_API_KEY || '',
  
  // Timeout configurations for resiliency
  TIMEOUT_MS: 15000,
  
  // Global Headers
  getHeaders: () => ({
    'Content-Type': 'application/json',
    'X-Client-Version': '1.0.0',
    // Mock Auth Token Injector
    ...(localStorage.getItem('vayu_token') ? { Authorization: `Bearer ${localStorage.getItem('vayu_token')}` } : {})
  })
};

export const getEndpoint = (path: string) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_CONFIG.BASE_URL}${cleanPath}`;
};
