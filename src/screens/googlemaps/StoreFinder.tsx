import React, { useState, useCallback, useRef } from 'react';
import { useLocation } from '../../utils/LocationContext'; // Adjust path as needed
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_KEY } from '@env';
import MarkerCallout from './MarkerCallout';
import styles from './FinderStyles';
import { Clusterer } from 'react-native-clusterer';
import { assignIcon } from '../../utils/assignIcon';
import SearchBar from './SearchBar';

type Place = {
  name: string;
  place_id?: string;
  vicinity?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
};

type StoreFinderProps = {
  places: Place[];
  setPlaces: (places: Place[]) => void;
};

const initialRegion = {
  latitude: 39.6783,
  longitude: -75.6508,
  latitudeDelta: 0.3,
  longitudeDelta: 0.3,
};

const DEFAULT_OPTIONS = {
  radius: 4,
};

const StoreFinder: React.FC<StoreFinderProps> = ({ places, setPlaces }) => {
  const [region, setRegion] = useState(initialRegion);

  const { width: MAP_WIDTH, height: MAP_HEIGHT } = Dimensions.get('window');
  const MAP_DIMENSIONS = { width: MAP_WIDTH, height: MAP_HEIGHT / 2 };

  //HARDCODED if implementing a search/toggles/filters UI, these could be state variables
  //For now, they are hardcoded to true to include all brands in the search
  const OldNavy = true;
  const Gap = true;
  const Athleta = true;
  const BananaRepublic = true;

  let searchStr = '';
  if (OldNavy) searchStr += 'Old Navy';
  if (Gap) searchStr += (searchStr ? ',' : '') + 'Gap';
  if (Athleta) searchStr += (searchStr ? ',' : '') + 'Athleta';
  if (BananaRepublic) searchStr += (searchStr ? ',' : '') + 'Banana Republic';

  const searchRadiusMiles = 15; // HARDCODED - Can be made dynamic based on user input using a slider or input field -> state variable
  const meters = 1609.34 * searchRadiusMiles; // Hardcoded conversion from miles to meters, could be function within user input component
  const mapRef = useRef<MapView | null>(null);
  const fetchStores = useCallback(
    async (coords: { latitude: number; longitude: number }) => {
      const { latitude, longitude } = coords;
      // this url can be put into a net work file - context api
      //
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${meters}&keyword=${searchStr}&type=clothing_store&key=${API_KEY}`;
      // could make this call once a month
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPlaces(data.results || []);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    },
    [meters, searchStr, setPlaces],
  );

  const location = useLocation();

  if (!location?.latitude || !location?.longitude) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Getting current location…</Text>
      </View>
    );
  }

  const markers = (places ?? []).map((place, index) => ({
    type: 'Feature' as const,
    geometry: {
      type: 'Point' as const,
      coordinates: [place.geometry.location.lng, place.geometry.location.lat],
    },
    properties: {
      id: index,
      name: place.name,
      place,
    },
  }));

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <SearchBar
        onLocationFound={({ latitude, longitude }) => {
          const newRegion = {
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          };

          if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 1000); // (1000ms = 1 second)
          }
          setRegion(newRegion);
        }}
      />

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          onRegionChangeComplete={setRegion}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.3, //Hardcoded - Can be made dynamic based on user zoom
            longitudeDelta: 0.3, // ^^
          }}
          showsUserLocation
        >
          <Clusterer
            data={markers}
            region={region}
            options={DEFAULT_OPTIONS}
            mapDimensions={MAP_DIMENSIONS}
            renderItem={item => {
              if ('cluster_id' in item.properties) {
                return (
                  <Marker
                    key={`cluster-${item.properties.cluster_id}`}
                    coordinate={{
                      latitude: item.geometry.coordinates[1],
                      longitude: item.geometry.coordinates[0],
                    }}
                  >
                    <View style={styles.ClusterMarker}>
                      <Image
                        source={require('../../../icons/clusterMarker.png')}
                        style={styles.markerIcon}
                      />
                      <Text style={styles.ClusterMarkerText}>
                        +{item.properties.point_count}
                      </Text>
                    </View>
                  </Marker>
                );
              } else {
                const place = item.properties.place;
                const { icon, key } = assignIcon(item);

                return (
                  <Marker
                    key={key}
                    coordinate={{
                      latitude: place.geometry.location.lat,
                      longitude: place.geometry.location.lng,
                    }}
                  >
                    <Image source={icon} style={styles.markerIcon} />
                    <MarkerCallout
                      loc={{
                        title: place.name,
                        offers: 'Earn 5% back in rewards!',
                        lat: place.geometry.location.lat,
                        lng: place.geometry.location.lng,
                      }}
                    />
                  </Marker>
                );
              }
            }}
          />
        </MapView>

        <View style={styles.buttonOverlay}>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              fetchStores(region);
              console.log(
                'Button pressed, fetching stores with region:',
                region,
              );
            }}
          >
            <Text style={styles.searchButtonText}>Search this area</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StoreFinder;
