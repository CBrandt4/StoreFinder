import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Callout } from 'react-native-maps';
import styles from '../AppStyles';

interface MarkerCalloutProps {
  loc: {
    title: string;
    offers: string;
    lat: number;
    lng: number;
    vicinity: string;
  };
}

const MarkerCallout: React.FC<MarkerCalloutProps> = ({ loc }) => (
  <Callout
    tooltip
    onPress={() => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${loc.title},${loc.vicinity}`,
      )}`;
      console.log('Opening URL:', url);
      Linking.openURL(url);
    }}
  >
    <View style={styles.calloutContainer}>
      <Text style={styles.headerText}>{loc.title}</Text>
      <Text style={styles.offers}>{loc.offers}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  </Callout>
);

export default MarkerCallout;
