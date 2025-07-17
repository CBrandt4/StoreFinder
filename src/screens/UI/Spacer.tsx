import { View, StyleSheet } from 'react-native';

const Spacer = () => {
  return <View style={styles.spacer} />;
};

const styles = StyleSheet.create({
  spacer: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default Spacer;
