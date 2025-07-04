import { City } from '@/data/cities';

export const exportToCSV = (data: City[], filename: string = 'aakaashsetu-aqi-report.csv') => {
  if (!data || !data.length) {
    console.error('No data provided for export');
    return;
  }

  // Define headers based on City interface
  const headers = ['City', 'State', 'AQI', 'PM2.5', 'PM10', 'Latitude', 'Longitude'];
  
  // Map data to CSV rows
  const rows = data.map(city => {
    return [
      `"${city.name}"`,
      `"${city.state}"`,
      city.aqi,
      city.pm25,
      city.pm10,
      city.coordinates[1], // maplibre/backend sends [lng, lat], but wait, usePollutionData mapped it. Let's export what we have.
      city.coordinates[0]
    ].join(',');
  });

  // Combine headers and rows
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  // Create a Blob and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
