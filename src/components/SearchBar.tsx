import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { API_KEY } from '@env';

type Props = {
  onLocationFound: (coords: { latitude: number; longitude: number }) => void;
};

const SearchBar: React.FC<Props> = ({ onLocationFound }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        query,
      )}&key=${API_KEY}`;

      console.log(url);

      const res = await fetch(url);
      const json = await res.json();

      if (json.status === 'OK' && json.results.length > 0) {
        const location = json.results[0].geometry.location;
        onLocationFound({
          latitude: location.lat,
          longitude: location.lng,
        });
      } else {
        Alert.alert('Location not found');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error searching location');
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
    zIndex: 1,
  },
  input: {
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});

export default SearchBar;
