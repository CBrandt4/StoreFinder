/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Callout } from 'react-native-maps';

const buttonStyle = {
  backgroundColor: '#4285F4',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 4,
};

interface MarkerCalloutProps {
  loc: {
    title: string;
    offers: string;
    lat: number;
    lng: number;
    // address1: string;
  };
}

const MarkerCallout: React.FC<MarkerCalloutProps> = ({ loc }) => (
  <Callout
    onPress={() => {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
      console.log('Opening URL:', url);
      Linking.openURL(url);
    }}
  >
    <View style={{ width: 200 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{loc.title}</Text>
      <Text style={{ marginBottom: 8 }}>{loc.offers}</Text>
      <TouchableOpacity style={buttonStyle}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Get Directions
        </Text>
      </TouchableOpacity>
    </View>
  </Callout>
);

export default MarkerCallout;
