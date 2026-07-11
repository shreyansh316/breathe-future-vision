import { useState, useEffect } from 'react';

export interface EcoQuest {
  id: string;
  title: string;
  description: string;
  rewardCoins: number;
  co2SavedKg: number;
  iconType: 'bus' | 'tree' | 'carpool' | 'energy';
  completed: boolean;
}

const STORAGE_KEY = 'breathe_vayu_coins_data';

const DEFAULT_QUESTS: EcoQuest[] = [
  { id: 'q1', title: 'Public Transit Warrior', description: 'Take the metro or bus today instead of driving.', rewardCoins: 50, co2SavedKg: 2.5, iconType: 'bus', completed: false },
  { id: 'q2', title: 'Carpool Hero', description: 'Share a ride with at least 2 other people.', rewardCoins: 30, co2SavedKg: 1.2, iconType: 'carpool', completed: false },
  { id: 'q3', title: 'Green Thumb', description: 'Plant a sapling or maintain an indoor air-purifying plant.', rewardCoins: 100, co2SavedKg: 5.0, iconType: 'tree', completed: false },
  { id: 'q4', title: 'Energy Saver', description: 'Reduce AC usage or switch to natural ventilation for 4 hours.', rewardCoins: 40, co2SavedKg: 0.8, iconType: 'energy', completed: false },
];

export const useCarbonCredits = () => {
  const [coins, setCoins] = useState<number>(0);
  const [co2Saved, setCo2Saved] = useState<number>(0);
  const [quests, setQuests] = useState<EcoQuest[]>(DEFAULT_QUESTS);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setCoins(parsed.coins || 0);
        setCo2Saved(parsed.co2Saved || 0);
        if (parsed.quests && Array.isArray(parsed.quests)) {
          setQuests(parsed.quests);
        }
      }
    } catch (e) {
      console.warn("Could not load carbon credits data", e);
    }
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ coins, co2Saved, quests }));
  }, [coins, co2Saved, quests]);

  const completeQuest = (id: string) => {
    setQuests(prevQuests => {
      const updatedQuests = prevQuests.map(q => {
        if (q.id === id && !q.completed) {
          // Grant rewards
          setCoins(prev => prev + q.rewardCoins);
          setCo2Saved(prev => parseFloat((prev + q.co2SavedKg).toFixed(1)));
          return { ...q, completed: true };
        }
        return q;
      });
      return updatedQuests;
    });
  };

  const resetDailyQuests = () => {
    setQuests(DEFAULT_QUESTS);
  };

  return { coins, co2Saved, quests, completeQuest, resetDailyQuests };
};
