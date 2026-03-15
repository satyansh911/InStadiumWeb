/**
 * Leaflet / OpenStreetMap Utility
 * Leaflet with OpenStreetMap is 100% free and open-source.
 */

export const getStadiumCoordinates = async (address: string) => {
  // Geocoding helper - can use Nominatim (OSM Geocoding API)
  // Returning Wankhede Stadium coordinates as default
  return { lat: 18.9389, lng: 72.8258 };
};

/**
 * OpenStreetMap Tile Configuration
 */
export const OSM_CONFIG = {
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};
