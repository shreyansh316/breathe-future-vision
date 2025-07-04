export type AQILevel = 'SAFE' | 'MODERATE' | 'POOR' | 'CRITICAL';
export type RecommendationCategory = 'Diet' | 'Yoga' | 'Lifestyle';
export type Dosha = 'Vata' | 'Pitta' | 'Kapha' | 'All';

export interface WellnessTip {
  id: string;
  category: RecommendationCategory;
  title: string;
  description: string;
  benefits: string;
  minAqi: number; // Minimum AQI for this tip to trigger
  iconType: string;
  doshaTarget: Dosha;
}

export const ayurvedaKnowledgeBase: WellnessTip[] = [
  // Diet
  {
    id: 'd1',
    category: 'Diet',
    title: 'Tulsi & Ginger Tea',
    description: 'Boil 5-6 Tulsi leaves with crushed ginger. Add a teaspoon of honey before drinking.',
    benefits: 'Clears the respiratory tract and boosts lung immunity against particulate matter.',
    minAqi: 100,
    iconType: 'leaf',
    doshaTarget: 'Kapha' // Ginger is heating, good for Kapha
  },
  {
    id: 'd2',
    category: 'Diet',
    title: 'Jaggery (Gud)',
    description: 'Consume a small piece of Jaggery after meals.',
    benefits: 'Acts as a natural cleansing agent for the lungs, pulling out dust particles.',
    minAqi: 150,
    iconType: 'candy',
    doshaTarget: 'All'
  },
  {
    id: 'd3',
    category: 'Diet',
    title: 'Turmeric Milk (Haldi Doodh)',
    description: 'Warm milk with half a teaspoon of turmeric and a pinch of black pepper before bed.',
    benefits: 'Strong anti-inflammatory properties reduce respiratory inflammation.',
    minAqi: 50,
    iconType: 'cup',
    doshaTarget: 'Vata' // Warm milk grounds Vata
  },
  {
    id: 'd4',
    category: 'Diet',
    title: 'Amla (Indian Gooseberry)',
    description: 'Eat one fresh Amla or take Amla juice daily.',
    benefits: 'High Vitamin C neutralizes free radicals caused by severe air pollution.',
    minAqi: 200,
    iconType: 'fruit',
    doshaTarget: 'Pitta' // Cooling property balances Pitta
  },
  {
    id: 'd5',
    category: 'Diet',
    title: 'Warm Soups with Ghee',
    description: 'Consume warm, easily digestible soups topped with a spoon of cow ghee.',
    benefits: 'Ghee coats the intestinal lining, preventing systemic inflammation from inhaled toxins.',
    minAqi: 100,
    iconType: 'cup',
    doshaTarget: 'Vata'
  },
  {
    id: 'd6',
    category: 'Diet',
    title: 'Coriander Seed Water',
    description: 'Soak crushed coriander seeds overnight and drink the water in the morning.',
    benefits: 'Cools the blood and flushes out acid-forming toxins caused by heavy metal pollution.',
    minAqi: 150,
    iconType: 'droplet',
    doshaTarget: 'Pitta'
  },
  
  // Yoga & Breathwork
  {
    id: 'y1',
    category: 'Yoga',
    title: 'Anulom Vilom (Alternate Nostril Breathing)',
    description: 'Practice for 10-15 minutes indoors in a well-ventilated room.',
    benefits: 'Balances the nervous system and improves lung capacity.',
    minAqi: 0,
    iconType: 'wind',
    doshaTarget: 'All'
  },
  {
    id: 'y2',
    category: 'Yoga',
    title: 'Bhastrika Pranayama',
    description: 'Forceful breathing technique. *Do not practice outdoors if AQI is >100.*',
    benefits: 'Clears congestion and strengthens the diaphragm.',
    minAqi: 0,
    iconType: 'lungs',
    doshaTarget: 'Kapha' // Heating, clears mucus
  },
  {
    id: 'y3',
    category: 'Yoga',
    title: 'Jal Neti',
    description: 'Nasal cleansing using a Neti pot with lukewarm saline water.',
    benefits: 'Flushes out PM2.5 and allergens trapped in the nasal passage.',
    minAqi: 250,
    iconType: 'water',
    doshaTarget: 'All'
  },
  {
    id: 'y4',
    category: 'Yoga',
    title: 'Shitali Pranayama (Cooling Breath)',
    description: 'Inhale through a rolled tongue, exhale through the nose. Do 10 rounds.',
    benefits: 'Reduces internal heat and calms burning sensations in the eyes/throat due to smog.',
    minAqi: 150,
    iconType: 'wind',
    doshaTarget: 'Pitta'
  },
  
  // Lifestyle
  {
    id: 'l1',
    category: 'Lifestyle',
    title: 'Nasya Oil Application',
    description: 'Apply 2 drops of Anu Taila or pure sesame oil in each nostril before stepping out.',
    benefits: 'Creates a physical barrier preventing microscopic pollutants from entering the respiratory tract.',
    minAqi: 150,
    iconType: 'droplet',
    doshaTarget: 'Vata' // Oil is highly grounding for Vata
  },
  {
    id: 'l2',
    category: 'Lifestyle',
    title: 'Steam Inhalation with Mint',
    description: 'Inhale steam infused with eucalyptus oil or mint leaves for 5 minutes at night.',
    benefits: 'Soothes an irritated throat and opens up blocked airways.',
    minAqi: 200,
    iconType: 'cloud',
    doshaTarget: 'Kapha' // Removes heavy congestion
  },
  {
    id: 'l3',
    category: 'Lifestyle',
    title: 'Indoor Plants',
    description: 'Keep Snake Plants or Areca Palms near your resting area.',
    benefits: 'Naturally filters indoor air and increases oxygen levels overnight.',
    minAqi: 50,
    iconType: 'flower',
    doshaTarget: 'All'
  },
  {
    id: 'l4',
    category: 'Lifestyle',
    title: 'Sandalwood Paste Application',
    description: 'Apply a cool sandalwood paste on your forehead after returning from high-pollution areas.',
    benefits: 'Relieves stress headaches and cools skin irritated by toxic air.',
    minAqi: 300,
    iconType: 'leaf',
    doshaTarget: 'Pitta'
  }
];
