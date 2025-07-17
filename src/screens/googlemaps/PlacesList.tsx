/* eslint-disable react/no-unstable-nested-components */
import styles from './ListStyles';
import { getDistance, convertDistance } from 'geolib';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocation } from '../../context/LocationContext';
import { useStore } from '../../context/StoreContext';

const PlacesList = () => {
  const { places } = useStore();
  const location = useLocation();

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Stores Nearby</Text>
    </View>
  );

  if (!places || places.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No stores found.</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={places}
        keyExtractor={item => item.place_id ?? item.name}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <View style={styles.item}>
            {/* //left */}
            <View style={styles.left}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.address}>
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
                {/* <Text style={styles.TouchableOpacityText}>Get Directions</Text> */}
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
