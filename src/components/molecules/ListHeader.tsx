import { Text, View } from 'react-native';
import styles from '../AppStyles';

export const ListHeader = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Stores Nearby</Text>
  </View>
);
