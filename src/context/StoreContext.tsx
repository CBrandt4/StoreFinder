import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { API_KEY } from '@env';
import { useLocation } from './LocationContext';
import { Place } from '../types/Place';
import { Region } from '../types/Region';

type FetchStoresParams = {
  region?: Region;
  radiusInMeters?: number;
  searchStr?: string;
};

type StoreContextType = {
  places: Place[];
  fetchStores: (params?: FetchStoresParams) => Promise<void>;
  loading: boolean;
  error: string | null;
  region: Region | null;
  setRegion: (region: Region) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

  const location = useLocation();

  // Initialize region from location once available
  useEffect(() => {
    if (location?.latitude != null && location?.longitude != null && !region) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      });
    }
  }, [location, region]);

  const fetchStores = async ({
    region: fetchRegion,
    radiusInMeters = 1609.34 * 15,
    searchStr = 'Old Navy,Gap,Athleta,Banana Republic',
  }: FetchStoresParams = {}) => {
    const currentRegion = fetchRegion || region;
    if (!currentRegion) {
      setError('No region specified');
      return;
    }

    const { latitude, longitude } = currentRegion;

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&keyword=${encodeURIComponent(
      searchStr,
    )}&type=clothing_store&key=${API_KEY}`;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error(data.status || 'Google API error');
      }

      setPlaces(data.results || []);
    } catch (err: any) {
      console.error('Failed to fetch stores:', err);
      setError('Could not fetch stores. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StoreContext.Provider
      value={{ places, fetchStores, loading, error, region, setRegion }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
