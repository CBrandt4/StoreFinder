import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: 'white',
  },
  listContainer: {
    padding: 10,
  },
  TouchableOpacity: {
    backgroundColor: 'transparent',
  },
  TouchableOpacityText: {
    color: 'blue',
    fontSize: 16,
    textAlign: 'right',
  },

  item: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  address: {
    fontSize: 14,
    color: 'black',
  },
});

export default styles;
