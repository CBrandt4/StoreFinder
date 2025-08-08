import styles from './AppStyles';
import { getDistance, convertDistance } from 'geolib';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocation } from '../context/LocationContext';
import { useStore } from '../context/StoreContext';

const PlacesList = () => {
  const { places } = useStore();
  const location = useLocation();

  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.normalText}>No stores found.</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.normalText}>Getting your location...</Text>
      </View>
    );
  }

  const orderedPlaces = [...places].sort((a, b) => {
    //sort places by proximity to location
    const distanceA = getDistance(location, {
      latitude: a.geometry.location.lat,
      longitude: a.geometry.location.lng,
    });

    const distanceB = getDistance(location, {
      latitude: b.geometry.location.lat,
      longitude: b.geometry.location.lng,
    });

    return distanceA - distanceB;
  });

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={orderedPlaces.slice(0, 5)} //5 places max
        keyExtractor={item => item.place_id ?? item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* //left */}
            <View style={styles.left}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.normalText}>
                {item.vicinity ?? 'No address available'}
              </Text>
            </View>
            {/* //Right */}
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.TouchableOpacity}
                onPress={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=${item.geometry.location.lat},${item.geometry.location.lng}`;
                  console.log('Opening URL:', url);
                  Linking.openURL(url);
                }}
              >
                <Image
                  source={require('../../../icons/external-link.png')}
                  style={styles.externalLink}
                />
              </TouchableOpacity>
              <Text>
                {item.geometry && item.geometry.location
                  ? `${convertDistance(
                      getDistance(
                        {
                          latitude: item.geometry.location.lat,
                          longitude: item.geometry.location.lng,
                        },
                        {
                          latitude: location.latitude,
                          longitude: location.longitude,
                        },
                      ),
                      'mi',
                    ).toFixed(1)} mi`
                  : 'Distance not available'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PlacesList;
