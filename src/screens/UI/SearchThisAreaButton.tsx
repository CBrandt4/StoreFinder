import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../googlemaps/FinderStyles';
import { useStore } from '../../context/StoreContext';

const SearchThisAreaButton: React.FC = () => {
  const { fetchStores, region } = useStore();

  return (
    <View style={styles.buttonOverlay}>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          if (region) {
            fetchStores({ region });
            console.log('Search this area clicked:', region);
          } else {
            console.warn('No region set yet');
          }
        }}
      >
        <Text style={styles.searchButtonText}>Search this area</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchThisAreaButton;
