import { create } from 'zustand';
import { City } from '@/data/cities';

interface VayuState {
  // Global State
  selectedCity: City | null;
  globalAqi: number;
  isSimulatingFailure: boolean;
  
  // Actions
  setSelectedCity: (city: City) => void;
  setGlobalAqi: (aqi: number) => void;
  toggleFailureSimulation: () => void;
}

// Point 19: Zustand Migration
// Replaces localized prop-drilling with a highly optimized global state store
export const useVayuStore = create<VayuState>((set) => ({
  selectedCity: null,
  globalAqi: 0,
  isSimulatingFailure: false,
  
  setSelectedCity: (city) => set({ selectedCity: city }),
  setGlobalAqi: (aqi) => set({ globalAqi: aqi }),
  toggleFailureSimulation: () => set((state) => ({ isSimulatingFailure: !state.isSimulatingFailure })),
}));
