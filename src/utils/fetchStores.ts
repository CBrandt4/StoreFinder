import { API_KEY } from '@env';

type FetchStoresParams = {
  latitude: number;
  longitude: number;
  radiusInMeters?: number;
  searchStr?: string;
};

export async function fetchStoresFromAPI({
  latitude,
  longitude,
  radiusInMeters = 1000,
  searchStr = 'store',
}: FetchStoresParams) {
  if (!API_KEY) {
    throw new Error('Missing Google Maps API key');
  }

  const locationStr = `${latitude},${longitude}`;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${locationStr}&radius=${radiusInMeters}&keyword=${encodeURIComponent(
    searchStr,
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(`Google Places API error: ${data.status}`);
    }

    return data.results;
  } catch (err) {
    console.error('Error fetching stores:', err);
    throw err;
  }
}
