import React, { createContext, useContext, useEffect, useState } from 'react';
import GetLocation from 'react-native-get-location';

type Location = {
  latitude: number;
  longitude: number;
} | null;

const LocationContext = createContext<Location>(null);

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [location, setLocation] = useState<Location>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const loc = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });
        setLocation({ latitude: loc.latitude, longitude: loc.longitude });
      } catch (err) {
        console.warn('Location error:', err);
      }
    };

    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};
export default LocationProvider;
