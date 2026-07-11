export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
}

export const blogs: BlogPost[] = [
  {
    id: "world-top-10-hottest-cities-india-2026",
    title: "World Top 10 Hottest Cities Are All in India Again - May 2026",
    date: "4 Jun 2026",
    author: "Gyane Haobijam",
    category: "Climate Analysis",
    excerpt: "For the second consecutive year, India dominates the list of the top 10 hottest cities globally, raising severe concerns over localized urban heat islands.",
    imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1000",
    content: `
      <h2>The Heatwave Crisis Deepens</h2>
      <p>In May 2026, an unprecedented heatwave swept across the Indian subcontinent. Data compiled by global meteorological agencies confirmed a staggering reality: the top 10 hottest cities on Earth during this period were all located in India.</p>
      
      <p>Cities such as Churu (Rajasthan), Jacobabad (historically high but surpassed by Indian cities this year), and Banda (Uttar Pradesh) recorded temperatures soaring past 50°C (122°F).</p>
      
      <h3>Urban Heat Island Effect</h3>
      <p>The primary driver behind this concentrated extreme heat is the Urban Heat Island (UHI) effect. Rapid, unplanned urbanization, lack of green cover, and high concentrations of concrete and asphalt trap solar radiation, preventing the earth from cooling during the night.</p>
      
      <p>When combined with massive spikes in PM2.5 and PM10 particulate matter from construction and vehicular emissions, the heat is essentially sealed within the troposphere, creating a suffocating dome over these metropolitan areas.</p>
      
      <h3>VayuRakshak's Role in Mitigation</h3>
      <p>Through the VayuRakshak platform, municipal bodies are now utilizing our high-resolution AOD (Aerosol Optical Depth) satellite data combined with ground-level telemetry to map out high-risk zones. This allows for predictive, targeted interventions such as deploying water-mist cannons and rerouting heavy traffic away from vulnerable districts during peak heat hours.</p>
    `
  },
  {
    id: "delhi-implements-ai-smog-towers",
    title: "Delhi Implements Advanced AI Smog Towers Across NCR Region",
    date: "28 May 2026",
    author: "Priya Sharma",
    category: "Infrastructure",
    excerpt: "The National Capital Region has successfully deployed a network of 50 AI-driven smog towers, utilizing neural networks to dynamically adjust filtration rates.",
    imageUrl: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=1000",
    content: `
      <h2>A Technological Leap in Urban Filtration</h2>
      <p>In a desperate bid to curb the devastating winter smog, the Delhi Government, in collaboration with the Central Pollution Control Board (CPCB), has activated a network of 50 Advanced AI Smog Towers across the National Capital Region (NCR).</p>
      
      <h3>How the AI Operates</h3>
      <p>Unlike traditional smog towers that operate at a static fan speed, these new towers are fully integrated with the VayuRakshak predictive API. The towers ingest real-time LSTM forecasts and adjust their electrostatic precipitator (ESP) filtration capacities dynamically.</p>
      
      <ul>
        <li><strong>Low Pollution (AQI < 100):</strong> Towers operate at 20% capacity, saving energy.</li>
        <li><strong>High Pollution (AQI > 300):</strong> Towers ramp up to 100% capacity in anticipation of the incoming smog cloud, creating a localized clean-air microclimate.</li>
      </ul>
      
      <p>Early data suggests a 35% improvement in localized air quality within a 1km radius of each tower compared to the older static models.</p>
    `
  },
  {
    id: "impact-ev-adoption-particulate-matter",
    title: "The Impact of EV Adoption on Urban Particulate Matter",
    date: "15 May 2026",
    author: "Rahul Verma",
    category: "Policy & Transport",
    excerpt: "With EV adoption crossing 40% in major metropolitan hubs, we analyze the actual reduction in tailpipe emissions versus the rise in tire-wear particulate matter.",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1000",
    content: `
      <h2>The Double-Edged Sword of Electrification</h2>
      <p>As India pushes aggressively toward its 2030 EV mandates, major hubs like Bengaluru, Pune, and Hyderabad have seen Electric Vehicle (EV) adoption rates cross the 40% threshold for two-wheelers and public transit.</p>
      
      <h3>Tailpipe vs. Non-Exhaust Emissions (NEE)</h3>
      <p>The elimination of internal combustion engine (ICE) tailpipe emissions has undeniably reduced Nitrogen Dioxide (NO2) levels by over 22% in these urban centers. However, the heavy battery weight of EVs introduces a new challenge: Non-Exhaust Emissions (NEE).</p>
      
      <p>Because EVs are significantly heavier than their ICE counterparts, they generate increased friction on tires and brake pads. According to recent VayuRakshak ground-sensor telemetry, while PM2.5 from exhaust has plummeted, PM10 levels generated from tire wear and road asphalt degradation have spiked by 8%.</p>
      
      <h3>Future Policy Adjustments</h3>
      <p>To combat this, the Ministry of Road Transport is currently drafting new regulations requiring specialized, low-wear composite tires for commercial EVs, ensuring that the transition to electric mobility is a net-zero gain for urban air quality.</p>
    `
  }
];
