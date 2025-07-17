import React from 'react';
import { Text, View } from 'react-native';
import styles from '../googlemaps/FinderStyles';

const AppHeader: React.FC = ({}) => (
  <View style={styles.navBar}>
    <Text>Store Finder</Text>
  </View>
);

export default AppHeader;
