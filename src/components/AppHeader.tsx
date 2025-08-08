import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './AppStyles';

const AppHeader: React.FC = ({}) => (
  <View style={styles.navBar}>
    <View style={styles.leftHeader}>
      <Image
        source={require('../../../icons/backArrow.png')}
        style={styles.backArrow}
      />
    </View>

    <View style={styles.centerHeader}>
      <Text style={styles.headerText}>Find Stores</Text>
    </View>

    <View style={styles.rightHeader}>
      <Image
        source={require('../../../icons/question.png')} // replace if this is a different icon
        style={styles.questionButton}
      />
    </View>
  </View>
);

export default AppHeader;
